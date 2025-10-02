import {
  Condition,
  Clause,
  RespondentContext,
  EvaluationResult,
  Operator,
} from "@/types/logic";

/**
 * Evaluates a condition against the respondent context
 */
export const evaluateCondition = (
  condition: Condition,
  context: RespondentContext
): EvaluationResult => {
  const evaluatedClauses = condition.clauses.map((clause) => ({
    clause,
    result: evaluateClause(clause, context),
    actualValue: getClauseValue(clause.subject, context),
  }));

  let passed: boolean;

  if (condition.type === "single" || !condition.mode) {
    // Single condition or no mode specified - all clauses must pass
    passed = evaluatedClauses.every((ec) => ec.result);
  } else if (condition.mode === "AND") {
    passed = evaluatedClauses.every((ec) => ec.result);
  } else {
    // OR mode
    passed = evaluatedClauses.some((ec) => ec.result);
  }

  return {
    passed,
    evaluatedClauses,
  };
};

/**
 * Evaluates a single clause
 */
const evaluateClause = (
  clause: Clause,
  context: RespondentContext
): boolean => {
  const actualValue = getClauseValue(clause.subject, context);
  return compareValues(actualValue, clause.operator, clause.value, clause);
};

/**
 * Gets the actual value from context based on the subject path
 */
const getClauseValue = (
  subject: string,
  context: RespondentContext
): string | number | boolean | string[] | null | undefined => {
  // Handle question answers (e.g., "q1", "q2")
  if (subject.startsWith("q")) {
    return context.answers[subject];
  }

  // Handle nested paths (e.g., "customer.ltv", "session.device")
  const parts = subject.split(".");
  let value: any = context;

  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = value[part];
    } else {
      return undefined;
    }
  }

  return value;
};

/**
 * Compares values based on the operator
 */
const compareValues = (
  actualValue: string | number | boolean | string[] | null | undefined,
  operator: Operator,
  expectedValue: string | number | boolean | string[] | number[] | undefined,
  clause: Clause
): boolean => {
  // Handle existence operators
  if (operator === "exists") {
    return actualValue !== undefined && actualValue !== null;
  }
  if (operator === "not_exists") {
    return actualValue === undefined || actualValue === null;
  }
  if (operator === "is_empty") {
    return (
      actualValue === "" ||
      actualValue === null ||
      actualValue === undefined ||
      (Array.isArray(actualValue) && actualValue.length === 0)
    );
  }
  if (operator === "is_not_empty") {
    return (
      actualValue !== "" &&
      actualValue !== null &&
      actualValue !== undefined &&
      (!Array.isArray(actualValue) || actualValue.length > 0)
    );
  }

  // For other operators, if actualValue is null/undefined, return false
  if (actualValue === null || actualValue === undefined) {
    return false;
  }

  // Convert to appropriate types for comparison
  const actual = normalizeValue(actualValue);
  const expected = normalizeValue(expectedValue);

  switch (operator) {
    case "equals":
      return actual === expected;

    case "not_equals":
      return actual !== expected;

    case "contains":
      return String(actual).toLowerCase().includes(String(expected).toLowerCase());

    case "not_contains":
      return !String(actual).toLowerCase().includes(String(expected).toLowerCase());

    case "starts_with":
      return String(actual).toLowerCase().startsWith(String(expected).toLowerCase());

    case "ends_with":
      return String(actual).toLowerCase().endsWith(String(expected).toLowerCase());

    case "gt":
      return Number(actual) > Number(expected);

    case "gte":
      return Number(actual) >= Number(expected);

    case "lt":
      return Number(actual) < Number(expected);

    case "lte":
      return Number(actual) <= Number(expected);

    case "in":
      if (Array.isArray(expectedValue)) {
        return expectedValue.some(
          (v) => normalizeValue(v) === actual
        );
      }
      return false;

    case "not_in":
      if (Array.isArray(expectedValue)) {
        return !expectedValue.some(
          (v) => normalizeValue(v) === actual
        );
      }
      return true;

    case "between":
      if (clause.secondaryValue !== undefined) {
        const num = Number(actual);
        return num >= Number(expected) && num <= Number(clause.secondaryValue);
      }
      return false;

    case "not_between":
      if (clause.secondaryValue !== undefined) {
        const num = Number(actual);
        return num < Number(expected) || num > Number(clause.secondaryValue);
      }
      return true;

    case "matches":
      try {
        const regex = new RegExp(String(expected));
        return regex.test(String(actual));
      } catch {
        return false;
      }

    case "answered_within":
      // Time-based comparison (requires analytics data)
      return false; // TODO: Implement based on analytics.questionTimings

    case "changed_answer":
      // Check if answer was changed (requires analytics data)
      return false; // TODO: Implement based on analytics.answerChanges

    case "sentiment_positive":
    case "sentiment_negative":
    case "sentiment_neutral":
      // Sentiment analysis (would require AI integration)
      return false; // TODO: Implement sentiment analysis

    default:
      console.warn(`Unknown operator: ${operator}`);
      return false;
  }
};

/**
 * Normalizes values for comparison
 */
const normalizeValue = (
  value: string | number | boolean | string[] | number[] | null | undefined
): string | number | boolean => {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.join(",");
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value;
  }

  // Try to parse as number if it looks like one
  const str = String(value);
  const num = Number(str);
  if (!isNaN(num) && str.trim() !== "") {
    return num;
  }

  return str;
};

/**
 * Evaluates multiple conditions and returns the first matching edge
 */
export const findMatchingEdge = (
  edges: Array<{ condition?: Condition; id: string }>,
  context: RespondentContext
): string | null => {
  // First, try to find an edge with a passing condition
  for (const edge of edges) {
    if (edge.condition) {
      const result = evaluateCondition(edge.condition, context);
      if (result.passed) {
        return edge.id;
      }
    }
  }

  // If no conditional edge matches, return the first edge without a condition (default path)
  const defaultEdge = edges.find((e) => !e.condition);
  return defaultEdge ? defaultEdge.id : null;
};
