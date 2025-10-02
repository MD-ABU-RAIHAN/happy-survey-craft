import React, { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Square,
  MessageCircle,
  Zap,
  ShoppingBag,
  Plus,
  Sparkles,
  Layers,
  Target,
  Users,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { NodeType, NodePaletteItem } from "@/types/logic";

interface NodePaletteProps {
  onNodeAdd: (type: NodeType, position: { x: number; y: number }) => void;
  onTemplateLoad?: (template: string) => void;
}

// Enhanced node items with categories and better descriptions
const nodeCategories = {
  flow: {
    label: "Flow Control",
    icon: Target,
    description: "Control survey flow and logic",
    items: [
      {
        type: "start" as NodeType,
        label: "Start Point",
        description: "Begin survey journey",
        icon: "Play",
        badge: "Entry",
        color: "bg-green-100 hover:bg-green-200 text-green-800 border-green-300",
      },
      {
        type: "end" as NodeType,
        label: "End Point",
        description: "Complete survey",
        icon: "Square",
        badge: "Exit",
        color: "bg-red-100 hover:bg-red-200 text-red-800 border-red-300",
      },
    ],
  },
  survey: {
    label: "Survey Elements",
    icon: MessageCircle,
    description: "Questions and interactions",
    items: [
      {
        type: "question" as NodeType,
        label: "Question",
        description: "Ask respondents a question",
        icon: "MessageCircle",
        badge: "Core",
        color: "bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300",
      },
    ],
  },
  automation: {
    label: "Automation",
    icon: Zap,
    description: "Actions and integrations",
    items: [
      {
        type: "action" as NodeType,
        label: "Action",
        description: "Trigger automated actions",
        icon: "Zap",
        badge: "Auto",
        color: "bg-purple-100 hover:bg-purple-200 text-purple-800 border-purple-300",
      },
      {
        type: "shopify" as NodeType,
        label: "Shopify Data",
        description: "Access customer & order data",
        icon: "ShoppingBag",
        badge: "Data",
        color: "bg-orange-100 hover:bg-orange-200 text-orange-800 border-orange-300",
      },
    ],
  },
};

const quickTemplates = [
  {
    id: "simple-feedback",
    name: "Simple Feedback",
    description: "Basic satisfaction survey",
    icon: MessageCircle,
    nodes: 3,
  },
  {
    id: "nps-flow",
    name: "NPS Survey",
    description: "Net Promoter Score with follow-ups",
    icon: Target,
    nodes: 5,
  },
  {
    id: "conditional-survey",
    name: "Conditional Logic",
    description: "Branching questions based on answers",
    icon: Layers,
    nodes: 7,
  },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Play":
      return Play;
    case "Square":
      return Square;
    case "MessageCircle":
      return MessageCircle;
    case "Zap":
      return Zap;
    case "ShoppingBag":
      return ShoppingBag;
    default:
      return Plus;
  }
};

const NodePalette: React.FC<NodePaletteProps> = ({ onNodeAdd, onTemplateLoad }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "flow", "survey", "automation"
  ]);
  const [draggedNode, setDraggedNode] = useState<NodeType | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryKey)
        ? prev.filter(key => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const handleNodeAdd = (type: NodeType) => {
    const position = {
      x: Math.random() * 300 + 100,
      y: Math.random() * 200 + 100,
    };
    onNodeAdd(type, position);
  };

  const handleDragStart = (e: React.DragEvent, nodeType: NodeType) => {
    setDraggedNode(nodeType);
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedNode(null);
  };

  const renderNodeItem = (item: any) => {
    const IconComponent = getIcon(item.icon);
    const isDragging = draggedNode === item.type;

    return (
      <div
        key={item.type}
        className={`group relative transition-all duration-200 ${
          isDragging ? "opacity-50 scale-95" : ""
        }`}
        draggable
        onDragStart={(e) => handleDragStart(e, item.type)}
        onDragEnd={handleDragEnd}
      >
        <Button
          variant="outline"
          size="sm"
          className={`w-full justify-start h-auto p-3 transition-all duration-200 cursor-grab active:cursor-grabbing ${item.color} group-hover:shadow-md group-hover:scale-[1.02]`}
          onClick={() => handleNodeAdd(item.type)}
        >
          <div className="flex items-start gap-3 w-full">
            <div className="relative">
              <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-current rounded-full opacity-60" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{item.label}</span>
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {item.badge}
                </Badge>
              </div>
              <div className="text-xs opacity-80 leading-tight">
                {item.description}
              </div>
            </div>
          </div>
        </Button>
      </div>
    );
  };

  return (
    <Card className="h-full border-0 rounded-none bg-gradient-to-b from-slate-50/50 to-slate-100/50">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-700">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          Logic Builder
        </CardTitle>
        <p className="text-xs text-slate-600 mt-1">
          Drag nodes to canvas or click to add
        </p>
      </CardHeader>

      <CardContent className="p-0 space-y-0">
        {/* Quick Templates Section */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Quick Start</span>
          </div>
          <div className="space-y-2">
            {quickTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Button
                  key={template.id}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start h-auto p-2 bg-white/80 hover:bg-white border-purple-200 hover:border-purple-300"
                  onClick={() => onTemplateLoad?.(template.id)}
                >
                  <IconComponent className="w-4 h-4 mr-2 text-purple-600" />
                  <div className="text-left flex-1">
                    <div className="text-xs font-medium text-purple-800">
                      {template.name}
                    </div>
                    <div className="text-xs text-purple-600 opacity-80">
                      {template.nodes} nodes
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Node Categories */}
        <div className="p-4 space-y-4">
          {Object.entries(nodeCategories).map(([categoryKey, category]) => {
            const isExpanded = expandedCategories.includes(categoryKey);
            const CategoryIcon = category.icon;

            return (
              <div key={categoryKey} className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start p-2 hover:bg-slate-100"
                  onClick={() => toggleCategory(categoryKey)}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <CategoryIcon className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {category.label}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                </Button>

                {isExpanded && (
                  <div className="space-y-2 pl-2">
                    {category.items.map(renderNodeItem)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Help Section */}
        <div className="p-4 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Quick Tips</span>
          </div>
          <div className="text-xs text-slate-600 space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 flex-shrink-0" />
              <span>Drag nodes directly to the canvas</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 flex-shrink-0" />
              <span>Connect nodes by dragging from connection points</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 flex-shrink-0" />
              <span>Use templates for common survey patterns</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 flex-shrink-0" />
              <span>Click edges to add conditional logic</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NodePalette;
