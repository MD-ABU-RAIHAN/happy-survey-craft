/**
 * Survey Header Component
 * Top navigation and actions for survey builder
 */

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Edit3,
  Eye,
  Save,
  Download,
  MoreHorizontal,
} from "lucide-react";
import { Survey } from "@/types";
import { useUI } from "@/store";

interface SurveyHeaderProps {
  survey: Partial<Survey>;
  onUpdateSurvey: (updates: Partial<Survey>) => void;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({
  survey,
  onUpdateSurvey,
}) => {
  const { openPreviewModal, openSettingsModal, isSaving, setLoading } = useUI();

  const handleSave = async () => {
    setLoading("saving", true);
    try {
      // TODO: Implement save logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    } finally {
      setLoading("saving", false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-survey-success-light text-survey-success border-survey-success/20";
      case "paused":
        return "bg-survey-warning-light text-survey-warning border-survey-warning/20";
      case "archived":
        return "bg-muted text-muted-foreground border-muted/20";
      default:
        return "bg-survey-warning-light text-survey-warning border-survey-warning/20";
    }
  };

  return (
    <div className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary-brand rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">MS</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  MS Survey App
                </h1>
                <p className="text-xs text-muted-foreground">
                  Customer Survey Builder
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                value={survey.title || ""}
                onChange={(e) => onUpdateSurvey({ title: e.target.value })}
                className="font-semibold border-none shadow-none text-lg bg-transparent min-w-0 w-auto"
                placeholder="Survey Title"
              />
              <Edit3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <Badge
              variant="secondary"
              className={getStatusColor(survey.status)}
            >
              {survey.status || "Draft"}
            </Badge>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex"
              onClick={openSettingsModal}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={openPreviewModal}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              className="bg-gradient-to-r from-primary to-secondary-brand hover:from-primary-hover hover:to-secondary-brand text-white shadow-lg"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Survey"}
            </Button>

            <Button variant="ghost" size="sm" className="sm:hidden">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
