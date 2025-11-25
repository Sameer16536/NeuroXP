"""initial schema

Revision ID: 068b26907eeb
Revises:
Create Date: 2025-11-25 23:10:18.502970
"""

from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "068b26907eeb"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Create initial tables"""

    # ---- USERS TABLE ----
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True, nullable=False),
        sa.Column("email", sa.String, nullable=False),
        sa.Column("password", sa.String, nullable=False),
        sa.Column("username", sa.String, nullable=False),
        sa.Column("level", sa.Integer, default=1),
        sa.Column("current_xp", sa.Integer, default=0),
        sa.Column("xp_to_next_level", sa.Integer, default=100),
        sa.Column("streak_days", sa.Integer, default=0),
        sa.Column("created_at", sa.DateTime, nullable=True),
    )

    op.create_index("ix_users_id", "users", ["id"])
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_users_username", "users", ["username"], unique=True)

    # ---- HABITS TABLE ----
    op.create_table(
        "habits",
        sa.Column("id", sa.Integer, primary_key=True, nullable=False),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("title", sa.String, nullable=False),
        sa.Column("description", sa.String),
        sa.Column("xp_reward", sa.Integer),
        sa.Column("priority", postgresql.ENUM("LOW", "MEDIUM", "HIGH", name="priorityenum")),
        sa.Column("frequency", postgresql.ENUM("DAILY", "WEEKLY", name="frequencyenum")),
        sa.Column("is_completed_today", sa.Boolean),
        sa.Column("created_at", sa.DateTime),
    )

    op.create_index("ix_habits_id", "habits", ["id"])


def downgrade() -> None:
    """Drop tables if downgrading"""

    op.drop_index("ix_habits_id", table_name="habits")
    op.drop_table("habits")

    op.drop_index("ix_users_username", table_name="users")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_index("ix_users_id", table_name="users")
    op.drop_table("users")
