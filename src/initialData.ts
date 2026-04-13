import { type Node, type Edge } from "@xyflow/react";

const edgeStyle = (color: string) => ({
  stroke: color,
  strokeWidth: 2,
  filter: `drop-shadow(0 0 6px ${color})`,
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
    type: "system",
    position: { x: 250, y: 60 },
    data: { label: "Client", shape: "circle", color: "#2563eb" },
  },
  {
    id: "lb",
    type: "system",
    position: { x: 250, y: 180 },
    data: { label: "Load Balancer", shape: "diamond", color: "#9333ea" },
  },
  {
    id: "api",
    type: "system",
    position: { x: 250, y: 300 },
    data: { label: "API Server", shape: "rounded", color: "#22c55e" },
  },

  // Branch layer
  {
    id: "cache",
    type: "system",
    position: { x: 100, y: 420 },
    data: { label: "Cache", shape: "cache", color: "#f59e0b" },
  },
  {
    id: "redis",
    type: "system",
    position: { x: 400, y: 420 },
    data: { label: "Redis", shape: "cache", color: "#f97316" },
  },

  // Worker
  {
    id: "worker",
    type: "system",
    position: { x: 250, y: 440 },
    data: {
      label: "Background Worker",
      shape: "rectangle",
      color: "#64748b",
    },
  },

  // Storage layer
  {
    id: "db",
    type: "system",
    position: { x: 100, y: 580 },
    data: { label: "Database", shape: "database", color: "#ef4444" },
  },
  {
    id: "s3",
    type: "system",
    position: { x: 400, y: 580 },
    data: { label: "S3 Storage", shape: "storage", color: "#38bdf8" },
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
    labelBgStyle: { fill: "#232323" },
  },
];