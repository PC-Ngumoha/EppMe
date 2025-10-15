"""
main entry point.
"""
# from enum import Enum
from typing import Annotated
from datetime import datetime
from fastapi import FastAPI, Depends, Query, HTTPException, status
from sqlmodel import Field, Session, create_engine, select, SQLModel
from uuid import uuid4, UUID


# Base Model
class PostBase(SQLModel):
    type: str = Field(index=True)
    author_name: str = Field(index=True)
    message: str


# Create Model
class PostCreate(PostBase):
    pass


# main Model
class Post(PostBase, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    timestamp: datetime = Field(default_factory=datetime.now)


DB_URL = 'sqlite:///database.db'
config = {
    'check_same_thread': False
}
engine = create_engine(DB_URL, connect_args=config)


def create_database_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

# App setup
app = FastAPI()


# Create database tables on app startup
# FIXME: use migration script (e.g Alembic) for this in production environment
@app.on_event('startup')
def on_startup():
    create_database_and_tables()


@app.get('/posts/')
async def get_posts(session: SessionDep) -> list[Post]:
    """List all available posts"""
    posts = session.exec(select(Post)).all()
    return posts


@app.post('/posts/', status_code=status.HTTP_201_CREATED)
async def create_post(post: PostCreate, session: SessionDep) -> Post:
    """Create a new post"""
    db_post = Post(**post.model_dump())
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post
