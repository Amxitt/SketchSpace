# SketchSpace – Real-Time Collaborative Drawing App

SketchSpace is a real-time collaborative whiteboard application where multiple users can join a room and draw together on a shared canvas.

The project is built using a Turborepo monorepo setup and includes separate HTTP and WebSocket backends for scalable architecture.

---

## 🚀 Features

- Real-time multi-user drawing using WebSockets
- Room-based collaboration
- Raw HTML Canvas implementation (no drawing libraries)
- HTTP backend for authentication and room management
- WebSocket backend for live drawing synchronization
- Modular monorepo architecture using Turborepo


### Drawing Logic

- The frontend uses a raw `<canvas>` element.
- Mouse events are tracked:
  - `mousedown` → start drawing
  - `mousemove` → track coordinates
  - `mouseup` → stop drawing
- Stroke data is emitted via WebSocket.
- All connected users in the same room receive drawing updates in real time.

---

## 🧠 Real-Time Synchronization Flow

1. User joins a room
2. WebSocket connection is established
3. Drawing events are serialized and emitted
4. Server broadcasts events to users in the same room
5. Canvas updates instantly on all connected clients

## 🛠 Tech Stack

Frontend:
- React / Next.js
- TypeScript
- Canvas API

Backend:
- Node.js
- Express (HTTP server)
- WebSocket server

Database:
- PostgreSQL / MongoDB (based on setup)

Tooling:
- Turborepo
- prisma
- pnpm

---

## 🏗 Architecture Overview

The project follows a modular monorepo structure:
apps/
├── frontend → Next.js/React frontend
├── http-backend → REST API server
├── ws-backend → WebSocket server

packages/
├── ui → Shared UI components
├── db → Database logic
├── common → Shared types/utilities
├── backend-common → Shared backend logic


## 🔧 Setup Instructions

### 1. Install dependencies

```bash
pnpm install

pnpm run dev

---

#Or run specific apps
```bash
pnpm --filter frontend dev
pnpm --filter http-backend dev
pnpm --filter ws-backend dev