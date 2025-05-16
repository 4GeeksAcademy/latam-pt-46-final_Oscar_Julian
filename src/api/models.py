from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, String, Integer, Text, Date, BigInteger, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional

db = SQLAlchemy()

# Tabla intermedia: relación muchos a muchos entre libros y categorías
book_categories = db.Table(
    'book_categories',
    db.Column('book_id', BigInteger, ForeignKey('books.id'), primary_key=True),
    db.Column('category_id', BigInteger, ForeignKey('categories.id'), primary_key=True)
)

class Author(db.Model):
    __tablename__ = 'authors'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    birth_year: Mapped[Optional[int]] = mapped_column(Integer)
    death_year: Mapped[Optional[int]] = mapped_column(Integer)

    books: Mapped[List["Book"]] = relationship("Book", back_populates="author")

class Book(db.Model):
    __tablename__ = 'books'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    author_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('authors.id'))
    created_date: Mapped[Date] = mapped_column(Date, nullable=False)
    isbn: Mapped[Optional[str]] = mapped_column(String(255), unique=True)
    summary: Mapped[Optional[str]] = mapped_column(Text)
    cover_image_type: Mapped[Optional[str]] = mapped_column(String(50), default='image/jpeg')

    author: Mapped[Optional["Author"]] = relationship("Author", back_populates="books")
    categories: Mapped[List["Category"]] = relationship("Category", secondary=book_categories, back_populates="books")
    favorites: Mapped[List["Favorite"]] = relationship("Favorite", back_populates="book")
    user_books: Mapped[List["UserBook"]] = relationship("UserBook", back_populates="book")
    reviews: Mapped[List["UserReview"]] = relationship("UserReview", back_populates="book")

class Category(db.Model):
    __tablename__ = 'categories'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    books: Mapped[List["Book"]] = relationship("Book", secondary=book_categories, back_populates="categories")

class Gender(db.Model):
    __tablename__ = 'genders'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    users: Mapped[List["User"]] = relationship("User", back_populates="gender")

class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    username: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    first_name: Mapped[Optional[str]] = mapped_column(String(255))
    last_name: Mapped[Optional[str]] = mapped_column(String(255))
    gender_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('genders.id'))
    date_of_birth: Mapped[Optional[Date]] = mapped_column(Date)

    gender: Mapped[Optional["Gender"]] = relationship("Gender", back_populates="users")
    favorites: Mapped[List["Favorite"]] = relationship("Favorite", back_populates="user")
    user_books: Mapped[List["UserBook"]] = relationship("UserBook", back_populates="user")
    reviews_written: Mapped[List["UserReview"]] = relationship("UserReview", foreign_keys="[UserReview.reviewer_id]", back_populates="reviewer")
    reviews_received: Mapped[List["UserReview"]] = relationship("UserReview", foreign_keys="[UserReview.reviewee_id]", back_populates="reviewee")

class Favorite(db.Model):
    __tablename__ = 'favorites'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('users.id'))
    book_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('books.id'))
    added_at: Mapped[Optional[str]] = mapped_column(TIMESTAMP, server_default=db.func.current_timestamp())

    user: Mapped[Optional["User"]] = relationship("User", back_populates="favorites")
    book: Mapped[Optional["Book"]] = relationship("Book", back_populates="favorites")

class UserBook(db.Model):
    __tablename__ = 'user_books'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('users.id'))
    book_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('books.id'))
    status: Mapped[Optional[str]] = mapped_column(String(20))
    rating: Mapped[Optional[int]] = mapped_column(Integer)
    review: Mapped[Optional[str]] = mapped_column(Text)

    user: Mapped[Optional["User"]] = relationship("User", back_populates="user_books")
    book: Mapped[Optional["Book"]] = relationship("Book", back_populates="user_books")

class UserReview(db.Model):
    __tablename__ = 'user_reviews'
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    reviewer_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('users.id'))
    reviewee_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('users.id'))
    book_id: Mapped[Optional[int]] = mapped_column(BigInteger, ForeignKey('books.id'))
    review_text: Mapped[str] = mapped_column(Text, nullable=False)
    rating: Mapped[Optional[int]] = mapped_column(Integer)
    created_at: Mapped[Optional[str]] = mapped_column(TIMESTAMP, server_default=db.func.current_timestamp())

    reviewer: Mapped[Optional["User"]] = relationship("User", foreign_keys=[reviewer_id], back_populates="reviews_written")
    reviewee: Mapped[Optional["User"]] = relationship("User", foreign_keys=[reviewee_id], back_populates="reviews_received")
    book: Mapped[Optional["Book"]] = relationship("Book", back_populates="reviews")
