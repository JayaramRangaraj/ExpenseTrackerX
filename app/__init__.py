import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from app.routes import auth_routes
from app.extension import db, jwt ,migrate

load_dotenv()

app = Flask(__name__)
app.config.from_object("app.config")

db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)
CORS(app, supports_credentials=True, origins=["http://localhost:8080"])

app.register_blueprint(auth_routes.auth_bp)
