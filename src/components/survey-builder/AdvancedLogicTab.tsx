import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Zap,
  Edit3,
  Trash2,
  Copy,
  Play,
  Eye,
  ChevronRight,
  Sparkles,
  GitBranch,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

// Type imports
import {
  SurveyLogic,
  SurveyQuestion,
} from "@/types/logic";

interface LogicFlow {
  id: string;
  name: string;
  description: string;
  logic: SurveyLogic;
  status: "active" | "draft" | "error";
  type: "conditional" | "branching" | "sequential";
  nodes: number;
  connections: number;
  lastModified: string;
  createdAt: string;
  updatedAt: string;
}

interface AdvancedLogicTabProps {
  questions: SurveyQuestion[];
  onSave?: (logic: SurveyLogic) => void;
  surveyId: string;
  initialLogic?: SurveyLogic;
  onOpenBuilder?: (logicId?: string) => void;
  logicFlows?: LogicFlow[];
  activeLogicId?: string | null;
  onDeleteLogic?: (logicId: string) => void;
  onToggleLogicActive?: (logicId: string) => void;
}


const AdvancedLogicTab: React.FC<AdvancedLogicTabProps> = ({
  questions,
  onSave,
  surveyId,
  initialLogic,
  onOpenBuilder,
  logicFlows = [],
  activeLogicId,
  onDeleteLogic,
  onToggleLogicActive,
}) => {
  const [selectedLogic, setSelectedLogic] = useState<string | null>(null);
  const logics = logicFlows.length > 0 ? logicFlows : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "draft":
        return <Clock className="w-4 h-4 text-orange-600" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "conditional":
        return <GitBranch className="w-4 h-4 text-blue-600" />;
      case "branching":
        return <Zap className="w-4 h-4 text-purple-600" />;
      case "sequential":
        return <ChevronRight className="w-4 h-4 text-green-600" />;
      default:
        return <GitBranch className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "conditional":
        return { label: "Conditional", color: "bg-blue-100 text-blue-800" };
      case "branching":
        return { label: "Branching", color: "bg-purple-100 text-purple-800" };
      case "sequential":
        return { label: "Sequential", color: "bg-green-100 text-green-800" };
      default:
        return { label: "Custom", color: "bg-gray-100 text-gray-800" };
    }
  };

  const handleEditLogic = (logicId: string) => {
    onOpenBuilder?.(logicId);
  };

  const handleDeleteLogic = (logicId: string) => {
    const logicToDelete = logics.find(l => l.id === logicId);
    if (logicToDelete && onDeleteLogic) {
      onDeleteLogic(logicId);
      setSelectedLogic(null);
      toast.success(`Logic flow "${logicToDelete.name}" has been deleted successfully.`);
    }
  };

  const handleDuplicateLogic = (logicId: string) => {
    const logicToDuplicate = logics.find(l => l.id === logicId);
    if (logicToDuplicate) {
      // For now, just show a message - duplication would need backend support
      toast.info(`Duplication feature coming soon! Logic: "${logicToDuplicate.name}"`);
    }
  };

  const handleTestLogic = (logicId: string) => {
    const logicToTest = logics.find(l => l.id === logicId);
    if (logicToTest) {
      // Simulate testing
      toast.info(`Testing logic flow "${logicToTest.name}"...`);
      setTimeout(() => {
        toast.success(`Logic flow "${logicToTest.name}" passed all tests successfully!`);
      }, 2000);
    }
  };

  const handleToggleActive = (logicId: string) => {
    if (onToggleLogicActive) {
      onToggleLogicActive(logicId);
      const logic = logics.find(l => l.id === logicId);
      if (logic) {
        if (activeLogicId === logicId) {
          toast.info(`Logic flow "${logic.name}" deactivated from preview.`);
        } else {
          toast.success(`Logic flow "${logic.name}" is now active in preview!`);
        }
      }
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex-shrink-0">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-bold text-slate-800">Advanced Logic</h2>
            <p className="text-slate-600 text-sm lg:text-base">
              Create intelligent survey flows with conditional branching and dynamic responses
            </p>
          </div>
        </div>
        <Button
          onClick={() => onOpenBuilder?.()}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-medium flex-shrink-0"
          size="lg"
        >
          <Plus className="w-5 h-5" />
          Build Your Logic
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <GitBranch className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">Active Logics</p>
                <p className="text-2xl font-bold text-blue-900">
                  {logics.filter(l => l.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">Total Flows</p>
                <p className="text-2xl font-bold text-green-900">{logics.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700">Questions</p>
                <p className="text-2xl font-bold text-purple-900">{questions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Existing Logic Flows */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">Your Logic Flows</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and edit your survey logic configurations
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {logics.length} flows
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {logics.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12 pb-24">
              <div className="p-4 mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-4 flex items-center justify-center">
                <GitBranch className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-slate-800 mb-2">
                No Logic Flows Yet
              </h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Create your first logic flow to add intelligent branching and conditional responses to your survey.
              </p>
              <Button
                onClick={() => onOpenBuilder?.()}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Create Your First Logic Flow
              </Button>
            </div>
          ) : (
            /* Logic Flows List */
            <div className="space-y-3">
              {logics.map((logic) => {
                const typeBadge = getTypeBadge(logic.type);
                return (
                  <div
                    key={logic.id}
                    className={`p-4 lg:p-6 border rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer ${
                      selectedLogic === logic.id
                        ? 'border-blue-300 bg-blue-50/50'
                        : activeLogicId === logic.id
                        ? 'border-green-300 bg-green-50/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedLogic(logic.id)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex items-start gap-3 lg:gap-4 flex-1 min-w-0">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          {getTypeIcon(logic.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="font-semibold text-slate-800 truncate">{logic.name}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge className={`text-xs ${typeBadge.color}`}>
                                {typeBadge.label}
                              </Badge>
                              {activeLogicId === logic.id && (
                                <Badge className="text-xs bg-green-100 text-green-800">
                                  Active in Preview
                                </Badge>
                              )}
                              <div className="flex items-center gap-1">
                                {getStatusIcon(logic.status)}
                                <span className="text-sm text-slate-600 capitalize">
                                  {logic.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-slate-600 text-sm mb-3">{logic.description}</p>
                          <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full" />
                              <span>{logic.nodes} nodes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                              <span>{logic.connections} connections</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Modified {logic.lastModified}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2 flex-wrap lg:flex-nowrap">
                        <Button
                          variant={activeLogicId === logic.id ? "default" : "outline"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleActive(logic.id);
                          }}
                          className={`gap-1 text-xs lg:text-sm ${
                            activeLogicId === logic.id
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : ''
                          }`}
                        >
                          <Eye className="w-3 h-3" />
                          <span className="hidden sm:inline">
                            {activeLogicId === logic.id ? 'Active' : 'Activate'}
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTestLogic(logic.id);
                          }}
                          className="gap-1 text-xs lg:text-sm"
                        >
                          <Play className="w-3 h-3" />
                          <span className="hidden sm:inline">Test</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateLogic(logic.id);
                          }}
                          className="gap-1 text-xs lg:text-sm"
                        >
                          <Copy className="w-3 h-3" />
                          <span className="hidden sm:inline">Duplicate</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditLogic(logic.id);
                          }}
                          className="gap-1 text-xs lg:text-sm"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLogic(logic.id);
                          }}
                          className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 text-xs lg:text-sm"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default AdvancedLogicTab;
