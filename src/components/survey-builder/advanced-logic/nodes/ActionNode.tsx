import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Zap, Gift, ExternalLink, UserX } from "lucide-react";

interface ActionNodeData {
  actionType?: "redirect" | "show_coupon" | "disqualify" | "thank_you";
  label?: string;
}

const ActionNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as ActionNodeData;

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "redirect":
        return <ExternalLink className="w-4 h-4" />;
      case "show_coupon":
        return <Gift className="w-4 h-4" />;
      case "disqualify":
        return <UserX className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case "redirect":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "show_coupon":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "disqualify":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-purple-50 border-purple-200 text-purple-800";
    }
  };

  const actionType = nodeData.actionType || "thank_you";
  const displayLabel = nodeData.label || actionType.replace("_", " ");

  return (
    <div
      className={`
        border-2 rounded-xl p-4 min-w-[180px] max-w-[240px] shadow-lg
        ${getActionColor(actionType)}
        ${selected ? "border-purple-500 shadow-xl ring-2 ring-purple-200" : ""}
        hover:shadow-xl transition-all duration-200 cursor-pointer
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-purple-500 !border-2 !border-white hover:!bg-purple-600 transition-colors"
      />

      {/* Node Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-100 rounded-lg">
            {getActionIcon(actionType)}
          </div>
          <span className="text-sm font-semibold text-purple-700">Action</span>
        </div>
        <div className="font-semibold text-sm text-slate-800 leading-tight">
          {displayLabel}
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-purple-500 !border-2 !border-white hover:!bg-purple-600 transition-colors"
      />
    </div>
  );
};

export default ActionNode;
