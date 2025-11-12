from flask_security.core import UserMixin, RoleMixin
from enum import unique

from app.extension import db,pwd_context
from datetime import datetime

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)  # Unique identifier for each role
    name = db.Column(db.String(80), unique=True, nullable=False)  # Name of the role (e.g., admin, user)
    description = db.Column(db.String(255), nullable=False)  # Description of the role's permissions
