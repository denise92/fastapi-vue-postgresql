from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Order])
def read_my_orders(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    取得當前會員的訂單列表
    """
    return crud.order.get_multi_by_user(
        db, user_id=current_user.id, skip=skip, limit=limit
    )


@router.get("/{order_id}", response_model=schemas.Order)
def read_order(
    order_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    取得單一訂單（僅限本人）
    """
    order = crud.order.get_by_user(db, id=order_id, user_id=current_user.id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
