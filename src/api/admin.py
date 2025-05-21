import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, User, ExploreBook, PersonalBook, Favorite, Review

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    # Register all models
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(ExploreBook, db.session))
    admin.add_view(ModelView(PersonalBook, db.session))
    admin.add_view(ModelView(Favorite, db.session))
    admin.add_view(ModelView(Review, db.session))