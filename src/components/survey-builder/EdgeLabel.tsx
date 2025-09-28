import React from "react";
import {
  BaseEdge,
  EdgeProps,
  getStraightPath,
  EdgeLabelRenderer,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

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
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        className={selected ? "stroke-primary stroke-2" : "stroke-gray-400"}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {label && (
            <div className="bg-white border border-gray-200 rounded px-2 py-1 text-xs font-medium shadow-sm">
              {label}
            </div>
          )}
          {!label && (
            <Button
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0 bg-white border-gray-200 hover:bg-gray-50"
            >
              <Edit className="w-3 h-3" />
            </Button>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default EdgeLabel;
