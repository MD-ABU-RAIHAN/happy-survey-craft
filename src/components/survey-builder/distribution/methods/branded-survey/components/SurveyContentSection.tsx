import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SurveyContentSettings {
  title: string;
  pageTitle: string;
  introductionText: string;
}

interface SurveyContentSectionProps {
  settings: SurveyContentSettings;
  onSettingsChange: (key: string, value: string) => void;
}

const SurveyContentSection: React.FC<SurveyContentSectionProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
      <h5 className="font-semibold flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Survey Content
      </h5>

      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="survey-title" className="text-sm font-medium">
            Title
          </Label>
          <Input
            id="survey-title"
            value={settings.title}
            onChange={(e) => onSettingsChange("title", e.target.value)}
            placeholder="Enter survey title"
            className="h-9"
          />
        </div>

        {/* Page Title (Standalone page only) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="page-title" className="text-sm font-medium">
              Page title (Dedicated Survey Page only)
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">
                    This title appears in the browser tab when users visit your
                    Dedicated Survey Page
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="page-title"
            value={settings.pageTitle}
            onChange={(e) => onSettingsChange("pageTitle", e.target.value)}
            placeholder="Enter page title"
            className="h-9"
          />
        </div>

        {/* Introduction Text */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="introduction-text" className="text-sm font-medium">
              Introduction text
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">
                    Optional description text that appears below the survey
                    title
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="introduction-text"
            value={settings.introductionText}
            onChange={(e) =>
              onSettingsChange("introductionText", e.target.value)
            }
            placeholder="Enter introduction text"
            className="min-h-[80px] resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SurveyContentSection;
