from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, create_refresh_token
from app.schemas.user import UserCreateSchema, UserSchema
from app.extension import pwd_context, db
from app.models import User
from marshmallow import ValidationError, EXCLUDE

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# ---------------- SIGNUP ----------------
@auth_bp.route("/signup", methods=["POST"])
def signup():
    if not request.is_json:
        return jsonify({"msg": "Request must be JSON"}), 400

    data = request.get_json()
    schema = UserCreateSchema(unknown=EXCLUDE)  # Ignore extra fields

    try:
        user = schema.load(data)
    except ValidationError as err:
        return jsonify({"msg": "Validation failed", "errors": err.messages}), 400

    # Check duplicate email again (just in case)
    if User.query.filter_by(email=user.email).first():
        return jsonify({"msg": f"Email {user.email} is already registered."}), 400

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "msg": "User created successfully!",
        "user": UserSchema().dump(user)
    }), 201


# ---------------- LOGIN ----------------
@auth_bp.route("/login", methods=["POST"])
def login_user():
    if not request.is_json:
        return jsonify({"msg": "Request must be JSON"}), 400

    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not pwd_context.verify(password, user.password):
        return jsonify({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        "msg": "Login successful!",
        "access_token": access_token,
        "refresh_token": refresh_token,
    }), 200


# ---------------- GLOBAL MARSHMALLOW ERROR HANDLER ----------------
@auth_bp.errorhandler(ValidationError)
def handle_marshmallow_error(err):
    return jsonify({"msg": "Invalid input", "errors": err.messages}), 400
