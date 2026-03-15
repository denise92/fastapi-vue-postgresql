#!/usr/bin/env bash

set -euo pipefail
set -x

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
ROOT_ENV_FILE="${APP_DIR}/../../.env"
PYTHON_VERSION_FILE="${APP_DIR}/../../.python-version"
INSTALL_SCRIPT="${APP_DIR}/scripts/install-poetry.sh"

cd "${APP_DIR}"

# Load root .env in "docker env_file" style (not shell "source" style).
# This keeps values like JSON arrays intact (e.g. BACKEND_CORS_ORIGINS=[...]).
if [ -f "${ROOT_ENV_FILE}" ]; then
  while IFS= read -r line || [ -n "${line}" ]; do
    line="${line%$'\r'}"
    if [[ -z "${line}" || "${line}" == \#* ]]; then
      continue
    fi
    if [[ "${line}" != *=* ]]; then
      continue
    fi

    key="${line%%=*}"
    value="${line#*=}"
    export "${key}=${value}"
  done < "${ROOT_ENV_FILE}"
fi

# Docker compose injects these; provide local defaults for direct FastAPI run.
export SERVER_NAME="${SERVER_NAME:-${DOMAIN:-localhost}}"
export SERVER_HOST="${SERVER_HOST:-http://${DOMAIN:-localhost}}"
export PYTHONPATH="${APP_DIR}:${PYTHONPATH:-}"

if ! command -v poetry >/dev/null 2>&1; then
  echo "Poetry not found. Run backend/app/scripts/install-poetry.sh first." >&2
  exit 1
fi

# Ensure correct Python runtime and required dependencies exist before prestart checks.
REQUIRED_PYTHON="$(tr -d '\r\n' < "${PYTHON_VERSION_FILE}")"
REQUIRED_PYTHON_MM="${REQUIRED_PYTHON%.*}"
if ! poetry run python -c "import sys; import tenacity; assert f'{sys.version_info[0]}.{sys.version_info[1]}' == '${REQUIRED_PYTHON_MM}'" >/dev/null 2>&1; then
  "${INSTALL_SCRIPT}"
fi

poetry run python app/backend_pre_start.py
poetry run alembic upgrade head

if [ "${RUN_INITIAL_DATA:-true}" = "true" ]; then
  poetry run python app/initial_data.py
fi

poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port "${PORT:-8000}" --ws none
