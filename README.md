# test_factory1

## Health endpoint

`GET /api/health` returns HTTP 200 with an `application/json` response:

```json
{"status":"ok"}
```

This checks that the application can serve requests. It does not depend on external
services or environment variables.

Install dependencies with `npm ci`, then start the local app with `npm run dev` and
check the endpoint:

```sh
curl -i http://localhost:3000/api/health
```

Run the type check and production HTTP integration test:

```sh
npm run typecheck
npm test
```

`npm test` builds the application, starts a production server on an available local
port, checks the health endpoint twice, and stops the server afterward.
