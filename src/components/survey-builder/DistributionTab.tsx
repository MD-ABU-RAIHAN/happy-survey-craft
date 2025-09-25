import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import BrandedSurveySettingsComponent from "./BrandedSurveySettings";
import PostPurchaseSettingsComponent from "./PostPurchaseSettings";

interface DistributionType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface BrandedSurveySettings {
  useCustomDomain: boolean;
  customDomain: string;
  customUrl: string;
  headerLogo: { enabled: boolean; url: string; width: number; height: number };
  sideLogo: { enabled: boolean; url: string; width: number; height: number };
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
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderRadius: number;
  };
  background: {
    type: "color" | "gradient" | "image";
    color: string;
    gradientFrom: string;
    gradientTo: string;
    gradientDirection: string;
    imageUrl: string;
    imageOpacity: number;
    imagePosition: string;
  };
  customCss: string;
  progressBar: {
    enabled: boolean;
    color: string;
    backgroundColor: string;
    borderRadius: number;
  };
  animation: {
    enabled: boolean;
    type: string;
    duration: number;
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
  display: {
    delay: number;
    position: "center" | "bottom-right" | "top-center";
    showOnPages: string[];
  };
  appearance: {
    primaryColor: string;
    backgroundColor: string;
    borderRadius: number;
    shadow: boolean;
  };
  sideLogo: {
    enabled: boolean;
    url: string;
    width: number;
    height: number;
    position: "left" | "right" | "center";
  };
  advancedFeatures: {
    enabled: boolean;
  };
}

interface DistributionTabProps {
  distributionTypes: DistributionType[];
  enabledDistributions: string[];
  collapsedDistributions: string[];
  distributionSettings: Record<string, any>;
  brandedSurveySettings: BrandedSurveySettings;
  postPurchaseSettings: PostPurchaseSettings;
  onToggleDistribution: (id: string) => void;
  onToggleCollapsed: (id: string) => void;
  onBrandedSurveySettingsChange: (settings: BrandedSurveySettings) => void;
  onPostPurchaseSettingsChange: (settings: PostPurchaseSettings) => void;
  onResetToDefault: () => void;
  onGenerateNewUrl: () => void;
  onCopyUrl: () => void;
  copiedUrl: boolean;
}

const DistributionTab: React.FC<DistributionTabProps> = ({
  distributionTypes,
  enabledDistributions,
  collapsedDistributions,
  distributionSettings,
  brandedSurveySettings,
  postPurchaseSettings,
  onToggleDistribution,
  onToggleCollapsed,
  onBrandedSurveySettingsChange,
  onPostPurchaseSettingsChange,
  onResetToDefault,
  onGenerateNewUrl,
  onCopyUrl,
  copiedUrl,
}) => {
  return (
    <div className="p-6 pt-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Distribution Settings</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Select and configure multiple distribution channels for your survey
        </p>
      </div>

      <div className="space-y-4">
        {distributionTypes.map((distribution) => {
          const IconComponent = distribution.icon;
          const isEnabled = enabledDistributions.includes(distribution.id);
          const isCollapsed = collapsedDistributions.includes(distribution.id);
          const settings =
            distributionSettings[
              distribution.id as keyof typeof distributionSettings
            ];

          return (
            <Collapsible
              key={distribution.id}
              open={!isCollapsed}
              onOpenChange={() => onToggleCollapsed(distribution.id)}
            >
              <Card
                className={`transition-all duration-300 border-2 ${
                  isEnabled
                    ? `${distribution.borderColor} ${distribution.bgColor} shadow-lg`
                    : "border-muted hover:border-muted-foreground/20"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CollapsibleTrigger className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                        {isCollapsed ? (
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </CollapsibleTrigger>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isEnabled ? distribution.bgColor : "bg-muted"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 ${
                            isEnabled
                              ? distribution.color
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold flex items-center gap-2">
                          {distribution.name}
                          {isEnabled && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary"
                            >
                              Active
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {distribution.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Switch
                        checked={isEnabled}
                        onCheckedChange={() => onToggleDistribution(distribution.id)}
                      />
                    </div>
                  </div>
                </CardHeader>

                <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  <CardContent className="pt-0 space-y-6">
                    {isEnabled ? (
                      distribution.id === "branded-survey" ? (
                        <BrandedSurveySettingsComponent
                          settings={brandedSurveySettings}
                          onSettingsChange={onBrandedSurveySettingsChange}
                          onResetToDefault={onResetToDefault}
                          onGenerateNewUrl={onGenerateNewUrl}
                          onCopyUrl={onCopyUrl}
                          copiedUrl={copiedUrl}
                        />
                      ) : distribution.id === "post-purchase" ? (
                        <PostPurchaseSettingsComponent
                          settings={postPurchaseSettings}
                          onSettingsChange={onPostPurchaseSettingsChange}
                        />
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            Settings for {distribution.name} will be implemented here
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          Enable {distribution.name} to configure settings
                        </p>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};

export default DistributionTab;