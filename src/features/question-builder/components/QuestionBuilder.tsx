/**
 * Question Builder Component
 * Modular question management with drag & drop
 */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { SurveyQuestion, QuestionType } from "@/types";
import { QUESTION_TYPES, QUESTION_TEMPLATES } from "@/constants";
import { QuestionList } from "./QuestionList";
import { EmptyState } from "./EmptyState";
import { QuestionTemplateGrid } from "./QuestionTemplateGrid";

interface QuestionBuilderProps {
  questions: SurveyQuestion[];
  onAddQuestion: (type: QuestionType) => void;
  onUpdateQuestion: (id: string, updates: Partial<SurveyQuestion>) => void;
  onDeleteQuestion: (id: string) => void;
  onDuplicateQuestion: (id: string) => void;
  onReorderQuestions: (startIndex: number, endIndex: number) => void;
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onDuplicateQuestion,
  onReorderQuestions,
}) => {
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("");

  const handleAddQuestion = (type: string) => {
    onAddQuestion(type as QuestionType);
    setSelectedQuestionType(""); // Reset selection
  };

  const handleAddFromTemplate = (templateKey: string) => {
    const template = QUESTION_TEMPLATES[templateKey];
    if (template) {
      onAddQuestion(template.type);
      // TODO: Apply template settings to the newly created question
    }
  };

  if (questions.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Survey Questions
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add and configure your survey questions with drag & drop
            </p>
          </div>
        </div>

        <EmptyState
          onAddQuestion={handleAddQuestion}
          onAddFromTemplate={handleAddFromTemplate}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Survey Questions
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add and configure your survey questions with drag & drop
          </p>
        </div>

        <Select value={selectedQuestionType} onValueChange={handleAddQuestion}>
          <SelectTrigger className="w-auto bg-primary hover:bg-primary-hover text-primary-foreground border-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </SelectTrigger>
          <SelectContent>
            {Object.entries(QUESTION_TYPES).map(([value, config]) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center gap-2">
                  <span>{config.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <QuestionList
        questions={questions}
        onUpdateQuestion={onUpdateQuestion}
        onDeleteQuestion={onDeleteQuestion}
        onDuplicateQuestion={onDuplicateQuestion}
        onReorderQuestions={onReorderQuestions}
      />
    </div>
  );
};
