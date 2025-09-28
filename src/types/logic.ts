// Advanced Logic Builder - Type Definitions

// Survey Question interface (imported from main app)
export interface SurveyQuestion {
  id: string;
  type:
    | "multiple-choice"
    | "single-choice"
    | "dropdown"
    | "binary-choice"
    | "text"
    | "rating"
    | "satisfaction"
    | "nps"
    | "email"
    | "phone"
    | "date"
    | "short-answer";
  title: string;
  description?: string;
  required: boolean;
  options?: string[];
  isCollapsed: boolean;
  placeholder?: string;
  imageUrl?: string;
  imageName?: string;
  customAnswer?: {
    enabled: boolean;
    displayMode: "always" | "on-select";
    placeholder: string;
    description?: string;
  };
  // New properties for specific question types
  dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
  // Satisfaction properties
  satisfactionScale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
    showNumbers: boolean;
  };
  maxLength?: number; // For short answer
}

export type NodeType = "start" | "end" | "question" | "action" | "shopify";

export interface LogicNode {
  id: string;
  type: NodeType;
  questionId?: string; // if type === 'question'
  position: { x: number; y: number };
  meta?: Record<string, unknown>;
}

export type Operator =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "not_in"
  | "matches"
  | "exists"
  | "not_exists";

export interface Clause {
  subject: string; // e.g. 'q1', 'customer.ltv'
  operator: Operator;
  value?: string | number | boolean | string[] | number[];
}

export interface Condition {
  type: "single" | "composite";
  mode?: "AND" | "OR";
  clauses: Clause[];
}

export type ActionType =
  | "goto"
  | "redirect"
  | "end"
  | "show_coupon"
  | "disqualify"
  | "thank_you";

export interface Action {
  type: ActionType;
  target?: string;
  payload?: Record<string, string | number | boolean>;
}

export interface LogicEdge {
  id: string;
  source: string;
  target: string;
  condition?: Condition;
  action?: Action;
  label?: string;
  priority?: number;
}

export interface SurveyLogic {
  surveyId: string;
  version: number;
  nodes: LogicNode[];
  edges: LogicEdge[];
  metadata?: {
    lastEditedBy?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

// Runtime context for survey evaluation
export interface RespondentContext {
  answers: Record<string, string | number | boolean | string[]>;
  customer?: {
    id?: string;
    email?: string;
    ltv?: number;
    orderCount?: number;
    tags?: string[];
  };
  session?: {
    device?: string;
    channel?: string;
    referrer?: string;
  };
  meta?: Record<string, string | number | boolean>;
}

// Condition evaluation result
export interface EvaluationResult {
  passed: boolean;
  evaluatedClauses: {
    clause: Clause;
    result: boolean;
    actualValue: string | number | boolean | string[] | null | undefined;
  }[];
}

// Node palette items for drag & drop
export interface NodePaletteItem {
  type: NodeType;
  label: string;
  description: string;
  icon: string;
  defaultMeta?: Record<string, string | number | boolean>;
}

// Validation errors
export interface ValidationError {
  type: "error" | "warning";
  message: string;
  nodeId?: string;
  edgeId?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

// Simulation state
export interface SimulationState {
  isActive: boolean;
  currentNode: string | null;
  visitedNodes: string[];
  respondentContext: RespondentContext;
  path: Array<{
    nodeId: string;
    edgeId?: string;
    timestamp: number;
  }>;
}
