from flask import Blueprint, jsonify, request, make_response
from app.services.auth_service import (
    validate_user_data,
    create_user_record,
    validate_user_login,
)

auth_bp = Blueprint("user", __name__, url_prefix="/auth")


@auth_bp.route("/signup", methods=["POST"])
def create_user():
    data = request.get_json(silent=True) or request.form.to_dict()
    print("📦 Signup data:", data)

    error = validate_user_data(data)
    if error:
        return make_response(jsonify(error[0]), error[1])

    new_user = create_user_record(data)
    return make_response(
        jsonify({"message": "User created successfully.", "user": new_user.to_dict()}),
        201,
    )


@auth_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json(silent=True) or request.form.to_dict()
    print("📦 Login data:", data)

    error, user = validate_user_login(data)
    if error:
        return make_response(jsonify(error), error.get("status", 400))

    return make_response(
        jsonify(
            {
                "message": "Login successful.",
            }
        ),
        200,
    )
