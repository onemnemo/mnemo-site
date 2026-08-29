---
title: The local API
description: A loopback-only server, a per-launch token, and one event stream.
order: 2
---

The web UI and the backend are one app on one machine: no remote server, no CORS, and no way to reach the API from another device.

## Loopback only, token always

Kestrel binds to `127.0.0.1` exclusively: an ephemeral port in production, a fixed one (`47210`) in dev. Every API request except the health check must carry a bearer token minted fresh at each launch; a Host-header guard additionally rejects DNS-rebinding tricks.

How the SPA gets the token differs by mode:

- **Production:** the Host serves the built SPA itself and templates the token into `index.html` as it goes out.
- **Dev:** the Host writes `{ port, token }` to `mnemo-web/.dev/api.json`, and the Vite proxy injects the Authorization header on every proxied request.

## The content security policy

`SpaHosting.LoadTemplatedIndex` (`Mnemo.Host/Web/SpaHosting.cs`) mints one nonce per launch, not per response. The policy sent with each response:

```text
default-src 'self'
script-src 'self' 'nonce-<value>'
style-src 'self' 'unsafe-inline'
img-src 'self' data: blob:
font-src 'self' data:
media-src 'self' blob:
worker-src 'self'
connect-src 'self'
object-src 'none'
base-uri 'self'
form-action 'none'
frame-ancestors 'none'
```

A script without the current nonce is refused, which stops chat-rendered model output from executing. `connect-src 'self'` blocks fetch and XHR to any origin but the Host's own. Styles keep `unsafe-inline`, since editor components inject styles at runtime.

## A second loopback server, for MCP

Mnemo carries a second HTTP server for the Model Context Protocol, so clients such as Claude Desktop could call Mnemo's tools directly. It does not run in a packaged build. It lives in `Mnemo.UI/Mcp/MnemoMcpServer.cs`, is registered and started only by the Avalonia shell, and `HostComposition.cs` leaves it deliberately unbound with a note that the move into the Host is scheduled rather than done. The publish deletes the shell's executable, so nothing launches it.

Run the Avalonia shell yourself and it does start, on `127.0.0.1:48200`, since `MnemoMcpOptions.Enabled` defaults to `true`. A Host-header guard blocks any host but `localhost` or `127.0.0.1`. Its token is separate from the main API's per-launch token and unset today: `MnemoMcpOptions.BearerToken` is only checked when non-empty, so a same-machine client reaches a tool with no token. The in-app assistant never touches this server, dispatching tools in-process instead.

## The event stream

Server-to-client push is one SSE channel, `GET /api/events`. The Host publishes typed events (toasts, shutdown) into a bounded per-subscriber channel that drops its oldest entries rather than blocking the publisher, and never replays to a client that connects later, so nothing may treat the stream as a source of truth. On the SPA, an event whose payload alone decides the effect gets a case in one dispatch switch; an event whose meaning depends on what a page currently has open gets no case and reaches that page through a subscriber instead. Chat streaming is separate: each assistant turn streams its own SSE response with deltas, tool calls, and status events.

## Shutdown is a handshake

Closing the window does not kill the process mid-save: the first close request is held, a shutdown event goes out over the stream, and the SPA gets a short grace period to flush pending saves and reply that it is ready. Pressing close a second time overrides the wait.

## Adding an endpoint

Endpoints are minimal-API handlers mapped feature by feature over services resolved from DI, living with their feature (for example `Mnemo.Host/Flashcards`). Copy any existing feature folder: contracts in, service call, DTO out, nothing clever in the route handler.
