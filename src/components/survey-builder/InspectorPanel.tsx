import React, { useState } from "react";
import { Node, Edge } from "@xyflow/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Trash2,
  Settings,
  Edit3,
  Eye,
  EyeOff,
  Copy,
  Move,
  Palette,
  Zap,
  Link2,
  AlertCircle,
  CheckCircle,
  Info,
  Target,
  GitBranch,
  Plus,
  Square
} from "lucide-react";
import { SurveyQuestion, Condition, Clause, Operator } from "@/types/logic";
import ConditionEditor from "./ConditionEditor";

interface InspectorPanelProps {
  selectedNode: string | null;
  selectedEdge: string | null;
  nodes: Node[];
  edges: Edge[];
  questions: SurveyQuestion[];
  onNodeUpdate: (nodeId: string, updates: Record<string, unknown>) => void;
  onEdgeUpdate: (edgeId: string, updates: Record<string, unknown>) => void;
  onDelete: (type: "node" | "edge", id: string) => void;
}

const InspectorPanel: React.FC<InspectorPanelProps> = ({
  selectedNode,
  selectedEdge,
  nodes,
  edges,
  questions,
  onNodeUpdate,
  onEdgeUpdate,
  onDelete,
}) => {
  const [isConditionEditorOpen, setIsConditionEditorOpen] = useState(false);

  const selectedNodeData = selectedNode
    ? nodes.find((n) => n.id === selectedNode)
    : null;

  const selectedEdgeData = selectedEdge
    ? edges.find((e) => e.id === selectedEdge)
    : null;

  const renderNodeInspector = (node: Node) => {
    const nodeData = node.data as Record<string, unknown>;

    const getNodeTypeInfo = (type: string) => {
      switch (type) {
        case "start":
          return {
            icon: Target,
            color: "text-green-600",
            bgColor: "bg-green-50",
            badge: "Entry Point",
            description: "Starting point of your survey flow"
          };
        case "end":
          return {
            icon: CheckCircle,
            color: "text-red-600",
            bgColor: "bg-red-50",
            badge: "Exit Point",
            description: "Survey completion or exit"
          };
        case "question":
          return {
            icon: Settings,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            badge: "Survey Element",
            description: "Ask respondents questions"
          };
        case "action":
          return {
            icon: Zap,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            badge: "Automation",
            description: "Trigger automated actions"
          };
        case "shopify":
          return {
            icon: Link2,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            badge: "Integration",
            description: "Access Shopify customer data"
          };
        default:
          return {
            icon: Settings,
            color: "text-gray-600",
            bgColor: "bg-gray-50",
            badge: "Unknown",
            description: "Node configuration"
          };
      }
    };

    const typeInfo = getNodeTypeInfo(node.type || "");
    const TypeIcon = typeInfo.icon;

    return (
      <div className="space-y-4">
        {/* Header with Node Type Info */}
        <div className={`p-4 rounded-lg border ${typeInfo.bgColor}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TypeIcon className={`w-5 h-5 ${typeInfo.color}`} />
              <span className="font-semibold text-sm">
                {node.type?.charAt(0).toUpperCase() + node.type?.slice(1)} Node
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {typeInfo.badge}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {typeInfo.description}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              navigator.clipboard.writeText(node.id);
            }}
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy ID
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onNodeUpdate(node.id, {
              hidden: !nodeData.hidden
            })}
          >
            {nodeData.hidden ? (
              <>
                <Eye className="w-3 h-3 mr-1" />
                Show
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 mr-1" />
                Hide
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete("node", node.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        <Separator />

        {/* Properties Accordion */}
        <Accordion type="multiple" defaultValue={["basic", "position"]} className="w-full">
          {/* Basic Properties */}
          <AccordionItem value="basic">
            <AccordionTrigger className="text-sm font-medium">
              Basic Properties
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Node ID</Label>
                <Input
                  value={node.id}
                  disabled
                  className="text-xs font-mono bg-muted"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">Type</Label>
                <Input
                  value={node.type}
                  disabled
                  className="text-xs bg-muted"
                />
              </div>

              {node.type === "question" && (
                <div>
                  <Label className="text-xs font-medium">Question</Label>
                  <Select
                    value={nodeData.questionId as string}
                    onValueChange={(value) =>
                      onNodeUpdate(node.id, { questionId: value })
                    }
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Select a question..." />
                    </SelectTrigger>
                    <SelectContent>
                      {questions.map((q) => (
                        <SelectItem key={q.id} value={q.id}>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{q.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {q.type}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {node.type === "action" && (
                <>
                  <div>
                    <Label className="text-xs font-medium">Action Type</Label>
                    <Select
                      value={(nodeData.actionType as string) || "thank_you"}
                      onValueChange={(value) =>
                        onNodeUpdate(node.id, { actionType: value })
                      }
                    >
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thank_you">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3" />
                            Thank You Message
                          </div>
                        </SelectItem>
                        <SelectItem value="redirect">
                          <div className="flex items-center gap-2">
                            <Link2 className="w-3 h-3" />
                            Redirect to URL
                          </div>
                        </SelectItem>
                        <SelectItem value="show_coupon">
                          <div className="flex items-center gap-2">
                            <Target className="w-3 h-3" />
                            Show Coupon
                          </div>
                        </SelectItem>
                        <SelectItem value="disqualify">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-3 h-3" />
                            Disqualify Respondent
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {nodeData.actionType === "redirect" && (
                    <div>
                      <Label className="text-xs font-medium">Redirect URL</Label>
                      <Input
                        value={(nodeData.redirectUrl as string) || ""}
                        onChange={(e) =>
                          onNodeUpdate(node.id, { redirectUrl: e.target.value })
                        }
                        placeholder="https://example.com"
                        className="text-xs"
                      />
                    </div>
                  )}

                  {nodeData.actionType === "show_coupon" && (
                    <div>
                      <Label className="text-xs font-medium">Coupon Code</Label>
                      <Input
                        value={(nodeData.couponCode as string) || ""}
                        onChange={(e) =>
                          onNodeUpdate(node.id, { couponCode: e.target.value })
                        }
                        placeholder="SAVE20"
                        className="text-xs"
                      />
                    </div>
                  )}
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Position & Layout */}
          <AccordionItem value="position">
            <AccordionTrigger className="text-sm font-medium">
              Position & Layout
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">X Position</Label>
                  <Input
                    type="number"
                    value={Math.round(node.position.x)}
                    onChange={(e) =>
                      onNodeUpdate(node.id, {
                        position: {
                          ...node.position,
                          x: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Y Position</Label>
                  <Input
                    type="number"
                    value={Math.round(node.position.y)}
                    onChange={(e) =>
                      onNodeUpdate(node.id, {
                        position: {
                          ...node.position,
                          y: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Draggable</Label>
                <Switch
                  checked={nodeData.draggable !== false}
                  onCheckedChange={(checked) =>
                    onNodeUpdate(node.id, { draggable: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Selectable</Label>
                <Switch
                  checked={nodeData.selectable !== false}
                  onCheckedChange={(checked) =>
                    onNodeUpdate(node.id, { selectable: checked })
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Styling */}
          <AccordionItem value="styling">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Styling
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <div>
                <Label className="text-xs font-medium">Custom Label</Label>
                <Input
                  value={(nodeData.customLabel as string) || ""}
                  onChange={(e) =>
                    onNodeUpdate(node.id, { customLabel: e.target.value })
                  }
                  placeholder="Custom display label..."
                  className="text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Description</Label>
                <Textarea
                  value={(nodeData.description as string) || ""}
                  onChange={(e) =>
                    onNodeUpdate(node.id, { description: e.target.value })
                  }
                  placeholder="Optional description..."
                  className="text-xs min-h-[60px]"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  const renderEdgeInspector = (edge: Edge) => {
    const edgeData = edge.data as Record<string, unknown>;

    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);

    return (
      <div className="space-y-4">
        {/* Header with Edge Info */}
        <div className="p-4 rounded-lg border bg-indigo-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-sm">Connection</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Logic Flow
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Controls how survey flows between questions
          </p>
        </div>

        {/* Flow Visualization */}
        <div className="p-3 border rounded-lg bg-slate-50">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="font-medium truncate">
                {sourceNode?.type || edge.source}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-px bg-gray-400" />
              <div className="w-0 h-0 border-l-[4px] border-l-gray-400 border-y-[2px] border-y-transparent" />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-medium truncate">
                {targetNode?.type || edge.target}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => {
              navigator.clipboard.writeText(edge.id);
            }}
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy ID
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setIsConditionEditorOpen(true)}
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Condition
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete("edge", edge.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        <Separator />

        {/* Properties Accordion */}
        <Accordion type="multiple" defaultValue={["basic", "condition"]} className="w-full">
          {/* Basic Properties */}
          <AccordionItem value="basic">
            <AccordionTrigger className="text-sm font-medium">
              Basic Properties
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <div>
                <Label className="text-xs font-medium text-muted-foreground">Edge ID</Label>
                <Input
                  value={edge.id}
                  disabled
                  className="text-xs font-mono bg-muted"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">Source Node</Label>
                <Input
                  value={edge.source}
                  disabled
                  className="text-xs bg-muted"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-muted-foreground">Target Node</Label>
                <Input
                  value={edge.target}
                  disabled
                  className="text-xs bg-muted"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Display Label</Label>
                <Input
                  value={(edge.label as string) || ""}
                  onChange={(e) => onEdgeUpdate(edge.id, { label: e.target.value })}
                  placeholder="e.g., 'Yes', 'No', 'Rating > 7'..."
                  className="text-xs"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Label shown on the connection line
                </p>
              </div>

              <div>
                <Label className="text-xs font-medium">Priority</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={(edgeData.priority as number) || 0}
                    onChange={(e) =>
                      onEdgeUpdate(edge.id, { priority: parseInt(e.target.value) || 0 })
                    }
                    className="text-xs"
                    min="0"
                    max="100"
                  />
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Higher priority connections are evaluated first
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Condition Configuration */}
          <AccordionItem value="condition">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Conditional Logic
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {edgeData.condition ? (
                <div className="p-3 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Condition Active
                    </span>
                  </div>
                  <p className="text-xs text-green-700 mb-3">
                    This connection will only trigger when the specified condition is met.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-green-300 hover:bg-green-100"
                    onClick={() => setIsConditionEditorOpen(true)}
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit Condition
                  </Button>
                </div>
              ) : (
                <div className="p-3 border rounded-lg bg-orange-50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">
                      No Condition Set
                    </span>
                  </div>
                  <p className="text-xs text-orange-700 mb-3">
                    This connection will always trigger. Add a condition to control when it activates.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-orange-300 hover:bg-orange-100"
                    onClick={() => setIsConditionEditorOpen(true)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Condition
                  </Button>
                </div>
              )}

              {/* Condition Type Helper */}
              <div className="p-3 border rounded-lg bg-blue-50">
                <div className="text-xs font-medium text-blue-800 mb-2">
                  Condition Examples:
                </div>
                <div className="space-y-1 text-xs text-blue-700">
                  <div>• Answer equals "Yes"</div>
                  <div>• Rating greater than 7</div>
                  <div>• Customer lifetime value &gt; $1000</div>
                  <div>• Multiple choice contains "Other"</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Action Configuration */}
          <AccordionItem value="action">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Actions
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <div>
                <Label className="text-xs font-medium">Action Type</Label>
                <Select
                  value={(edgeData.action as any)?.type || "goto"}
                  onValueChange={(value) =>
                    onEdgeUpdate(edge.id, {
                      action: { ...edgeData.action as any, type: value }
                    })
                  }
                >
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="goto">
                      <div className="flex items-center gap-2">
                        <Target className="w-3 h-3" />
                        Go to Next Node
                      </div>
                    </SelectItem>
                    <SelectItem value="end">
                      <div className="flex items-center gap-2">
                        <Square className="w-3 h-3" />
                        End Survey
                      </div>
                    </SelectItem>
                    <SelectItem value="redirect">
                      <div className="flex items-center gap-2">
                        <Link2 className="w-3 h-3" />
                        Redirect to URL
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(edgeData.action as any)?.type === "redirect" && (
                <div>
                  <Label className="text-xs font-medium">Redirect URL</Label>
                  <Input
                    value={(edgeData.action as any)?.payload?.url || ""}
                    onChange={(e) =>
                      onEdgeUpdate(edge.id, {
                        action: {
                          ...edgeData.action as any,
                          payload: { url: e.target.value }
                        }
                      })
                    }
                    placeholder="https://example.com"
                    className="text-xs"
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  return (
    <Card className="h-full border-0 rounded-none bg-gradient-to-b from-slate-50/50 to-white">
      <CardHeader className="pb-3 bg-gradient-to-r from-slate-50 to-gray-50 border-b">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
          <div className="p-1.5 bg-slate-100 rounded-lg">
            {selectedNode ? (
              <Settings className="w-4 h-4 text-slate-600" />
            ) : selectedEdge ? (
              <GitBranch className="w-4 h-4 text-slate-600" />
            ) : (
              <Target className="w-4 h-4 text-slate-600" />
            )}
          </div>
          {selectedNode || selectedEdge ? "Properties" : "Select Element"}
        </CardTitle>
        {(selectedNode || selectedEdge) && (
          <p className="text-xs text-slate-600 mt-1">
            {selectedNode ? "Configure node settings and behavior" : "Configure connection logic and conditions"}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-4 px-0">
        <div className="px-4">
          {selectedNodeData && renderNodeInspector(selectedNodeData)}
          {selectedEdgeData && renderEdgeInspector(selectedEdgeData)}
          {!selectedNode && !selectedEdge && (
            <div className="text-center py-12">
              <div className="p-4 mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">
                No Element Selected
              </h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-[200px] mx-auto leading-relaxed">
                Click on a node or connection to view and edit its properties
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-1 h-1 bg-blue-400 rounded-full" />
                  <span>Nodes control survey behavior</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-1 h-1 bg-indigo-400 rounded-full" />
                  <span>Connections define flow logic</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Condition Editor Modal */}
      {isConditionEditorOpen && selectedEdgeData && (
        <ConditionEditor
          isOpen={isConditionEditorOpen}
          onClose={() => setIsConditionEditorOpen(false)}
          condition={selectedEdgeData.data?.condition as Condition}
          questions={questions}
          onSave={(condition: Condition, label: string) => {
            onEdgeUpdate(selectedEdge!, { condition, label });
            setIsConditionEditorOpen(false);
          }}
        />
      )}
    </Card>
  );
};

export default InspectorPanel;
