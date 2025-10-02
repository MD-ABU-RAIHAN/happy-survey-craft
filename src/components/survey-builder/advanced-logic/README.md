# Advanced Logic Components

This directory contains all components related to the Advanced Logic feature of the survey builder.

## 📁 Directory Structure

```
advanced-logic/
├── AdvancedLogicTab.tsx          # Main tab component for Advanced Logic
├── LogicBuilder.tsx              # Visual logic flow builder with ReactFlow
├── components/                   # UI Components
│   ├── ConditionEditor.tsx       # Editor for creating/editing conditions
│   ├── EdgeLabel.tsx             # Custom edge labels for ReactFlow
│   ├── InspectorPanel.tsx        # Right panel for inspecting nodes/edges
│   ├── LogicAnalytics.tsx        # Analytics and insights for logic flows
│   ├── LogicToolbar.tsx          # Toolbar for canvas actions
│   ├── NodePalette.tsx           # Draggable palette of node types
│   ├── SimulationPanel.tsx       # Simulate logic flows with test data
│   └── SmartSuggestions.tsx      # AI-powered logic suggestions
├── nodes/                        # Custom ReactFlow Nodes
│   ├── ActionNode.tsx            # Node for actions (redirect, coupon, etc.)
│   ├── EndNode.tsx               # Terminal node for flow completion
│   ├── QuestionNode.tsx          # Node representing survey questions
│   ├── ShopifyNode.tsx           # Shopify-specific integration node
│   └── StartNode.tsx             # Entry point node for flows
├── utils/                        # Utilities and Helpers
│   ├── constants.ts              # Constants, colors, validation messages
│   ├── evaluation.ts             # Logic evaluation engine
│   └── validation.ts             # Flow validation utilities
└── hooks/                        # Custom React Hooks (future)
    └── index.ts
```

## 🚀 Usage

### Importing Components

```typescript
// Import main components
import { AdvancedLogicTab, LogicBuilder } from '@/components/survey-builder/advanced-logic';

// Import specific sub-components
import { ConditionEditor, NodePalette } from '@/components/survey-builder/advanced-logic/components';

// Import nodes
import { QuestionNode, StartNode } from '@/components/survey-builder/advanced-logic/nodes';

// Import utilities
import { validateSurveyLogic, OPERATOR_LABELS } from '@/components/survey-builder/advanced-logic/utils';
```

### Example: Using AdvancedLogicTab

```typescript
<AdvancedLogicTab
  questions={surveyQuestions}
  surveyId={surveyId}
  surveyLogic={existingLogic}
  onSave={(logic) => console.log('Logic saved:', logic)}
  onOpenBuilder={(questionId) => openBuilder(questionId)}
/>
```

### Example: Using LogicBuilder

```typescript
<LogicBuilder
  questions={surveyQuestions}
  surveyId={surveyId}
  initialLogic={existingLogic}
  onSave={(logic) => saveSurveyLogic(logic)}
  onCancel={() => closeBuilder()}
/>
```

## 🎯 Key Features

### 1. **Visual Logic Builder**
- Drag-and-drop interface for creating survey logic flows
- Multiple node types: Start, Question, Action, End, Shopify
- Custom conditions and actions on edges
- Real-time validation

### 2. **Smart Suggestions**
- AI-powered logic recommendations based on question types
- Common patterns (NPS follow-up, rating recovery, etc.)
- Optimization suggestions for better completion rates

### 3. **Simulation & Testing**
- Test logic flows with mock respondent data
- Step-through simulation to verify flow paths
- Real-time visualization of active paths

### 4. **Analytics**
- Path analysis to identify common flows
- Drop-off point detection
- Performance metrics and insights

## 🛠️ Utilities

### Constants (`utils/constants.ts`)
- `OPERATOR_LABELS`: Human-readable operator names
- `OPERATOR_CATEGORIES`: Operators grouped by type
- `NODE_COLORS`: Color schemes for different node types
- `VALIDATION_MESSAGES`: Standardized error messages

### Validation (`utils/validation.ts`)
- `validateSurveyLogic()`: Validates entire logic structure
- `isLogicFlowComplete()`: Checks if flow has valid start-to-end path
- Detects circular references and disconnected nodes

### Evaluation (`utils/evaluation.ts`)
- `evaluateCondition()`: Evaluates conditions against respondent context
- `findMatchingEdge()`: Finds the first matching conditional edge
- Supports 20+ operators including sentiment analysis

## 📋 Component Responsibilities

| Component | Purpose |
|-----------|---------|
| **AdvancedLogicTab** | Main entry point, lists questions with logic status |
| **LogicBuilder** | Canvas for building visual logic flows |
| **ConditionEditor** | Modal for creating/editing edge conditions |
| **InspectorPanel** | Shows details and settings for selected nodes/edges |
| **NodePalette** | Provides draggable node templates |
| **SimulationPanel** | Test and simulate logic flows |
| **SmartSuggestions** | Contextual AI suggestions for logic patterns |
| **LogicAnalytics** | Analytics dashboard for logic performance |

## 🔧 Development Guidelines

### Adding New Node Types

1. Create node component in `nodes/`
2. Add to `nodes/index.ts`
3. Register in `LogicBuilder.tsx` nodeTypes
4. Add colors/config to `utils/constants.ts`

### Adding New Operators

1. Add to `Operator` type in `@/types/logic`
2. Add label to `OPERATOR_LABELS` in `utils/constants.ts`
3. Implement evaluation logic in `utils/evaluation.ts`

### Adding New Utilities

1. Create file in `utils/`
2. Export from `utils/index.ts`
3. Document with JSDoc comments

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build
npm run build

# Run tests (when available)
npm test
```

## 📚 Related Types

All TypeScript types are defined in [`@/types/logic.ts`](../../../../types/logic.ts):
- `SurveyLogic`
- `LogicNode`
- `LogicEdge`
- `Condition`
- `RespondentContext`
- And more...

## 🤝 Contributing

When adding new features:
1. Follow the existing directory structure
2. Update index files for clean exports
3. Add JSDoc comments for public APIs
4. Keep components focused and single-responsibility
5. Update this README with new components/utilities

## 📝 Notes

- All components use TypeScript for type safety
- ReactFlow is used for the visual canvas
- Tailwind CSS for styling
- Shadcn UI components for consistency
