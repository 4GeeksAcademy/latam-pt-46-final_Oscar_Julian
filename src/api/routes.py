from datetime import datetime  # Change the import
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from api.utils import generate_sitemap, APIException
from api.models import Favorite, Review, db, User, Book
from flask import Flask, request, jsonify, url_for, Blueprint

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#  --------------------------------------------- INICIO DE SESIÓN ---------------------------------------------------------------------
@api.route('/signup', methods=['POST'])
def signup():
    try:
        # Get request data
        data = request.get_json()

        # Validate required fields
        if not data:
            return jsonify({"message": "No data provided"}), 400

        if not data.get('email') or not data.get('password'):
            return jsonify({"message": "Email and password are required"}), 400

        # Check if user already exists
        user_exists = User.query.filter_by(email=data['email'].lower()).first()
        if user_exists:
            return jsonify({"message": "Email already registered"}), 400

        # Create new user
        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            email=data['email'].lower(),
            password=hashed_password,
            is_active=True
        )

        db.session.add(new_user)

        try:
            db.session.commit()
            return jsonify({"message": "User created successfully"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"message": f"Error creating user: {str(e)}"}), 500

    except Exception as e:
        # Catch any unexpected errors and return a proper JSON response
        return jsonify({"message": f"Server error: {str(e)}"}), 500

@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        # Validate required fields
        if not data:
            return jsonify({"message": "No data provided"}), 400

        if not data.get('email') or not data.get('password'):
            return jsonify({"message": "Email and password are required"}), 400

        # Find the user
        user = User.query.filter_by(email=data['email'].lower()).first()

        # Check if user exists and password is correct
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({"message": "Invalid email or password"}), 401

        # Check if user is active
        if not user.is_active:
            return jsonify({"message": "User account is not active"}), 401

        # Create access token
        access_token = create_access_token(identity=str(user.id))

        return jsonify({
            "message": "Logged in successfully",
            "user": user.serialize(),
            "token": access_token
        }), 200

    except Exception as e:
        # Catch any unexpected errors
        return jsonify({"message": f"Server error: {str(e)}"}), 500

#  --------------------------------------------- BOOKS ---------------------------------------------------------------------
@api.route('/books', methods=['GET'])
def get_all_books():
    try:
        # Obtener todos los libros de la base de datos
        books = Book.query.all()
        
        # Serializar los resultados
        serialized_books = [book.serialize() for book in books]
        
        return jsonify({
            "success": True,
            "count": len(serialized_books),
            "data": serialized_books
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error al obtener libros: {str(e)}"
        }), 500

@api.route('/books', methods=['POST'])
@jwt_required()
def create_book():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No data provided"}), 400

        required_fields = ['title', 'author', 'created_date']
        if not all(field in data for field in required_fields):
            return jsonify({"message": f"Missing required fields: {required_fields}"}), 400

        current_user_id = get_jwt_identity()

        # Crear nuevo libro
        new_book = Book(
            title=data['title'],
            author=data['author'],
            genre=data.get('genre'),
            category=data.get('category'),
            cover_image=data.get('cover_image'),
            created_date=datetime.strptime(data['created_date'], "%Y-%m-%d").date(),
            user_id=current_user_id
        )

        db.session.add(new_book)
        db.session.commit()

        return jsonify({"message": "Book created successfully", "book": new_book.serialize()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Server error: {str(e)}"}), 500

@api.route('/books/<int:book_id>', methods=['PUT'])
@jwt_required()
def update_book(book_id):
    try:
        current_user_id = get_jwt_identity()
        book = Book.query.get(book_id)

        # Validar existencia del libro
        if not book:
            return jsonify({"message": "Book not found"}), 404

        data = request.get_json()
        
        # Actualizar campos permitidos
        if 'title' in data:
            book.title = data['title']
        if 'author' in data:
            book.author = data['author']
        if 'genre' in data:
            book.genre = data['genre']
        if 'category' in data:
            book.category = data['category']
        if 'cover_image' in data:
            book.cover_image = data['cover_image']
        if 'created_date' in data:
            book.created_date = datetime.strptime(data['created_date'], "%Y-%m-%d").date()

        db.session.commit()
        
        return jsonify({
            "message": "Book updated successfully",
            "book": book.serialize()
        }), 200

    except ValueError as e:
        db.session.rollback()
        return jsonify({"message": f"Invalid date format: {str(e)}"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Server error: {str(e)}"}), 500

@api.route('/books/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_book(book_id):
    try:
        current_user_id = get_jwt_identity()
        book = Book.query.get(book_id)

        # Validar existencia del libro
        if not book:
            return jsonify({"message": "Libro no encontrado"}), 404

        # Eliminar el libro
        db.session.delete(book)
        db.session.commit()
        
        return jsonify({
            "message": "Libro eliminado exitosamente",
            "deleted_book_id": book_id
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": f"Error en el servidor: {str(e)}"
        }), 500

#  --------------------------------------------- USER ---------------------------------------------------------------------
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    try:
        # Get the user's identity from the JWT
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify(user.serialize()), 200

    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    try:
        # Solo accesible para administradores
        users = User.query.all()
        return jsonify([user.serialize() for user in users]), 200
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@api.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404
            
        if user.id != current_user_id:
            return jsonify({"message": "No autorizado"}), 403

        data = request.get_json()
        if 'email' in data:
            user.email = data['email'].lower()
        if 'password' in data:
            user.password = generate_password_hash(data['password'])
        
        db.session.commit()
        return jsonify(user.serialize()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500

#  --------------------------------------------- REVIEWS ---------------------------------------------------------------------
@api.route('/books/<int:book_id>/reviews', methods=['GET'])
def get_book_reviews(book_id):
    try:
        reviews = Review.query.filter_by(book_id=book_id).all()
        return jsonify([review.serialize() for review in reviews]), 200
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@api.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    try:
        data = request.get_json()
        required_fields = ['book_id', 'review_text']
        
        if not all(field in data for field in required_fields):
            return jsonify({"message": "Faltan campos requeridos"}), 400
            
        book = Book.query.get(data['book_id'])
        if not book:
            return jsonify({"message": "Libro no encontrado"}), 404

        new_review = Review(
            user_id=get_jwt_identity(),
            book_id=data['book_id'],
            review_text=data['review_text']
        )
        
        db.session.add(new_review)
        db.session.commit()
        
        return jsonify(new_review.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500

@api.route('/reviews/<int:review_id>', methods=['PUT'])
@jwt_required()
def update_review(review_id):
    try:
        review = Review.query.get(review_id)
        current_user_id = get_jwt_identity()
        
        if not review:
            return jsonify({"message": "Reseña no encontrada"}), 404
            
        if review.user_id != current_user_id:
            return jsonify({"message": "No autorizado"}), 403

        data = request.get_json()
        if 'review_text' in data:
            review.review_text = data['review_text']
        
        db.session.commit()
        return jsonify(review.serialize()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500

@api.route('/reviews/<int:review_id>', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    try:
        review = Review.query.get(review_id)
        current_user_id = get_jwt_identity()
        
        if not review:
            return jsonify({"message": "Reseña no encontrada"}), 404
            
        if review.user_id != current_user_id:
            return jsonify({"message": "No autorizado"}), 403

        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Reseña eliminada"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500

#  --------------------------------------------- FAVORITES ---------------------------------------------------------------------
@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    try:
        data = request.get_json()
        book_id = data.get('book_id')
        
        if not book_id:
            return jsonify({"message": "book_id es requerido"}), 400
            
        book = Book.query.get(book_id)
        if not book:
            return jsonify({"message": "Libro no encontrado"}), 404

        # Verificar si ya existe el favorito
        existing_fav = Favorite.query.filter_by(
            user_id=get_jwt_identity(),
            book_id=book_id
        ).first()
        
        if existing_fav:
            return jsonify({"message": "El libro ya está en favoritos"}), 400

        new_favorite = Favorite(
            user_id=get_jwt_identity(),
            book_id=book_id
        )
        
        db.session.add(new_favorite)
        db.session.commit()
        
        return jsonify(new_favorite.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500