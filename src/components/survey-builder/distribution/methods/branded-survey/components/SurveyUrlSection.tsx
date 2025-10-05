import React from "react";
import { Button } from "@/components/ui/button";
import { Link, Copy, Check } from "lucide-react";

interface BrandedSurveySettings {
  customUrl: string;
}

interface SurveyUrlSectionProps {
  settings: BrandedSurveySettings;
  onCopyUrl: () => void;
  copiedUrl: boolean;
}

const SurveyUrlSection: React.FC<SurveyUrlSectionProps> = ({
  settings,
  onCopyUrl,
  copiedUrl,
}) => {
  const fullUrl = `https://yoursurveyapp.com/s/${settings.customUrl}`;

  return (
    <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
      <h5 className="font-semibold flex items-center gap-2">
        <Link className="w-5 h-5 text-primary" />
        Survey URL
      </h5>

      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-muted rounded-md px-3 py-2 text-sm">
          <span className="text-foreground">{fullUrl}</span>
        </div>
        <Button onClick={onCopyUrl} variant="outline" size="sm">
          {copiedUrl ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SurveyUrlSection;
