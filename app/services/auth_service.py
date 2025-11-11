import re
from app.models.user import User
from app import db


def validate_user_data(data):
    required_fields = ["name", "email", "password"]
    missing = [i for i in required_fields if i not in data or not data[i]]

    if missing:
        return {"error": f"Missing fields : {', '.join(missing)}"}, 400

    email = data.get("email").strip()
    email_pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    if not re.match(email_pattern, email):
        return {"error": "Invalid email format."}, 400

    if User.query.filter_by(email=email).first():
        return {"error": "Email already registered."}, 400

    return None


def create_user_record(data):
    user = User(name=data["name"], email=data["email"])
    user.password = data["password"]

    db.session.add(user)
    db.session.commit()

    return user


def validate_user_login(data):
    required_fields = ["email", "password"]
    missing = [i for i in required_fields if i not in data or not data[i]]

    if missing:
        return {"error": f"Missing fields : {', '.join(missing)}"}, 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return {"error": "No user found with this email."}, 404

    if user.password != data["password"]:
        return {"error": "Incorrect password."}, 400

    # Success — return the user
    return None, user
