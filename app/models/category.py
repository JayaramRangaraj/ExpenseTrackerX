from enum import unique

from app.extension import db,pwd_context
from datetime import datetime

class Category(db.Model):

    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

