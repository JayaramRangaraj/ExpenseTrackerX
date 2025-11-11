from flask import Blueprint, jsonify, request
from app.models.user import User
from app import db

auth_bp = Blueprint('user', __name__, url_prefix='/auth')

def validate_user_data(data):
    required_fields = ["name", "email", "password"]
    missing = [f for f in required_fields if f not in data or not data[f]]

    if missing:
        return {"error": f"Missing fields: {', '.join(missing)}"}, 400

    if User.query.filter_by(email=data["email"]).first():
        return {"error": "Email already registered."}, 400

    return None  


def create_user_record(data):
    """Create and return a new User instance."""
    user = User(
        name=data["name"],
        email=data["email"]
    )
    user.password = data["password"]  
    db.session.add(user)
    db.session.commit()
    return user


@auth_bp.route('/create', methods=['POST'])
def create_user():
    """Handle POST /user/create — create a new user safely."""

    data = request.get_json(silent=True) or request.form.to_dict()

    error = validate_user_data(data)
    if error:
        return jsonify(error[0]), error[1]

    new_user = create_user_record(data)

    return jsonify({
        "message": "User created successfully.",
        "user": new_user.to_dict()
    }), 201
