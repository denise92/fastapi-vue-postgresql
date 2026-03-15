#!/usr/bin/env bash


# 1: ./backend/dev.sh install：直接跑 backend/app/scripts/install-poetry.sh
# 2: ./backend/dev.sh start：直接跑 backend/app/scripts/start-fastapi-local.sh
# 3: ./backend/dev.sh all：先跑 backend/app/scripts/install-poetry.sh，再跑 backend/app/scripts/start-fastapi-local.sh
# 4: ./backend/dev.sh stop：停止本機 FastAPI (uvicorn)


set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${SCRIPT_DIR}/app"
INSTALL_SCRIPT="${APP_DIR}/scripts/install-poetry.sh"
START_SCRIPT="${APP_DIR}/scripts/start-fastapi-local.sh"

usage() {
  echo "Usage: ./backend/dev.sh [install|start|stop|all]"
}

cmd="${1:-all}"
case "${cmd}" in
  install)
    "${INSTALL_SCRIPT}"
    ;;
  start)
    "${START_SCRIPT}"
    ;;
  stop)
    pkill -f "uvicorn app.main:app" >/dev/null 2>&1 || true
    if lsof -tiTCP:8000 -sTCP:LISTEN >/dev/null 2>&1; then
      lsof -tiTCP:8000 -sTCP:LISTEN | xargs kill >/dev/null 2>&1 || true
    fi
    ;;
  all)
    "${INSTALL_SCRIPT}"
    "${START_SCRIPT}"
    ;;
  *)
    usage
    exit 1
    ;;
esac
