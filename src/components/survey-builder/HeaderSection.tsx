import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Edit3,
  Eye,
  Save,
} from "lucide-react";

interface HeaderSectionProps {
  surveyTitle: string;
  setSurveyTitle: (title: string) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  surveyTitle,
  setSurveyTitle,
}) => {
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
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                className="font-semibold border-none shadow-none text-lg bg-transparent min-w-0 w-auto"
              />
              <Edit3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <Badge
              variant="secondary"
              className="bg-survey-warning-light text-survey-warning border-survey-warning/20"
            >
              Draft
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="hidden sm:flex">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary-brand hover:from-primary-hover hover:to-secondary-brand text-white shadow-lg">
              <Save className="w-4 h-4 mr-2" />
              Save Survey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;