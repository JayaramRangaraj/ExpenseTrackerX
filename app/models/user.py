from datetime import datetime, timezone
from sqlalchemy.ext.hybrid import hybrid_property

from app.extension import db,pwd_context

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password = db.Column("password", db.String(255),nullable=False)

    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    last_login = db.Column(db.DateTime)

    @hybrid_property 
    def password(self) -> str: # type: ignore
        return self._password
    
    @password.setter 
    def password(self, value:str) -> None:
        self._password = pwd_context.hash(value)


