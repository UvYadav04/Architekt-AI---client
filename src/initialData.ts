import { type Node, type Edge } from "@xyflow/react";

const edgeStyle = (color: string) => ({
  stroke: color,
  strokeWidth: 2,
  filter: `drop-shadow(0 0 6px ${color})`,
});

const nodeStyle = (color: string) => ({
  background: "#0a0a0a",
  color: "#fff",
  border: `1px solid ${color}`,
  borderRadius: "12px",
  padding: "10px 14px",
  fontSize: "12px",
  boxShadow: `0 0 20px ${color}33`,
});

/**
 * 🧠 Layout logic:
 * - Center X = 250
 * - Left = 100
 * - Right = 400
 * - Vertical spacing ≈ 120px
 */

export const initialNodes: Node[] = [
  {
    id: "client",
    position: { x: 250, y: 60 },
    data: { label: "Client" },
    style: nodeStyle("#2563eb"),
  },
  {
    id: "lb",
    position: { x: 250, y: 180 },
    data: { label: "Load Balancer" },
    style: nodeStyle("#9333ea"),
  },
  {
    id: "api",
    position: { x: 250, y: 300 },
    data: { label: "API Server" },
    style: nodeStyle("#22c55e"),
  },

  // Branch layer (balanced)
  {
    id: "cache",
    position: { x: 100, y: 420 },
    data: { label: "Cache" },
    style: nodeStyle("#f59e0b"),
  },
  {
    id: "redis",
    position: { x: 400, y: 420 },
    data: { label: "Redis" },
    style: nodeStyle("#f97316"),
  },

  // Worker centered below API
  {
    id: "worker",
    position: { x: 250, y: 440 },
    data: { label: "Background Worker" },
    style: nodeStyle("#64748b"),
  },

  // Storage layer (aligned under branches)
  {
    id: "db",
    position: { x: 100, y: 580 },
    data: { label: "Database" },
    style: nodeStyle("#ef4444"),
  },
  {
    id: "s3",
    position: { x: 400, y: 580 },
    data: { label: "S3 Storage" },
    style: nodeStyle("#38bdf8"),
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "client",
    target: "lb",
    animated: true,
    style: edgeStyle("#2563eb"),
  },
  {
    id: "e2",
    source: "lb",
    target: "api",
    animated: true,
    style: edgeStyle("#9333ea"),
  },
  {
    id: "e3",
    source: "api",
    target: "cache",
    animated: true,
    style: edgeStyle("#f59e0b"),
    label: "cache",
    labelBgStyle: { fill: "#232323" },
  },
  {
    id: "e4",
    source: "api",
    target: "redis",
    animated: true,
    style: edgeStyle("#f97316"),
  },
  {
    id: "e5",
    source: "api",
    target: "worker",
    animated: true,
    style: edgeStyle("#64748b"),
    label: "queue",
    labelBgStyle: { fill: "#232323" },
  },
  {
    id: "e6",
    source: "worker",
    target: "db",
    animated: true,
    style: edgeStyle("#ef4444"),
  },
  {
    id: "e7",
    source: "api",
    target: "db",
    animated: true,
    style: edgeStyle("#ef4444"),
  },
  {
    id: "e8",
    source: "api",
    target: "s3",
    animated: true,
    style: edgeStyle("#38bdf8"),
    label: "assets",
    labelBgStyle: { fill: "#232323" },
  },
];