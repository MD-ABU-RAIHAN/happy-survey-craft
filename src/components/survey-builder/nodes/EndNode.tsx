import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Square } from "lucide-react";

const EndNode: React.FC<NodeProps> = ({ selected }) => {
  return (
    <div
      className={`
        bg-gradient-to-br from-red-50 to-rose-50 border-2 rounded-xl p-4 min-w-[140px] shadow-lg
        ${selected ? "border-red-500 shadow-xl ring-2 ring-red-200" : "border-red-200"}
        hover:shadow-xl transition-all duration-200 cursor-pointer
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-red-500 !border-2 !border-white hover:!bg-red-600 transition-colors"
      />

      {/* Node Content */}
      <div className="flex items-center gap-3 justify-center">
        <div className="p-1.5 bg-red-500 rounded-lg">
          <Square className="w-4 h-4 text-white fill-current" />
        </div>
        <span className="text-sm font-semibold text-red-800">End Survey</span>
      </div>
    </div>
  );
};

export default EndNode;
