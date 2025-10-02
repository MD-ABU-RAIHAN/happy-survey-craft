import { Operator } from "@/types/logic";

/**
 * Human-readable labels for logic operators
 */
export const OPERATOR_LABELS: Record<Operator, string> = {
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
  starts_with: "starts with",
  ends_with: "ends with",
  is_empty: "is empty",
  is_not_empty: "is not empty",
  between: "is between",
  not_between: "is not between",
  answered_within: "was answered within",
  changed_answer: "changed answer",
  sentiment_positive: "has positive sentiment",
  sentiment_negative: "has negative sentiment",
  sentiment_neutral: "has neutral sentiment",
};

/**
 * Operators grouped by category for better UX
 */
export const OPERATOR_CATEGORIES = {
  comparison: ["equals", "not_equals", "gt", "gte", "lt", "lte"] as Operator[],
  text: ["contains", "not_contains", "starts_with", "ends_with", "matches"] as Operator[],
  list: ["in", "not_in"] as Operator[],
  existence: ["exists", "not_exists", "is_empty", "is_not_empty"] as Operator[],
  range: ["between", "not_between"] as Operator[],
  behavioral: ["answered_within", "changed_answer"] as Operator[],
  sentiment: ["sentiment_positive", "sentiment_negative", "sentiment_neutral"] as Operator[],
};

/**
 * Default node positions for auto-layout
 */
export const DEFAULT_NODE_POSITIONS = {
  start: { x: 250, y: 50 },
  question: { x: 250, y: 150 },
  action: { x: 250, y: 250 },
  end: { x: 250, y: 350 },
  shopify: { x: 250, y: 250 },
};

/**
 * Grid snap settings for canvas
 */
export const GRID_SIZE = 15;
export const SNAP_TO_GRID = true;

/**
 * Canvas zoom settings
 */
export const ZOOM_SETTINGS = {
  min: 0.5,
  max: 2,
  step: 0.1,
  default: 1,
};

/**
 * Color scheme for different node types
 */
export const NODE_COLORS = {
  start: {
    background: "from-green-50 to-emerald-50",
    border: "border-green-300",
    icon: "text-green-600",
  },
  end: {
    background: "from-red-50 to-rose-50",
    border: "border-red-300",
    icon: "text-red-600",
  },
  question: {
    background: "from-blue-50 to-indigo-50",
    border: "border-blue-300",
    icon: "text-blue-600",
  },
  action: {
    background: "from-purple-50 to-violet-50",
    border: "border-purple-300",
    icon: "text-purple-600",
  },
  shopify: {
    background: "from-green-50 to-teal-50",
    border: "border-green-400",
    icon: "text-green-700",
  },
};

/**
 * Validation messages
 */
export const VALIDATION_MESSAGES = {
  NO_START_NODE: "Logic flow must have at least one start node",
  NO_END_NODE: "Logic flow must have at least one end node",
  DISCONNECTED_NODE: "All nodes must be connected to the flow",
  INVALID_CONDITION: "Condition is incomplete or invalid",
  CIRCULAR_REFERENCE: "Circular reference detected in flow",
  MISSING_TARGET: "Edge must have a valid target node",
  DUPLICATE_DEFAULT: "Only one default path is allowed per node",
};
