#!/bin/sh
set -eu

cd "$(dirname "$0")/.."
runtime="${CONTAINER_RUNTIME:-podman}"
version=$(node -p 'require("./package-lock.json").packages["node_modules/@playwright/test"].version')
staging=$(mktemp -d)
container=""

cleanup() {
  if [ -n "$container" ]; then
    "$runtime" rm -f "$container" >/dev/null
  fi
  rm -rf "$staging"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

# Copy only application and test inputs; never send local credentials or .env files.
cp -R app public tests "$staging/"
cp package.json package-lock.json tsconfig.json next.config.mjs playwright.config.ts "$staging/"
container=$("$runtime" create --workdir /work --env CI=1 \
  "mcr.microsoft.com/playwright:v${version}-noble" \
  sh -c 'npm ci && npm run typecheck && npm run build && npm run test:health && npm run test:e2e -- --workers=2 "$@"' sh "$@")
"$runtime" cp "$staging/." "$container:/work"

status=0
"$runtime" start --attach "$container" || status=$?
rm -rf test-results
mkdir -p test-results
"$runtime" cp "$container:/work/test-results/." test-results/ 2>/dev/null || true
exit "$status"
