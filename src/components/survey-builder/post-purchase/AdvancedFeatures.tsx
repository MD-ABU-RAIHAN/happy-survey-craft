import React from "react";
import { SlimSwitch } from "@/components/ui/slim-switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionCard from "../shared/SectionCard";
import {
  Layers,
  TrendingUp,
  MousePointer,
  Smartphone,
  Sliders,
  Globe,
  Clock,
  Minimize,
  Maximize,
} from "lucide-react";

interface AdvancedFeaturesSettings {
  minimized: boolean;
}

interface AdvancedFeaturesProps {
  settings: AdvancedFeaturesSettings;
  onSettingsChange: (key: string, value: any) => void;
}

const AdvancedFeatures: React.FC<AdvancedFeaturesProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <SectionCard
      title="Advanced Features"
      icon={<Layers className="w-5 h-5 text-survey-success" />}
      className="bg-gradient-to-r from-survey-success-light to-survey-info-light border-survey-success/20"
    >
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-semibold flex items-center gap-2">
          <Layers className="w-5 h-5 text-survey-success" />
          Advanced Features
          {settings.minimized && (
            <Badge
              variant="outline"
              className="ml-2 text-xs bg-survey-success/10 text-survey-success border-survey-success/20"
            >
              Minimized
            </Badge>
          )}
        </h5>
        <Button
          variant="ghost"
          onClick={() =>
            onSettingsChange("advancedFeatures.minimized", !settings.minimized)
          }
          className="hover:bg-survey-success/10"
          title={
            settings.minimized
              ? "Expand Advanced Features"
              : "Minimize Advanced Features"
          }
        >
          {settings.minimized ? (
            <Maximize className="w-3 h-3" />
          ) : (
            <Minimize className="w-3 h-3" />
          )}
        </Button>
      </div>

      {settings.minimized ? (
        <div className="text-sm text-muted-foreground text-center py-2">
          Smart timing, A/B testing, mobile optimization, and more...
          <span
            className="text-survey-success cursor-pointer"
            onClick={() => onSettingsChange("advancedFeatures.minimized", false)}
          >
            Click to expand
          </span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/80 rounded-lg p-4">
              <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-survey-success" />
                Smart Timing
              </h6>
              <p className="text-xs text-muted-foreground mb-3">
                Automatically adjust survey timing based on purchase value and
                customer behavior.
              </p>
              <SlimSwitch defaultChecked />
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-survey-warning" />
                Exit Intent Detection
              </h6>
              <p className="text-xs text-muted-foreground mb-3">
                Show survey when customer is about to leave the thank you page.
              </p>
              <SlimSwitch />
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-survey-info" />
                Mobile Optimization
              </h6>
              <p className="text-xs text-muted-foreground mb-3">
                Automatically optimize survey layout and interactions for mobile
                devices.
              </p>
              <SlimSwitch defaultChecked />
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-survey-purple" />
                A/B Testing
              </h6>
              <p className="text-xs text-muted-foreground mb-3">
                Test different survey designs and timing to optimize response
                rates.
              </p>
              <SlimSwitch />
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-secondary-brand" />
                Multi-language Support
              </h6>
              <p className="text-xs text-muted-foreground mb-3">
                Automatically detect customer location and show survey in their
                language.
              </p>
              <SlimSwitch />
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <h6 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Smart Frequency Capping
              </h6>
              <p className="text-xs text-muted-foreground mb-3">
                Prevent survey fatigue by limiting how often customers see
                surveys.
              </p>
              <div className="flex items-center justify-between">
                <SlimSwitch defaultChecked />
                <Select defaultValue="30-days">
                  <SelectTrigger className="w-24 h-6 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-days">7 days</SelectItem>
                    <SelectItem value="30-days">30 days</SelectItem>
                    <SelectItem value="90-days">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </>
      )}
    </SectionCard>
  );
};

export default AdvancedFeatures;