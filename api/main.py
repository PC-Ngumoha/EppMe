# if __name__ == "__main__":
#     main()
"""
A post should have the following fields

- id
- type: "offer" or "need"
- message
- timestamp
- author_name

"""

# from enum import Enum
from typing import Annotated
from datetime import datetime
from fastapi import FastAPI, Depends, Query, HTTPException
from sqlmodel import Field, Session, create_engine, select, SQLModel


# DB setup & other config
class Post(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    type: str = Field(index=True)
    author_name: str = Field(index=True)
    message: str
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
# FIXME: use migration script for this in production environment
@app.on_event('startup')
def on_startup():
    create_database_and_tables()


@app.get('/posts/')
async def get_posts(session: SessionDep) -> list[Post]:
    """List all available posts"""
    posts = session.exec(select(Post)).all()
    return posts


@app.post('/posts/')
async def create_post(post: Post, session: SessionDep) -> Post:
    """Create a new post"""
    session.add(post)
    session.commit()
    session.refresh(post)
    return post
