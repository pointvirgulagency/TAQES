#!/bin/sh
set -e

UPLOAD_PATH="/app/public/uploads"
PERSISTENT_UPLOAD_PATH="/opt/app/public/uploads"

mkdir -p "$PERSISTENT_UPLOAD_PATH"

if [ -L "$UPLOAD_PATH" ]; then
    TARGET="$(readlink "$UPLOAD_PATH")"

    if [ "$TARGET" = "$PERSISTENT_UPLOAD_PATH" ]; then
        exit 0
    fi

    rm -f "$UPLOAD_PATH"
elif [ -d "$UPLOAD_PATH" ]; then
    cp -an "$UPLOAD_PATH"/. "$PERSISTENT_UPLOAD_PATH"/ || true
    rm -rf "$UPLOAD_PATH"
elif [ -e "$UPLOAD_PATH" ]; then
    rm -f "$UPLOAD_PATH"
fi

ln -s "$PERSISTENT_UPLOAD_PATH" "$UPLOAD_PATH"