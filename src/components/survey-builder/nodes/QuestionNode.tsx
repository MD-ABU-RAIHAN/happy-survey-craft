import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";

interface QuestionNodeData {
  questionId?: string;
  title?: string;
  type?: string;
  required?: boolean;
  edgeCount?: number;
  label?: string;
}

const QuestionNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as QuestionNodeData;

  const truncateTitle = (title: string, maxLength: number = 30) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "multiple-choice":
      case "single-choice":
        return "bg-blue-100 text-blue-800";
      case "rating":
      case "satisfaction":
      case "nps":
        return "bg-purple-100 text-purple-800";
      case "text":
      case "short-answer":
        return "bg-green-100 text-green-800";
      case "email":
      case "phone":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const displayTitle = nodeData.title || nodeData.label || "Untitled Question";
  const displayType = nodeData.type || "question";

  return (
    <div
      className={`
        bg-white border-2 rounded-xl p-4 min-w-[220px] max-w-[280px] shadow-lg
        ${selected ? "border-blue-500 shadow-xl ring-2 ring-blue-200" : "border-slate-200"}
        hover:shadow-xl transition-all duration-200 cursor-pointer
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-blue-500 !border-2 !border-white hover:!bg-blue-600 transition-colors"
      />

      {/* Node Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <MessageCircle className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-blue-700">Question</span>
          {nodeData.edgeCount && nodeData.edgeCount > 0 && (
            <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-50 text-blue-700">
              {nodeData.edgeCount} connections
            </Badge>
          )}
        </div>

        <div>
          <div className="font-semibold text-sm text-slate-800 leading-tight mb-2">
            {truncateTitle(displayTitle, 35)}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 font-medium ${getTypeColor(displayType)}`}
            >
              {displayType.replace("-", " ")}
            </Badge>
            {nodeData.required && (
              <Badge className="text-xs px-2 py-1 bg-red-100 text-red-700 border-red-200">
                Required
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-blue-500 !border-2 !border-white hover:!bg-blue-600 transition-colors"
      />
    </div>
  );
};

export default QuestionNode;
