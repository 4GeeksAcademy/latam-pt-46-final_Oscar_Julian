from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'schema': 'public'}
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    explore_books = db.relationship(
        "ExploreBook", back_populates="created_by_user")
    personal_books = db.relationship(
        "PersonalBook", back_populates="created_by_user")
    favorites = db.relationship("Favorite", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'is_active': self.is_active,
        }


class ExploreBook(db.Model):
    __tablename__ = 'explore_books'
    __table_args__ = {'schema': 'public'}
    id = db.Column(db.Integer, primary_key=True)
    cover_image = db.Column(db.Text)
    title = db.Column(db.Text, nullable=False)
    author_name = db.Column(db.Text, nullable=False)
    summary = db.Column(db.Text)
    genre = db.Column(db.Text)
    category = db.Column(db.Text)
    created_by = db.Column(db.Integer, db.ForeignKey(
        'public.users.id'), nullable=False)
    created_by_user = db.relationship("User", back_populates="explore_books")
    favorites = db.relationship("Favorite", back_populates="explore_book")

    def serialize(self):
        return {
            'id': self.id,
            'cover_image': self.cover_image,
            'title': self.title,
            'author_name': self.author_name,
            'summary': self.summary,
            'genre': self.genre,
            'category': self.category,
            'created_by': self.created_by,
        }


class PersonalBook(db.Model):
    __tablename__ = 'personal_books'
    __table_args__ = {'schema': 'public'}
    id = db.Column(db.Integer, primary_key=True)
    cover_image = db.Column(db.Text)
    title = db.Column(db.Text, nullable=False)
    author_name = db.Column(db.Text, nullable=False)
    summary = db.Column(db.Text)
    genre = db.Column(db.Text)
    category = db.Column(db.Text)
    created_by = db.Column(db.Integer, db.ForeignKey(
        'public.users.id'), nullable=False)
    created_by_user = db.relationship("User", back_populates="personal_books")
    favorites = db.relationship("Favorite", back_populates="personal_book")
    reviews = db.relationship("Review", back_populates="personal_book")

    def serialize(self):
        return {
            'id': self.id,
            'cover_image': self.cover_image,
            'title': self.title,
            'author_name': self.author_name,
            'summary': self.summary,
            'genre': self.genre,
            'category': self.category,
            'created_by': self.created_by,
        }


class Favorite(db.Model):
    __tablename__ = 'favorites'
    __table_args__ = (
        UniqueConstraint('user_id', 'explore_book_id'),
        # Añade este para la unicidad con libros personales
        UniqueConstraint('user_id', 'personal_book_id'),
        {'schema': 'public'}
    )
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'public.users.id'), nullable=False)
    explore_book_id = db.Column(db.Integer, db.ForeignKey(
        # Puede ser nulo si es un libro personal
        'public.explore_books.id'), nullable=True)
    personal_book_id = db.Column(db.Integer, db.ForeignKey(
        # Puede ser nulo si es un libro de exploración
        'public.personal_books.id'), nullable=True)

    user = db.relationship("User", back_populates="favorites")
    explore_book = db.relationship("ExploreBook", back_populates="favorites")
    personal_book = db.relationship("PersonalBook", back_populates="favorites")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'explore_book_id': self.explore_book_id,
            'personal_book_id': self.personal_book_id,
        }


class Review(db.Model):
    __tablename__ = 'reviews'
    __table_args__ = (
        UniqueConstraint('user_id', 'book_id'),
        {'schema': 'public'}
    )
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'public.users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(
        'public.personal_books.id'), nullable=False)
    review_text = db.Column(db.Text)
    rating = db.Column(db.Integer)
    user = db.relationship("User", back_populates="reviews")
    personal_book = db.relationship("PersonalBook", back_populates="reviews")

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'review_text': self.review_text,
            'rating': self.rating,
        }
