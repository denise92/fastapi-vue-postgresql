from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class OrderBase(BaseModel):
    status: Optional[str] = "pending"
    total_amount: Optional[int] = 0
    notes: Optional[str] = None


class OrderCreate(OrderBase):
    pass


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


class OrderInDBBase(OrderBase):
    id: int
    user_id: int
    status: str
    total_amount: int
    notes: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class Order(OrderInDBBase):
    pass
