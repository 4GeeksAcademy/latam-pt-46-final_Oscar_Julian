from datetime import datetime
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from api.utils import generate_sitemap, APIException
from api.models import db, User, ExploreBook, PersonalBook, Favorite, Review
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

#  --------------------------------------------- EXPLORE BOOKS ---------------------------------------------------------------------


@api.route('/explore-books', methods=['GET'])
def get_all_explore_books():
    try:
        # Get all explore books from database
        books = ExploreBook.query.all()

        # Serialize the results
        serialized_books = [book.serialize() for book in books]

        return jsonify({
            "success": True,
            "count": len(serialized_books),
            "data": serialized_books
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error retrieving explore books: {str(e)}"
        }), 500


@api.route('/explore-books/<int:book_id>', methods=['GET'])
def get_single_explore_book(book_id):
    try:
        book = ExploreBook.query.get(book_id)
        if not book:
            return jsonify({"message": "Explore book not found"}), 404

        return jsonify(book.serialize()), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500


@api.route('/explore-books', methods=['POST'])
@jwt_required()
def create_explore_book():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No data provided"}), 400

        required_fields = ['title', 'author_name']
        if not all(field in data for field in required_fields):
            return jsonify({"message": f"Missing required fields: {required_fields}"}), 400

        current_user_id = get_jwt_identity()

        # Create new explore book
        new_book = ExploreBook(
            title=data['title'],
            author_name=data['author_name'],
            genre=data.get('genre'),
            category=data.get('category'),
            summary=data.get('summary'),
            cover_image=data.get('cover_image'),
            created_by=current_user_id
        )

        db.session.add(new_book)
        db.session.commit()

        return jsonify({"message": "Explore book created successfully", "book": new_book.serialize()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Server error: {str(e)}"}), 500

#  --------------------------------------------- PERSONAL BOOKS ---------------------------------------------------------------------


@api.route('/personal-books', methods=['GET'])
@jwt_required()
def get_all_personal_books():
    try:
        # Obtener el ID del usuario actual
        current_user_id = get_jwt_identity()

        # Obtener solo los libros del usuario actual
        books = PersonalBook.query.filter_by(created_by=current_user_id).all()

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
            "message": f"Error retrieving personal books: {str(e)}"
        }), 500


@api.route('/personal-books/<int:book_id>', methods=['GET'])
def get_single_personal_book(book_id):
    try:
        book = PersonalBook.query.get(book_id)
        if not book:
            return jsonify({"message": "Personal book not found"}), 404

        return jsonify(book.serialize()), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500


@api.route('/personal-books', methods=['POST'])
@jwt_required()
def create_personal_book():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"message": "No data provided"}), 400

        required_fields = ['title', 'author_name']
        if not all(field in data for field in required_fields):
            return jsonify({"message": f"Missing required fields: {required_fields}"}), 400

        current_user_id = get_jwt_identity()

        # Create new personal book
        new_book = PersonalBook(
            title=data['title'],
            author_name=data['author_name'],
            genre=data.get('genre'),
            category=data.get('category'),
            summary=data.get('summary'),
            cover_image=data.get('cover_image'),
            created_by=current_user_id
        )

        db.session.add(new_book)
        db.session.commit()

        return jsonify({"message": "Personal book created successfully", "book": new_book.serialize()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Server error: {str(e)}"}), 500


@api.route('/personal-books/<int:book_id>', methods=['PUT'])
@jwt_required()
def update_personal_book(book_id):
    try:
        current_user_id = get_jwt_identity()
        book = PersonalBook.query.get(book_id)

        # Validate book exists
        if not book:
            return jsonify({"message": "Personal book not found"}), 404

        # Check if user is the owner of the book
        if str(book.created_by) != current_user_id:
            return jsonify({"message": "Unauthorized - You can only update your own books"}), 403

        data = request.get_json()

        # Update allowed fields
        if 'title' in data:
            book.title = data['title']
        if 'author_name' in data:
            book.author_name = data['author_name']
        if 'genre' in data:
            book.genre = data['genre']
        if 'category' in data:
            book.category = data['category']
        if 'summary' in data:
            book.summary = data['summary']
        if 'cover_image' in data:
            book.cover_image = data['cover_image']

        db.session.commit()

        return jsonify({
            "message": "Personal book updated successfully",
            "book": book.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Server error: {str(e)}"}), 500


@api.route('/personal-books/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_personal_book(book_id):
    try:
        current_user_id = get_jwt_identity()
        book = PersonalBook.query.get(book_id)

        # Validate book exists
        if not book:
            return jsonify({"message": "Personal book not found"}), 404

        # Check if user is the owner of the book
        if str(book.created_by) != current_user_id:
            return jsonify({"message": "Unauthorized - You can only delete your own books"}), 403

        # Delete the book
        db.session.delete(book)
        db.session.commit()

        return jsonify({
            "message": "Personal book deleted successfully",
            "deleted_book_id": book_id
        }), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": f"Server error: {str(e)}"
        }), 500


#  --------------------------------------------- OTHER USERS BOOKS ---------------------------------------------------------------------
@api.route('/other-users-books', methods=['GET'])
@jwt_required()
def get_other_users_books():
    try:
        # Obtener el ID del usuario actual
        current_user_id = get_jwt_identity()

        # Obtener los libros de otros usuarios (no del usuario actual)
        books = PersonalBook.query.filter(
            PersonalBook.created_by != current_user_id).all()

        # Agrupar libros por usuario
        books_by_user = {}
        for book in books:
            if book.created_by not in books_by_user:
                # Obtener información del usuario
                user = User.query.get(book.created_by)
                user_email = user.email if user else "Usuario desconocido"
                books_by_user[book.created_by] = {
                    "user_id": book.created_by,
                    "user_email": user_email,
                    "books": []
                }

            books_by_user[book.created_by]["books"].append(book.serialize())

        # Convertir el diccionario a una lista para la respuesta
        result = list(books_by_user.values())

        return jsonify({
            "success": True,
            "count": len(books),
            "data": result
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error retrieving other users' books: {str(e)}"
        }), 500

#  --------------------------------------------- USER ---------------------------------------------------------------------


@api.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_single_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify(user.serialize()), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500


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
            return jsonify({"message": "User not found"}), 404

        if str(user.id) != current_user_id:
            return jsonify({"message": "Unauthorized"}), 403

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


@api.route('/reviews/<int:review_id>', methods=['GET'])
def get_single_review(review_id):
    try:
        review = Review.query.get(review_id)
        if not review:
            return jsonify({"message": "Review not found"}), 404

        return jsonify(review.serialize()), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500


@api.route('/personal-books/<int:book_id>/reviews', methods=['GET'])
def get_book_reviews(book_id):
    try:
        book = PersonalBook.query.get(book_id)
        if not book:
            return jsonify({"message": "Personal book not found"}), 404

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
            return jsonify({"message": "Missing required fields"}), 400

        book = PersonalBook.query.get(data['book_id'])
        if not book:
            return jsonify({"message": "Personal book not found"}), 404

        current_user_id = get_jwt_identity()

        # Check if this is the user's own book
        if str(book.created_by) == current_user_id:
            return jsonify({"message": "You cannot review your own book"}), 400

        # Check if the user already has a review for this book
        existing_review = Review.query.filter_by(
            user_id=current_user_id,
            book_id=data['book_id']
        ).first()

        if existing_review:
            return jsonify({"message": "You already have a review for this book"}), 400

        new_review = Review(
            user_id=current_user_id,
            book_id=data['book_id'],
            review_text=data['review_text'],
            rating=data.get('rating')
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
            return jsonify({"message": "Review not found"}), 404

        if str(review.user_id) != current_user_id:
            return jsonify({"message": "Unauthorized"}), 403

        data = request.get_json()
        if 'review_text' in data:
            review.review_text = data['review_text']
        if 'rating' in data:
            review.rating = data['rating']

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
            return jsonify({"message": "Review not found"}), 404

        if str(review.user_id) != current_user_id:
            return jsonify({"message": "Unauthorized"}), 403

        db.session.delete(review)
        db.session.commit()
        return jsonify({"message": "Review deleted"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500

#  --------------------------------------------- FAVORITES ---------------------------------------------------------------------


@api.route('/favorites/<int:favorite_id>', methods=['GET'])
@jwt_required()
def get_single_favorite(favorite_id):
    try:
        favorite = Favorite.query.get(favorite_id)
        if not favorite:
            return jsonify({"message": "Favorite not found"}), 404

        current_user_id = get_jwt_identity()
        if str(favorite.user_id) != current_user_id:
            return jsonify({"message": "Unauthorized"}), 403

        return jsonify(favorite.serialize()), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500


@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    try:
        current_user_id = get_jwt_identity()

        favorites = Favorite.query.filter_by(user_id=current_user_id).all()

        serialized_favorites = []
        for fav in favorites:
            favorite_data = fav.serialize()
            # Add book data based on type (explore or personal)
            if fav.explore_book_id:
                favorite_data['book'] = fav.explore_book.serialize(
                ) if fav.explore_book else None
                favorite_data['book_type'] = 'explore'
            elif fav.personal_book_id:
                favorite_data['book'] = fav.personal_book.serialize(
                ) if fav.personal_book else None
                favorite_data['book_type'] = 'personal'

            serialized_favorites.append(favorite_data)

        return jsonify({
            "success": True,
            "count": len(serialized_favorites),
            "favorites": serialized_favorites
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Error retrieving favorites: {str(e)}"
        }), 500


@api.route('/favorites/explore', methods=['POST'])
@jwt_required()
def add_explore_favorite():
    try:
        data = request.get_json()
        explore_book_id = data.get('explore_book_id')

        if not explore_book_id:
            return jsonify({"message": "explore_book_id is required"}), 400

        book = ExploreBook.query.get(explore_book_id)
        if not book:
            return jsonify({"message": "Explore book not found"}), 404

        current_user_id = get_jwt_identity()

        # Check if favorite already exists
        existing_fav = Favorite.query.filter_by(
            user_id=current_user_id,
            explore_book_id=explore_book_id
        ).first()

        if existing_fav:
            return jsonify({"message": "This book is already in your favorites"}), 400

        new_favorite = Favorite(
            user_id=current_user_id,
            explore_book_id=explore_book_id,
            personal_book_id=None
        )

        db.session.add(new_favorite)
        db.session.commit()

        return jsonify(new_favorite.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500


@api.route('/favorites/personal', methods=['POST'])
@jwt_required()
def add_personal_favorite():
    try:
        data = request.get_json()
        personal_book_id = data.get('personal_book_id')

        if not personal_book_id:
            return jsonify({"message": "personal_book_id is required"}), 400

        book = PersonalBook.query.get(personal_book_id)
        if not book:
            return jsonify({"message": "Personal book not found"}), 404

        current_user_id = get_jwt_identity()

        # Check if favorite already exists
        existing_fav = Favorite.query.filter_by(
            user_id=current_user_id,
            personal_book_id=personal_book_id
        ).first()

        if existing_fav:
            return jsonify({"message": "This book is already in your favorites"}), 400

        new_favorite = Favorite(
            user_id=current_user_id,
            explore_book_id=None,
            personal_book_id=personal_book_id
        )

        db.session.add(new_favorite)
        db.session.commit()

        return jsonify(new_favorite.serialize()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500


@api.route('/favorites/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(favorite_id):
    try:
        favorite = Favorite.query.get(favorite_id)
        current_user_id = get_jwt_identity()

        if not favorite:
            return jsonify({"message": "Favorite not found"}), 404

        if str(favorite.user_id) != current_user_id:
            return jsonify({"message": "Unauthorized"}), 403

        db.session.delete(favorite)
        db.session.commit()

        return jsonify({"message": "Favorite removed successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error: {str(e)}"}), 500
