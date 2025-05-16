import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, Author, Book, Category, Gender, Favorite, UserBook, UserReview

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Registrar todos los modelos
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Author, db.session))
    admin.add_view(ModelView(Book, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(Gender, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(ModelView(UserBook, db.session))
    admin.add_view(ModelView(UserReview, db.session))
