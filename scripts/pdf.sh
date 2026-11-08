#!/usr/bin/env bash
# Renders resume.pdf and resume.it.pdf from the page's own print stylesheet.
#
# Run it whenever resume.json or resume.it.json changes, and commit the PDFs with them:
# CI fails if a PDF is older than its JSON. CI can't see layout changes (style.css,
# STRINGS in main.js), so re-run it after those too.
#
# Usage: scripts/pdf.sh    (CHROME=/path/to/chrome to use another browser)
set -euo pipefail

cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME (set CHROME=...)" >&2; exit 1; }

PORT=$(python3 -c 'import socket; s = socket.socket(); s.bind(("127.0.0.1", 0)); print(s.getsockname()[1])')
PROFILE=$(mktemp -d)

python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null; wait "$SERVER" 2>/dev/null || true; rm -rf "$PROFILE"' EXIT

# Wait for the server to answer
for _ in $(seq 50); do
    curl -sf "http://127.0.0.1:$PORT/resume.json" >/dev/null && break
    sleep 0.1
done

render() {
    local lang=$1 out=$2
    # A fresh profile has no saved lang or mode; ?lang= picks the language, print CSS the human mode.
    # The time budget lets the JSON fetch and Google Fonts land before printing.
    "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
        --user-data-dir="$PROFILE/$lang" --virtual-time-budget=8000 \
        --print-to-pdf="$out" "http://127.0.0.1:$PORT/?lang=$lang" 2>/dev/null
    echo "$out: $(du -h "$out" | cut -f1 | tr -d ' ')"
}

render en resume.pdf
render it resume.it.pdf
