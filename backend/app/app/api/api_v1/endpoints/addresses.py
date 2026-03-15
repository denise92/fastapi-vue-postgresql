from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.ShippingAddress])
def read_my_addresses(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    取得當前會員的出貨地址列表
    """
    return crud.shipping_address.get_multi_by_user(
        db, user_id=current_user.id, skip=skip, limit=limit
    )


@router.post("/", response_model=schemas.ShippingAddress)
def create_address(
    *,
    db: Session = Depends(deps.get_db),
    address_in: schemas.ShippingAddressCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    新增出貨地址
    """
    return crud.shipping_address.create_with_user(
        db, obj_in=address_in, user_id=current_user.id
    )


@router.get("/{address_id}", response_model=schemas.ShippingAddress)
def read_address(
    address_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    取得單一地址（僅限本人）
    """
    address = crud.shipping_address.get_by_user(
        db, id=address_id, user_id=current_user.id
    )
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return address


@router.put("/{address_id}", response_model=schemas.ShippingAddress)
def update_address(
    address_id: int,
    *,
    db: Session = Depends(deps.get_db),
    address_in: schemas.ShippingAddressUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    更新出貨地址
    """
    address = crud.shipping_address.get_by_user(
        db, id=address_id, user_id=current_user.id
    )
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return crud.shipping_address.update(db, db_obj=address, obj_in=address_in)


@router.delete("/{address_id}", response_model=schemas.ShippingAddress)
def delete_address(
    address_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    刪除出貨地址
    """
    address = crud.shipping_address.get_by_user(
        db, id=address_id, user_id=current_user.id
    )
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return crud.shipping_address.remove(db, id=address_id)
