/**
 * Survey Preview Component
 * Renders a preview of the survey as end users will see it
 */

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  StarHalf,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Survey, SurveyQuestion } from "@/types";
import { cn } from "@/lib/utils";

interface SurveyPreviewProps {
  survey: Survey;
  className?: string;
  device?: "desktop" | "tablet" | "mobile";
  onDeviceChange?: (device: "desktop" | "tablet" | "mobile") => void;
}

export const SurveyPreview: React.FC<SurveyPreviewProps> = ({
  survey,
  className,
  device = "desktop",
  onDeviceChange,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = survey.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const renderQuestion = (question: SurveyQuestion) => {
    const answer = answers[question.id] || "";

    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-3">
            <RadioGroup
              value={answer}
              onValueChange={(value) => handleAnswer(question.id, value)}
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`${question.id}-${index}`}
                  />
                  <Label
                    htmlFor={`${question.id}-${index}`}
                    className="cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "text":
        return (
          <Textarea
            value={answer}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder={question.placeholder || "Enter your response..."}
            rows={3}
            className="resize-none"
          />
        );

      case "email":
      case "phone":
        return (
          <Input
            type={question.type === "email" ? "email" : "tel"}
            value={answer}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder={
              question.placeholder || `Enter your ${question.type}...`
            }
          />
        );

      case "rating":
        return (
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleAnswer(question.id, rating.toString())}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={cn(
                    "w-8 h-8 transition-colors",
                    parseInt(answer) >= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              </button>
            ))}
          </div>
        );

      case "nps":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-11 gap-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleAnswer(question.id, rating.toString())}
                  className={cn(
                    "aspect-square rounded-lg border-2 text-sm font-medium transition-colors",
                    parseInt(answer) === rating
                      ? "bg-survey-primary border-survey-primary text-white"
                      : "border-gray-300 hover:border-survey-primary"
                  )}
                >
                  {rating}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Not at all likely</span>
              <span>Extremely likely</span>
            </div>
          </div>
        );

      default:
        return (
          <p className="text-muted-foreground italic">
            Question type "{question.type}" preview not implemented
          </p>
        );
    }
  };

  const deviceSizes = {
    desktop: "w-full max-w-4xl",
    tablet: "w-full max-w-2xl",
    mobile: "w-full max-w-sm",
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Device Selection */}
      {onDeviceChange && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <Button
            variant={device === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => onDeviceChange("desktop")}
            className="flex items-center gap-1"
          >
            <Monitor className="w-4 h-4" />
            Desktop
          </Button>
          <Button
            variant={device === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => onDeviceChange("tablet")}
            className="flex items-center gap-1"
          >
            <Tablet className="w-4 h-4" />
            Tablet
          </Button>
          <Button
            variant={device === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => onDeviceChange("mobile")}
            className="flex items-center gap-1"
          >
            <Smartphone className="w-4 h-4" />
            Mobile
          </Button>
        </div>
      )}

      {/* Survey Preview */}
      <div className={cn("mx-auto", deviceSizes[device])}>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-1">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-2">
                  <Eye className="w-3 h-3 mr-1" />
                  Preview Mode
                </Badge>
                <h1 className="text-2xl font-bold">{survey.title}</h1>
                {survey.description && (
                  <p className="text-muted-foreground">{survey.description}</p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mt-6">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Question {currentQuestionIndex + 1} of{" "}
                    {survey.questions.length}
                  </span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {currentQuestion && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">
                        {currentQuestion.title}
                      </h2>
                      {currentQuestion.required && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    {currentQuestion.description && (
                      <p className="text-muted-foreground text-sm">
                        {currentQuestion.description}
                      </p>
                    )}
                  </div>

                  <div className="py-4">{renderQuestion(currentQuestion)}</div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="text-sm text-muted-foreground">
                  {currentQuestionIndex + 1} / {survey.questions.length}
                </div>

                <Button
                  onClick={nextQuestion}
                  disabled={
                    currentQuestionIndex === survey.questions.length - 1
                  }
                  className="flex items-center gap-2"
                >
                  {currentQuestionIndex === survey.questions.length - 1
                    ? "Submit"
                    : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
