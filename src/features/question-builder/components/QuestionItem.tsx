/**
 * Individual Question Item Component
 * Handles editing a single question
 */

import React, { useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Trash2,
  Copy,
  Settings,
} from "lucide-react";
import { SurveyQuestion } from "@/types";
import { QUESTION_TYPES } from "@/constants";

interface QuestionItemProps {
  question: SurveyQuestion;
  index: number;
  isDragging: boolean;
  dragHandleProps: DraggableProvided["dragHandleProps"];
  onUpdate: (updates: Partial<SurveyQuestion>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  index,
  isDragging,
  dragHandleProps,
  onUpdate,
  onDelete,
  onDuplicate,
}) => {
  const questionTypeConfig = QUESTION_TYPES[question.type];

  const toggleCollapse = () => {
    onUpdate({ isCollapsed: !question.isCollapsed });
  };

  return (
    <Card
      className={`transition-all duration-200 ${
        isDragging ? "shadow-xl rotate-1" : "shadow-sm"
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              {...dragHandleProps}
              className="cursor-move p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapse}
              className="p-1 h-auto hover:bg-muted"
            >
              {question.isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>

            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-survey-info-light text-survey-info border-survey-info/20"
              >
                {questionTypeConfig.label}
              </Badge>

              {question.isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{question.title}</span>
                  {question.required && (
                    <span className="text-xs text-muted-foreground">
                      Required
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDuplicate}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!question.isCollapsed && (
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Question Title</Label>
              <Input
                value={question.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Enter your question"
                className="font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Description (Optional)
              </Label>
              <Textarea
                value={question.description || ""}
                onChange={(e) => onUpdate({ description: e.target.value })}
                placeholder="Add additional context or instructions"
                rows={2}
                className="resize-none"
              />
            </div>

            {/* Question Type Specific Fields */}
            {question.type === "multiple-choice" && question.options && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Answer Options</Label>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-2"
                    >
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...question.options!];
                          newOptions[optionIndex] = e.target.value;
                          onUpdate({ options: newOptions });
                        }}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1"
                      />
                      {question.options!.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newOptions = question.options!.filter(
                              (_, i) => i !== optionIndex
                            );
                            onUpdate({ options: newOptions });
                          }}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newOptions = [
                      ...question.options!,
                      `Option ${question.options!.length + 1}`,
                    ];
                    onUpdate({ options: newOptions });
                  }}
                  className="w-full"
                >
                  Add Option
                </Button>
              </div>
            )}

            {(question.type === "text" ||
              question.type === "email" ||
              question.type === "phone") && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Placeholder Text</Label>
                <Input
                  value={question.placeholder || ""}
                  onChange={(e) => onUpdate({ placeholder: e.target.value })}
                  placeholder="Enter placeholder text..."
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Required Question</Label>
                <Badge
                  variant={question.required ? "default" : "secondary"}
                  className="text-xs"
                >
                  {question.required ? "Required" : "Optional"}
                </Badge>
              </div>
              <Switch
                checked={question.required}
                onCheckedChange={(checked) => onUpdate({ required: checked })}
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
