import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Connection,
  MarkerType,
  NodeTypes,
  EdgeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  X,
  Zap,
  AlertTriangle,
  CheckCircle,
  Maximize2,
  Minimize2,
  Layout,
  RotateCcw,
  Play,
} from "lucide-react";

// Type imports
import {
  SurveyLogic,
  LogicNode,
  LogicEdge,
  SurveyQuestion,
  ValidationResult,
  NodeType,
  ValidationError,
} from "@/types/logic";

// Component imports
import LogicToolbar from './LogicToolbar';
import NodePalette from "./NodePalette";
import InspectorPanel from "./InspectorPanel";
import SimulationPanel from "./SimulationPanel";

// Custom node components
import QuestionNode from "./nodes/QuestionNode";
import StartNode from "./nodes/StartNode";
import EndNode from "./nodes/EndNode";
import ActionNode from "./nodes/ActionNode";
import ShopifyNode from "./nodes/ShopifyNode";

// Custom edge components
import EdgeLabel from "./EdgeLabel";

interface LogicBuilderProps {
  questions: SurveyQuestion[];
  surveyId: string;
  logicId?: string;
  initialLogic?: SurveyLogic;
  existingLogic?: SurveyLogic;
  onSave?: (logic: SurveyLogic, logicName: string, logicDescription: string) => void;
  onCancel?: () => void;
  onBack?: () => void;
}

// Define custom node types
const nodeTypes: NodeTypes = {
  start: StartNode,
  end: EndNode,
  question: QuestionNode,
  action: ActionNode,
  shopify: ShopifyNode,
};

// Define custom edge types
const edgeTypes: EdgeTypes = {
  default: EdgeLabel,
};

const LogicBuilder: React.FC<LogicBuilderProps> = ({
  questions,
  surveyId,
  logicId,
  initialLogic,
  existingLogic,
  onSave,
  onCancel,
  onBack,
}) => {
  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // UI state
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationResult | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [logicName, setLogicName] = useState("");
  const [logicDescription, setLogicDescription] = useState("");

  // Initialize logic name and description
  useEffect(() => {
    if (initialLogic) {
      setLogicName(initialLogic.metadata?.name || "Unnamed Logic");
      setLogicDescription(initialLogic.metadata?.description || "");
    } else {
      setLogicName("New Logic Flow");
      setLogicDescription("Describe what this logic flow does...");
    }
  }, [initialLogic]);

  // Auto-generate nodes from questions if no initial logic
  useEffect(() => {
    if (!initialLogic && questions.length > 0) {
      const questionNodes: Node[] = questions.map((question, index) => ({
        id: question.id,
        type: "question",
        position: {
          x: 200 + (index % 3) * 300,
          y: 100 + Math.floor(index / 3) * 150,
        },
        data: {
          questionId: question.id,
          title: question.title,
          type: question.type,
          required: question.required,
        },
      }));

      // Add start and end nodes
      const startNode: Node = {
        id: "start",
        type: "start",
        position: { x: 50, y: 200 },
        data: { label: "Start" },
      };

      const endNode: Node = {
        id: "end",
        type: "end",
        position: { x: 800, y: 200 },
        data: { label: "End" },
      };

      setNodes([startNode, ...questionNodes, endNode]);
    }
  }, [questions, initialLogic, setNodes]);

  // Load initial logic
  useEffect(() => {
    if (initialLogic) {
      const reactFlowNodes: Node[] = initialLogic.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          ...node.meta,
          questionId: node.questionId,
        },
      }));

      const reactFlowEdges: Edge[] = initialLogic.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        data: {
          condition: edge.condition,
          action: edge.action,
          priority: edge.priority,
        },
      }));

      setNodes(reactFlowNodes);
      setEdges(reactFlowEdges);
    }
  }, [initialLogic, setNodes, setEdges]);

  // Handle new connections
  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return;

      const newEdge: Edge = {
        ...connection,
        id: `e_${connection.source}_${connection.target}_${Date.now()}`,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        data: {
          condition: null,
          action: { type: "goto", target: connection.target },
          priority: 0,
        },
      };

      setEdges((edges) => addEdge(newEdge, edges));
      setSelectedEdge(newEdge.id);
      setIsDirty(true);
    },
    [setEdges]
  );

  // Handle node selection
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setSelectedEdge(null);
  }, []);

  // Handle edge selection
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge.id);
    setSelectedNode(null);
  }, []);

  // Auto-layout function
  const autoLayout = useCallback(async () => {
    try {
      const dagre = await import("dagre");
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));
      dagreGraph.setGraph({ rankdir: "LR", nodesep: 100, ranksep: 150 });

      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 200, height: 80 });
      });

      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      const layoutedNodes = nodes.map((node) => {
        const dagreNode = dagreGraph.node(node.id);
        return {
          ...node,
          position: {
            x: dagreNode.x - 100,
            y: dagreNode.y - 40,
          },
        };
      });

      setNodes(layoutedNodes);
      setIsDirty(true);
    } catch (error) {
      console.error("Error during auto-layout:", error);
    }
  }, [nodes, edges, setNodes]);

  // Validate logic
  const validateLogic = useCallback(
    (logic: SurveyLogic): ValidationResult => {
      const errors: ValidationError[] = [];
      const warnings: ValidationError[] = [];

      // Check for orphan nodes
      const nodeIds = new Set(logic.nodes.map((n) => n.id));
      logic.edges.forEach((edge) => {
        if (!nodeIds.has(edge.source)) {
          errors.push({
            type: "error",
            message: `Edge references missing source node: ${edge.source}`,
            edgeId: edge.id,
          });
        }
        if (!nodeIds.has(edge.target)) {
          errors.push({
            type: "error",
            message: `Edge references missing target node: ${edge.target}`,
            edgeId: edge.id,
          });
        }
      });

      // Check for deleted questions
      const questionIds = new Set(questions.map((q) => q.id));
      logic.nodes.forEach((node) => {
        if (
          node.type === "question" &&
          node.questionId &&
          !questionIds.has(node.questionId)
        ) {
          warnings.push({
            type: "warning",
            message: `Node references deleted question: ${node.questionId}`,
            nodeId: node.id,
          });
        }
      });

      // Check for cycles (basic detection)
      const visited = new Set<string>();
      const recursionStack = new Set<string>();

      const hasCycle = (nodeId: string): boolean => {
        if (recursionStack.has(nodeId)) return true;
        if (visited.has(nodeId)) return false;

        visited.add(nodeId);
        recursionStack.add(nodeId);

        const outgoingEdges = logic.edges.filter((e) => e.source === nodeId);
        for (const edge of outgoingEdges) {
          if (hasCycle(edge.target)) return true;
        }

        recursionStack.delete(nodeId);
        return false;
      };

      if (hasCycle("start")) {
        errors.push({
          type: "error",
          message: "Logic contains infinite loops",
        });
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
      };
    },
    [questions]
  );

  // Save logic
  const handleSave = useCallback(async () => {
    const logicNodes: LogicNode[] = nodes.map((node) => ({
      id: node.id,
      type: node.type as NodeType,
      questionId: node.data?.questionId,
      position: node.position,
      meta: node.data,
    }));

    const logicEdges: LogicEdge[] = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      condition: edge.data?.condition,
      action: edge.data?.action,
      label: edge.label as string,
      priority: edge.data?.priority || 0,
    }));

    const surveyLogic: SurveyLogic = {
      surveyId,
      version: (initialLogic?.version || 0) + 1,
      nodes: logicNodes,
      edges: logicEdges,
      metadata: {
        name: logicName,
        description: logicDescription,
        lastEditedBy: "current-user",
        updatedAt: new Date().toISOString(),
        createdAt: initialLogic?.metadata?.createdAt || new Date().toISOString(),
      },
    };

    // Validate before saving
    const validation = validateLogic(surveyLogic);
    setValidationErrors(validation);

    if (validation.isValid) {
      if (onSave) {
        await onSave(surveyLogic, logicName, logicDescription);
      }
      setIsDirty(false);
      onBack?.();
    }
  }, [nodes, edges, surveyId, initialLogic, logicName, logicDescription, onSave, validateLogic, onBack]);

  // Reset to default
  const handleReset = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setSelectedEdge(null);
    setValidationErrors(null);
    setIsDirty(true);
  }, [setNodes, setEdges]);

  // Handle template loading
  const handleTemplateLoad = useCallback((templateId: string) => {
    console.log("Loading template:", templateId);
    setIsDirty(true);
  }, []);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (isDirty) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        onCancel?.() || onBack?.();
      }
    } else {
      onCancel?.() || onBack?.();
    }
  }, [isDirty, onCancel, onBack]);

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="flex-shrink-0 border-b bg-white">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Zap className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-800">Logic Builder</h1>
                <p className="text-xs text-slate-600">
                  {logicId ? "Edit logic flow" : "Create new flow"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="gap-1"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="gap-1"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isDirty || (validationErrors && !validationErrors.isValid)}
              className="gap-1 bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Save className="w-4 h-4" />
              Save & Exit
            </Button>
          </div>
        </div>

        {/* Logic Details */}
        <div className="px-6 py-3 bg-slate-50/50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logic-name" className="text-xs font-medium text-slate-600">
                Logic Name
              </Label>
              <Input
                id="logic-name"
                value={logicName}
                onChange={(e) => {
                  setLogicName(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Enter logic name..."
                className="mt-1 h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="logic-description" className="text-xs font-medium text-slate-600">
                Description
              </Label>
              <Input
                id="logic-description"
                value={logicDescription}
                onChange={(e) => {
                  setLogicDescription(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Describe what this logic does..."
                className="mt-1 h-8 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Compact Toolbar */}
        <div className="px-6 py-2 border-b bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={autoLayout}
                disabled={nodes.length === 0}
                className="gap-1 h-8"
              >
                <Layout className="w-3 h-3" />
                Auto Layout
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={nodes.length === 0}
                className="gap-1 h-8"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSimulationActive(true)}
                disabled={nodes.length === 0}
                className="gap-1 h-8"
              >
                <Play className="w-3 h-3" />
                Test
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>{nodes.length} Nodes</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span>{edges.length} Connections</span>
              </div>
              {validationErrors && !validationErrors.isValid && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{validationErrors.errors.length} Errors</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Node Palette - Fixed Width */}
        <div className="w-64 border-r bg-slate-50/50 flex-shrink-0 overflow-y-auto">
          <NodePalette
            onNodeAdd={(type, position) => {
              const newNode: Node = {
                id: `${type}_${Date.now()}`,
                type,
                position: { x: 250, y: 150 }, // Center position
                data: {
                  label: type.charAt(0).toUpperCase() + type.slice(1),
                  title: type === "question" && questions.length > 0 ? questions[0].title : undefined,
                  questionId: type === "question" && questions.length > 0 ? questions[0].id : undefined,
                  type: type === "question" && questions.length > 0 ? questions[0].type : undefined,
                  required: type === "question" && questions.length > 0 ? questions[0].required : false,
                  edgeCount: 0,
                },
              };
              setNodes((nodes) => [...nodes, newNode]);
              setIsDirty(true);
            }}
            onTemplateLoad={handleTemplateLoad}
          />
        </div>

        {/* ReactFlow Canvas - Full Height */}
        <div className="flex-1 relative">
          <div className="w-full h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={(changes) => {
                onNodesChange(changes);
                setIsDirty(true);
              }}
              onEdgesChange={(changes) => {
                onEdgesChange(changes);
                setIsDirty(true);
              }}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onEdgeClick={onEdgeClick}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              fitView={false}
              snapToGrid={true}
              snapGrid={[15, 15]}
              deleteKeyCode={["Backspace", "Delete"]}
              multiSelectionKeyCode={["Control", "Meta"]}
              panOnScroll={true}
              selectionOnDrag={true}
              panOnDrag={[1, 2]}
              selectNodesOnDrag={false}
              connectionLineStyle={{ stroke: '#3b82f6', strokeWidth: 2 }}
              connectionLineType="smoothstep"
            >
              <Background
                variant="dots"
                gap={20}
                size={1}
                color="#e2e8f0"
              />
              <Controls
                position="bottom-left"
                className="bg-white border border-slate-200 rounded-lg shadow-sm"
                showZoom={true}
                showFitView={true}
                showInteractive={false}
              />
              <MiniMap
                position="bottom-right"
                nodeStrokeColor="#e2e8f0"
                nodeColor="#f8fafc"
                nodeBorderRadius={4}
                maskColor="rgb(248, 250, 252, 0.8)"
                className="bg-white border border-slate-200 rounded-lg shadow-sm"
              />
            </ReactFlow>

            {/* Validation Errors Overlay */}
            {validationErrors && !validationErrors.isValid && (
              <div className="absolute top-4 left-4 right-4 z-10">
                <Card className="border-red-200 bg-red-50/95 backdrop-blur-sm shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-red-700 text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Validation Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {validationErrors.errors.map((error, index) => (
                        <div key={index} className="text-sm text-red-600">
                          • {error.message}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Empty State */}
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center p-8 max-w-md">
                  <div className="p-4 mx-auto w-16 h-16 bg-blue-100 rounded-2xl mb-4 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    Start Building Your Logic
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Add nodes from the left panel and connect them to create your survey flow.
                  </p>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div>• Drag nodes from the left palette</div>
                    <div>• Connect nodes by dragging from handles</div>
                    <div>• Click elements to edit properties</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inspector Panel - Fixed Width */}
        <div className="w-80 border-l bg-white flex-shrink-0 overflow-y-auto">
          <InspectorPanel
            selectedNode={selectedNode}
            selectedEdge={selectedEdge}
            nodes={nodes}
            edges={edges}
            questions={questions}
            onNodeUpdate={(nodeId, updates) => {
              setNodes((nodes) =>
                nodes.map((node) =>
                  node.id === nodeId
                    ? { ...node, data: { ...node.data, ...updates } }
                    : node
                )
              );
              setIsDirty(true);
            }}
            onEdgeUpdate={(edgeId, updates) => {
              setEdges((edges) =>
                edges.map((edge) =>
                  edge.id === edgeId
                    ? { ...edge, data: { ...edge.data, ...updates } }
                    : edge
                )
              );
              setIsDirty(true);
            }}
            onDelete={(type, id) => {
              if (type === "node") {
                setNodes((nodes) => nodes.filter((n) => n.id !== id));
                setEdges((edges) =>
                  edges.filter((e) => e.source !== id && e.target !== id)
                );
                setSelectedNode(null);
              } else {
                setEdges((edges) => edges.filter((e) => e.id !== id));
                setSelectedEdge(null);
              }
              setIsDirty(true);
            }}
          />
        </div>
      </div>

      {/* Simulation Modal */}
      {isSimulationActive && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <SimulationPanel
              nodes={nodes}
              edges={edges}
              questions={questions}
              onClose={() => setIsSimulationActive(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogicBuilder;