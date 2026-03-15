from fastapi import FastAPI
from fastapi.openapi.docs import get_redoc_html
from fastapi.responses import Response
from starlette.middleware.cors import CORSMiddleware

from app.api.api_v1.api import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    redoc_url=None,
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/redoc", include_in_schema=False)
def redoc_html():
    return get_redoc_html(
        openapi_url=app.openapi_url,
        title=f"{settings.PROJECT_NAME} - ReDoc",
        redoc_js_url="/redoc.standalone.js",
    )


@app.get("/redoc.standalone.js", include_in_schema=False)
def redoc_bundle():
    with open("app/static/redoc.standalone.js", "rb") as f:
        content = f.read()
    return Response(content=content, media_type="application/javascript")
