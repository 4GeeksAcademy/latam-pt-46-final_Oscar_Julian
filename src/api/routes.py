"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    is_active = request.json.get('is_active')
    # Validar si el usuario ya existe
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Usuario ya existe"}), 400
    # Crear nuevo usuario
    new_user = User(email=email, password=password, is_active=is_active)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado"}), 201

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Credenciales inválidas"}), 401
    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 200

@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@api.route('/private')
@jwt_required()
def private():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    return jsonify(logged_in_as=user.email), 200
