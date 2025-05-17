from datetime import datetime  # Change the import
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from api.utils import generate_sitemap, APIException
from api.models import db, User, Book
from flask import Flask, request, jsonify, url_for, Blueprint

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

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


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    try:
        # Access the identity of the current user with get_jwt_identity
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify({
            "message": f"Hello, {user.email}! This is a protected route.",
            "user_id": current_user_id
        }), 200

    except Exception as e:
        return jsonify({"message": f"Server error: {str(e)}"}), 500

# @api.route('/books', methods=['POST'])
# @jwt_required()
# def create_book():
    try:
        data = request.get_json()
        required_fields = ['title', 'author_id', 'created_date']

        if not all(field in data for field in required_fields):
            return jsonify({"message": f"Missing fields. Required: {required_fields}"}), 400

        # Verifica que el autor exista
        author = Author.query.get(data['author_id'])
        if not author:
            return jsonify({"message": "Author not found"}), 404

        # Crea el libro
        new_book = Book(
            title=data['title'],
            author_id=data['author_id'],
            created_date=data['created_date'],
            isbn=data.get('isbn'),
            summary=data.get('summary'),
            cover_image_type=data.get('cover_image_type', 'image/jpeg')
        )

        # Agrega categorías si vienen en la petición
        category_ids = data.get('category_ids', [])
        if category_ids:
            categories = Category.query.filter(Category.id.in_(category_ids)).all()
            if not categories or len(categories) != len(category_ids):
                return jsonify({"message": "Some categories not found"}), 404
            new_book.categories = categories

        db.session.add(new_book)
        db.session.commit()

        return jsonify(new_book.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Server error: {str(e)}"}), 500