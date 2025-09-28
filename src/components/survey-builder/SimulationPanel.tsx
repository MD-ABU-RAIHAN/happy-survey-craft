import React, { useState } from "react";
import { Node, Edge } from "@xyflow/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, Square, SkipForward, X } from "lucide-react";
import { SurveyQuestion, RespondentContext } from "@/types/logic";

interface SimulationPanelProps {
  nodes: Node[];
  edges: Edge[];
  questions: SurveyQuestion[];
  onClose: () => void;
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({
  nodes,
  edges,
  questions,
  onClose,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [visitedPath, setVisitedPath] = useState<string[]>([]);
  const [respondentContext, setRespondentContext] = useState<RespondentContext>(
    {
      answers: {},
      customer: {
        ltv: 250,
        orderCount: 3,
        tags: ["returning-customer"],
      },
      session: {
        device: "desktop",
        channel: "organic",
      },
    }
  );

  const startSimulation = () => {
    setIsRunning(true);
    setCurrentNode("start");
    setVisitedPath(["start"]);
    setRespondentContext((prev) => ({ ...prev, answers: {} }));
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setCurrentNode(null);
    setVisitedPath([]);
  };

  const moveToNextNode = () => {
    if (!currentNode) return;

    const outgoingEdges = edges.filter((e) => e.source === currentNode);

    if (outgoingEdges.length === 0) {
      // No outgoing edges, end simulation
      setIsRunning(false);
      return;
    }

    // For simulation, take the first edge (in real implementation, this would evaluate conditions)
    const nextEdge = outgoingEdges[0];
    const nextNodeId = nextEdge.target;

    setCurrentNode(nextNodeId);
    setVisitedPath((prev) => [...prev, nextNodeId]);
  };

  const getCurrentNodeData = () => {
    if (!currentNode) return null;
    return nodes.find((n) => n.id === currentNode);
  };

  const renderCurrentNode = () => {
    const node = getCurrentNodeData();
    if (!node) return null;

    if (node.type === "question") {
      const question = questions.find((q) => q.id === node.data?.questionId);
      if (!question) return null;

      return (
        <div className="space-y-3">
          <h4 className="font-medium">{question.title}</h4>

          {question.type === "single-choice" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setRespondentContext((prev) => ({
                      ...prev,
                      answers: { ...prev.answers, [question.id]: option },
                    }));
                    moveToNextNode();
                  }}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {question.type === "rating" && (
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="outline"
                  size="sm"
                  className="w-10 h-10"
                  onClick={() => {
                    setRespondentContext((prev) => ({
                      ...prev,
                      answers: { ...prev.answers, [question.id]: rating },
                    }));
                    moveToNextNode();
                  }}
                >
                  {rating}
                </Button>
              ))}
            </div>
          )}

          {(question.type === "text" || question.type === "short-answer") && (
            <div className="space-y-2">
              <Input
                placeholder="Enter your answer..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value;
                    setRespondentContext((prev) => ({
                      ...prev,
                      answers: { ...prev.answers, [question.id]: value },
                    }));
                    moveToNextNode();
                  }
                }}
              />
              <div className="text-xs text-muted-foreground">
                Press Enter to continue
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button size="sm" onClick={moveToNextNode} disabled={!isRunning}>
              <SkipForward className="w-4 h-4 mr-2" />
              Skip
            </Button>
          </div>
        </div>
      );
    }

    if (node.type === "action") {
      return (
        <div className="space-y-3">
          <h4 className="font-medium">
            Action: {String(node.data?.actionType || "Unknown")}
          </h4>
          <p className="text-sm text-muted-foreground">
            This would perform the specified action
          </p>
          <Button size="sm" onClick={moveToNextNode}>
            Continue
          </Button>
        </div>
      );
    }

    if (node.type === "end") {
      return (
        <div className="space-y-3 text-center">
          <Square className="w-8 h-8 mx-auto text-red-500" />
          <h4 className="font-medium">Survey Complete</h4>
          <p className="text-sm text-muted-foreground">The survey has ended</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <h4 className="font-medium">{node.type} Node</h4>
        <Button size="sm" onClick={moveToNextNode}>
          Continue
        </Button>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 z-50">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Play className="w-4 h-4" />
              Simulation
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {!isRunning ? (
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Test your survey logic with a simulated respondent
                </p>
              </div>

              {/* Mock Customer Settings */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Customer LTV</Label>
                <Input
                  type="number"
                  value={respondentContext.customer?.ltv || 0}
                  onChange={(e) =>
                    setRespondentContext((prev) => ({
                      ...prev,
                      customer: {
                        ...prev.customer,
                        ltv: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                  className="text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Device</Label>
                <Select
                  value={respondentContext.session?.device || "desktop"}
                  onValueChange={(value) =>
                    setRespondentContext((prev) => ({
                      ...prev,
                      session: { ...prev.session, device: value },
                    }))
                  }
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desktop">Desktop</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                onClick={startSimulation}
                disabled={!nodes.length}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Simulation
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Current Node */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Current Node</Label>
                  <Badge variant="outline" className="text-xs">
                    {currentNode}
                  </Badge>
                </div>

                <div className="border rounded-lg p-3 bg-muted/30">
                  {renderCurrentNode()}
                </div>
              </div>

              {/* Path */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Visited Path</Label>
                <div className="flex flex-wrap gap-1">
                  {visitedPath.map((nodeId, index) => (
                    <Badge
                      key={index}
                      variant={nodeId === currentNode ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {nodeId}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopSimulation}
                  className="flex-1"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </div>
            </div>
          )}

          {/* Answers Preview */}
          {Object.keys(respondentContext.answers).length > 0 && (
            <div className="space-y-2 border-t pt-3">
              <Label className="text-xs font-medium">Answers</Label>
              <div className="space-y-1">
                {Object.entries(respondentContext.answers).map(
                  ([questionId, answer]) => (
                    <div key={questionId} className="text-xs">
                      <span className="font-medium">{questionId}:</span>{" "}
                      {String(answer)}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationPanel;
