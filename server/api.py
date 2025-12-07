from fastapi import APIRouter

from server.features.dancer.views import dancer_router
from server.features.studio.views import studio_router
from server.features.dance_class.views import class_router

api_router = APIRouter()

api_router.include_router(dancer_router, prefix="/dancer", tags=["dancer"])
api_router.include_router(studio_router, prefix="/studio", tags=["studio"])
api_router.include_router(class_router, prefix="/class", tags=["class"])