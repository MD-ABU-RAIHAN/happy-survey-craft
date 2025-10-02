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
  FileQuestion,
  Star,
  Smile,
  Type,
  CircleDot,
} from "lucide-react";
import { toast } from "sonner";

// Type imports
import {
  SurveyLogic,
  SurveyQuestion,
} from "@/types/logic";

interface AdvancedLogicTabProps {
  questions: SurveyQuestion[];
  onSave?: (logic: SurveyLogic) => void;
  surveyId: string;
  surveyLogic?: SurveyLogic | null;
  onOpenBuilder?: (questionId?: string) => void;
}


const AdvancedLogicTab: React.FC<AdvancedLogicTabProps> = ({
  questions,
  onSave,
  surveyId,
  surveyLogic,
  onOpenBuilder,
}) => {

  const hasLogicForQuestion = (questionId: string) => {
    if (!surveyLogic) return false;
    return surveyLogic.edges.some(edge =>
      edge.source === questionId || edge.target === questionId
    );
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
              Questions automatically sync from Survey Builder. Add logic to control survey flow.
            </p>
          </div>
        </div>
      </div>

      {/* Survey Questions */}
      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Survey Questions</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Add logic to your questions to control survey flow
                </p>
              </div>
              <Badge variant="secondary" className="text-sm">
                {questions.length} questions
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions.map((question, index) => {
                const getQuestionTypeIcon = (type: string) => {
                  switch (type) {
                    case "multiple-choice":
                      return <CheckCircle className="w-4 h-4 text-blue-600" />;
                    case "single-choice":
                      return <CircleDot className="w-4 h-4 text-green-600" />;
                    case "text":
                      return <Type className="w-4 h-4 text-purple-600" />;
                    case "rating":
                      return <Star className="w-4 h-4 text-yellow-600" />;
                    case "satisfaction":
                      return <Smile className="w-4 h-4 text-pink-600" />;
                    default:
                      return <FileQuestion className="w-4 h-4 text-gray-600" />;
                  }
                };

                return (
                  <div
                    key={question.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          {getQuestionTypeIcon(question.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-500">Q{index + 1}</span>
                            <Badge variant="outline" className="text-xs">
                              {question.type.replace('-', ' ')}
                            </Badge>
                            {question.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium text-slate-800 truncate">{question.title}</h3>
                          {question.description && (
                            <p className="text-sm text-slate-600 mt-1 line-clamp-1">{question.description}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant={hasLogicForQuestion(question.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          onOpenBuilder?.(question.id);
                        }}
                        className={`gap-2 text-xs ${
                          hasLogicForQuestion(question.id)
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                        }`}
                      >
                        <GitBranch className="w-3 h-3" />
                        {hasLogicForQuestion(question.id) ? "Edit Logic" : "Add Logic"}
                      </Button>
                    </div>
                  </div>
                );
              })}

              {/* Thank You Message */}
              <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          Thank You Page
                        </Badge>
                      </div>
                      <h3 className="font-medium text-slate-800">Thank You Message</h3>
                      <p className="text-sm text-slate-600 mt-1">Default completion message for all survey responses</p>
                    </div>
                  </div>
                  <Button
                    variant={hasLogicForQuestion("thank-you") ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      onOpenBuilder?.("thank-you");
                    }}
                    className={`gap-2 text-xs ${
                      hasLogicForQuestion("thank-you")
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                    }`}
                  >
                    <GitBranch className="w-3 h-3" />
                    {hasLogicForQuestion("thank-you") ? "Edit Logic" : "Add Logic"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State for No Questions */}
      {questions.length === 0 && (
        <Card className="border-dashed border-2 border-muted">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-muted/30 rounded-lg flex items-center justify-center mb-6">
              <FileQuestion className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Survey Questions Yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Add questions in the Survey Builder tab first. They will automatically appear here for logic configuration.
            </p>
            <Badge variant="outline" className="text-sm">
              Switch to Survey Builder to get started
            </Badge>
          </CardContent>
        </Card>
      )}

    </div>
  );
};

export default AdvancedLogicTab;
