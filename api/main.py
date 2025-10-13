# if __name__ == "__main__":
#     main()
from fastapi import FastAPI, Depends, Query, HTTPException
from sqlmodel import Field, Session, create_engine, select, SQLModel

app = FastAPI()


class Post(SQLModel, table=True):
    pass


@app.get('/posts')
async def get_posts():
    return {"message": "All posts displayed here"}
