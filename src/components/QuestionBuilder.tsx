import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Trash2,
  Copy,
  Plus,
  Type,
  CheckSquare,
  Star,
  BarChart3,
  Mail,
  Phone,
  Upload,
  ImageIcon,
  X,
  Settings,
  Eye,
  EyeOff,
  Clock,
  FileQuestion,
  CircleDot,
  ChevronDown as DropdownIcon,
  CheckCircle,
  Smile,
  Calendar,
  FileText,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface SurveyQuestion {
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
  satisfactionScale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
    showNumbers: boolean;
  };
  maxLength?: number; // For short answer
}

interface QuestionBuilderProps {
  questions: SurveyQuestion[];
  onQuestionsChange: (questions: SurveyQuestion[]) => void;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  questions,
  onQuestionsChange,
}) => {
  const [collapsedCustomAnswers, setCollapsedCustomAnswers] = useState<
    string[]
  >([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null
  );

  const questionTypeIcons = {
    "multiple-choice": CheckSquare,
    "single-choice": CircleDot,
    dropdown: DropdownIcon,
    "binary-choice": CheckCircle,
    text: Type,
    rating: Star,
    satisfaction: Smile,
    nps: BarChart3,
    email: Mail,
    phone: Phone,
    date: Calendar,
    "short-answer": FileText,
  };

  const questionTypeLabels = {
    "multiple-choice": "Multiple Choice",
    "single-choice": "Single Choice (Radio)",
    dropdown: "Dropdown",
    "binary-choice": "Binary Choice (Yes/No)",
    text: "Text Response",
    rating: "Rating Scale",
    satisfaction: "Satisfaction Scale",
    nps: "NPS Score",
    email: "Email Address",
    phone: "Phone Number",
    date: "Date",
    "short-answer": "Short Answer",
  };

  // Quick templates for common questions
  const questionTemplates = {
    satisfaction: {
      type: "rating" as const,
      title: "How satisfied are you with your overall experience?",
      description: "Please rate your experience from 1 to 5 stars",
    },
    recommendation: {
      type: "nps" as const,
      title: "How likely are you to recommend us to a friend or colleague?",
      description: "Please rate on a scale of 0-10",
    },
    feedback: {
      type: "text" as const,
      title: "What could we improve?",
      description: "Please share any suggestions or feedback",
      placeholder: "Your feedback helps us improve...",
    },
    "product-rating": {
      type: "multiple-choice" as const,
      title: "How would you rate this product?",
      options: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
    },
    "purchase-reason": {
      type: "multiple-choice" as const,
      title: "What motivated your purchase today?",
      options: [
        "Price",
        "Quality",
        "Brand reputation",
        "Recommendation",
        "Features",
      ],
      customAnswer: {
        enabled: true,
        displayMode: "on-select" as const,
        placeholder: "Please specify your reason...",
        description: "Tell us what specifically motivated your purchase",
      },
    },
  };

  const addQuestion = (type: SurveyQuestion["type"]) => {
    const newQuestionId = `question-${Date.now()}`;
    const newQuestion: SurveyQuestion = {
      id: newQuestionId,
      type,
      title: "New Question",
      required: true, // Changed from false to true - make required by default
      isCollapsed: false,
    };

    // Set default options and properties based on question type
    switch (type) {
      case "multiple-choice":
        newQuestion.options = ["Option 1", "Option 2"];
        break;
      case "single-choice":
        newQuestion.options = ["Option 1", "Option 2"];
        break;
      case "dropdown":
        newQuestion.options = ["Option 1", "Option 2"];
        break;
      case "binary-choice":
        newQuestion.options = ["Yes", "No"];
        break;
      case "text":
        newQuestion.placeholder = "Enter your answer...";
        break;
      case "short-answer":
        newQuestion.placeholder = "Enter a brief answer...";
        newQuestion.maxLength = 100;
        break;
      case "email":
        newQuestion.placeholder = "Enter your email address...";
        break;
      case "phone":
        newQuestion.placeholder = "Enter your phone number...";
        break;
      case "date":
        newQuestion.dateFormat = "MM/DD/YYYY";
        break;
      case "satisfaction":
        newQuestion.satisfactionScale = {
          min: 1,
          max: 5,
          minLabel: "Very Dissatisfied",
          maxLabel: "Very Satisfied",
          showNumbers: true,
        };
        break;
    }

    // Collapse all existing questions and expand the new one
    const updatedQuestions = questions.map((q) => ({
      ...q,
      isCollapsed: true,
    }));
    updatedQuestions.push(newQuestion);

    onQuestionsChange(updatedQuestions);
    setExpandedQuestionId(newQuestionId);

    // Reset the select value to allow selecting the same type again
    setSelectedQuestionType("");
  };

  const addQuestionFromTemplate = (
    templateKey: keyof typeof questionTemplates
  ) => {
    const template = questionTemplates[templateKey];
    const newQuestionId = `question-${Date.now()}`;
    const newQuestion: SurveyQuestion = {
      id: newQuestionId,
      ...template,
      required: true, // Changed from false to true - make required by default
      isCollapsed: false,
    };

    // Collapse all existing questions and expand the new one
    const updatedQuestions = questions.map((q) => ({
      ...q,
      isCollapsed: true,
    }));
    updatedQuestions.push(newQuestion);

    onQuestionsChange(updatedQuestions);
    setExpandedQuestionId(newQuestionId);
  };

  const updateQuestion = (id: string, updates: Partial<SurveyQuestion>) => {
    onQuestionsChange(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    );
  };

  const deleteQuestion = (id: string) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    onQuestionsChange(updatedQuestions);

    // If the deleted question was expanded, clear the expandedQuestionId
    if (expandedQuestionId === id) {
      setExpandedQuestionId(null);
    }
  };

  const duplicateQuestion = (id: string) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      const duplicatedId = `question-${Date.now()}`;
      const duplicated = {
        ...question,
        id: duplicatedId,
        title: `${question.title} (Copy)`,
        isCollapsed: false,
      };
      const index = questions.findIndex((q) => q.id === id);

      // Collapse all existing questions and expand the duplicated one
      const updatedQuestions = questions.map((q) => ({
        ...q,
        isCollapsed: true,
      }));
      updatedQuestions.splice(index + 1, 0, duplicated);

      onQuestionsChange(updatedQuestions);
      setExpandedQuestionId(duplicatedId);
    }
  };

  const toggleCollapse = (id: string) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return;

    if (question.isCollapsed) {
      // Expanding this question - collapse all others
      const updatedQuestions = questions.map((q) => ({
        ...q,
        isCollapsed: q.id === id ? false : true,
      }));
      onQuestionsChange(updatedQuestions);
      setExpandedQuestionId(id);
    } else {
      // Collapsing this question
      updateQuestion(id, { isCollapsed: true });
      setExpandedQuestionId(null);
    }
  };

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question?.options) {
      updateQuestion(questionId, {
        options: [...question.options, `Option ${question.options.length + 1}`],
      });
    }
  };

  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (question?.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question?.options && question.options.length > 2) {
      const newOptions = question.options.filter(
        (_, index) => index !== optionIndex
      );
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const onDragEnd = (result: {
    destination?: { index: number };
    source: { index: number };
  }) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onQuestionsChange(items);
  };

  const onOptionDragEnd = (
    questionId: string,
    result: { destination?: { index: number }; source: { index: number } }
  ) => {
    if (!result.destination) return;

    const question = questions.find((q) => q.id === questionId);
    if (!question?.options) return;

    const items = Array.from(question.options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateQuestion(questionId, { options: items });
  };

  // Image upload handler
  const handleImageUpload = (questionId: string, file: File) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        updateQuestion(questionId, {
          imageUrl: e.target?.result as string,
          imageName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (questionId: string) => {
    updateQuestion(questionId, { imageUrl: undefined, imageName: undefined });
  };

  // Custom answer helpers
  const toggleCustomAnswer = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    const isEnabled = question?.customAnswer?.enabled || false;

    updateQuestion(questionId, {
      customAnswer: {
        enabled: !isEnabled,
        displayMode: "on-select",
        placeholder: "Please specify...",
        description: "Allow customers to provide custom answers",
      },
    });
  };

  const updateCustomAnswerSetting = (
    questionId: string,
    key: string,
    value: string | boolean
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (question?.customAnswer) {
      updateQuestion(questionId, {
        customAnswer: {
          ...question.customAnswer,
          [key]: value,
        },
      });
    }
  };

  const toggleCustomAnswerCollapse = (questionId: string) => {
    setCollapsedCustomAnswers((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">
            Survey Questions
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Add and configure your survey questions with drag & drop
          </p>
        </div>

        <Select
          value={selectedQuestionType}
          onValueChange={(value) => {
            if (value) {
              addQuestion(value as SurveyQuestion["type"]);
            }
          }}
        >
          <SelectTrigger className="w-auto bg-primary hover:bg-primary-hover text-primary-foreground border-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </SelectTrigger>
          <SelectContent>
            {Object.entries(questionTypeLabels).map(([value, label]) => {
              const Icon =
                questionTypeIcons[value as keyof typeof questionTypeIcons];
              return (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {questions.length === 0 ? (
        <Card className="border-dashed border-2 border-muted">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-muted/30 rounded-lg flex items-center justify-center mb-6">
              <FileQuestion className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-sm">
              Start building your survey by adding your first question. Choose
              from multiple choice, text, ratings, and more.
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  onClick={() => addQuestion("multiple-choice")}
                  variant="outline"
                  size="sm"
                >
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Multiple Choice
                </Button>
                <Button
                  onClick={() => addQuestion("single-choice")}
                  variant="outline"
                  size="sm"
                >
                  <CircleDot className="w-4 h-4 mr-2" />
                  Single Choice
                </Button>
                <Button
                  onClick={() => addQuestion("dropdown")}
                  variant="outline"
                  size="sm"
                >
                  <DropdownIcon className="w-4 h-4 mr-2" />
                  Dropdown
                </Button>
                <Button
                  onClick={() => addQuestion("binary-choice")}
                  variant="outline"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Yes/No
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  onClick={() => addQuestion("text")}
                  variant="outline"
                  size="sm"
                >
                  <Type className="w-4 h-4 mr-2" />
                  Text Response
                </Button>
                <Button
                  onClick={() => addQuestion("short-answer")}
                  variant="outline"
                  size="sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Short Answer
                </Button>
                <Button
                  onClick={() => addQuestion("rating")}
                  variant="outline"
                  size="sm"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Rating Scale
                </Button>
                <Button
                  onClick={() => addQuestion("satisfaction")}
                  variant="outline"
                  size="sm"
                >
                  <Smile className="w-4 h-4 mr-2" />
                  Satisfaction
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  onClick={() => addQuestion("nps")}
                  variant="outline"
                  size="sm"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  NPS Score
                </Button>
                <Button
                  onClick={() => addQuestion("date")}
                  variant="outline"
                  size="sm"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </Button>
                <Button
                  onClick={() => addQuestion("email")}
                  variant="outline"
                  size="sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  onClick={() => addQuestion("phone")}
                  variant="outline"
                  size="sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {questions.map((question, index) => {
                  const QuestionIcon = questionTypeIcons[question.type];

                  return (
                    <Draggable
                      key={question.id}
                      draggableId={question.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`transition-all duration-200 ${
                            snapshot.isDragging
                              ? "shadow-xl rotate-1"
                              : "shadow-sm"
                          }`}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-move p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                                </div>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleCollapse(question.id)}
                                  className="p-1 h-auto hover:bg-muted"
                                >
                                  {question.isCollapsed ? (
                                    <ChevronRight className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </Button>

                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="secondary"
                                    className="bg-survey-info-light text-survey-info border-survey-info/20"
                                  >
                                    <QuestionIcon className="w-3 h-3 mr-1" />
                                    {questionTypeLabels[question.type]}
                                  </Badge>

                                  {question.isCollapsed && (
                                    <div className="flex flex-col">
                                      <span className="font-medium text-sm">
                                        {question.title}
                                      </span>
                                      {question.required && (
                                        <span className="text-xs text-muted-foreground">
                                          Required
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => duplicateQuestion(question.id)}
                                  className="h-8 w-8 p-0 hover:bg-muted"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteQuestion(question.id)}
                                  className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>

                          {!question.isCollapsed && (
                            <CardContent className="space-y-6">
                              <div className="grid gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Question Title
                                  </Label>
                                  <Input
                                    value={question.title}
                                    onChange={(e) =>
                                      updateQuestion(question.id, {
                                        title: e.target.value,
                                      })
                                    }
                                    placeholder="Enter your question"
                                    className="font-medium"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Description (Optional)
                                  </Label>
                                  <Textarea
                                    value={question.description || ""}
                                    onChange={(e) =>
                                      updateQuestion(question.id, {
                                        description: e.target.value,
                                      })
                                    }
                                    placeholder="Add additional context or instructions"
                                    rows={2}
                                    className="resize-none"
                                  />
                                </div>

                                {/* Image Upload Section */}
                                <div className="space-y-3">
                                  <Label className="text-sm font-medium flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    Question Image (Optional)
                                  </Label>

                                  {question.imageUrl ? (
                                    <div className="relative bg-muted rounded-lg p-4">
                                      <div className="flex items-start gap-3">
                                        <div className="relative">
                                          <img
                                            src={question.imageUrl}
                                            alt={question.imageName}
                                            className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium text-sm truncate">
                                            {question.imageName}
                                          </p>
                                          <p className="text-xs text-muted-foreground mt-1">
                                            Image uploaded successfully
                                          </p>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              removeImage(question.id)
                                            }
                                            className="mt-2 h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                          >
                                            <X className="w-3 h-3 mr-1" />
                                            Remove
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="relative">
                                      <div
                                        className="border-2 border-dashed border-muted hover:border-muted-foreground/50 rounded-lg p-6 text-center transition-colors cursor-pointer bg-muted/20 hover:bg-muted/30"
                                        onDragOver={(e) => {
                                          e.preventDefault();
                                          e.currentTarget.classList.add(
                                            "border-primary"
                                          );
                                        }}
                                        onDragLeave={(e) => {
                                          e.currentTarget.classList.remove(
                                            "border-primary"
                                          );
                                        }}
                                        onDrop={(e) => {
                                          e.preventDefault();
                                          e.currentTarget.classList.remove(
                                            "border-primary"
                                          );
                                          const files = e.dataTransfer.files;
                                          if (files[0]) {
                                            handleImageUpload(
                                              question.id,
                                              files[0]
                                            );
                                          }
                                        }}
                                        onClick={() => {
                                          const input = document.getElementById(
                                            `file-input-${question.id}`
                                          ) as HTMLInputElement;
                                          input?.click();
                                        }}
                                      >
                                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
                                        <p className="font-medium text-sm mb-1">
                                          Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          PNG, JPG, WebP up to 5MB
                                        </p>
                                      </div>
                                      <input
                                        id={`file-input-${question.id}`}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            handleImageUpload(
                                              question.id,
                                              file
                                            );
                                          }
                                          // Reset the input value to allow selecting the same file again
                                          e.target.value = "";
                                        }}
                                        className="hidden"
                                      />
                                    </div>
                                  )}
                                </div>

                                {(question.type === "text" ||
                                  question.type === "short-answer" ||
                                  question.type === "email" ||
                                  question.type === "phone") && (
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                      Placeholder Text
                                    </Label>
                                    <Input
                                      value={question.placeholder || ""}
                                      onChange={(e) =>
                                        updateQuestion(question.id, {
                                          placeholder: e.target.value,
                                        })
                                      }
                                      placeholder="Enter placeholder text..."
                                    />
                                    {question.type === "short-answer" && (
                                      <div className="mt-3">
                                        <Label className="text-sm font-medium">
                                          Maximum Length
                                        </Label>
                                        <Input
                                          type="number"
                                          min="10"
                                          max="500"
                                          value={question.maxLength || 100}
                                          onChange={(e) =>
                                            updateQuestion(question.id, {
                                              maxLength:
                                                parseInt(e.target.value) || 100,
                                            })
                                          }
                                          placeholder="100"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Date Configuration */}
                                {question.type === "date" && (
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">
                                      Date Format
                                    </Label>
                                    <Select
                                      value={
                                        question.dateFormat || "MM/DD/YYYY"
                                      }
                                      onValueChange={(
                                        value:
                                          | "MM/DD/YYYY"
                                          | "DD/MM/YYYY"
                                          | "YYYY-MM-DD"
                                      ) =>
                                        updateQuestion(question.id, {
                                          dateFormat: value,
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="MM/DD/YYYY">
                                          MM/DD/YYYY (US Format)
                                        </SelectItem>
                                        <SelectItem value="DD/MM/YYYY">
                                          DD/MM/YYYY (European Format)
                                        </SelectItem>
                                        <SelectItem value="YYYY-MM-DD">
                                          YYYY-MM-DD (ISO Format)
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}

                                {/* Satisfaction Scale Configuration */}
                                {question.type === "satisfaction" && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                          Scale Range (Min)
                                        </Label>
                                        <Input
                                          type="number"
                                          min="1"
                                          max="5"
                                          value={
                                            question.satisfactionScale?.min || 1
                                          }
                                          onChange={(e) =>
                                            updateQuestion(question.id, {
                                              satisfactionScale: {
                                                ...question.satisfactionScale,
                                                min:
                                                  parseInt(e.target.value) || 1,
                                                max:
                                                  question.satisfactionScale
                                                    ?.max || 5,
                                                minLabel:
                                                  question.satisfactionScale
                                                    ?.minLabel ||
                                                  "Very Dissatisfied",
                                                maxLabel:
                                                  question.satisfactionScale
                                                    ?.maxLabel ||
                                                  "Very Satisfied",
                                                showNumbers:
                                                  question.satisfactionScale
                                                    ?.showNumbers ?? true,
                                              },
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                          Scale Range (Max)
                                        </Label>
                                        <Input
                                          type="number"
                                          min="3"
                                          max="10"
                                          value={
                                            question.satisfactionScale?.max || 5
                                          }
                                          onChange={(e) =>
                                            updateQuestion(question.id, {
                                              satisfactionScale: {
                                                ...question.satisfactionScale,
                                                min:
                                                  question.satisfactionScale
                                                    ?.min || 1,
                                                max:
                                                  parseInt(e.target.value) || 5,
                                                minLabel:
                                                  question.satisfactionScale
                                                    ?.minLabel ||
                                                  "Very Dissatisfied",
                                                maxLabel:
                                                  question.satisfactionScale
                                                    ?.maxLabel ||
                                                  "Very Satisfied",
                                                showNumbers:
                                                  question.satisfactionScale
                                                    ?.showNumbers ?? true,
                                              },
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                          Min Label
                                        </Label>
                                        <Input
                                          value={
                                            question.satisfactionScale
                                              ?.minLabel || "Very Dissatisfied"
                                          }
                                          onChange={(e) =>
                                            updateQuestion(question.id, {
                                              satisfactionScale: {
                                                ...question.satisfactionScale,
                                                min:
                                                  question.satisfactionScale
                                                    ?.min || 1,
                                                max:
                                                  question.satisfactionScale
                                                    ?.max || 5,
                                                minLabel: e.target.value,
                                                maxLabel:
                                                  question.satisfactionScale
                                                    ?.maxLabel ||
                                                  "Very Satisfied",
                                                showNumbers:
                                                  question.satisfactionScale
                                                    ?.showNumbers ?? true,
                                              },
                                            })
                                          }
                                          placeholder="Very Dissatisfied"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                          Max Label
                                        </Label>
                                        <Input
                                          value={
                                            question.satisfactionScale
                                              ?.maxLabel || "Very Satisfied"
                                          }
                                          onChange={(e) =>
                                            updateQuestion(question.id, {
                                              satisfactionScale: {
                                                ...question.satisfactionScale,
                                                min:
                                                  question.satisfactionScale
                                                    ?.min || 1,
                                                max:
                                                  question.satisfactionScale
                                                    ?.max || 5,
                                                minLabel:
                                                  question.satisfactionScale
                                                    ?.minLabel ||
                                                  "Very Dissatisfied",
                                                maxLabel: e.target.value,
                                                showNumbers:
                                                  question.satisfactionScale
                                                    ?.showNumbers ?? true,
                                              },
                                            })
                                          }
                                          placeholder="Very Satisfied"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Switch
                                        checked={
                                          question.satisfactionScale
                                            ?.showNumbers ?? true
                                        }
                                        onCheckedChange={(checked) =>
                                          updateQuestion(question.id, {
                                            satisfactionScale: {
                                              ...question.satisfactionScale,
                                              min:
                                                question.satisfactionScale
                                                  ?.min || 1,
                                              max:
                                                question.satisfactionScale
                                                  ?.max || 5,
                                              minLabel:
                                                question.satisfactionScale
                                                  ?.minLabel ||
                                                "Very Dissatisfied",
                                              maxLabel:
                                                question.satisfactionScale
                                                  ?.maxLabel ||
                                                "Very Satisfied",
                                              showNumbers: checked,
                                            },
                                          })
                                        }
                                      />
                                      <Label className="text-sm font-medium">
                                        Show Numbers on Scale
                                      </Label>
                                    </div>
                                  </div>
                                )}

                                {(question.type === "multiple-choice" ||
                                  question.type === "single-choice" ||
                                  question.type === "dropdown" ||
                                  question.type === "binary-choice") &&
                                  question.options && (
                                    <div className="space-y-3">
                                      <Label className="text-sm font-medium">
                                        Answer Options
                                        {question.type === "binary-choice" && (
                                          <span className="text-xs text-muted-foreground ml-2">
                                            (Yes/No format)
                                          </span>
                                        )}
                                      </Label>
                                      <DragDropContext
                                        onDragEnd={(result) =>
                                          onOptionDragEnd(question.id, result)
                                        }
                                      >
                                        <Droppable
                                          droppableId={`options-${question.id}`}
                                        >
                                          {(provided) => (
                                            <div
                                              {...provided.droppableProps}
                                              ref={provided.innerRef}
                                              className="space-y-2"
                                            >
                                              {question.options?.map(
                                                (option, optionIndex) => (
                                                  <Draggable
                                                    key={`${question.id}-option-${optionIndex}`}
                                                    draggableId={`${question.id}-option-${optionIndex}`}
                                                    index={optionIndex}
                                                  >
                                                    {(provided, snapshot) => (
                                                      <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                                                          snapshot.isDragging
                                                            ? "bg-survey-info-light"
                                                            : "hover:bg-muted/50"
                                                        }`}
                                                      >
                                                        {question.type !==
                                                          "binary-choice" && (
                                                          <div
                                                            {...provided.dragHandleProps}
                                                            className="cursor-move p-1 hover:bg-muted rounded"
                                                          >
                                                            <GripVertical className="w-3 h-3 text-muted-foreground" />
                                                          </div>
                                                        )}
                                                        <div className="flex items-center space-x-2 flex-1">
                                                          {question.type ===
                                                            "single-choice" && (
                                                            <CircleDot className="w-4 h-4 text-muted-foreground" />
                                                          )}
                                                          {question.type ===
                                                            "multiple-choice" && (
                                                            <CheckSquare className="w-4 h-4 text-muted-foreground" />
                                                          )}
                                                          {question.type ===
                                                            "dropdown" && (
                                                            <span className="text-sm text-muted-foreground min-w-[20px]">
                                                              {optionIndex + 1}.
                                                            </span>
                                                          )}
                                                          {question.type ===
                                                            "binary-choice" && (
                                                            <CheckCircle className="w-4 h-4 text-muted-foreground" />
                                                          )}
                                                          <Input
                                                            value={option}
                                                            onChange={(e) =>
                                                              updateOption(
                                                                question.id,
                                                                optionIndex,
                                                                e.target.value
                                                              )
                                                            }
                                                            placeholder={`Option ${
                                                              optionIndex + 1
                                                            }`}
                                                            className="flex-1"
                                                            disabled={
                                                              question.type ===
                                                              "binary-choice"
                                                            }
                                                          />
                                                        </div>
                                                        {question.options &&
                                                          question.options
                                                            .length > 2 &&
                                                          question.type !==
                                                            "binary-choice" && (
                                                            <Button
                                                              variant="ghost"
                                                              size="sm"
                                                              onClick={() =>
                                                                removeOption(
                                                                  question.id,
                                                                  optionIndex
                                                                )
                                                              }
                                                              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                            >
                                                              <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                          )}
                                                      </div>
                                                    )}
                                                  </Draggable>
                                                )
                                              )}
                                              {provided.placeholder}
                                            </div>
                                          )}
                                        </Droppable>
                                      </DragDropContext>
                                      {question.type !== "binary-choice" && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => addOption(question.id)}
                                          className="w-full"
                                        >
                                          <Plus className="w-4 h-4 mr-2" />
                                          Add Option
                                        </Button>
                                      )}
                                    </div>
                                  )}

                                {/* Custom Answer Section for Multiple Choice and Single Choice */}
                                {(question.type === "multiple-choice" ||
                                  question.type === "single-choice") && (
                                  <div className="pt-4 border-t border-muted/50">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        {question.customAnswer?.enabled && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              toggleCustomAnswerCollapse(
                                                question.id
                                              )
                                            }
                                            className="p-1 h-auto hover:bg-muted"
                                          >
                                            {collapsedCustomAnswers.includes(
                                              question.id
                                            ) ? (
                                              <ChevronRight className="w-4 h-4" />
                                            ) : (
                                              <ChevronDown className="w-4 h-4" />
                                            )}
                                          </Button>
                                        )}
                                        <div className="flex items-center gap-2">
                                          <Settings className="w-4 h-4" />
                                          <Label className="text-sm font-medium">
                                            Allow Custom Answer
                                          </Label>
                                          <Badge
                                            variant={
                                              question.customAnswer?.enabled
                                                ? "default"
                                                : "secondary"
                                            }
                                            className="text-xs"
                                          >
                                            {question.customAnswer?.enabled
                                              ? "Enabled"
                                              : "Disabled"}
                                          </Badge>
                                        </div>
                                      </div>
                                      <Switch
                                        checked={
                                          question.customAnswer?.enabled ||
                                          false
                                        }
                                        onCheckedChange={() =>
                                          toggleCustomAnswer(question.id)
                                        }
                                      />
                                    </div>

                                    {question.customAnswer?.enabled &&
                                      !collapsedCustomAnswers.includes(
                                        question.id
                                      ) && (
                                        <div className="mt-4 ml-7 space-y-4">
                                          <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                                            <div className="space-y-3">
                                              <Label className="text-sm font-medium">
                                                Display Mode
                                              </Label>
                                              <Select
                                                value={
                                                  question.customAnswer
                                                    .displayMode
                                                }
                                                onValueChange={(
                                                  value: "always" | "on-select"
                                                ) =>
                                                  updateCustomAnswerSetting(
                                                    question.id,
                                                    "displayMode",
                                                    value
                                                  )
                                                }
                                              >
                                                <SelectTrigger>
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="always">
                                                    <div className="flex items-center gap-2">
                                                      <Eye className="w-4 h-4" />
                                                      Always show custom input
                                                    </div>
                                                  </SelectItem>
                                                  <SelectItem value="on-select">
                                                    <div className="flex items-center gap-2">
                                                      <EyeOff className="w-4 h-4" />
                                                      Show when "Other" is
                                                      selected
                                                    </div>
                                                  </SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>

                                            <div className="space-y-2">
                                              <Label className="text-sm font-medium">
                                                Custom Input Placeholder
                                              </Label>
                                              <Input
                                                value={
                                                  question.customAnswer
                                                    .placeholder
                                                }
                                                onChange={(e) =>
                                                  updateCustomAnswerSetting(
                                                    question.id,
                                                    "placeholder",
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Please specify..."
                                              />
                                            </div>

                                            <div className="space-y-2">
                                              <Label className="text-sm font-medium">
                                                Description (Optional)
                                              </Label>
                                              <Textarea
                                                value={
                                                  question.customAnswer
                                                    .description || ""
                                                }
                                                onChange={(e) =>
                                                  updateCustomAnswerSetting(
                                                    question.id,
                                                    "description",
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Instructions for custom answers"
                                                rows={2}
                                                className="resize-none"
                                              />
                                            </div>
                                          </div>

                                          <div className="bg-survey-info-light rounded-lg p-3">
                                            <div className="flex items-start gap-2">
                                              <Clock className="w-4 h-4 text-survey-info mt-0.5 flex-shrink-0" />
                                              <div>
                                                <h5 className="text-sm font-medium text-survey-info">
                                                  Preview
                                                </h5>
                                                <p className="text-xs text-survey-info/80 mt-1">
                                                  {question.customAnswer
                                                    .displayMode === "always"
                                                    ? "Custom input field will always be visible to customers"
                                                    : 'Custom input field will appear when customers select "Other" option'}
                                                </p>
                                                {question.customAnswer
                                                  .description && (
                                                  <p className="text-xs text-survey-info/70 mt-2 italic">
                                                    "
                                                    {
                                                      question.customAnswer
                                                        .description
                                                    }
                                                    "
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-4 border-t">
                                  <div className="flex items-center gap-2">
                                    <Label className="text-sm font-medium">
                                      Required Question
                                    </Label>
                                    <Badge
                                      variant={
                                        question.required
                                          ? "default"
                                          : "secondary"
                                      }
                                      className="text-xs"
                                    >
                                      {question.required
                                        ? "Required"
                                        : "Optional"}
                                    </Badge>
                                  </div>
                                  <Switch
                                    checked={question.required}
                                    onCheckedChange={(checked) =>
                                      updateQuestion(question.id, {
                                        required: checked,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default QuestionBuilder;
