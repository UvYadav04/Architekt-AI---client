import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMyDesigns } from "../../hooks/useMyDesigns";
import { Background, ReactFlow, ReactFlowProvider, useReactFlow ,BackgroundVariant} from "@xyflow/react";
import Logo from "./Logo";

export default function MyDesigns() {
  const { designs } = useMyDesigns();
  const navigate = useNavigate();
  // const { fitView } = useReactFlow()
  
// useEffect(() => {
//   let timeout;

//   const handleResize = () => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       fitView({ padding: 0.2 });
//     }, 150);
//   };

//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
// }, [fitView]);

  return (
    <div className="min-h-screen bg-black pt-15   text-white xl:px-10 lg:px-10 md:px-8 px-4 relative">
      {/* Glow Border */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full rounded-2xl border border-purple-500/20 shadow-[0_0_40px_#a855f755]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between  z-10">
        {/* Logo */}
      <Logo/>
      </div>

      {/* Create New Card */}
      <div className="relative z-10 mb-12">
        <div
          onClick={() => navigate("/new-design")}
          className=" w-40 sm:w-48 md:w-56 lg:w-64
                                    h-24 sm:h-28 md:h-32 lg:h-40  rounded-2xl border border-purple-500/30 flex items-center justify-center cursor-pointer group bg-gradient-to-r from-purple-500/10 to-transparent hover:from-purple-500/20 transition"
        >
          <Plus className="w-16 h-16 text-purple-400 group-hover:scale-110 transition" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6 relative z-10">
        My Designs
      </h2>

      {/* Designs Grid */}
      <div className="flex flex-wrap gap-6 relative z-10">
        {designs && designs.length > 0 ? (
          designs.map((design, idx) => (
            <div
              onClick={()=>navigate(`/design/${design._id}`)}
              key={design._id}
              className="
                                    md:p-2 p-0 relative 
                                    h-40 sm:h-48 md:h-56 lg:h-64
                                    w-40 sm:w-48 md:w-56 lg:w-64
                                    rounded-2xl 
                                    border border-purple-500/20 
                                    bg-gradient-to-b from-white/5 to-transparent 
                                    backdrop-blur-md 
                                    hover:border-purple-400/50 
                                    hover:shadow-[0_0_20px_#a855f755] 
                                    transition duration-300 
                                    cursor-pointer
                                    "
            >
               <div className="fixed h-full w-full inset-0 bg-[radial-gradient(circle,_#ffffff22_1px,_transparent_1px)] [background-size:20px_20px]" />
            <DesignPreview nodes={design.graph.nodes} edges={design.graph.edges} />
        
            </div>
          ))
        ) : (
          <div className="text-gray-500">No designs found</div>
        )}
      </div>
    </div>
  );
}


function FlowInner({ nodes, edges }) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    // run once after mount
    const timeout = setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 50);

    // resize handler
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        fitView({ padding: 0.2 });
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [fitView]);

  return (
    <ReactFlow
      nodes={structuredClone(nodes)}
      edges={structuredClone(edges)}
      minZoom={0.3}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      panOnDrag={false}
      panOnScroll={false}
      style={{ width: "100%", height: "100%" }}
      proOptions={{ hideAttribution: true }}
    />
  );
}

function DesignPreview({ nodes, edges }) {
  return (
    <ReactFlowProvider>
      <FlowInner nodes={nodes} edges={edges} />
    </ReactFlowProvider>
  );
}