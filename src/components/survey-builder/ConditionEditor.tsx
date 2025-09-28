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

interface ConditionEditorProps {
  isOpen: boolean;
  onClose: () => void;
  condition?: Condition;
  questions: SurveyQuestion[];
  onSave: (condition: Condition, label: string) => void;
}

const operatorLabels: Record<Operator, string> = {
  equals: "equals",
  not_equals: "does not equal",
  contains: "contains",
  not_contains: "does not contain",
  gt: "is greater than",
  gte: "is greater than or equal to",
  lt: "is less than",
  lte: "is less than or equal to",
  in: "is one of",
  not_in: "is not one of",
  matches: "matches pattern",
  exists: "exists",
  not_exists: "does not exist",
};

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
      ...questions.map((q) => ({ value: q.id, label: q.title })),
      { value: "customer.ltv", label: "Customer LTV" },
      { value: "customer.orderCount", label: "Order Count" },
      { value: "session.device", label: "Device Type" },
    ];
    return options;
  };

  const getOperatorOptions = (subject: string): Operator[] => {
    if (subject.includes("ltv") || subject.includes("orderCount")) {
      return ["equals", "not_equals", "gt", "gte", "lt", "lte"];
    }
    if (subject.includes("device") || subject.includes("tag")) {
      return [
        "equals",
        "not_equals",
        "contains",
        "not_contains",
        "in",
        "not_in",
      ];
    }
    return ["equals", "not_equals", "contains", "not_contains"];
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
                    ) : (
                      <Input
                        value={(clause.value as string) || ""}
                        onChange={(e) =>
                          updateClause(index, { value: e.target.value })
                        }
                        placeholder="Enter value..."
                        className="text-xs"
                      />
                    )}
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
