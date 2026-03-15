#!/usr/bin/env bash

set -euo pipefail
set -x

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
ROOT_DIR="$(cd "${APP_DIR}/../.." && pwd)"
PYTHON_VERSION_FILE="${ROOT_DIR}/.python-version"
cd "${APP_DIR}"

POETRY_HOME="${POETRY_HOME:-/opt/poetry}"
INSTALL_DEV="${INSTALL_DEV:-false}"
REQUIRED_PYTHON="$(tr -d '\r\n' < "${PYTHON_VERSION_FILE}")"
REQUIRED_PYTHON_MM="${REQUIRED_PYTHON%.*}"

if command -v pyenv >/dev/null 2>&1; then
  if ! pyenv prefix "${REQUIRED_PYTHON}" >/dev/null 2>&1; then
    echo "Python ${REQUIRED_PYTHON} is not installed in pyenv." >&2
    echo "Run: pyenv install ${REQUIRED_PYTHON}" >&2
    exit 1
  fi
  PYTHON_BIN="$(pyenv prefix "${REQUIRED_PYTHON}")/bin/python"
elif command -v "python${REQUIRED_PYTHON_MM}" >/dev/null 2>&1; then
  PYTHON_BIN="$(command -v "python${REQUIRED_PYTHON_MM}")"
else
  echo "Cannot find Python ${REQUIRED_PYTHON_MM}. Install it first." >&2
  exit 1
fi

if ! command -v poetry >/dev/null 2>&1; then
  curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME="${POETRY_HOME}" python3
  export PATH="${POETRY_HOME}/bin:${PATH}"
fi

poetry config virtualenvs.create true --local
poetry config virtualenvs.in-project true --local
poetry env use "${PYTHON_BIN}"

if [ "${INSTALL_DEV}" = "true" ]; then
  poetry install --no-root
else
  poetry install --no-root --only main
fi
