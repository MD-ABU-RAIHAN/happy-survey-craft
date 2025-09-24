/**
 * Question Template Grid Component
 * Displays available question templates for selection
 */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QUESTION_TEMPLATES } from "@/constants";
import { SurveyQuestion } from "@/types";

interface QuestionTemplateGridProps {
  onTemplateSelect: (template: Omit<SurveyQuestion, "id">) => void;
  className?: string;
}

export const QuestionTemplateGrid: React.FC<QuestionTemplateGridProps> = ({
  onTemplateSelect,
  className,
}) => {
  const templateEntries = Object.entries(QUESTION_TEMPLATES);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {templateEntries.map(([templateKey, template]) => (
        <Card
          key={templateKey}
          className="hover:shadow-md transition-all duration-200 cursor-pointer group"
          onClick={() =>
            onTemplateSelect({
              ...template,
              required: false,
              isCollapsed: false,
            })
          }
        >
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="bg-survey-primary/10 text-survey-primary border-survey-primary/20"
              >
                {template.type
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </Badge>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-survey-primary hover:bg-survey-primary/10"
                >
                  +
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm mb-1 text-foreground group-hover:text-survey-primary transition-colors">
                {template.title}
              </h3>
              {template.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
              )}
            </div>

            {template.options && template.options.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Sample options:</p>
                <div className="flex flex-wrap gap-1">
                  {template.options.slice(0, 2).map((option, optionIndex) => (
                    <Badge
                      key={optionIndex}
                      variant="outline"
                      className="text-xs px-2 py-0.5 border-muted"
                    >
                      {option}
                    </Badge>
                  ))}
                  {template.options.length > 2 && (
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5 border-muted text-muted-foreground"
                    >
                      +{template.options.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {template.placeholder && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Placeholder:</p>
                <p className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground truncate">
                  {template.placeholder}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
