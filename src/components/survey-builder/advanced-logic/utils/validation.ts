import {
  SurveyLogic,
  ValidationResult,
  ValidationError,
  LogicNode,
  LogicEdge,
} from "@/types/logic";
import { VALIDATION_MESSAGES } from "./constants";

/**
 * Validates the entire survey logic structure
 */
export const validateSurveyLogic = (logic: SurveyLogic): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Check for start node
  const startNodes = logic.nodes.filter((n) => n.type === "start");
  if (startNodes.length === 0) {
    errors.push({
      type: "error",
      message: VALIDATION_MESSAGES.NO_START_NODE,
    });
  }

  // Check for end node
  const endNodes = logic.nodes.filter((n) => n.type === "end");
  if (endNodes.length === 0) {
    warnings.push({
      type: "warning",
      message: VALIDATION_MESSAGES.NO_END_NODE,
    });
  }

  // Check for disconnected nodes
  const disconnectedNodes = findDisconnectedNodes(logic.nodes, logic.edges);
  disconnectedNodes.forEach((node) => {
    errors.push({
      type: "error",
      message: `${VALIDATION_MESSAGES.DISCONNECTED_NODE}: ${node.id}`,
      nodeId: node.id,
    });
  });

  // Check for circular references
  const circularPaths = detectCircularReferences(logic.nodes, logic.edges);
  if (circularPaths.length > 0) {
    errors.push({
      type: "error",
      message: VALIDATION_MESSAGES.CIRCULAR_REFERENCE,
    });
  }

  // Validate edges
  logic.edges.forEach((edge) => {
    const edgeErrors = validateEdge(edge, logic.nodes);
    errors.push(...edgeErrors);
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Find nodes that are not connected to any edges
 */
const findDisconnectedNodes = (
  nodes: LogicNode[],
  edges: LogicEdge[]
): LogicNode[] => {
  const connectedNodeIds = new Set<string>();

  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  return nodes.filter(
    (node) => !connectedNodeIds.has(node.id) && node.type !== "start"
  );
};

/**
 * Detect circular references in the logic flow
 */
const detectCircularReferences = (
  nodes: LogicNode[],
  edges: LogicEdge[]
): string[][] => {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const cycles: string[][] = [];

  const dfs = (nodeId: string, path: string[]): void => {
    visited.add(nodeId);
    recursionStack.add(nodeId);
    path.push(nodeId);

    const outgoingEdges = edges.filter((e) => e.source === nodeId);

    for (const edge of outgoingEdges) {
      if (!visited.has(edge.target)) {
        dfs(edge.target, [...path]);
      } else if (recursionStack.has(edge.target)) {
        // Found a cycle
        const cycleStart = path.indexOf(edge.target);
        cycles.push(path.slice(cycleStart));
      }
    }

    recursionStack.delete(nodeId);
  };

  nodes.forEach((node) => {
    if (!visited.has(node.id)) {
      dfs(node.id, []);
    }
  });

  return cycles;
};

/**
 * Validate a single edge
 */
const validateEdge = (edge: LogicEdge, nodes: LogicNode[]): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Check if source and target nodes exist
  const sourceExists = nodes.some((n) => n.id === edge.source);
  const targetExists = nodes.some((n) => n.id === edge.target);

  if (!sourceExists) {
    errors.push({
      type: "error",
      message: `Source node not found: ${edge.source}`,
      edgeId: edge.id,
    });
  }

  if (!targetExists) {
    errors.push({
      type: "error",
      message: VALIDATION_MESSAGES.MISSING_TARGET,
      edgeId: edge.id,
    });
  }

  // Validate condition if present
  if (edge.condition) {
    const conditionErrors = validateCondition(edge.condition);
    errors.push(
      ...conditionErrors.map((msg) => ({
        type: "error" as const,
        message: msg,
        edgeId: edge.id,
      }))
    );
  }

  return errors;
};

/**
 * Validate a condition
 */
const validateCondition = (condition: any): string[] => {
  const errors: string[] = [];

  if (!condition.clauses || condition.clauses.length === 0) {
    errors.push(VALIDATION_MESSAGES.INVALID_CONDITION);
    return errors;
  }

  condition.clauses.forEach((clause: any, index: number) => {
    if (!clause.subject) {
      errors.push(`Clause ${index + 1}: Subject is required`);
    }
    if (!clause.operator) {
      errors.push(`Clause ${index + 1}: Operator is required`);
    }
    // Some operators don't require a value (exists, not_exists, etc.)
    const noValueOperators = [
      "exists",
      "not_exists",
      "is_empty",
      "is_not_empty",
    ];
    if (
      !noValueOperators.includes(clause.operator) &&
      (clause.value === undefined || clause.value === "")
    ) {
      errors.push(`Clause ${index + 1}: Value is required`);
    }
  });

  return errors;
};

/**
 * Check if a logic flow is complete (has valid path from start to end)
 */
export const isLogicFlowComplete = (logic: SurveyLogic): boolean => {
  const startNodes = logic.nodes.filter((n) => n.type === "start");
  const endNodes = logic.nodes.filter((n) => n.type === "end");

  if (startNodes.length === 0 || endNodes.length === 0) {
    return false;
  }

  // Check if there's a path from start to end
  return startNodes.some((startNode) =>
    endNodes.some((endNode) => hasPath(startNode.id, endNode.id, logic.edges))
  );
};

/**
 * Check if there's a path between two nodes
 */
const hasPath = (
  sourceId: string,
  targetId: string,
  edges: LogicEdge[]
): boolean => {
  if (sourceId === targetId) return true;

  const visited = new Set<string>();
  const queue = [sourceId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;

    visited.add(current);

    if (current === targetId) return true;

    const outgoingEdges = edges.filter((e) => e.source === current);
    outgoingEdges.forEach((edge) => {
      if (!visited.has(edge.target)) {
        queue.push(edge.target);
      }
    });
  }

  return false;
};
