# if __name__ == "__main__":
#     main()
from fastapi import FastAPI

app = FastAPI()


@app.get('/posts')
async def get_posts():
    return {"message": "All posts displayed here"}
