import React from "react";
import {
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
  EdgeLabelRenderer,
  MarkerType,
} from "@xyflow/react";
import { Badge } from "@/components/ui/badge";

const EdgeLabel: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  data,
  selected,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 20,
  });

  const hasCondition = data?.condition && Object.keys(data.condition).length > 0;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        className={`transition-all duration-200 ${
          selected
            ? "stroke-blue-500 stroke-3 drop-shadow-sm"
            : hasCondition
            ? "stroke-green-500 stroke-2"
            : "stroke-slate-400 stroke-2"
        }`}
        markerEnd={
          selected
            ? "url(#arrow-closed-blue)"
            : hasCondition
            ? "url(#arrow-closed-green)"
            : "url(#arrow-closed-gray)"
        }
        style={{
          strokeDasharray: hasCondition ? "0" : "5,5",
          animation: selected ? "pulse 2s infinite" : "none",
        }}
      />
      {/* Only show label if there's a custom label for conditional logic */}
      {label && hasCondition && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <Badge
              variant="outline"
              className="bg-white text-xs font-normal px-2 py-1 shadow-sm border-green-200 text-green-700"
            >
              {label}
            </Badge>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default EdgeLabel;

// Add custom CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;
document.head.appendChild(style);
