/**
 * Empty State Component for Question Builder
 * Shows when no questions are added yet
 */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CheckSquare, Type, Star, BarChart3 } from "lucide-react";
import { QUESTION_TEMPLATES } from "@/constants";

interface EmptyStateProps {
  onAddQuestion: (type: string) => void;
  onAddFromTemplate: (templateKey: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onAddQuestion,
  onAddFromTemplate,
}) => {
  return (
    <Card className="border-dashed border-2 border-muted">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Plus className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          Start building your survey by adding your first question. Choose from
          multiple choice, text, ratings, and more.
        </p>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              onClick={() => onAddQuestion("multiple-choice")}
              variant="outline"
              size="sm"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Multiple Choice
            </Button>
            <Button
              onClick={() => onAddQuestion("text")}
              variant="outline"
              size="sm"
            >
              <Type className="w-4 h-4 mr-2" />
              Text Response
            </Button>
            <Button
              onClick={() => onAddQuestion("rating")}
              variant="outline"
              size="sm"
            >
              <Star className="w-4 h-4 mr-2" />
              Rating Scale
            </Button>
            <Button
              onClick={() => onAddQuestion("nps")}
              variant="outline"
              size="sm"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              NPS Score
            </Button>
          </div>

          <div className="border-t border-muted pt-4">
            <p className="text-sm text-muted-foreground mb-3 text-center">
              Or start with a template:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={() => onAddFromTemplate("satisfaction")}
                variant="secondary"
                size="sm"
              >
                <Star className="w-4 h-4 mr-2" />
                Satisfaction
              </Button>
              <Button
                onClick={() => onAddFromTemplate("recommendation")}
                variant="secondary"
                size="sm"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                NPS
              </Button>
              <Button
                onClick={() => onAddFromTemplate("feedback")}
                variant="secondary"
                size="sm"
              >
                <Type className="w-4 h-4 mr-2" />
                Feedback
              </Button>
              <Button
                onClick={() => onAddFromTemplate("purchase-reason")}
                variant="secondary"
                size="sm"
              >
                <CheckSquare className="w-4 h-4 mr-2" />
                Purchase Reason
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
