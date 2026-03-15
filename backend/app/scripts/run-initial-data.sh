#!/usr/bin/env bash
# 建立初始資料（含 FIRST_SUPERUSER）
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
ROOT_ENV_FILE="${APP_DIR}/../../.env"

cd "${APP_DIR}"

# Load .env
if [ -f "${ROOT_ENV_FILE}" ]; then
  while IFS= read -r line || [ -n "${line}" ]; do
    line="${line%$'\r'}"
    [[ -z "${line}" || "${line}" == \#* || "${line}" != *=* ]] && continue
    key="${line%%=*}"
    value="${line#*=}"
    export "${key}=${value}"
  done < "${ROOT_ENV_FILE}"
fi

export PYTHONPATH="${APP_DIR}:${PYTHONPATH:-}"
poetry run python app/initial_data.py
