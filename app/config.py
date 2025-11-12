import os

from dotenv import load_dotenv

load_dotenv()

FLASK_DEBUG =  os.environ.get("FLASK_DEBUG",True)
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
JWT_TOKEN_LOCATION = ["headers"]
JWT_IDENTITY_CLAIM = "user_id"  # default == sub