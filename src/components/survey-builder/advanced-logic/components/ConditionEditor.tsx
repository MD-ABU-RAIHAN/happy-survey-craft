import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { SurveyQuestion, Condition, Clause, Operator } from "@/types/logic";
import { OPERATOR_LABELS } from "../utils";

interface ConditionEditorProps {
  isOpen: boolean;
  onClose: () => void;
  condition?: Condition;
  questions: SurveyQuestion[];
  onSave: (condition: Condition, label: string) => void;
}

const operatorLabels = OPERATOR_LABELS;

const ConditionEditor: React.FC<ConditionEditorProps> = ({
  isOpen,
  onClose,
  condition,
  questions,
  onSave,
}) => {
  const [editingCondition, setEditingCondition] = useState<Condition>({
    type: "single",
    clauses: [{ subject: "", operator: "equals", value: "" }],
  });

  useEffect(() => {
    if (condition) {
      setEditingCondition(condition);
    } else {
      setEditingCondition({
        type: "single",
        clauses: [{ subject: "", operator: "equals", value: "" }],
      });
    }
  }, [condition, isOpen]);

  const addClause = () => {
    setEditingCondition((prev) => ({
      ...prev,
      clauses: [
        ...prev.clauses,
        { subject: "", operator: "equals", value: "" },
      ],
    }));
  };

  const removeClause = (index: number) => {
    setEditingCondition((prev) => ({
      ...prev,
      clauses: prev.clauses.filter((_, i) => i !== index),
    }));
  };

  const updateClause = (index: number, updates: Partial<Clause>) => {
    setEditingCondition((prev) => ({
      ...prev,
      clauses: prev.clauses.map((clause, i) =>
        i === index ? { ...clause, ...updates } : clause
      ),
    }));
  };

  const generateLabel = (condition: Condition): string => {
    if (condition.clauses.length === 0) return "No conditions";

    if (condition.clauses.length === 1) {
      const clause = condition.clauses[0];
      const question = questions.find((q) => q.id === clause.subject);
      const questionLabel = question
        ? question.title.substring(0, 20)
        : clause.subject;
      return `If ${questionLabel} ${operatorLabels[clause.operator]} ${
        clause.value
      }`;
    }

    const mode = condition.mode || "AND";
    return `If ${condition.clauses.length} conditions (${mode})`;
  };

  const handleSave = () => {
    const validClauses = editingCondition.clauses.filter(
      (clause) => clause.subject && clause.operator
    );

    if (validClauses.length === 0) {
      return;
    }

    const finalCondition: Condition = {
      ...editingCondition,
      clauses: validClauses,
      type: validClauses.length > 1 ? "composite" : "single",
    };

    const label = generateLabel(finalCondition);
    onSave(finalCondition, label);
  };

  const getSubjectOptions = () => {
    const options = [
      // Individual questions
      ...questions.map((q) => ({ value: q.id, label: q.title })),

      // Customer data
      { value: "customer.ltv", label: "Customer LTV" },
      { value: "customer.orderCount", label: "Order Count" },
      { value: "customer.totalSpent", label: "Total Spent" },
      { value: "customer.averageOrderValue", label: "Average Order Value" },
      { value: "customer.loyaltyTier", label: "Loyalty Tier" },
      { value: "customer.riskScore", label: "Risk Score" },
      { value: "customer.tags", label: "Customer Tags" },

      // Session & device data
      { value: "session.device", label: "Device Type" },
      { value: "session.channel", label: "Channel" },
      { value: "session.location.country", label: "Country" },
      { value: "session.location.region", label: "Region" },
      { value: "session.timeZone", label: "Time Zone" },

      // Analytics & behavior
      { value: "analytics.completionTime", label: "Time to Complete" },
      { value: "analytics.engagementScore", label: "Engagement Score" },
      { value: "analytics.qualityScore", label: "Response Quality" },
      { value: "analytics.abandonmentRisk", label: "Abandonment Risk" },

      // Multi-question aggregations
      { value: "aggregate.rating_average", label: "Average Rating (All Questions)" },
      { value: "aggregate.rating_sum", label: "Total Rating Score" },
      { value: "aggregate.satisfaction_count", label: "Positive Responses Count" },
      { value: "aggregate.completion_percentage", label: "Completion Percentage" },

      // External data
      { value: "external.weather.temperature", label: "Temperature" },
      { value: "external.weather.condition", label: "Weather Condition" },
      { value: "external.market.businessHours", label: "Business Hours" },
      { value: "external.market.holiday", label: "Holiday" },
    ];
    return options;
  };

  const getOperatorOptions = (subject: string): Operator[] => {
    // Numeric fields (LTV, scores, counts, etc.)
    if (subject.includes("ltv") || subject.includes("orderCount") || subject.includes("totalSpent") ||
        subject.includes("averageOrderValue") || subject.includes("Score") || subject.includes("Risk") ||
        subject.includes("completionTime") || subject.includes("temperature") || subject.includes("aggregate")) {
      return ["equals", "not_equals", "gt", "gte", "lt", "lte", "between", "not_between"];
    }

    // Text fields that support advanced text operations
    if (subject.includes("tags") || subject.includes("loyaltyTier") || subject.includes("channel") ||
        subject.includes("device") || subject.includes("country") || subject.includes("region") ||
        subject.includes("condition")) {
      return [
        "equals", "not_equals", "contains", "not_contains", "in", "not_in",
        "starts_with", "ends_with", "is_empty", "is_not_empty"
      ];
    }

    // Boolean fields
    if (subject.includes("businessHours") || subject.includes("holiday")) {
      return ["equals", "not_equals"];
    }

    // Time-based analytics
    if (subject.includes("analytics.") && (subject.includes("Time") || subject.includes("Duration"))) {
      return ["equals", "not_equals", "gt", "gte", "lt", "lte", "between", "answered_within"];
    }

    // Behavioral analytics
    if (subject.includes("analytics.") && (subject.includes("changed") || subject.includes("engagement"))) {
      return ["equals", "not_equals", "gt", "gte", "lt", "lte", "changed_answer"];
    }

    // For individual questions, provide operators based on question type
    const question = questions.find(q => q.id === subject);
    if (question) {
      if (question.type === "multiple-choice" || question.type === "single-choice") {
        return ["equals", "not_equals", "in", "not_in"];
      }
      if (question.type === "rating" || question.type === "satisfaction" || question.type === "nps") {
        return ["equals", "not_equals", "gt", "gte", "lt", "lte", "between"];
      }
      if (question.type === "text" || question.type === "short-answer") {
        return [
          "equals", "not_equals", "contains", "not_contains",
          "starts_with", "ends_with", "is_empty", "is_not_empty",
          "sentiment_positive", "sentiment_negative", "sentiment_neutral"
        ];
      }
      if (question.type === "email" || question.type === "phone") {
        return ["equals", "not_equals", "contains", "matches", "is_empty", "is_not_empty"];
      }
    }

    // Default operators for unknown subjects
    return ["equals", "not_equals", "contains", "not_contains"];
  };

  const getValueOptions = (subject: string) => {
    const question = questions.find(q => q.id === subject);
    if (question && (question.type === "multiple-choice" || question.type === "single-choice")) {
      return question.options || [];
    }
    if (question && question.type === "satisfaction") {
      return ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"];
    }
    if (question && question.type === "rating") {
      return ["1", "2", "3", "4", "5"];
    }
    if (question && question.type === "nps") {
      return Array.from({length: 11}, (_, i) => i.toString());
    }
    return [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Condition Editor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Condition Type */}
          {editingCondition.clauses.length > 1 && (
            <div>
              <Label className="text-sm font-medium">Combine with</Label>
              <Select
                value={editingCondition.mode || "AND"}
                onValueChange={(value: "AND" | "OR") =>
                  setEditingCondition((prev) => ({ ...prev, mode: value }))
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">AND</SelectItem>
                  <SelectItem value="OR">OR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Clauses */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Conditions</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addClause}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Condition
              </Button>
            </div>

            {editingCondition.clauses.map((clause, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    Condition {index + 1}
                  </Badge>
                  {editingCondition.clauses.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeClause(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Subject */}
                  <div>
                    <Label className="text-xs">Subject</Label>
                    <Select
                      value={clause.subject}
                      onValueChange={(value) =>
                        updateClause(index, { subject: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {getSubjectOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Operator */}
                  <div>
                    <Label className="text-xs">Operator</Label>
                    <Select
                      value={clause.operator}
                      onValueChange={(value: Operator) =>
                        updateClause(index, { operator: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {getOperatorOptions(clause.subject).map((op) => (
                          <SelectItem key={op} value={op}>
                            {operatorLabels[op]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Value */}
                  <div>
                    <Label className="text-xs">Value</Label>
                    {clause.operator === "exists" ||
                    clause.operator === "not_exists" ? (
                      <Input
                        disabled
                        value="(not required)"
                        className="text-xs"
                      />
                    ) : (() => {
                      const valueOptions = getValueOptions(clause.subject);

                      if (valueOptions.length > 0) {
                        return (
                          <Select
                            value={(clause.value as string) || ""}
                            onValueChange={(value) =>
                              updateClause(index, { value })
                            }
                          >
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="Select option..." />
                            </SelectTrigger>
                            <SelectContent>
                              {valueOptions.map((option, optIndex) => (
                                <SelectItem key={optIndex} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        );
                      }

                      return (
                        <Input
                          value={(clause.value as string) || ""}
                          onChange={(e) =>
                            updateClause(index, { value: e.target.value })
                          }
                          placeholder="Enter value..."
                          className="text-xs"
                        />
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="border-t pt-3">
            <Label className="text-sm font-medium">Preview</Label>
            <div className="bg-muted rounded-lg p-3 text-sm">
              {generateLabel(editingCondition)}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Condition</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConditionEditor;
