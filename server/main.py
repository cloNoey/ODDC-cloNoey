from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from server.api import api_router

# Import models to register them with SQLAlchemy
import server.features.user.models  # noqa: F401
import server.features.dancer.models  # noqa: F401
import server.features.studio.models  # noqa: F401
import server.features.dance_class.models  # noqa: F401

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # 필요하면 특정 도메인으로 제한 가능
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="")


@app.get("/")
def root():
    return {"message": "Server is running 🚀"}