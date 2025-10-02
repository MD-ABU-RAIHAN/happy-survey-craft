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
  | "not_exists"
  // Advanced operators
  | "starts_with"
  | "ends_with"
  | "is_empty"
  | "is_not_empty"
  | "between"
  | "not_between"
  | "answered_within"
  | "changed_answer"
  | "sentiment_positive"
  | "sentiment_negative"
  | "sentiment_neutral";

export interface Clause {
  subject: string; // e.g. 'q1', 'customer.ltv', 'analytics.completion_time'
  operator: Operator;
  value?: string | number | boolean | string[] | number[];
  // Enhanced properties for advanced logic
  secondaryValue?: string | number; // for 'between' operations
  timeUnit?: 'seconds' | 'minutes' | 'hours'; // for time-based operations
  aggregation?: 'sum' | 'average' | 'count' | 'max' | 'min'; // for multi-question logic
  questionIds?: string[]; // for multi-question aggregation
}

export interface Condition {
  type: "single" | "composite" | "smart" | "behavioral" | "aggregate";
  mode?: "AND" | "OR";
  clauses: Clause[];
  // Advanced condition properties
  smartType?: "answer_pattern" | "response_quality" | "engagement_score";
  threshold?: number; // for behavioral/engagement scoring
  timeWindow?: number; // time window for behavioral analysis
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
  nodes: LogicNode[];
  edges: LogicEdge[];
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
    // Enhanced customer data
    totalSpent?: number;
    averageOrderValue?: number;
    lastPurchaseDate?: string;
    preferredCategories?: string[];
    loyaltyTier?: string;
    riskScore?: number;
  };
  session?: {
    device?: string;
    channel?: string;
    referrer?: string;
    // Enhanced session data
    timeZone?: string;
    location?: {
      country?: string;
      region?: string;
      city?: string;
    };
    userAgent?: string;
    startTime?: Date;
    currentTime?: Date;
  };
  analytics?: {
    // Response behavior analytics
    questionTimings: Record<string, number>; // time spent per question
    answerChanges: Record<string, number>; // number of times answer was changed
    completionTime?: number; // total time so far
    engagementScore?: number; // calculated engagement score
    qualityScore?: number; // response quality score
    abandonmentRisk?: number; // likelihood to abandon (0-1)
    // Answer patterns
    answerPatterns?: string[]; // detected patterns like "straight-lining"
    responseConsistency?: number; // consistency score across questions
  };
  external?: {
    // External data integrations
    weather?: {
      temperature?: number;
      condition?: string;
      season?: string;
    };
    market?: {
      businessHours?: boolean;
      timezone?: string;
      holiday?: boolean;
    };
    inventory?: Record<string, number>; // product availability
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

// Smart suggestion system interfaces
export interface LogicSuggestion {
  id: string;
  type: 'condition' | 'action' | 'flow';
  title: string;
  description: string;
  confidence: number; // 0-1 confidence score
  category: 'common_pattern' | 'optimization' | 'personalization' | 'engagement';
  suggestedLogic: Partial<Condition>;
  applicableQuestions: string[];
  expectedImprovement?: {
    completionRate?: number;
    responseQuality?: number;
    engagement?: number;
  };
}

export interface LogicPattern {
  id: string;
  name: string;
  description: string;
  category: string;
  template: {
    conditions: Condition[];
    actions: Action[];
  };
  usageStats: {
    popularity: number;
    successRate: number;
    industryFit: string[];
  };
}

// Analytics and insights interfaces
export interface LogicAnalytics {
  pathAnalysis: {
    mostCommonPaths: Array<{
      path: string[];
      frequency: number;
      averageCompletionTime: number;
    }>;
    dropOffPoints: Array<{
      nodeId: string;
      dropOffRate: number;
      reasonAnalysis: string[];
    }>;
  };
  performanceMetrics: {
    averageCompletionTime: number;
    completionRate: number;
    engagementScore: number;
    responseQuality: number;
  };
  optimizationOpportunities: LogicSuggestion[];
}

// Template system enhancements
export interface LogicTemplate {
  id: string;
  name: string;
  description: string;
  category: 'ecommerce' | 'saas' | 'healthcare' | 'education' | 'general';
  industry?: string[];
  goal: 'nps' | 'satisfaction' | 'lead_qualification' | 'segmentation' | 'feedback';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedSetupTime: number; // in minutes
  nodes: LogicNode[];
  edges: LogicEdge[];
  requiredQuestionTypes: string[];
  suggestedQuestions: Array<{
    type: string;
    title: string;
    options?: string[];
  }>;
  expectedOutcomes: {
    completionRate: number;
    responseQuality: number;
    actionableInsights: string[];
  };
  tags: string[];
}
