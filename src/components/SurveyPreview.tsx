import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Monitor,
  Smartphone,
  Maximize,
  Star,
  X,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings2,
  Zap,
  CheckCircle,
} from "lucide-react";

import { SurveyLogic, LogicNode, LogicEdge } from "@/types/logic";

interface SurveyQuestion {
  id: string;
  type:
    | "multiple-choice"
    | "single-choice"
    | "text"
    | "rating"
    | "satisfaction"
    | "point-scale"
    | "date";
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
    otherLabel: string;
    placeholder: string;
  };
  dateFormat?: "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
  textInputType?: "single-line" | "multi-line";
  singleChoiceDisplayType?: "radio" | "dropdown";
  // Satisfaction properties
  satisfactionEmojis?: string[];
  // Point scale properties
  pointScale?: {
    min: number;
    max: number;
    lowLabel: string;
    highLabel: string;
    reversed: boolean;
  };
}

interface PostPurchaseSettings {
  userTargeting: {
    type: "all-users" | "segment-users";
    userTag: {
      enabled: boolean;
      selectedTag: string;
    };
    customerType: "all" | "new" | "return";
    productPurchase: {
      enabled: boolean;
      selectedProducts: string[];
    };
  };
  postPurchasePage: {
    shopifyCheckout: boolean;
    installationSteps: {
      orderStatusPage: string;
      thankYouPage: string;
    };
    displayLocation: "thank-you" | "order-status" | "both";
  };
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };
  display: {
    delay: number;
    duration: number;
    position:
      | "center"
      | "bottom-right"
      | "bottom-left"
      | "top-right"
      | "top-left";
    animation:
      | "fade"
      | "slide-up"
      | "slide-down"
      | "slide-right"
      | "slide-left";
  };
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

interface BrandedSurveySettings {
  customUrl: string;
  useCustomDomain: boolean;
  customDomain: string;
  headerLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "center" | "right";
    minimized: boolean;
  };
  sideLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "right";
    minimized: boolean;
  };
  button: {
    textColor: string;
    backgroundColor: string;
    backgroundHoverColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: "normal" | "medium" | "semibold" | "bold";
    minimized: boolean;
    shadow: boolean;
  };
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
  background: {
    type: "solid" | "gradient" | "image";
    solidColor: string;
    gradientStart: string;
    gradientEnd: string;
    gradientDirection:
      | "to-r"
      | "to-l"
      | "to-t"
      | "to-b"
      | "to-br"
      | "to-bl"
      | "to-tr"
      | "to-tl";
    imageUrl: string;
    imageFile: File | null;
    imagePosition: "center" | "top" | "bottom" | "left" | "right";
    imageSize: "cover" | "contain" | "auto";
    overlay: boolean;
    overlayColor: string;
    overlayOpacity: number;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    bodyFont: string;
    fontSize: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
    lineHeight: number;
    letterSpacing: number;
  };
  progressBar: {
    enabled: boolean;
    color: string;
    backgroundColor: string;
    style: "linear" | "circular" | "steps";
    position: "top" | "bottom" | "floating";
    showPercentage: boolean;
  };
  animations: {
    enabled: boolean;
    transitionSpeed: "slow" | "normal" | "fast";
    slideDirection:
      | "fade"
      | "slide-right"
      | "slide-left"
      | "slide-up"
      | "slide-down";
  };
  trustSignals: {
    showSSL: boolean;
    showPrivacyBadge: boolean;
    showDataProtection: boolean;
    customBadgeText: string;
  };
  thankYouPage: {
    enabled: boolean;
    title: string;
    message: string;
    backgroundColor: string;
    textColor: string;
    showSocialShare: boolean;
    redirectUrl: string;
    autoRedirect: boolean;
    redirectDelay: number;
  };
  customCss: {
    enabled: boolean;
    css: string;
  };
}

interface ExitIntentSettings {
  userTargeting: {
    type: "all-users" | "segment-users";
    userTag: {
      enabled: boolean;
      selectedTags: string[];
    };
    newCustomer: boolean;
    returningCustomer: boolean;
    productPurchase: {
      enabled: boolean;
      selectedProducts: string[];
    };
  };
  displayCondition: "cart-empty" | "cart-has-products" | "show-always";
  recurrence: "only-once" | "once-per-session";
  position: "bottom-left" | "center" | "bottom-right";
  device: "all-devices" | "desktop" | "mobile";
  exitIntentTimer: {
    enabled: boolean;
    seconds: number;
  };
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

interface EmailCampaignSettings {
  userTargeting: {
    type: "all-users" | "segment-users";
    userTag: {
      enabled: boolean;
      selectedTags: string[];
    };
    newCustomer: boolean;
    returningCustomer: boolean;
    productPurchase: {
      enabled: boolean;
      selectedProducts: string[];
    };
  };
  emailConfig: {
    delayAfter: number;
    sendFrom: string;
    blockDuplicate: number;
  };
  headerLogo: {
    enabled: boolean;
    url: string;
    file: File | null;
    size: "small" | "medium" | "large";
    position: "left" | "center" | "right";
    minimized: boolean;
  };
  content: {
    subject: string;
    body: string;
  };
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

interface OnSitePopupSettings {
  userTargeting: {
    type: "all-users" | "segment-users";
    userTag: {
      enabled: boolean;
      selectedTags: string[];
    };
    newCustomer: boolean;
    returningCustomer: boolean;
    productPurchase: {
      enabled: boolean;
      selectedProducts: string[];
    };
  };
  timing: {
    type: "standard" | "immediate" | "custom-trigger" | "advanced-triggers";
    delay: number;
    customTriggerCode: string;
    advancedTriggers: {
      timeOnSite: {
        enabled: boolean;
        seconds: number;
      };
      idleTime: {
        enabled: boolean;
        seconds: number;
      };
      scrollDepth: {
        enabled: boolean;
        percentage: number;
      };
    };
  };
  recurrence: "only-once" | "once-per-session";
  pageTargeting: {
    type: "all-pages" | "specific-pages";
    excludePagesEnabled: boolean;
    specificPages: {
      homePage: boolean;
      productPages: {
        enabled: boolean;
        type: "all" | "specific";
        selectedProducts: string[];
      };
      blogPages: boolean;
      collectionPages: boolean;
      cartPage: boolean;
      customPages: {
        enabled: boolean;
        selectedPages: string[];
      };
    };
    excludePages: {
      homePage: boolean;
      productPages: boolean;
      collectionPages: boolean;
      cartPage: boolean;
      blogPages: boolean;
      customPages: {
        enabled: boolean;
        selectedPages: string[];
      };
    };
  };
  display: {
    position: "bottom-left" | "center" | "bottom-right";
  };
  button: {
    enabled: boolean;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    fontSize: number;
    fontWeight: string;
    backgroundHoverColor: string;
    shadow: boolean;
  };
  section: {
    primaryText: string;
    secondaryText: string;
    accentColor: string;
    backgroundColor: string;
    backgroundType: "solid" | "gradient" | "image";
    gradientFrom: string;
    gradientTo: string;
    gradientDirection:
      | "to-r"
      | "to-br"
      | "to-b"
      | "to-bl"
      | "to-l"
      | "to-tl"
      | "to-t"
      | "to-tr";
    backgroundImage: string;
    backgroundImageOpacity: number;
    backgroundImagePosition:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "cover"
      | "contain";
    customCss: string;
    enableCustomCss: boolean;
  };
}

interface SurveyPreviewProps {
  questions: SurveyQuestion[];
  previewDevice: "desktop" | "mobile" | "full";
  setPreviewDevice: (device: "desktop" | "mobile" | "full") => void;
  distributionType:
    | "post-purchase"
    | "onsite"
    | "exit-intent"
    | "email-campaign"
    | "dedicated-survey-page";
  previewDistribution:
    | "dedicated-survey-page"
    | "post-purchase"
    | "exit-intent"
    | "email-campaign"
    | "onsite-popup";
  setPreviewDistribution: (
    distribution:
      | "dedicated-survey-page"
      | "post-purchase"
      | "exit-intent"
      | "email-campaign"
      | "onsite-popup"
  ) => void;
  distributionTypes: Array<{
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bgColor: string;
    borderColor: string;
  }>;
  discountEnabled: boolean;
  discountType: "percentage" | "fixed";
  discountValue: string;
  discountCode?: string;
  discountDescription?: string;
  discountExpiryDays?: string;
  brandedSurveySettings?: BrandedSurveySettings;
  postPurchaseSettings?: PostPurchaseSettings;
  exitIntentSettings?: ExitIntentSettings;
  emailCampaignSettings?: EmailCampaignSettings;
  onSitePopupSettings?: OnSitePopupSettings;
  // Pagination settings
  paginationEnabled?: boolean;
  questionsPerPage?: number;
  onPaginationChange?: (enabled: boolean) => void;
  onQuestionsPerPageChange?: (count: number) => void;
  // Active question sync
  expandedQuestionId?: string | null;
  // Logic flow properties
  activeLogic?: SurveyLogic | null;
  activeLogicName?: string | null;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({
  questions,
  previewDevice,
  setPreviewDevice,
  distributionType,
  previewDistribution,
  setPreviewDistribution,
  distributionTypes,
  discountEnabled,
  discountType,
  discountValue,
  discountCode,
  discountDescription,
  discountExpiryDays,
  brandedSurveySettings,
  postPurchaseSettings,
  exitIntentSettings,
  emailCampaignSettings,
  onSitePopupSettings,
  paginationEnabled = false,
  questionsPerPage = 1,
  onPaginationChange,
  onQuestionsPerPageChange,
  expandedQuestionId,
  activeLogic,
  activeLogicName,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [showPaginationSettings, setShowPaginationSettings] = useState(false);

  // Interactive survey state
  const [surveyResponses, setSurveyResponses] = useState<Record<string, any>>(
    {}
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionHistory, setQuestionHistory] = useState<number[]>([0]);
  const [isLogicMode, setIsLogicMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate pagination
  const totalPages = paginationEnabled
    ? Math.ceil(questions.length / questionsPerPage)
    : 1;

  const currentQuestions = isLogicMode
    ? [questions[currentQuestionIndex]].filter(Boolean) // Show only current question in logic mode
    : paginationEnabled
    ? questions.slice(
        currentPage * questionsPerPage,
        (currentPage + 1) * questionsPerPage
      )
    : questions;

  // Reset to first page when questions change or pagination settings change
  React.useEffect(() => {
    setCurrentPage(0);
  }, [questions.length, paginationEnabled, questionsPerPage]);

  // Auto-navigate to the page containing the expanded question
  React.useEffect(() => {
    if (expandedQuestionId && paginationEnabled && questionsPerPage > 0) {
      const questionIndex = questions.findIndex(
        (q) => q.id === expandedQuestionId
      );
      if (questionIndex !== -1) {
        const targetPage = Math.floor(questionIndex / questionsPerPage);
        setCurrentPage(targetPage);
      }
    }
  }, [expandedQuestionId, questions, paginationEnabled, questionsPerPage]);

  // Initialize logic mode when active logic changes
  React.useEffect(() => {
    if (activeLogic) {
      console.log("🎯 Activating logic mode with logic:", activeLogic);
      console.log(
        "📊 Logic has",
        activeLogic.nodes?.length,
        "nodes and",
        activeLogic.edges?.length,
        "edges"
      );

      setIsLogicMode(true);
      setCurrentQuestionIndex(0);
      setQuestionHistory([0]);

      // Log all available questions for debugging
      console.log(
        "📝 Available questions:",
        questions.map((q) => ({ id: q.id, title: q.title, type: q.type }))
      );
    } else {
      console.log("❌ Deactivating logic mode");
      setIsLogicMode(false);
    }
  }, [activeLogic, questions]);

  // Logic execution engine
  const evaluateCondition = (
    condition: any,
    questionId: string,
    response: any
  ): boolean => {
    if (!condition) {
      console.log("⚠️ No condition provided, defaulting to true");
      return true; // No condition means always true
    }

    console.log("🔍 Evaluating condition:", {
      condition,
      response,
      questionId,
    });

    const { operator, value, field } = condition;

    // Handle different response types
    let actualResponse = response;

    // For multiple choice questions, response might be an array
    if (Array.isArray(response)) {
      console.log("📝 Response is array:", response);

      // For contains operator, check if value is in array
      if (operator === "contains") {
        const result = response.includes(value);
        console.log(`✅ Array contains "${value}":`, result);
        return result;
      }

      // For other operators, use the first selected value or join as string
      actualResponse = response.length > 0 ? response[0] : "";
      console.log("🔄 Using first array value:", actualResponse);
    }

    // Handle different operators
    let result = false;

    switch (operator) {
      case "equals":
      case "equal":
      case "=":
      case "==":
        result =
          String(actualResponse).toLowerCase() === String(value).toLowerCase();
        console.log(
          `📊 Equals check: "${actualResponse}" === "${value}" = ${result}`
        );
        break;

      case "not_equals":
      case "not_equal":
      case "!=":
        result =
          String(actualResponse).toLowerCase() !== String(value).toLowerCase();
        console.log(
          `📊 Not equals check: "${actualResponse}" !== "${value}" = ${result}`
        );
        break;

      case "contains":
        if (Array.isArray(response)) {
          result = response.some((item) =>
            String(item).toLowerCase().includes(String(value).toLowerCase())
          );
        } else {
          result = String(actualResponse)
            .toLowerCase()
            .includes(String(value).toLowerCase());
        }
        console.log(
          `📊 Contains check: "${actualResponse}" contains "${value}" = ${result}`
        );
        break;

      case "greater_than":
      case ">":
        result = Number(actualResponse) > Number(value);
        console.log(
          `📊 Greater than: ${actualResponse} > ${value} = ${result}`
        );
        break;

      case "less_than":
      case "<":
        result = Number(actualResponse) < Number(value);
        console.log(`📊 Less than: ${actualResponse} < ${value} = ${result}`);
        break;

      case "greater_than_or_equal":
      case ">=":
        result = Number(actualResponse) >= Number(value);
        console.log(
          `📊 Greater than or equal: ${actualResponse} >= ${value} = ${result}`
        );
        break;

      case "less_than_or_equal":
      case "<=":
        result = Number(actualResponse) <= Number(value);
        console.log(
          `📊 Less than or equal: ${actualResponse} <= ${value} = ${result}`
        );
        break;

      case "is_empty":
      case "empty":
        result =
          !actualResponse ||
          actualResponse === "" ||
          (Array.isArray(response) && response.length === 0);
        console.log(`📊 Is empty: ${result}`);
        break;

      case "is_not_empty":
      case "not_empty":
        result =
          actualResponse &&
          actualResponse !== "" &&
          (!Array.isArray(response) || response.length > 0);
        console.log(`📊 Is not empty: ${result}`);
        break;

      default:
        console.log(`⚠️ Unknown operator: ${operator}, defaulting to true`);
        result = true;
        break;
    }

    console.log(`🎯 Final condition result:`, result);
    return result;
  };

  const findNextQuestionByLogic = (
    currentQuestionId: string,
    response: any
  ): number | null => {
    if (!activeLogic || !isLogicMode) {
      console.log("🚫 Logic evaluation skipped:", {
        activeLogic: !!activeLogic,
        isLogicMode,
      });
      return null;
    }

    console.log("🔍 Finding logic for question:", currentQuestionId);
    console.log("📚 Available nodes:", activeLogic.nodes);
    console.log("🔗 Available edges:", activeLogic.edges);

    // Find the current question node - try multiple methods
    let currentNode = activeLogic.nodes.find(
      (node: LogicNode) => node.questionId === currentQuestionId
    );

    // If not found by questionId, try finding by node data
    if (!currentNode) {
      currentNode = activeLogic.nodes.find(
        (node: LogicNode) => node.meta?.questionId === currentQuestionId
      );
    }

    // If still not found, try finding by question title/label
    if (!currentNode) {
      const currentQuestion = questions.find((q) => q.id === currentQuestionId);
      if (currentQuestion) {
        currentNode = activeLogic.nodes.find(
          (node: LogicNode) =>
            node.meta?.title === currentQuestion.title ||
            node.meta?.label === currentQuestion.title
        );
      }
    }

    console.log("📋 Current node found:", currentNode);

    if (!currentNode) {
      console.log("❌ No node found for question:", currentQuestionId);
      console.log(
        "🔍 Available question IDs in nodes:",
        activeLogic.nodes.map((n) => ({
          id: n.id,
          questionId: n.questionId,
          meta: n.meta,
        }))
      );
      return null;
    }

    // Find outgoing edges from this node, sorted by priority
    const outgoingEdges = activeLogic.edges
      .filter((edge: LogicEdge) => edge.source === currentNode.id)
      .sort(
        (a: LogicEdge, b: LogicEdge) => (b.priority || 0) - (a.priority || 0)
      );

    console.log("🔗 Outgoing edges found:", outgoingEdges);

    if (outgoingEdges.length === 0) {
      console.log("⚠️ No outgoing edges found for node:", currentNode.id);
      return null;
    }

    // Evaluate conditions to find the matching edge
    for (const edge of outgoingEdges) {
      console.log("🧪 Evaluating edge:", edge);
      const conditionResult = evaluateCondition(
        edge.condition,
        currentQuestionId,
        response
      );
      console.log("✅ Condition result:", conditionResult);

      if (conditionResult) {
        // Find the target question
        const targetNode = activeLogic.nodes.find(
          (node: LogicNode) => node.id === edge.target
        );

        console.log("🎯 Target node found:", targetNode);

        if (targetNode) {
          // Handle special target types first
          if (targetNode.type === "end") {
            console.log("🔚 Target is end node");
            return -1; // End survey
          }

          // Handle action nodes
          if (targetNode.type === "action") {
            console.log(
              "⚡ Target is action node, continuing to next question"
            );
            // For action nodes, we might want to continue to the next question
            // or handle the action and then continue
            const nextIndex = currentQuestionIndex + 1;
            if (nextIndex < questions.length) {
              return nextIndex;
            }
            return -1; // End if no more questions
          }

          // Try to find target question by questionId
          if (targetNode.questionId) {
            const targetIndex = questions.findIndex(
              (q) => q.id === targetNode.questionId
            );
            console.log("📍 Target question index by questionId:", targetIndex);
            if (targetIndex !== -1) {
              return targetIndex;
            }
          }

          // Try to find by meta data
          if (targetNode.meta?.questionId) {
            const targetIndex = questions.findIndex(
              (q) => q.id === targetNode.meta.questionId
            );
            console.log(
              "📍 Target question index by meta.questionId:",
              targetIndex
            );
            if (targetIndex !== -1) {
              return targetIndex;
            }
          }

          // Try to find by title/label
          if (targetNode.meta?.title || targetNode.meta?.label) {
            const targetTitle = targetNode.meta.title || targetNode.meta.label;
            const targetIndex = questions.findIndex(
              (q) => q.title === targetTitle
            );
            console.log("📍 Target question index by title:", targetIndex);
            if (targetIndex !== -1) {
              return targetIndex;
            }
          }

          console.log("❌ Could not map target node to question:", targetNode);
        } else {
          console.log("❌ Target node not found for edge target:", edge.target);
        }
      }
    }

    console.log("🚫 No matching edge condition found");
    return null; // No matching condition, continue normally
  };

  // Survey interaction helpers
  const handleQuestionResponse = (questionId: string, response: any) => {
    console.log("📝 Question response received:", { questionId, response });

    // Find the current question to understand its type
    const currentQuestion = questions.find((q) => q.id === questionId);
    console.log("📋 Current question details:", currentQuestion);

    // Store the response
    setSurveyResponses((prev) => ({
      ...prev,
      [questionId]: response,
    }));

    // Add a small delay to ensure state is updated
    setTimeout(() => {
      // If logic is active, determine next question based on logic
      if (activeLogic && isLogicMode) {
        console.log("🔄 Logic Mode: Processing response", {
          questionId,
          response,
          questionType: currentQuestion?.type,
          currentQuestionIndex,
          activeLogic,
        });

        const nextQuestionIndex = findNextQuestionByLogic(questionId, response);
        console.log("🎯 Next question index determined:", nextQuestionIndex);

        if (nextQuestionIndex !== null) {
          if (nextQuestionIndex === -1) {
            // End survey
            console.log("🏁 Survey ended by logic");
            return;
          }

          // Navigate to the specific question determined by logic
          console.log(
            `🚀 Navigating from question ${currentQuestionIndex} to question ${nextQuestionIndex}`
          );
          setCurrentQuestionIndex(nextQuestionIndex);
          setQuestionHistory((prev) => [...prev, nextQuestionIndex]);

          if (paginationEnabled) {
            const targetPage = Math.floor(nextQuestionIndex / questionsPerPage);
            setCurrentPage(targetPage);
          }

          return;
        } else {
          console.log("❌ No logic rule matched, using default behavior");
        }
      }

      // Default behavior: go to next question sequentially
      if (!isLogicMode) {
        if (paginationEnabled) {
          // Handle pagination normally
        } else {
          // Move to next question
          const nextIndex = currentQuestionIndex + 1;
          if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            setQuestionHistory((prev) => [...prev, nextIndex]);
          }
        }
      } else {
        // In logic mode but no rule matched, stay on current question
        console.log("🔒 Staying on current question in logic mode");
      }
    }, 100); // Small delay to ensure state updates
  };

  const isQuestionAnswered = (question: SurveyQuestion): boolean => {
    const response = surveyResponses[question.id];
    if (!response) return false;

    // Check based on question type
    switch (question.type) {
      case "multiple-choice":
        return Array.isArray(response) ? response.length > 0 : false;
      case "single-choice":
      case "dropdown":
      case "binary-choice":
        return typeof response === "string" && response.trim().length > 0;
      case "text":
      case "email":
      case "phone":
      case "short-answer":
        return typeof response === "string" && response.trim().length > 0;
      case "rating":
      case "satisfaction":
      case "nps":
      case "point-scale":
        return typeof response === "number" && response > 0;
      case "date":
        return !!response;
      default:
        return !!response;
    }
  };

  const getRequiredQuestions = (): SurveyQuestion[] => {
    return questions.filter((q) => q.required);
  };

  const getAnsweredRequiredQuestions = (): SurveyQuestion[] => {
    return getRequiredQuestions().filter((q) => isQuestionAnswered(q));
  };

  const isAllRequiredQuestionsAnswered = (): boolean => {
    const requiredQuestions = getRequiredQuestions();
    const answeredRequired = getAnsweredRequiredQuestions();
    return requiredQuestions.length === answeredRequired.length;
  };

  const getCompletionPercentage = (): number => {
    const totalRequired = getRequiredQuestions().length;
    const answeredRequired = getAnsweredRequiredQuestions().length;
    return totalRequired > 0
      ? Math.round((answeredRequired / totalRequired) * 100)
      : 100;
  };

  // Check if current page has any required questions that are not answered
  const hasUnansweredRequiredQuestionsOnCurrentPage = (): boolean => {
    const requiredQuestionsOnCurrentPage = currentQuestions.filter(
      (q) => q.required
    );
    const unansweredRequired = requiredQuestionsOnCurrentPage.filter(
      (q) => !isQuestionAnswered(q)
    );
    return unansweredRequired.length > 0;
  };

  // Get list of unanswered required questions on current page
  const getUnansweredRequiredQuestionsOnCurrentPage = (): SurveyQuestion[] => {
    const requiredQuestionsOnCurrentPage = currentQuestions.filter(
      (q) => q.required
    );
    return requiredQuestionsOnCurrentPage.filter((q) => !isQuestionAnswered(q));
  };

  const handleSurveySubmit = async () => {
    if (!isAllRequiredQuestionsAnswered()) return;

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const resetSurvey = () => {
    setSurveyResponses({});
    setIsSubmitted(false);
    setActiveQuestionId(null);
    setIsSubmitting(false);
    setCurrentPage(0);
    setCurrentQuestionIndex(0);
    setQuestionHistory([0]);
  };

  // Handle going back in logic mode
  const handleLogicBack = () => {
    if (questionHistory.length > 1) {
      const newHistory = questionHistory.slice(0, -1);
      const previousIndex = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestionIndex(previousIndex);

      if (paginationEnabled) {
        const targetPage = Math.floor(previousIndex / questionsPerPage);
        setCurrentPage(targetPage);
      }
    }
  };
  // Helper function to map previewDistribution to legacy distributionType
  const getDistributionType = (): typeof distributionType => {
    return previewDistribution === "onsite-popup"
      ? "onsite"
      : previewDistribution;
  };

  const getPreviewTitle = () => {
    const type = getDistributionType();
    switch (type) {
      case "post-purchase":
        return "Thank you for your purchase!";
      case "onsite":
        return "Help us improve your experience";
      case "exit-intent":
        return "Wait! Before you go...";
      case "email-campaign":
        return "We value your feedback";
      case "dedicated-survey-page":
        return "Customer Survey";
      default:
        return "Customer Survey";
    }
  };

  const getPreviewSubtitle = () => {
    const type = getDistributionType();
    switch (type) {
      case "post-purchase":
        return "Help us improve your experience with a quick survey";
      case "onsite":
        return "Take a moment to share your thoughts";
      case "exit-intent":
        return "Get 10% off your next order for 2 minutes of your time";
      case "email-campaign":
        return "Your feedback helps us serve you better";
      case "dedicated-survey-page":
        return "Please take a moment to answer our questions";
      default:
        return "Please answer a few quick questions";
    }
  };

  const getPreviewStyle = () => {
    const type = getDistributionType();
    if (type === "dedicated-survey-page" && brandedSurveySettings) {
      const { background } = brandedSurveySettings;

      if (background.type === "solid") {
        return "";
      } else if (background.type === "gradient") {
        const direction = background.gradientDirection.replace("to-", "");
        return "";
      } else if (background.type === "image" && background.imageUrl) {
        return "";
      }
    }

    switch (type) {
      case "post-purchase":
        return "bg-primary text-primary-foreground";
      case "onsite":
        return "bg-secondary-brand text-white";
      case "exit-intent":
        return "bg-survey-purple text-white";
      case "email-campaign":
        return "bg-gradient-to-r from-survey-success to-primary text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getBrandedBackgroundStyle = () => {
    const type = getDistributionType();
    if (type !== "dedicated-survey-page" || !brandedSurveySettings) {
      return {};
    }

    const { section, background } = brandedSurveySettings;
    const style: React.CSSProperties = {};

    // Use section background settings if available, otherwise fall back to background settings
    if (section.backgroundType === "solid") {
      style.backgroundColor = section.backgroundColor;
    } else if (section.backgroundType === "gradient") {
      const directions: { [key: string]: string } = {
        "to-r": "to right",
        "to-l": "to left",
        "to-t": "to top",
        "to-b": "to bottom",
        "to-br": "to bottom right",
        "to-bl": "to bottom left",
        "to-tr": "to top right",
        "to-tl": "to top left",
      };
      const direction = directions[section.gradientDirection] || "to right";
      style.background = `linear-gradient(${direction}, ${section.gradientFrom}, ${section.gradientTo})`;
    } else if (section.backgroundType === "image" && section.backgroundImage) {
      const overlayOpacity = 1 - section.backgroundImageOpacity / 100;
      style.background = `linear-gradient(rgba(255,255,255,${overlayOpacity}), rgba(255,255,255,${overlayOpacity})), url(${section.backgroundImage})`;
      style.backgroundPosition =
        section.backgroundImagePosition === "cover" ||
        section.backgroundImagePosition === "contain"
          ? "center"
          : section.backgroundImagePosition;
      style.backgroundSize =
        section.backgroundImagePosition === "cover" ||
        section.backgroundImagePosition === "contain"
          ? section.backgroundImagePosition
          : "auto";
      style.backgroundRepeat = "no-repeat";
    } else {
      // Fallback to old background system
      if (background.type === "solid") {
        style.backgroundColor = background.solidColor;
      } else if (background.type === "gradient") {
        const directions: { [key: string]: string } = {
          "to-r": "to right",
          "to-l": "to left",
          "to-t": "to top",
          "to-b": "to bottom",
          "to-br": "to bottom right",
          "to-bl": "to bottom left",
          "to-tr": "to top right",
          "to-tl": "to top left",
        };
        const direction =
          directions[background.gradientDirection] || "to right";
        style.background = `linear-gradient(${direction}, ${background.gradientStart}, ${background.gradientEnd})`;
      } else if (background.type === "image" && background.imageUrl) {
        style.backgroundImage = `url(${background.imageUrl})`;
        style.backgroundPosition = background.imagePosition;
        style.backgroundSize = background.imageSize;
        style.backgroundRepeat = "no-repeat";

        if (background.overlay) {
          const overlayColor = background.overlayColor || "#000000";
          const overlayOpacity = background.overlayOpacity || 0.3;
          style.background = `linear-gradient(rgba(${parseInt(
            overlayColor.slice(1, 3),
            16
          )}, ${parseInt(overlayColor.slice(3, 5), 16)}, ${parseInt(
            overlayColor.slice(5, 7),
            16
          )}, ${overlayOpacity}), rgba(${parseInt(
            overlayColor.slice(1, 3),
            16
          )}, ${parseInt(overlayColor.slice(3, 5), 16)}, ${parseInt(
            overlayColor.slice(5, 7),
            16
          )}, ${overlayOpacity})), url(${background.imageUrl})`;
        }
      }
    }

    return style;
  };

  const getExitIntentBackgroundStyle = () => {
    const type = getDistributionType();
    if (type !== "exit-intent" || !exitIntentSettings) {
      return {};
    }

    return {
      backgroundColor: exitIntentSettings.section.backgroundColor,
    };
  };

  const getPostPurchaseBackgroundStyle = () => {
    const type = getDistributionType();
    if (type !== "post-purchase" || !postPurchaseSettings) {
      return {};
    }

    return {
      backgroundColor: "white",
    };
  };

  const getBrandedTextStyle = () => {
    const type = getDistributionType();
    if (type !== "dedicated-survey-page" || !brandedSurveySettings) {
      return {};
    }

    const { section, typography } = brandedSurveySettings;
    return {
      fontFamily: typography.fontFamily,
      lineHeight: typography.lineHeight,
      letterSpacing: `${typography.letterSpacing}px`,
    };
  };

  const getButtonStyle = () => {
    const type = getDistributionType();
    if (type === "dedicated-survey-page" && brandedSurveySettings) {
      const { button } = brandedSurveySettings;
      return {
        backgroundColor: button.backgroundColor,
        color: button.textColor,
        borderRadius: `${button.borderRadius}px`,
        fontSize: `${button.fontSize}px`,
        fontWeight: button.fontWeight,
        boxShadow: button.shadow ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
      };
    }

    if (type === "exit-intent" && exitIntentSettings) {
      const { button } = exitIntentSettings;
      return {
        backgroundColor: button.backgroundColor,
        color: button.textColor,
        borderRadius: `${button.borderRadius}px`,
        fontSize: `${button.fontSize}px`,
        fontWeight: button.fontWeight,
      };
    }

    if (type === "onsite" && onSitePopupSettings) {
      const { button } = onSitePopupSettings;
      return {
        backgroundColor: button.backgroundColor,
        color: button.textColor,
        borderRadius: `${button.borderRadius}px`,
        fontSize: `${button.fontSize}px`,
        fontWeight: button.fontWeight,
      };
    }

    return {};
  };

  const getEmailCampaignBackgroundStyle = () => {
    const type = getDistributionType();
    if (type !== "email-campaign" || !emailCampaignSettings) {
      return {};
    }

    const { section } = emailCampaignSettings;

    if (section.backgroundType === "solid") {
      return {
        backgroundColor: section.backgroundColor,
      };
    } else if (section.backgroundType === "gradient") {
      return {
        background: `linear-gradient(${section.gradientDirection}, ${section.gradientFrom}, ${section.gradientTo})`,
      };
    } else if (section.backgroundType === "image" && section.backgroundImage) {
      return {
        backgroundImage: `url(${section.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: section.backgroundImagePosition,
        backgroundRepeat: "no-repeat",
        position: "relative",
      };
    }

    return {
      backgroundColor: "#ffffff",
    };
  };

  const getEmailCampaignButtonStyle = () => {
    const type = getDistributionType();
    if (type === "email-campaign" && emailCampaignSettings) {
      const { button } = emailCampaignSettings;
      return {
        backgroundColor: button.backgroundColor,
        color: button.textColor,
        borderRadius: `${button.borderRadius}px`,
        fontSize: `${button.fontSize}px`,
        fontWeight: button.fontWeight,
      };
    }

    return {};
  };

  const renderQuestionPreview = (question: SurveyQuestion, index: number) => {
    return (
      <div
        key={question.id}
        className="space-y-3 pb-4 border-b border-border last:border-b-0"
      >
        <div className="flex items-start space-x-2">
          <span className="text-sm font-medium text-muted-foreground mt-1">
            {index + 1}.
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm">{question.title}</p>
              {question.required && (
                <span className="text-destructive text-xs">*</span>
              )}
            </div>
            {question.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {question.description}
              </p>
            )}
          </div>
        </div>

        <div className="ml-6 space-y-2">
          {question.type === "multiple-choice" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-muted-foreground rounded-sm"></div>
                  <span className="text-sm text-muted-foreground">
                    {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {question.type === "single-choice" && question.options && (
            <div className="space-y-2">
              {question.singleChoiceDisplayType === "dropdown" ? (
                // Dropdown preview
                <div className="border border-muted-foreground rounded px-3 py-2 text-sm text-muted-foreground bg-muted/20">
                  Select an option...
                </div>
              ) : (
                // Radio button preview
                <>
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-3 h-3 border rounded-full"></div>
                      <span className="text-sm text-muted-foreground">
                        {option}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {question.type === "dropdown" && question.options && (
            <div className="space-y-2">
              <div className="border border-muted-foreground rounded px-3 py-2 text-sm text-muted-foreground bg-muted/20">
                Select an option...
              </div>
            </div>
          )}

          {question.type === "binary-choice" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <div className="w-3 h-3 border rounded-full"></div>
                  <span className="text-sm text-muted-foreground">
                    {option}
                  </span>
                </div>
              ))}
            </div>
          )}

          {question.type === "text" && (
            <div className="space-y-2">
              {question.textInputType === "single-line" ? (
                <Input
                  placeholder={question.placeholder || "Your answer..."}
                  className="h-8 text-sm"
                  disabled
                />
              ) : (
                <Textarea
                  placeholder={question.placeholder || "Your answer..."}
                  className="text-sm resize-none"
                  rows={3}
                  disabled
                />
              )}
            </div>
          )}

          {question.type === "email" && (
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="your.email@example.com"
                className="h-8 text-sm"
                disabled
              />
            </div>
          )}

          {question.type === "phone" && (
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="h-8 text-sm"
                disabled
              />
            </div>
          )}

          {question.type === "satisfaction" && (
            <div className="space-y-2">
              <div className="flex justify-center space-x-4">
                {(
                  question.satisfactionEmojis || ["😢", "🙁", "😐", "🙂", "😄"]
                ).map((emoji, index) => (
                  <button
                    key={index}
                    className="text-3xl p-2 rounded-lg hover:bg-muted transition-colors"
                    disabled
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Very Dissatisfied</span>
                <span>Very Satisfied</span>
              </div>
            </div>
          )}

          {question.type === "point-scale" && (
            <div className="space-y-2">
              <div className="flex flex-wrap justify-center gap-1">
                {(question.pointScale?.reversed
                  ? Array.from(
                      {
                        length:
                          (question.pointScale?.max || 10) -
                          (question.pointScale?.min || 0) +
                          1,
                      },
                      (_, i) => (question.pointScale?.max || 10) - i
                    )
                  : Array.from(
                      {
                        length:
                          (question.pointScale?.max || 10) -
                          (question.pointScale?.min || 0) +
                          1,
                      },
                      (_, i) => (question.pointScale?.min || 0) + i
                    )
                ).map((value) => (
                  <button
                    key={value}
                    className="w-10 h-10 border rounded text-sm flex items-center justify-center hover:bg-muted transition-colors"
                    style={{
                      borderColor:
                        getDistributionType() === "dedicated-survey-page" &&
                        brandedSurveySettings?.section.accentColor
                          ? brandedSurveySettings.section.accentColor
                          : "#6b7280",
                    }}
                    disabled
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{question.pointScale?.lowLabel || "Not Likely"}</span>
                <span>{question.pointScale?.highLabel || "Likely"}</span>
              </div>
            </div>
          )}

          {question.type === "date" && (
            <div className="space-y-2">
              <Input type="date" className="h-8 text-sm" disabled />
              <div className="text-xs text-muted-foreground">
                Format: {question.dateFormat || "MM/DD/YYYY"}
              </div>
            </div>
          )}

          {question.type === "rating" && (
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 cursor-pointer hover:fill-current"
                  style={{
                    color:
                      getDistributionType() === "dedicated-survey-page" &&
                      brandedSurveySettings?.section.accentColor
                        ? brandedSurveySettings.section.accentColor
                        : "#f59e0b",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Live Preview</CardTitle>
            <Badge
              variant="secondary"
              className="bg-survey-success-light text-survey-success border-survey-success/20"
            >
              <div className="w-2 h-2 bg-survey-success rounded-full animate-pulse mr-1"></div>
              Live
            </Badge>
            {activeLogic && activeLogicName && (
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
              >
                <Zap className="w-3 h-3" />
                {activeLogicName}
                {isLogicMode && <span className="ml-1 text-xs">(Active)</span>}
              </Badge>
            )}
          </div>
        </div>

        {/* Distribution Selector and Preview Icons Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <Select
              value={previewDistribution}
              onValueChange={(value) =>
                setPreviewDistribution(value as typeof previewDistribution)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {distributionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={previewDevice === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewDevice("desktop")}
              className={`h-8 px-3 ${
                previewDevice === "desktop"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted-foreground/10"
              }`}
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={previewDevice === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewDevice("mobile")}
              className={`h-8 px-3 ${
                previewDevice === "mobile"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted-foreground/10"
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant={previewDevice === "full" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPreviewDevice("full")}
              className={`h-8 px-3 ${
                previewDevice === "full"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted-foreground/10"
              }`}
            >
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div
          className={`${
            previewDevice === "mobile"
              ? "w-full max-w-sm mx-auto"
              : previewDevice === "desktop"
              ? "w-full max-w-md mx-auto"
              : "w-full"
          } transition-all duration-300 shadow-lg rounded-lg overflow-hidden border relative`}
          style={
            getDistributionType() === "dedicated-survey-page"
              ? getBrandedBackgroundStyle()
              : getDistributionType() === "post-purchase"
              ? getPostPurchaseBackgroundStyle()
              : getDistributionType() === "exit-intent"
              ? getExitIntentBackgroundStyle()
              : getDistributionType() === "onsite"
              ? {
                  backgroundColor:
                    onSitePopupSettings?.section.backgroundColor || "white",
                }
              : getDistributionType() === "email-campaign"
              ? getEmailCampaignBackgroundStyle()
              : { backgroundColor: "white" }
          }
        >
          {/* Progress Bar */}
          {getDistributionType() === "dedicated-survey-page" &&
            brandedSurveySettings?.progressBar.enabled &&
            brandedSurveySettings.progressBar.position === "top" && (
              <div
                className="w-full h-1"
                style={{
                  backgroundColor:
                    brandedSurveySettings.progressBar.backgroundColor,
                }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    backgroundColor:
                      brandedSurveySettings.section.accentColor ||
                      brandedSurveySettings.progressBar.color,
                    width: questions.length > 0 ? "33%" : "0%",
                  }}
                />
              </div>
            )}

          {/* Brand Logo for Email Campaign */}
          {getDistributionType() === "email-campaign" &&
            emailCampaignSettings?.brandLogo?.enabled &&
            emailCampaignSettings.brandLogo.url && (
              <div
                className={`flex ${
                  emailCampaignSettings.brandLogo.position === "left"
                    ? "justify-start"
                    : emailCampaignSettings.brandLogo.position === "center"
                    ? "justify-center"
                    : "justify-end"
                } mb-4`}
              >
                <img
                  src={emailCampaignSettings.brandLogo.url}
                  alt="Brand logo"
                  className={`${
                    emailCampaignSettings.brandLogo.size === "small"
                      ? "h-8"
                      : emailCampaignSettings.brandLogo.size === "medium"
                      ? "h-12"
                      : "h-16"
                  } object-contain`}
                />
              </div>
            )}

          {/* Survey Header */}
          {getDistributionType() !== "email-campaign" && (
            <div
              className={`${
                getDistributionType() === "dedicated-survey-page" ||
                getDistributionType() === "post-purchase"
                  ? ""
                  : getPreviewStyle()
              } p-6 relative`}
              style={
                getDistributionType() === "dedicated-survey-page"
                  ? getBrandedTextStyle()
                  : {}
              }
            >
              {/* Header Logo for Dedicated Survey Page */}
              {getDistributionType() === "dedicated-survey-page" &&
                brandedSurveySettings?.headerLogo.enabled &&
                brandedSurveySettings.headerLogo.url && (
                  <div
                    className={`mb-4 flex ${
                      brandedSurveySettings.headerLogo.position === "left"
                        ? "justify-start"
                        : brandedSurveySettings.headerLogo.position === "center"
                        ? "justify-center"
                        : "justify-end"
                    }`}
                  >
                    <img
                      src={brandedSurveySettings.headerLogo.url}
                      alt="Header logo"
                      className={`${
                        brandedSurveySettings.headerLogo.size === "small"
                          ? "h-8"
                          : brandedSurveySettings.headerLogo.size === "medium"
                          ? "h-12"
                          : "h-16"
                      } object-contain`}
                    />
                  </div>
                )}

              {getDistributionType() === "exit-intent" && (
                <button className="absolute top-4 right-4 text-white/80 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}

              <div className="space-y-2">
                <h3
                  className="text-lg font-semibold"
                  style={
                    getDistributionType() === "dedicated-survey-page" &&
                    brandedSurveySettings
                      ? { color: brandedSurveySettings.section.primaryText }
                      : getDistributionType() === "post-purchase" &&
                        postPurchaseSettings
                      ? { color: "#1f2937" }
                      : getDistributionType() === "exit-intent" &&
                        exitIntentSettings
                      ? { color: exitIntentSettings.section.primaryText }
                      : getDistributionType() === "onsite" &&
                        onSitePopupSettings
                      ? { color: onSitePopupSettings.section.primaryText }
                      : getDistributionType() === "email-campaign" &&
                        emailCampaignSettings
                      ? { color: "#1f2937" }
                      : {}
                  }
                >
                  {getPreviewTitle()}
                </h3>
                <p
                  className="text-sm opacity-90"
                  style={
                    getDistributionType() === "dedicated-survey-page" &&
                    brandedSurveySettings
                      ? {
                          color: brandedSurveySettings.section.secondaryText,
                        }
                      : getDistributionType() === "post-purchase" &&
                        postPurchaseSettings
                      ? {
                          color: "#6b7280",
                          opacity: 0.8,
                        }
                      : getDistributionType() === "exit-intent" &&
                        exitIntentSettings
                      ? {
                          color: exitIntentSettings.section.secondaryText,
                          opacity: 0.9,
                        }
                      : getDistributionType() === "onsite" &&
                        onSitePopupSettings
                      ? {
                          color: onSitePopupSettings.section.secondaryText,
                          opacity: 0.9,
                        }
                      : getDistributionType() === "email-campaign" &&
                        emailCampaignSettings
                      ? {
                          color: "#6b7280",
                          opacity: 0.9,
                        }
                      : {}
                  }
                >
                  {getPreviewSubtitle()}
                </p>
              </div>

              {discountEnabled && getDistributionType() === "exit-intent" && (
                <div className="mt-4 bg-white/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span>🎉</span>
                    <span>
                      Get{" "}
                      {discountType === "percentage"
                        ? `${discountValue}%`
                        : `$${discountValue}`}{" "}
                      off
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Survey Body */}
          <div
            className="p-6 space-y-4 max-h-96 overflow-y-auto"
            style={
              getDistributionType() === "dedicated-survey-page"
                ? getBrandedTextStyle()
                : {}
            }
          >
            {getDistributionType() === "email-campaign" && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div
                  className="px-6 py-6"
                  style={getEmailCampaignBackgroundStyle()}
                >
                  {emailCampaignSettings?.brandLogo?.enabled &&
                    emailCampaignSettings.brandLogo.url && (
                      <div
                        className={`mb-6 flex ${
                          emailCampaignSettings.brandLogo.position === "left"
                            ? "justify-start"
                            : emailCampaignSettings.brandLogo.position ===
                              "center"
                            ? "justify-center"
                            : "justify-end"
                        }`}
                      >
                        <img
                          src={emailCampaignSettings.brandLogo.url}
                          alt="Company Logo"
                          className={`${
                            emailCampaignSettings.brandLogo.size === "small"
                              ? "h-8"
                              : emailCampaignSettings.brandLogo.size ===
                                "medium"
                              ? "h-12"
                              : "h-16"
                          }`}
                        />
                      </div>
                    )}

                  {/* Email Subject/Title */}
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {emailCampaignSettings?.content.subject ||
                        "We'd love your feedback!"}
                    </h2>
                  </div>

                  <div
                    className="prose prose-sm max-w-none"
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.6",
                      fontFamily:
                        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    <div
                      className="text-gray-800 space-y-3"
                      dangerouslySetInnerHTML={{
                        __html:
                          emailCampaignSettings?.content.body ||
                          `<p style="margin: 0 0 12px 0;">Hi there!</p>
                          <p style="margin: 0 0 12px 0;">We hope you're enjoying your recent purchase. Your feedback is incredibly valuable to us and helps improve our products and services.</p>
                          <p style="margin: 0 0 12px 0;">Would you mind taking a few minutes to share your thoughts in our quick survey?</p>
                          <p style="margin: 0 0 12px 0;">Thank you for your time!</p>
                          <p style="margin: 0;">Best regards,<br><strong>Your Customer Success Team</strong></p>`,
                      }}
                    />
                  </div>

                  <div className="text-center mt-6 mb-4">
                    <a
                      href="#"
                      className="inline-block px-6 py-3 rounded-md font-medium text-white text-sm transition-all duration-200 hover:opacity-90"
                      style={{
                        ...getEmailCampaignButtonStyle(),
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      Take Survey Now
                    </a>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="text-center space-y-2">
                      <p className="text-xs text-gray-500">
                        This survey will take approximately 2-3 minutes to
                        complete.
                      </p>
                      <p className="text-xs text-gray-400">
                        You received this email because you're a valued
                        customer.
                        <br />
                        <a href="#" className="text-blue-500 hover:underline">
                          Unsubscribe
                        </a>{" "}
                        |
                        <a
                          href="#"
                          className="text-blue-500 hover:underline ml-1"
                        >
                          Privacy Policy
                        </a>
                      </p>
                      <div className="text-xs text-gray-400">
                        © 2024 Your Company Name. All rights reserved.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {getDistributionType() != "email-campaign" &&
              questions.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Monitor className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    No questions added yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add questions to see the preview
                  </p>
                </div>
              )}
            {getDistributionType() != "email-campaign" &&
              questions.length > 0 && (
                <div className="space-y-4">
                  {currentQuestions.map((question, questionIndex) => {
                    // Calculate the global index for proper numbering
                    const globalIndex = paginationEnabled
                      ? currentPage * questionsPerPage + questionIndex
                      : questionIndex;

                    return (
                      <div
                        key={question.id}
                        className={`space-y-3 pb-4 border-b border-border last:border-b-0 transition-all duration-200 ${
                          expandedQuestionId === question.id
                            ? "bg-blue-50/80 p-4 rounded-lg border-2 border-blue-200 shadow-lg ring-2 ring-blue-100"
                            : activeQuestionId === question.id
                            ? "bg-primary/5 p-3 rounded-lg border-primary/20 shadow-sm"
                            : isQuestionAnswered(question)
                            ? "bg-green-50/50 border-green-200/50"
                            : question.required
                            ? "hover:bg-muted/20"
                            : "hover:bg-muted/10"
                        }`}
                      >
                        <div className="flex items-start space-x-1">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-muted-foreground">
                              {globalIndex + 1}.
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-2">
                              <p
                                className="font-medium text-sm leading-relaxed"
                                style={
                                  getDistributionType() ===
                                    "dedicated-survey-page" &&
                                  brandedSurveySettings
                                    ? {
                                        color:
                                          brandedSurveySettings.section
                                            .primaryText,
                                      }
                                    : getDistributionType() === "exit-intent" &&
                                      exitIntentSettings
                                    ? {
                                        color:
                                          exitIntentSettings.section
                                            .primaryText,
                                      }
                                    : getDistributionType() === "onsite" &&
                                      onSitePopupSettings
                                    ? {
                                        color:
                                          onSitePopupSettings.section
                                            .primaryText,
                                      }
                                    : {}
                                }
                              >
                                {question.title}
                              </p>
                              {question.required && (
                                <span
                                  className={`text-xs font-medium ${
                                    isQuestionAnswered(question)
                                      ? "text-green-600"
                                      : "text-destructive"
                                  }`}
                                >
                                  {isQuestionAnswered(question) ? "✓" : "*"}
                                </span>
                              )}
                            </div>
                            {question.description && (
                              <p
                                className="text-xs mt-1"
                                style={
                                  getDistributionType() ===
                                    "dedicated-survey-page" &&
                                  brandedSurveySettings
                                    ? {
                                        color:
                                          brandedSurveySettings.section
                                            .secondaryText,
                                      }
                                    : getDistributionType() === "exit-intent" &&
                                      exitIntentSettings
                                    ? {
                                        color:
                                          exitIntentSettings.section
                                            .secondaryText,
                                      }
                                    : getDistributionType() === "onsite" &&
                                      onSitePopupSettings
                                    ? {
                                        color:
                                          onSitePopupSettings.section
                                            .secondaryText,
                                      }
                                    : {}
                                }
                              >
                                {question.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="ml-6 space-y-2">
                          {question.type === "multiple-choice" &&
                            question.options && (
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => {
                                  const currentResponse =
                                    surveyResponses[question.id] || [];
                                  const isChecked =
                                    Array.isArray(currentResponse) &&
                                    currentResponse.includes(option);

                                  return (
                                    <div
                                      key={optionIndex}
                                      className="flex items-center space-x-2 cursor-pointer hover:bg-muted/30 p-1 rounded"
                                      onClick={() => {
                                        const current = Array.isArray(
                                          currentResponse
                                        )
                                          ? currentResponse
                                          : [];
                                        const newResponse = isChecked
                                          ? current.filter(
                                              (item) => item !== option
                                            )
                                          : [...current, option];
                                        handleQuestionResponse(
                                          question.id,
                                          newResponse
                                        );
                                      }}
                                    >
                                      <div
                                        className={`w-3 h-3 border border-muted-foreground rounded-sm flex items-center justify-center ${
                                          isChecked
                                            ? "bg-primary border-primary"
                                            : ""
                                        }`}
                                      >
                                        {isChecked && (
                                          <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                                        )}
                                      </div>
                                      <span
                                        className="text-sm"
                                        style={
                                          getDistributionType() ===
                                            "dedicated-survey-page" &&
                                          brandedSurveySettings
                                            ? {
                                                color:
                                                  brandedSurveySettings.section
                                                    .primaryText,
                                              }
                                            : {}
                                        }
                                      >
                                        {option}
                                      </span>
                                    </div>
                                  );
                                })}
                                {/* Dynamic "Other" Option */}
                                {question.customAnswer?.enabled && (
                                  <>
                                    <div
                                      className="flex items-center space-x-2 cursor-pointer hover:bg-muted/30 p-1 rounded"
                                      onClick={() => {
                                        const current = Array.isArray(
                                          surveyResponses[question.id]
                                        )
                                          ? surveyResponses[question.id]
                                          : [];
                                        const otherLabel =
                                          question.customAnswer.otherLabel;
                                        const isChecked =
                                          current.includes(otherLabel);
                                        const newResponse = isChecked
                                          ? current.filter(
                                              (item) => item !== otherLabel
                                            )
                                          : [...current, otherLabel];
                                        handleQuestionResponse(
                                          question.id,
                                          newResponse
                                        );
                                      }}
                                    >
                                      <div
                                        className={`w-3 h-3 border border-muted-foreground rounded-sm flex items-center justify-center ${
                                          Array.isArray(
                                            surveyResponses[question.id]
                                          ) &&
                                          surveyResponses[question.id].includes(
                                            question.customAnswer.otherLabel
                                          )
                                            ? "bg-primary border-primary"
                                            : ""
                                        }`}
                                      >
                                        {Array.isArray(
                                          surveyResponses[question.id]
                                        ) &&
                                          surveyResponses[question.id].includes(
                                            question.customAnswer.otherLabel
                                          ) && (
                                            <div className="w-1.5 h-1.5 bg-white rounded-sm" />
                                          )}
                                      </div>
                                      <span
                                        className="text-sm"
                                        style={
                                          getDistributionType() ===
                                            "dedicated-survey-page" &&
                                          brandedSurveySettings
                                            ? {
                                                color:
                                                  brandedSurveySettings.section
                                                    .primaryText,
                                              }
                                            : {}
                                        }
                                      >
                                        {question.customAnswer.otherLabel}
                                      </span>
                                    </div>
                                    {/* Show input field when "Other" is selected */}
                                    {Array.isArray(
                                      surveyResponses[question.id]
                                    ) &&
                                      surveyResponses[question.id].includes(
                                        question.customAnswer.otherLabel
                                      ) && (
                                        <div className="mt-2 ml-5">
                                          <Input
                                            className="h-8 text-sm"
                                            value={
                                              surveyResponses[
                                                `${question.id}_custom`
                                              ] || ""
                                            }
                                            onChange={(e) =>
                                              handleQuestionResponse(
                                                `${question.id}_custom`,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                  </>
                                )}
                              </div>
                            )}

                          {question.type === "single-choice" &&
                            question.options && (
                              <div className="space-y-2">
                                {question.singleChoiceDisplayType ===
                                "dropdown" ? (
                                  // Dropdown display
                                  <>
                                    <Select
                                      value={surveyResponses[question.id] || ""}
                                      onValueChange={(value) =>
                                        handleQuestionResponse(
                                          question.id,
                                          value
                                        )
                                      }
                                    >
                                      <SelectTrigger
                                        style={
                                          getDistributionType() ===
                                            "dedicated-survey-page" &&
                                          brandedSurveySettings
                                            ? {
                                                color:
                                                  brandedSurveySettings.section
                                                    .primaryText,
                                                borderColor:
                                                  brandedSurveySettings.section
                                                    .accentColor,
                                              }
                                            : getDistributionType() ===
                                                "exit-intent" &&
                                              exitIntentSettings
                                            ? {
                                                color:
                                                  exitIntentSettings.section
                                                    .primaryText,
                                              }
                                            : getDistributionType() ===
                                                "onsite" && onSitePopupSettings
                                            ? {
                                                color:
                                                  onSitePopupSettings.section
                                                    .primaryText,
                                              }
                                            : {}
                                        }
                                      >
                                        <SelectValue placeholder="Select an option..." />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {question.options.map(
                                          (option, optionIndex) => (
                                            <SelectItem
                                              key={optionIndex}
                                              value={option}
                                            >
                                              {option}
                                            </SelectItem>
                                          )
                                        )}
                                        {question.customAnswer?.enabled && (
                                          <SelectItem
                                            value={
                                              question.customAnswer.otherLabel
                                            }
                                          >
                                            {question.customAnswer.otherLabel}
                                          </SelectItem>
                                        )}
                                      </SelectContent>
                                    </Select>
                                    {/* Show input field when "Other" is selected in dropdown */}
                                    {question.customAnswer?.enabled &&
                                      surveyResponses[question.id] ===
                                        question.customAnswer.otherLabel && (
                                        <div className="mt-2">
                                          <Input
                                            className="h-8 text-sm"
                                            placeholder="Please specify..."
                                            value={
                                              surveyResponses[
                                                `${question.id}_custom`
                                              ] || ""
                                            }
                                            onChange={(e) =>
                                              handleQuestionResponse(
                                                `${question.id}_custom`,
                                                e.target.value
                                              )
                                            }
                                            style={
                                              getDistributionType() ===
                                                "dedicated-survey-page" &&
                                              brandedSurveySettings
                                                ? {
                                                    color:
                                                      brandedSurveySettings
                                                        .section.primaryText,
                                                    borderColor:
                                                      brandedSurveySettings
                                                        .section.accentColor,
                                                  }
                                                : getDistributionType() ===
                                                    "exit-intent" &&
                                                  exitIntentSettings
                                                ? {
                                                    color:
                                                      exitIntentSettings.section
                                                        .primaryText,
                                                  }
                                                : getDistributionType() ===
                                                    "onsite" &&
                                                  onSitePopupSettings
                                                ? {
                                                    color:
                                                      onSitePopupSettings
                                                        .section.primaryText,
                                                  }
                                                : {}
                                            }
                                          />
                                        </div>
                                      )}
                                  </>
                                ) : (
                                  // Radio button display (default)
                                  <>
                                    {question.options.map(
                                      (option, optionIndex) => {
                                        const currentResponse =
                                          surveyResponses[question.id];
                                        const isSelected =
                                          currentResponse === option;

                                        return (
                                          <div
                                            key={optionIndex}
                                            className="flex items-center space-x-2 cursor-pointer hover:bg-muted/30 p-1 rounded"
                                            onClick={() =>
                                              handleQuestionResponse(
                                                question.id,
                                                option
                                              )
                                            }
                                          >
                                            <div
                                              className={`w-3 h-3 border rounded-full flex items-center justify-center ${
                                                isSelected
                                                  ? "bg-primary border-primary"
                                                  : "border-muted-foreground"
                                              }`}
                                            >
                                              {isSelected && (
                                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                              )}
                                            </div>
                                            <span
                                              className="text-sm"
                                              style={
                                                getDistributionType() ===
                                                  "dedicated-survey-page" &&
                                                brandedSurveySettings
                                                  ? {
                                                      color:
                                                        brandedSurveySettings
                                                          .section.primaryText,
                                                    }
                                                  : {}
                                              }
                                            >
                                              {option}
                                            </span>
                                          </div>
                                        );
                                      }
                                    )}
                                    {/* Dynamic "Other" Option */}
                                    {question.customAnswer?.enabled && (
                                      <>
                                        <div
                                          className="flex items-center space-x-2 cursor-pointer hover:bg-muted/30 p-1 rounded"
                                          onClick={() =>
                                            handleQuestionResponse(
                                              question.id,
                                              question.customAnswer.otherLabel
                                            )
                                          }
                                        >
                                          <div
                                            className={`w-3 h-3 border rounded-full flex items-center justify-center ${
                                              surveyResponses[question.id] ===
                                              question.customAnswer.otherLabel
                                                ? "bg-primary border-primary"
                                                : "border-muted-foreground"
                                            }`}
                                          >
                                            {surveyResponses[question.id] ===
                                              question.customAnswer
                                                .otherLabel && (
                                              <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                            )}
                                          </div>
                                          <span
                                            className="text-sm"
                                            style={
                                              getDistributionType() ===
                                                "dedicated-survey-page" &&
                                              brandedSurveySettings
                                                ? {
                                                    color:
                                                      brandedSurveySettings
                                                        .section.primaryText,
                                                  }
                                                : {}
                                            }
                                          >
                                            {question.customAnswer.otherLabel}
                                          </span>
                                        </div>
                                        {/* Show input field when "Other" is selected */}
                                        {surveyResponses[question.id] ===
                                          question.customAnswer.otherLabel && (
                                          <div className="mt-2 ml-5">
                                            <Input
                                              className="h-8 text-sm"
                                              value={
                                                surveyResponses[
                                                  `${question.id}_custom`
                                                ] || ""
                                              }
                                              onChange={(e) =>
                                                handleQuestionResponse(
                                                  `${question.id}_custom`,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            )}

                          {question.type === "dropdown" && question.options && (
                            <div className="space-y-2">
                              <Select
                                value={surveyResponses[question.id] || ""}
                                onValueChange={(value) =>
                                  handleQuestionResponse(question.id, value)
                                }
                              >
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue placeholder="Select an option..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {question.options.map(
                                    (option, optionIndex) => (
                                      <SelectItem
                                        key={optionIndex}
                                        value={option}
                                      >
                                        {option}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {question.type === "binary-choice" &&
                            question.options && (
                              <div className="flex justify-center gap-4">
                                {question.options.map((option, optionIndex) => {
                                  const currentResponse =
                                    surveyResponses[question.id];
                                  const isSelected = currentResponse === option;

                                  return (
                                    <button
                                      key={optionIndex}
                                      className={`px-6 py-3 rounded-lg border-2 transition-all font-medium ${
                                        isSelected
                                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                                          : "bg-background border-muted-foreground hover:border-primary/50 hover:bg-muted/20"
                                      }`}
                                      onClick={() =>
                                        handleQuestionResponse(
                                          question.id,
                                          option
                                        )
                                      }
                                    >
                                      <span
                                        className="text-sm"
                                        style={
                                          !isSelected &&
                                          getDistributionType() ===
                                            "dedicated-survey-page" &&
                                          brandedSurveySettings
                                            ? {
                                                color:
                                                  brandedSurveySettings.section
                                                    .primaryText,
                                              }
                                            : {}
                                        }
                                      >
                                        {option}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                          {(question.type === "text" ||
                            question.type === "email" ||
                            question.type === "phone") && (
                            <div className="space-y-2">
                              {question.type === "text" ? (
                                question.textInputType === "single-line" ? (
                                  <Input
                                    placeholder={
                                      question.placeholder || "Your answer..."
                                    }
                                    className="h-8 text-sm"
                                    value={surveyResponses[question.id] || ""}
                                    onChange={(e) =>
                                      handleQuestionResponse(
                                        question.id,
                                        e.target.value
                                      )
                                    }
                                    onFocus={() =>
                                      setActiveQuestionId(question.id)
                                    }
                                    onBlur={() => setActiveQuestionId(null)}
                                  />
                                ) : (
                                  <Textarea
                                    placeholder={
                                      question.placeholder || "Your answer..."
                                    }
                                    className="text-sm resize-none"
                                    rows={3}
                                    value={surveyResponses[question.id] || ""}
                                    onChange={(e) =>
                                      handleQuestionResponse(
                                        question.id,
                                        e.target.value
                                      )
                                    }
                                    onFocus={() =>
                                      setActiveQuestionId(question.id)
                                    }
                                    onBlur={() => setActiveQuestionId(null)}
                                  />
                                )
                              ) : (
                                <Input
                                  type={
                                    question.type === "email"
                                      ? "email"
                                      : question.type === "phone"
                                      ? "tel"
                                      : "text"
                                  }
                                  placeholder={
                                    question.placeholder ||
                                    (question.type === "email"
                                      ? "your.email@example.com"
                                      : question.type === "phone"
                                      ? "+1 (555) 123-4567"
                                      : "Your answer...")
                                  }
                                  className="h-8 text-sm"
                                  value={surveyResponses[question.id] || ""}
                                  onChange={(e) =>
                                    handleQuestionResponse(
                                      question.id,
                                      e.target.value
                                    )
                                  }
                                  onFocus={() =>
                                    setActiveQuestionId(question.id)
                                  }
                                  onBlur={() => setActiveQuestionId(null)}
                                />
                              )}
                            </div>
                          )}

                          {question.type === "satisfaction" && (
                            <div className="space-y-2">
                              <div className="flex justify-center space-x-3">
                                {(
                                  question.satisfactionEmojis || [
                                    "😢",
                                    "🙁",
                                    "😐",
                                    "🙂",
                                    "😄",
                                  ]
                                ).map((emoji, index) => {
                                  const currentResponse =
                                    surveyResponses[question.id];
                                  const isSelected =
                                    currentResponse === index + 1;

                                  return (
                                    <button
                                      key={index}
                                      className={`text-2xl p-2 rounded-lg transition-all cursor-pointer ${
                                        isSelected
                                          ? "bg-primary/20 scale-110 shadow-md"
                                          : "hover:bg-muted-foreground/10 hover:scale-105"
                                      }`}
                                      onClick={() =>
                                        handleQuestionResponse(
                                          question.id,
                                          index + 1
                                        )
                                      }
                                    >
                                      {emoji}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground px-1">
                                <span>Very Dissatisfied</span>
                                <span>Very Satisfied</span>
                              </div>
                            </div>
                          )}

                          {question.type === "point-scale" && (
                            <div className="space-y-2">
                              <div className="flex flex-wrap justify-center gap-1">
                                {(question.pointScale?.reversed
                                  ? Array.from(
                                      {
                                        length:
                                          (question.pointScale?.max || 10) -
                                          (question.pointScale?.min || 0) +
                                          1,
                                      },
                                      (_, i) =>
                                        (question.pointScale?.max || 10) - i
                                    )
                                  : Array.from(
                                      {
                                        length:
                                          (question.pointScale?.max || 10) -
                                          (question.pointScale?.min || 0) +
                                          1,
                                      },
                                      (_, i) =>
                                        (question.pointScale?.min || 0) + i
                                    )
                                ).map((value) => {
                                  const currentResponse =
                                    surveyResponses[question.id];
                                  const isSelected = currentResponse === value;

                                  return (
                                    <button
                                      key={value}
                                      className={`w-8 h-8 border rounded text-xs flex items-center justify-center transition-all cursor-pointer ${
                                        isSelected
                                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                                          : "border-muted-foreground hover:bg-muted-foreground/10 hover:border-primary/50"
                                      }`}
                                      onClick={() =>
                                        handleQuestionResponse(
                                          question.id,
                                          value
                                        )
                                      }
                                    >
                                      {value}
                                    </button>
                                  );
                                })}
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                  {question.pointScale?.lowLabel ||
                                    "Not Likely"}
                                </span>
                                <span>
                                  {question.pointScale?.highLabel || "Likely"}
                                </span>
                              </div>
                            </div>
                          )}

                          {question.type === "date" && (
                            <div className="space-y-2">
                              <Input
                                type="date"
                                className="h-8 text-sm"
                                value={surveyResponses[question.id] || ""}
                                onChange={(e) =>
                                  handleQuestionResponse(
                                    question.id,
                                    e.target.value
                                  )
                                }
                                onFocus={() => setActiveQuestionId(question.id)}
                                onBlur={() => setActiveQuestionId(null)}
                              />
                              <div className="text-xs text-muted-foreground">
                                Format: {question.dateFormat || "MM/DD/YYYY"}
                              </div>
                            </div>
                          )}

                          {question.type === "rating" && (
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => {
                                const currentResponse =
                                  surveyResponses[question.id] || 0;
                                const isFilled = star <= currentResponse;

                                return (
                                  <Star
                                    key={star}
                                    className={`w-5 h-5 cursor-pointer transition-all hover:scale-110 ${
                                      isFilled
                                        ? "text-amber-400 fill-current"
                                        : "text-amber-200 hover:text-amber-300"
                                    }`}
                                    onClick={() =>
                                      handleQuestionResponse(question.id, star)
                                    }
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Logic Mode Controls */}
                  {isLogicMode && (
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogicBack}
                        disabled={questionHistory.length <= 1}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                      </Button>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Logic Mode
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Question {currentQuestionIndex + 1} of{" "}
                          {questions.length}
                        </span>
                      </div>

                      <div className="w-16"> {/* Spacer for alignment */}</div>
                    </div>
                  )}

                  {/* Pagination Controls */}
                  {!isLogicMode && paginationEnabled && totalPages > 1 && (
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(0, prev - 1))
                        }
                        disabled={currentPage === 0}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                          {currentPage + 1}
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages - 1, prev + 1)
                          )
                        }
                        disabled={
                          currentPage === totalPages - 1 ||
                          hasUnansweredRequiredQuestionsOnCurrentPage()
                        }
                        className="flex items-center gap-2"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div className="pt-4 space-y-3">
                    {/* Progress Indicator */}
                    {getRequiredQuestions().length > 0 && (
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <span>Progress: {getCompletionPercentage()}%</span>
                          <span>
                            ({getAnsweredRequiredQuestions().length}/
                            {getRequiredQuestions().length} required)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getCompletionPercentage()}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {!isSubmitted ? (
                      <Button
                        className={`w-full transition-all duration-200 ${
                          isAllRequiredQuestionsAnswered()
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                        style={
                          isAllRequiredQuestionsAnswered() &&
                          getDistributionType() === "dedicated-survey-page"
                            ? getButtonStyle()
                            : isAllRequiredQuestionsAnswered() &&
                              getDistributionType() === "post-purchase" &&
                              postPurchaseSettings
                            ? {
                                backgroundColor: "#3b82f6",
                                color: "#ffffff",
                                borderRadius: "6px",
                              }
                            : isAllRequiredQuestionsAnswered() &&
                              getDistributionType() === "exit-intent" &&
                              exitIntentSettings
                            ? {
                                backgroundColor:
                                  exitIntentSettings.button.backgroundColor,
                                color: exitIntentSettings.button.textColor,
                                borderRadius: `${exitIntentSettings.button.borderRadius}px`,
                              }
                            : isAllRequiredQuestionsAnswered() &&
                              getDistributionType() === "onsite" &&
                              onSitePopupSettings
                            ? {
                                backgroundColor:
                                  onSitePopupSettings.button.backgroundColor,
                                color: onSitePopupSettings.button.textColor,
                                borderRadius: `${onSitePopupSettings.button.borderRadius}px`,
                              }
                            : isAllRequiredQuestionsAnswered() &&
                              getDistributionType() === "email-campaign"
                            ? getEmailCampaignButtonStyle()
                            : {}
                        }
                        disabled={
                          !isAllRequiredQuestionsAnswered() || isSubmitting
                        }
                        onClick={handleSurveySubmit}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : isAllRequiredQuestionsAnswered() ? (
                          <>
                            Submit Survey
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          <>
                            Complete Required Questions
                            <span className="ml-2 text-xs">
                              (
                              {getRequiredQuestions().length -
                                getAnsweredRequiredQuestions().length}{" "}
                              remaining)
                            </span>
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        {/* Thank You Message */}
                        <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                          <div className="text-4xl mb-3">🎉</div>
                          <h3 className="text-xl font-semibold text-green-800 mb-2">
                            Thank you for your feedback!
                          </h3>
                          <p className="text-sm text-green-700">
                            Your responses have been successfully submitted.
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={resetSurvey}
                            className="flex-1"
                          >
                            Take Survey Again
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => window.close()}
                            className="flex-1"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Discount Section - Only show when submitted and discount enabled */}
                    {isSubmitted && discountEnabled && (
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-lg">🎁</span>
                            <p className="text-lg font-semibold text-purple-800">
                              Here's your reward!
                            </p>
                          </div>

                          <div className="bg-white rounded-lg p-3 border border-purple-200">
                            <p className="text-sm font-medium text-gray-800 mb-2">
                              Enjoy{" "}
                              {discountType === "percentage"
                                ? `${discountValue}%`
                                : `$${discountValue}`}{" "}
                              off your next purchase!
                            </p>

                            {discountCode && (
                              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-md p-3 border-2 border-dashed border-purple-300">
                                <p className="text-xs text-purple-700 mb-1 font-medium">
                                  Your Discount Code:
                                </p>
                                <p className="font-mono font-bold text-xl text-purple-900 tracking-wider">
                                  {discountCode}
                                </p>
                                <button
                                  className="mt-2 text-xs text-purple-600 hover:text-purple-800 underline"
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      discountCode || ""
                                    )
                                  }
                                >
                                  📋 Copy Code
                                </button>
                              </div>
                            )}

                            {discountDescription && (
                              <p className="text-xs text-gray-600 mt-2 italic">
                                {discountDescription}
                              </p>
                            )}

                            {discountExpiryDays && (
                              <p className="text-xs text-orange-600 mt-2 font-medium">
                                ⏰ Expires in {discountExpiryDays} days
                              </p>
                            )}
                          </div>

                          <p className="text-xs text-purple-700">
                            {getDistributionType() === "post-purchase" ||
                            getDistributionType() === "email-campaign"
                              ? "A copy has been sent to your email"
                              : "Save this code for your next purchase"}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Trust Signals */}
                    {getDistributionType() === "dedicated-survey-page" &&
                      brandedSurveySettings?.trustSignals && (
                        <div className="flex justify-center items-center space-x-4 pt-2">
                          {brandedSurveySettings.trustSignals.showSSL && (
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-muted-foreground">
                                SSL Secure
                              </span>
                            </div>
                          )}
                          {brandedSurveySettings.trustSignals
                            .showPrivacyBadge && (
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-xs text-muted-foreground">
                                Privacy Protected
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              )}
          </div>

          {/* Bottom Progress Bar */}
          {getDistributionType() === "dedicated-survey-page" &&
            brandedSurveySettings?.progressBar.enabled &&
            brandedSurveySettings.progressBar.position === "bottom" && (
              <div
                className="w-full h-1"
                style={{
                  backgroundColor:
                    brandedSurveySettings.progressBar.backgroundColor,
                }}
              >
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    backgroundColor:
                      brandedSurveySettings.section.accentColor ||
                      brandedSurveySettings.progressBar.color,
                    width: questions.length > 0 ? "33%" : "0%",
                  }}
                />
              </div>
            )}
        </div>

        {/* Preview Info */}
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Preview shows how your survey will appear to customers
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyPreview;
