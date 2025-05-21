"""Initial bookshelf database structure

Revision ID: 001_initial_structure
Revises: 
Create Date: 2025-05-20 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a64751183750'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Create schema if we're using PostgreSQL
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    if conn.dialect.name == 'postgresql' and 'public' not in inspector.get_schema_names():
        op.execute('CREATE SCHEMA IF NOT EXISTS public')

    # Create users table
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('email', sa.Text(), nullable=False),
                    sa.Column('password', sa.Text(), nullable=False),
                    sa.Column('is_active', sa.Boolean(), nullable=True),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    schema='public'
                    )

    # Create explore_books table
    op.create_table('explore_books',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('cover_image', sa.Text(), nullable=True),
                    sa.Column('title', sa.Text(), nullable=False),
                    sa.Column('author_name', sa.Text(), nullable=False),
                    sa.Column('summary', sa.Text(), nullable=True),
                    sa.Column('genre', sa.Text(), nullable=True),
                    sa.Column('category', sa.Text(), nullable=True),
                    sa.Column('created_by', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['created_by'], ['public.users.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    schema='public'
                    )

    # Create personal_books table
    op.create_table('personal_books',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('cover_image', sa.Text(), nullable=True),
                    sa.Column('title', sa.Text(), nullable=False),
                    sa.Column('author_name', sa.Text(), nullable=False),
                    sa.Column('summary', sa.Text(), nullable=True),
                    sa.Column('genre', sa.Text(), nullable=True),
                    sa.Column('category', sa.Text(), nullable=True),
                    sa.Column('created_by', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['created_by'], ['public.users.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    schema='public'
                    )

    # Create favorites table
    op.create_table('favorites',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('explore_book_id', sa.Integer(), nullable=True),
                    sa.Column('personal_book_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['explore_book_id'], [
                        'public.explore_books.id'], ),
                    sa.ForeignKeyConstraint(['personal_book_id'], [
                        'public.personal_books.id'], ),
                    sa.ForeignKeyConstraint(
                        ['user_id'], ['public.users.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('user_id', 'explore_book_id'),
                    sa.UniqueConstraint('user_id', 'personal_book_id'),
                    schema='public'
                    )

    # Create reviews table
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('book_id', sa.Integer(), nullable=False),
                    sa.Column('review_text', sa.Text(), nullable=True),
                    sa.Column('rating', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['book_id'], ['public.personal_books.id'], ),
                    sa.ForeignKeyConstraint(
                        ['user_id'], ['public.users.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('user_id', 'book_id'),
                    schema='public'
                    )


def downgrade():
    op.drop_table('reviews', schema='public')
    op.drop_table('favorites', schema='public')
    op.drop_table('personal_books', schema='public')
    op.drop_table('explore_books', schema='public')
    op.drop_table('users', schema='public')
