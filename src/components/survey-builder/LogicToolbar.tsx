import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Save,
  RotateCcw,
  Layout,
  Play,
  Square,
  Zap,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Grid3X3,
  AlignCenter,
  Sparkles,
  FileText,
  Share2,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
} from "lucide-react";

interface LogicToolbarProps {
  onSave: () => void;
  onReset: () => void;
  onAutoLayout: () => void;
  onTemplateLoad?: (templateId: string) => void;
  onExport?: () => void;
  onImport?: () => void;
  onStartSimulation?: () => void;
  isDirty: boolean;
  isValid?: boolean;
  validationErrors?: number;
  validationWarnings?: number;
  nodeCount?: number;
  edgeCount?: number;
}

const templates = [
  {
    id: "simple-feedback",
    name: "Simple Feedback",
    description: "Basic satisfaction survey flow",
    nodeCount: 3,
  },
  {
    id: "nps-flow",
    name: "NPS Survey",
    description: "Net Promoter Score with conditional follow-ups",
    nodeCount: 5,
  },
  {
    id: "conditional-survey",
    name: "Conditional Logic",
    description: "Advanced branching based on answers",
    nodeCount: 7,
  },
  {
    id: "customer-journey",
    name: "Customer Journey",
    description: "Multi-path customer experience survey",
    nodeCount: 10,
  },
];

const LogicToolbar: React.FC<LogicToolbarProps> = ({
  onSave,
  onReset,
  onAutoLayout,
  onTemplateLoad,
  onExport,
  onImport,
  onStartSimulation,
  isDirty,
  isValid = true,
  validationErrors = 0,
  validationWarnings = 0,
  nodeCount = 0,
  edgeCount = 0,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const getStatusInfo = () => {
    if (validationErrors > 0) {
      return {
        icon: AlertTriangle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        text: `${validationErrors} Error${validationErrors > 1 ? 's' : ''}`,
      };
    }
    if (validationWarnings > 0) {
      return {
        icon: Info,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        text: `${validationWarnings} Warning${validationWarnings > 1 ? 's' : ''}`,
      };
    }
    if (isValid) {
      return {
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-50",
        text: "All Valid",
      };
    }
    return {
      icon: Info,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      text: "No Issues",
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <TooltipProvider>
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-white to-slate-50">
        {/* Left Section - Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Templates Dropdown */}
          {onTemplateLoad && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Templates
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <div className="p-2">
                    <h4 className="font-medium text-sm mb-2">Quick Start Templates</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Pre-built logic flows for common survey patterns
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  {templates.map((template) => (
                    <DropdownMenuItem
                      key={template.id}
                      onClick={() => onTemplateLoad(template.id)}
                      className="p-3 cursor-pointer"
                    >
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{template.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {template.nodeCount} nodes
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-tight">
                          {template.description}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="h-6" />
            </>
          )}

          {/* Layout Actions */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAutoLayout}
                  disabled={nodeCount === 0}
                >
                  <Layout className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Auto arrange nodes</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showGrid ? "Hide" : "Show"} grid</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFullscreen ? "Exit" : "Enter"} fullscreen</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* File Actions */}
          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <FileText className="w-4 h-4" />
                  File
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {onExport && (
                  <DropdownMenuItem onClick={onExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Logic
                  </DropdownMenuItem>
                )}
                {onImport && (
                  <DropdownMenuItem onClick={onImport}>
                    <Upload className="w-4 h-4 mr-2" />
                    Import Logic
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText('logic-json')}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy as JSON
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Logic
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {onStartSimulation && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onStartSimulation}
                    disabled={nodeCount === 0 || validationErrors > 0}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Test survey flow</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Center Section - Status & Stats */}
        <div className="flex items-center gap-4">
          {/* Flow Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>{nodeCount} Nodes</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-indigo-500 rounded-full" />
              <span>{edgeCount} Connections</span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-6" />

          {/* Validation Status */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bgColor}`}>
            <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
            <span className={`text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
          </div>
        </div>

        {/* Right Section - Save Actions */}
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                disabled={nodeCount === 0}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset all changes</p>
            </TooltipContent>
          </Tooltip>

          <Button
            onClick={onSave}
            disabled={!isDirty || validationErrors > 0}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Logic
            {isDirty && (
              <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-800">
                •
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default LogicToolbar;
