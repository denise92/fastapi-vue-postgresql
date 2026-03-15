from fastapi import APIRouter

from app.api.api_v1.endpoints import addresses, items, login, orders, users, utils

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(orders.router, prefix="/member/orders", tags=["member-orders"])
api_router.include_router(
    addresses.router, prefix="/member/addresses", tags=["member-addresses"]
)
