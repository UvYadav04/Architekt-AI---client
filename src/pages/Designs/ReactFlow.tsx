import React, { useCallback, useEffect, useState } from "react";
import {
  ReactFlow as RF,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  BackgroundVariant,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type Props = {
  initialNodes: Node[];
    initialEdges: Edge[];
    hero?: boolean;
designId?: string; 
  background?:"transparent" | "line" | "dotted"
};


function ReactFlow({ initialNodes, initialEdges, designId, hero }: Props) {
  const { fitView } = useReactFlow()
  
  useEffect(() => {
  let timeout;

  const handleResize = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 150);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, [fitView]);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges
  );

  // 🔗 Handle new connections
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
    );
    
    if (hero)
        return (
            <div
                className="w-full h-full max-w-[500px] ms-auto lg:py-10 md:py-8 py-0 cursor-default"
                style={{
                    overflow: "visible",
                    position: "relative",
                    zIndex: 50, 
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "visible",
                        pointerEvents: "none", 
                    }}
                >
                    <RF
                        nodes={nodes.map((n) => ({ ...n, draggable: false }))}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        fitViewOptions={{padding:0}}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        elementsSelectable={false}
                        preventScrolling={false}
                        zoomOnScroll={false}
                        zoomOnPinch={false}
                        zoomOnDoubleClick={false}
                        panOnDrag={false}
                        panOnScroll={false}
                        proOptions={{ hideAttribution: true }}
                        minZoom={1}
                        maxZoom={1}
                        style={{ overflow: "visible", zIndex: 100, position: "relative", pointerEvents: "auto" }}
                    >
                        <Background color="#ffffff10" gap={20} size={1} />
                    </RF>
                </div>
            </div>
               
    )


  return (
    <div className="w-full h-full bg-black">
      <RF
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-black"
        maxZoom={1}
      >
        {/* <Background className="bg-transparent"/> */}

        {/* <Controls className="!bg-gray-900 !border-gray-700" /> */}

        {/* <MiniMap
          nodeColor={() => "#555"}
          className="!bg-gray-900 !border-gray-700"
        /> */}
      </RF>
    </div>
  );
}

export default ReactFlow;