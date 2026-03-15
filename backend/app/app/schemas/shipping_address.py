from typing import Optional

from pydantic import BaseModel


class ShippingAddressBase(BaseModel):
    recipient_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    postal_code: Optional[str] = None
    is_default: bool = False


class ShippingAddressCreate(ShippingAddressBase):
    pass


class ShippingAddressUpdate(BaseModel):
    recipient_name: Optional[str] = None
    phone: Optional[str] = None
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    is_default: Optional[bool] = None


class ShippingAddressInDBBase(ShippingAddressBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class ShippingAddress(ShippingAddressInDBBase):
    pass
