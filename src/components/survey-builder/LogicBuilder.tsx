import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Condition,
  LogicSuggestion,
} from "@/types/logic";

// Component imports
import LogicToolbar from './LogicToolbar';
import NodePalette from "./NodePalette";
import InspectorPanel from "./InspectorPanel";
import SimulationPanel from "./SimulationPanel";
import SmartSuggestions from "./SmartSuggestions";

// Custom node components
import QuestionNode from "./nodes/QuestionNode";
import StartNode from "./nodes/StartNode";
import EndNode from "./nodes/EndNode";
import ActionNode from "./nodes/ActionNode";
import ShopifyNode from "./nodes/ShopifyNode";

// Custom edge components
import EdgeLabel from "./EdgeLabel";
import ConditionEditor from "./ConditionEditor";

interface LogicBuilderProps {
  questions: SurveyQuestion[];
  surveyId: string;
  logicId?: string;
  initialLogic?: SurveyLogic;
  existingLogic?: SurveyLogic;
  onSave?: (logic: SurveyLogic) => void;
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
  // Use existingLogic as the primary source, fallback to initialLogic
  const savedLogic = existingLogic || initialLogic;
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
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // Condition editing state
  const [showConditionEditor, setShowConditionEditor] = useState(false);
  const [editingCondition, setEditingCondition] = useState<Condition | undefined>(undefined);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  // Smart suggestions state
  const [showSmartSuggestions, setShowSmartSuggestions] = useState(true);

  // Handle applying smart suggestions
  const handleApplySuggestion = useCallback((suggestion: LogicSuggestion) => {
    if (suggestion.suggestedLogic && suggestion.applicableQuestions.length > 0) {
      const sourceNodeId = suggestion.applicableQuestions[0];

      // Find target node (preferably end node)
      const targetNode = nodes.find(node => node.type === 'end') || nodes.find(node => node.id !== sourceNodeId);

      if (targetNode) {
        // Create new edge with suggested condition
        const newEdge: Edge = {
          id: `suggestion_${suggestion.id}_${Date.now()}`,
          source: sourceNodeId,
          target: targetNode.id,
          label: suggestion.title,
          markerEnd: "url(#arrow-closed-green)",
          data: {
            condition: suggestion.suggestedLogic,
            action: { type: "goto", target: targetNode.id },
            priority: 0,
          },
        };

        setEdges((edges) => [...edges, newEdge]);
        setIsDirty(true);

        // Show success feedback
        toast.success(`Applied suggestion: ${suggestion.title}`);
      }
    }
  }, [nodes, setEdges]);


  // Function to handle adding logic from node
  const handleAddLogicFromNode = useCallback((questionId: string) => {
    // Check if this node already has outgoing connections with conditions
    const existingEdge = edges.find(edge => edge.source === questionId && edge.data?.condition);

    setEditingNodeId(questionId);
    setEditingCondition(existingEdge?.data?.condition || undefined);
    setShowConditionEditor(true);
    setSelectedNode(questionId);
    setSelectedEdge(null);
  }, [edges]);

  // Check if a question has logic
  const hasLogicForQuestion = useCallback((questionId: string) => {
    return edges.some(edge =>
      edge.source === questionId || edge.target === questionId
    );
  }, [edges]);

  // Handle saving condition from editor
  const handleConditionSave = useCallback((condition: Condition, label: string) => {
    if (!editingNodeId) return;

    // Find all possible target nodes (other questions and end nodes)
    const targetNodes = nodes.filter(node =>
      node.id !== editingNodeId &&
      (node.type === 'question' || node.type === 'end' || node.id === 'thank-you')
    );

    if (targetNodes.length === 0) {
      alert('No target nodes available. Please add more questions first.');
      setShowConditionEditor(false);
      return;
    }

    // Smart target selection: prefer 'thank-you' end node, then next question in sequence
    let targetNode = targetNodes.find(node => node.id === 'thank-you');
    if (!targetNode) {
      // Find the next question node in the sequence
      const currentNodeIndex = nodes.findIndex(node => node.id === editingNodeId);
      const nextQuestionNodes = targetNodes.filter(node => node.type === 'question');
      targetNode = nextQuestionNodes.length > 0 ? nextQuestionNodes[0] : targetNodes[0];
    }

    // Remove any existing conditional edge from this source
    const filteredEdges = edges.filter(edge =>
      !(edge.source === editingNodeId && edge.data?.condition)
    );

    // Create new edge with condition
    const newEdge: Edge = {
      id: `e_${editingNodeId}_${targetNode.id}_${Date.now()}`,
      source: editingNodeId,
      target: targetNode.id,
      label: label,
      markerEnd: "url(#arrow-closed-green)",
      data: {
        condition: condition,
        action: { type: "goto", target: targetNode.id },
        priority: 0,
      },
    };

    setEdges([...filteredEdges, newEdge]);
    setShowConditionEditor(false);
    setEditingNodeId(null);
    setEditingCondition(undefined);
    setIsDirty(true);
  }, [editingNodeId, nodes, edges, setEdges]);

  // Track if we've already initialized to prevent multiple runs
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastQuestionIds, setLastQuestionIds] = useState<string[]>([]);

  // Check if questions have changed (more precise detection)
  const questionsChanged = useMemo(() => {
    const currentQuestionIds = questions.map(q => q.id).sort();
    const lastIds = lastQuestionIds.sort();
    return JSON.stringify(currentQuestionIds) !== JSON.stringify(lastIds);
  }, [questions, lastQuestionIds]);

  // Check if any questions were removed (this requires clearing logic)
  const questionsRemoved = useMemo(() => {
    if (lastQuestionIds.length === 0) return false;
    return lastQuestionIds.some(id => !questions.find(q => q.id === id));
  }, [questions, lastQuestionIds]);

  // Initialize nodes and edges - handle both new and changed questions
  useEffect(() => {
    // Only reset if questions were removed (not just added or reordered)
    if (questionsRemoved && questions.length > 0) {
      setIsInitialized(false);
      setLastQuestionIds(questions.map(q => q.id));
    } else if (questionsChanged && questions.length > 0) {
      // Just update the tracking without resetting if only new questions added
      setLastQuestionIds(questions.map(q => q.id));
    }

    if (isInitialized && !questionsChanged) return;

    // Check if saved logic is valid for current questions
    const isLogicValidForCurrentQuestions = savedLogic &&
      savedLogic.nodes.filter(node => node.questionId).every(node =>
        questions.some(q => q.id === node.questionId)
      ) && (
        savedLogic.nodes.filter(node => node.questionId).length > 0 ||
        savedLogic.nodes.some(node => node.type === 'start' || node.type === 'end')
      );

    if (savedLogic && isLogicValidForCurrentQuestions && !questionsRemoved) {
      // Load existing logic with enhanced functionality
      const reactFlowNodes: Node[] = savedLogic.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          ...node.meta,
          questionId: node.questionId,
          // Enhance nodes with interactive functionality
          onAddLogic: handleAddLogicFromNode,
          hasLogic: savedLogic.edges.some(edge =>
            edge.source === node.id || edge.target === node.id
          ),
        },
      }));

      const reactFlowEdges: Edge[] = savedLogic.edges.map((edge) => {
        const hasCondition = edge.condition && Object.keys(edge.condition).length > 0;
        return {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          label: edge.label,
          markerEnd: hasCondition ? "url(#arrow-closed-green)" : "url(#arrow-closed-gray)",
          data: {
            condition: edge.condition,
            action: edge.action,
            priority: edge.priority,
          },
        };
      });

      setNodes(reactFlowNodes);
      setEdges(reactFlowEdges);
      setIsInitialized(true);
    } else if (questions.length > 0) {
      // Auto-generate nodes from current questions (new or changed questions)
      const questionNodes: Node[] = questions.map((question, index) => ({
        id: question.id,
        type: "question",
        position: {
          x: 150 + (index % 4) * 250,
          y: 150 + Math.floor(index / 4) * 120,
        },
        data: {
          questionId: question.id,
          title: question.title,
          type: question.type,
          required: question.required,
          onAddLogic: handleAddLogicFromNode,
          hasLogic: false, // No logic for new questions initially
        },
      }));

      // Add start node
      const startNode: Node = {
        id: "start",
        type: "start",
        position: { x: 50, y: 80 },
        data: { label: "Start Survey" },
      };

      // Add Thank You message node
      const thankYouNode: Node = {
        id: "thank-you",
        type: "end",
        position: { x: 150 + (questions.length % 4) * 250, y: 150 + Math.floor(questions.length / 4) * 120 + 80 },
        data: {
          label: "Thank You Message",
          message: "Thank you for taking our survey! Your feedback is valuable to us."
        },
      };

      setNodes([startNode, ...questionNodes, thankYouNode]);
      setEdges([]); // Clear edges for new/changed questions
      setIsInitialized(true);
    }
  }, [savedLogic, questions, isInitialized, questionsChanged, questionsRemoved, lastQuestionIds, setNodes, setEdges, handleAddLogicFromNode]);

  // Update button states when edges change (after initialization)
  useEffect(() => {
    if (isInitialized && nodes.length > 0) {
      setNodes((currentNodes) =>
        currentNodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            hasLogic: edges.some(edge =>
              edge.source === node.id || edge.target === node.id
            ),
          },
        }))
      );
    }
  }, [edges, isInitialized, nodes.length, setNodes]);

  // Handle new connections - with robust error handling
  const onConnect = useCallback(
    (connection: Connection) => {
      // Validate connection parameters
      if (!connection.source || !connection.target) {
        console.warn('Invalid connection attempt - missing source or target');
        return;
      }

      // Prevent self-connections
      if (connection.source === connection.target) {
        console.warn('Self-connections are not allowed');
        return;
      }

      // Check if nodes exist
      const sourceNode = nodes.find(n => n.id === connection.source);
      const targetNode = nodes.find(n => n.id === connection.target);

      if (!sourceNode || !targetNode) {
        console.warn('Connection attempted between non-existent nodes');
        return;
      }

      const newEdge: Edge = {
        ...connection,
        id: `e_${connection.source}_${connection.target}_${Date.now()}`,
        markerEnd: "url(#arrow-closed-gray)",
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
    [setEdges, nodes]
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

      // Check for deleted questions (only for question nodes)
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

      // System nodes (start, end, action, shopify) are always valid even without questionId
      const systemNodeTypes = ['start', 'end', 'action', 'shopify'];
      logic.nodes.forEach((node) => {
        if (systemNodeTypes.includes(node.type) && !node.questionId) {
          // This is expected and valid for system nodes - no action needed
          return;
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
      nodes: logicNodes,
      edges: logicEdges,
    };

    // Validate before saving
    const validation = validateLogic(surveyLogic);
    setValidationErrors(validation);

    if (validation.isValid) {
      if (onSave) {
        await onSave(surveyLogic);
      }
      setIsDirty(false);
      onBack?.();
    }
  }, [nodes, edges, surveyId, onSave, validateLogic, onBack]);

  // Reset to default - show confirmation modal
  const handleReset = useCallback(() => {
    setShowResetConfirmation(true);
  }, []);

  // Handle reset confirmation
  const handleResetConfirm = useCallback(() => {
    // Clear only edges, keep nodes (questions should remain)
    setEdges([]);
    setSelectedNode(null);
    setSelectedEdge(null);
    setValidationErrors(null);
    setIsDirty(true);
    setShowResetConfirmation(false);
    toast.success("Logic connections have been reset successfully");
  }, [setEdges]);

  // Handle reset cancel
  const handleResetCancel = useCallback(() => {
    setShowResetConfirmation(false);
  }, []);

  // Handle template loading
  const handleTemplateLoad = useCallback((templateId: string) => {
    console.log("Loading template:", templateId);
    setIsDirty(true);
  }, []);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (isDirty) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        if (onCancel) {
          onCancel();
        } else if (onBack) {
          onBack();
        }
      }
    } else {
      if (onCancel) {
        onCancel();
      } else if (onBack) {
        onBack();
      }
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

        {/* ReactFlow Canvas - Full Width */}
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
              // Ensure connections are always enabled
              connectionMode="loose"
              elementsSelectable={true}
              nodesConnectable={true}
              nodesDraggable={true}
              edgesFocusable={true}
              edgesUpdatable={true}
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
              connectionLineStyle={{
                stroke: '#3b82f6',
                strokeWidth: 3,
                strokeDasharray: '8,4'
              }}
              connectionLineType="smoothstep"
            >
              {/* Custom SVG Definitions for Arrow Markers */}
              <svg style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0 }}>
                <defs>
                  <marker
                    id="arrow-closed-blue"
                    markerWidth="12"
                    markerHeight="12"
                    refX="10"
                    refY="6"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M0,0 L0,12 L12,6 z" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1"/>
                  </marker>
                  <marker
                    id="arrow-closed-green"
                    markerWidth="12"
                    markerHeight="12"
                    refX="10"
                    refY="6"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M0,0 L0,12 L12,6 z" fill="#10b981" stroke="#10b981" strokeWidth="1"/>
                  </marker>
                  <marker
                    id="arrow-closed-gray"
                    markerWidth="12"
                    markerHeight="12"
                    refX="10"
                    refY="6"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M0,0 L0,12 L12,6 z" fill="#94a3b8" stroke="#94a3b8" strokeWidth="1"/>
                  </marker>
                </defs>
              </svg>

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
                    Questions from your survey will automatically appear here. Connect them to create your survey flow.
                  </p>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div>• Questions are automatically added from Survey Builder</div>
                    <div>• Connect nodes by dragging from handles</div>
                    <div>• Click elements to edit properties</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l bg-white flex-shrink-0 overflow-y-auto">
          {/* Smart Suggestions */}
          {showSmartSuggestions && questions.length > 0 && (
            <div className="p-4 border-b">
              <SmartSuggestions
                questions={questions}
                onApplySuggestion={handleApplySuggestion}
                onDismiss={() => setShowSmartSuggestions(false)}
              />
            </div>
          )}

          {/* Inspector Panel */}
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

      {/* Reset Confirmation Modal */}
      <Dialog open={showResetConfirmation} onOpenChange={setShowResetConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <DialogTitle>Reset Logic Flow</DialogTitle>
            </div>
            <DialogDescription className="text-left mt-4">
              Are you sure you want to reset all logic connections?
              <br /><br />
              <strong>This will remove:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>All connections between questions</li>
                <li>All conditional logic rules</li>
                <li>All custom flow paths</li>
              </ul>
              <br />
              Your questions will remain unchanged.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleResetCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleResetConfirm}
              className="flex-1"
            >
              Reset Logic
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Condition Editor Modal */}
      <ConditionEditor
        isOpen={showConditionEditor}
        onClose={() => {
          setShowConditionEditor(false);
          setEditingNodeId(null);
          setEditingCondition(undefined);
        }}
        condition={editingCondition}
        questions={questions}
        onSave={handleConditionSave}
      />

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