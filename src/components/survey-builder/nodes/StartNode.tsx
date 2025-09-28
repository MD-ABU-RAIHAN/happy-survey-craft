import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Play } from "lucide-react";

const StartNode: React.FC<NodeProps> = ({ selected }) => {
  return (
    <div
      className={`
        bg-gradient-to-br from-green-50 to-emerald-50 border-2 rounded-xl p-4 min-w-[140px] shadow-lg
        ${selected ? "border-green-500 shadow-xl ring-2 ring-green-200" : "border-green-200"}
        hover:shadow-xl transition-all duration-200 cursor-pointer
      `}
    >
      {/* Node Content */}
      <div className="flex items-center gap-3 justify-center">
        <div className="p-1.5 bg-green-500 rounded-lg">
          <Play className="w-4 h-4 text-white fill-current" />
        </div>
        <span className="text-sm font-semibold text-green-800">Start Survey</span>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-green-500 !border-2 !border-white hover:!bg-green-600 transition-colors"
      />
    </div>
  );
};

export default StartNode;
