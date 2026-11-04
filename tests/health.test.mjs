import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

test("GET /api/health returns a healthy JSON response repeatedly", { timeout: 45_000 }, async (t) => {
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const { port } = reservation.address();
  await new Promise((resolve, reject) => {
    reservation.close((error) => error ? reject(error) : resolve());
  });

  const server = spawn(process.execPath, [
    "node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port),
  ], {
    cwd: fileURLToPath(new URL("../", import.meta.url)),
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  server.stdout.on("data", (chunk) => { output += chunk; });
  server.stderr.on("data", (chunk) => { output += chunk; });
  const stopped = once(server, "exit");
  // Attach a rejection handler immediately in case spawning fails before cleanup.
  stopped.catch(() => {});

  t.after(async () => {
    if (server.exitCode !== null || server.signalCode !== null) return;
    server.kill("SIGTERM");
    const forceStop = setTimeout(() => server.kill("SIGKILL"), 5_000);
    try {
      await stopped;
    } finally {
      clearTimeout(forceStop);
    }
  });

  const url = `http://127.0.0.1:${port}/api/health`;
  const deadline = Date.now() + 30_000;
  while (true) {
    assert.equal(server.exitCode, null, `Server exited during startup:\n${output}`);
    assert.equal(server.signalCode, null, `Server stopped during startup:\n${output}`);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1_000) });
      await response.arrayBuffer();
      break;
    } catch (error) {
      assert.ok(Date.now() < deadline, `Server did not start: ${error}\n${output}`);
      await delay(100);
    }
  }

  for (let request = 0; request < 2; request++) {
    const response = await fetch(url, { signal: AbortSignal.timeout(5_000) });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^application\/json\b/i);
    assert.deepEqual(await response.json(), { status: "ok" });
  }
});
