---
title: The local API
description: A loopback-only server, a per-launch token, and one event stream.
order: 2
---

The web UI and the backend are one app on one machine, and the API is built to make sure that stays true. There is no remote server, no CORS, and no way to reach the API from another device by design.

## Loopback only, token always

Kestrel binds to `127.0.0.1` exclusively: an ephemeral port in production, a fixed one (`47210`) in dev. Every API request except the health check must carry a bearer token minted fresh at each launch; a Host-header guard additionally rejects DNS-rebinding tricks. The result is that even other software on the same machine cannot casually talk to your Mnemo.

How the SPA gets the token differs by mode, and the SPA code never has to care:

- **Production:** the Host serves the built SPA itself and templates the token into `index.html` as it goes out.
- **Dev:** the Host writes `{ port, token }` to `mnemo-web/.dev/api.json`, and the Vite proxy injects the Authorization header on every proxied request.

## The event stream

Server-to-client push is one SSE channel, `GET /api/events`. The Host publishes typed events (toasts, shutdown, and more as the port grows) and the SPA maps each type to state in a single dispatch switch. Chat streaming is separate: each assistant turn streams its own SSE response with deltas, tool calls, and status events.

## Shutdown is a handshake

Closing the window does not kill the process mid-save. The first close request is held, a shutdown event goes out over the stream, and the SPA gets a short grace period to flush pending saves and reply that it is ready. Pressing close a second time overrides the wait.

## Adding an endpoint

Endpoints live with their feature under `Mnemo.Host` (for example `Mnemo.Host/Flashcards`), as minimal-API endpoints mapped feature by feature over services resolved from DI. The pattern to copy is any existing feature folder: contracts in, service call, DTO out, nothing clever in the route handler itself.
