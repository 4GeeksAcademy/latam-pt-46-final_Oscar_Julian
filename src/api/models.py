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
    user: Mapped[Optional[User]] = relationship(back_populates="books")
    reviews: Mapped[list["Review"]] = relationship(
        back_populates="book", cascade="all, delete-orphan")
    favorites: Mapped[list["Favorite"]] = relationship(
        back_populates="book", cascade="all, delete-orphan")


class Favorite(db.Model):
    __tablename__ = "favorites"
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    user_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"))
    book_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("books.id", ondelete="CASCADE"))
    user: Mapped[Optional[User]] = relationship(back_populates="favorites")
    book: Mapped[Optional[Book]] = relationship(back_populates="favorites")


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
    user: Mapped[Optional[User]] = relationship(back_populates="reviews")
    book: Mapped[Optional[Book]] = relationship(back_populates="reviews")
