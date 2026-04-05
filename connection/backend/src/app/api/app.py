from fastapi import FastAPI

from app.api.version import app_v1

fastapi_app = FastAPI()


app = FastAPI(
    docs_url=None,
    openapi_url=None,
    redoc_url=None,
    root_path="/api",
)

app.mount(app=app_v1, path="/v1")
