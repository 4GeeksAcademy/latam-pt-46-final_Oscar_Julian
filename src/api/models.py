from datetime import datetime, date
from typing import Optional
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import BigInteger, Text, Boolean, Date, ForeignKey, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship

db = SQLAlchemy()


class ApiBook(db.Model):
    __tablename__ = "api_books"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    cover_image: Mapped[Optional[str]] = mapped_column(Text)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    author: Mapped[str] = mapped_column(Text, nullable=False)
    genre: Mapped[Optional[str]] = mapped_column(Text)
    category: Mapped[Optional[str]] = mapped_column(Text)

    def serialize(self):
        return {
            "id": self.id,
            "cover_image": self.cover_image,
            "title": self.title,
            "author": self.author,
            "genre": self.genre,
            "category": self.category
        }


class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    email: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(Text, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    books: Mapped[list["Book"]] = relationship(
        back_populates="user", cascade="all, delete-orphan")
    favorites: Mapped[list["Favorite"]] = relationship(
        back_populates="user", cascade="all, delete-orphan")
    reviews: Mapped[list["Review"]] = relationship(
        back_populates="user", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "books": [book.id for book in self.books],
            "favorites": [fav.id for fav in self.favorites],
            "reviews": [review.id for review in self.reviews]
        }


class Book(db.Model):
    __tablename__ = "books"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    cover_image: Mapped[Optional[str]] = mapped_column(Text)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    author: Mapped[str] = mapped_column(Text, nullable=False)
    genre: Mapped[Optional[str]] = mapped_column(Text)
    category: Mapped[Optional[str]] = mapped_column(Text)
    created_date: Mapped[date] = mapped_column(Date, nullable=False)
    
    user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"))
    user: Mapped[Optional["User"]] = relationship(back_populates="books")
    reviews: Mapped[list["Review"]] = relationship(
        back_populates="book", cascade="all, delete-orphan")
    favorites: Mapped[list["Favorite"]] = relationship(
        back_populates="book", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "cover_image": self.cover_image,
            "title": self.title,
            "author": self.author,
            "genre": self.genre,
            "category": self.category,
            "created_date": self.created_date.isoformat(),
            "user_id": self.user_id,
            "favorites": [fav.id for fav in self.favorites],
            "reviews": [review.id for review in self.reviews]
        }


class Favorite(db.Model):
    __tablename__ = "favorites"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"))
    book_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("books.id", ondelete="CASCADE"))
    
    user: Mapped[Optional["User"]] = relationship(back_populates="favorites")
    book: Mapped[Optional["Book"]] = relationship(back_populates="favorites")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id
        }


class Review(db.Model):
    __tablename__ = "reviews"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"))
    book_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("books.id", ondelete="CASCADE"))
    review_text: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), default=datetime.utcnow)
    user: Mapped[Optional["User"]] = relationship(back_populates="reviews")
    book: Mapped[Optional["Book"]] = relationship(back_populates="reviews")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "review_text": self.review_text,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
    