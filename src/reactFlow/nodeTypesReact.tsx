import { Handle, Position } from "@xyflow/react";

const base =
  "flex items-center justify-center text-white text-[11px] font-medium backdrop-blur-md transition-all duration-200";

/**
 * 🎯 Professional System Node
 */
export const SystemNode = ({ data }: any) => {
  const { label, shape = "rectangle", color = "#6366f1" } = data;

  const commonStyle = {
    border: `1px solid ${color}55`,
    boxShadow: `0 8px 30px ${color}22`,
    background: `linear-gradient(180deg, ${color}22, #0a0a0a)`,
  };

  const renderShape = () => {
    switch (shape) {
      case "circle":
        return (
          <div
            className={`${base} w-16 h-16 rounded-full`}
            style={commonStyle}
          >
            {label}
          </div>
        );

      case "diamond":
        return (
          <div
            className="w-20 h-20 rotate-45 flex items-center justify-center rounded-md"
            style={commonStyle}
          >
            <div className="-rotate-45 text-[11px] font-medium">
              {label}
            </div>
          </div>
        );

      case "database":
        return (
          <div className="flex flex-col items-center text-white text-[11px]">
            <div
              className="w-28 h-6 rounded-t-full border"
              style={commonStyle}
            />
            <div
              className="w-28 h-12 flex items-center justify-center border-x border-t"
              style={commonStyle}
            >
              {label}
            </div>
            <div
              className="w-28 h-6 rounded-b-full border-x border-b"
              style={commonStyle}
            />
          </div>
        );

      case "queue":
        return (
          <div
            className={`${base} w-28 h-12 rounded-lg border-dashed`}
            style={commonStyle}
          >
            {/* <span className="opacity-80">Queue</span> */}
            <span className="ml-1">{label}</span>
          </div>
        );

      case "cache":
        return (
          <div
            className={`${base} w-24 h-12 rounded-lg`}
            style={{
              ...commonStyle,
              background:
                "linear-gradient(180deg, rgba(245,158,11,0.25), #0a0a0a)",
              border: "1px solid rgba(245,158,11,0.4)",
            }}
          >
            ⚡ {label}
          </div>
        );

      case "storage":
        return (
          <div
            className={`${base} w-28 h-12 rounded-xl`}
            style={{
              ...commonStyle,
              background:
                "linear-gradient(180deg, rgba(14,165,233,0.25), #0a0a0a)",
              border: "1px solid rgba(14,165,233,0.4)",
            }}
          >
            🗄 {label}
          </div>
        );

      case "rounded":
        return (
          <div
            className={`${base} px-4 py-2 rounded-xl`}
            style={commonStyle}
          >
            {label}
          </div>
        );

      default:
        return (
          <div
            className={`${base} px-4 py-2 rounded-md`}
            style={commonStyle}
          >
            {label}
          </div>
        );
    }
  };

  return (
    <div className="relative group">
      {/* 🔌 Input */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !bg-gray-400 !border-none opacity-60 group-hover:opacity-100"
      />

      {renderShape()}

      {/* 🔌 Output */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !bg-gray-400 !border-none opacity-60 group-hover:opacity-100"
      />
    </div>
  );
};

/**
 * 🧩 Node Types Config
 */
export const nodeTypes = {
  system: SystemNode,
};