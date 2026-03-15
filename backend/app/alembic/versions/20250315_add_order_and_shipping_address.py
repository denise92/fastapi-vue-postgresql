"""add order and shipping address

Revision ID: 20250315a
Revises: d4867f3a4c0a
Create Date: 2025-03-15

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "20250315a"
down_revision = "d4867f3a4c0a"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "order",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(), server_default="pending", nullable=True),
        sa.Column("total_amount", sa.Integer(), server_default=sa.text("0"), nullable=True),
        sa.Column("notes", sa.String(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["user.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_order_id"), "order", ["id"], unique=False)
    op.create_index(op.f("ix_order_user_id"), "order", ["user_id"], unique=False)
    op.create_index(op.f("ix_order_status"), "order", ["status"], unique=False)

    op.create_table(
        "shipping_address",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("recipient_name", sa.String(), nullable=False),
        sa.Column("phone", sa.String(), nullable=False),
        sa.Column("address_line1", sa.String(), nullable=False),
        sa.Column("address_line2", sa.String(), nullable=True),
        sa.Column("city", sa.String(), nullable=False),
        sa.Column("postal_code", sa.String(), nullable=True),
        sa.Column("is_default", sa.Boolean(), server_default=sa.false(), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["user.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_shipping_address_id"), "shipping_address", ["id"], unique=False)
    op.create_index(op.f("ix_shipping_address_user_id"), "shipping_address", ["user_id"], unique=False)


def downgrade():
    op.drop_index(op.f("ix_shipping_address_user_id"), table_name="shipping_address")
    op.drop_index(op.f("ix_shipping_address_id"), table_name="shipping_address")
    op.drop_table("shipping_address")
    op.drop_index(op.f("ix_order_status"), table_name="order")
    op.drop_index(op.f("ix_order_user_id"), table_name="order")
    op.drop_index(op.f("ix_order_id"), table_name="order")
    op.drop_table("order")
