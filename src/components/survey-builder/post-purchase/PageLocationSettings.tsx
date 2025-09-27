import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Globe,
  ExternalLink,
  CheckCircle,
  Clock,
  ShoppingCart,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface PostPurchasePageSettings {
  shopifyCheckout: boolean;
  installationSteps: {
    orderStatusPage: string;
    thankYouPage: string;
  };
  displayLocation: "thank-you" | "order-status" | "both";
}

interface PageLocationSettingsProps {
  settings: PostPurchasePageSettings;
  onSettingsChange: (key: string, value: string | boolean) => void;
}

const PageLocationSettings: React.FC<PageLocationSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const pageOptions = [
    {
      id: "thank-you",
      label: "Thank You Page",
      description: "Show survey after order completion",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      recommended: true,
      installUrl: settings.installationSteps.thankYouPage,
    },
    {
      id: "order-status",
      label: "Order Status Page",
      description: "Show survey on order tracking page",
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      recommended: false,
      installUrl: settings.installationSteps.orderStatusPage,
    },
    {
      id: "both",
      label: "Both Pages",
      description: "Maximum visibility across checkout flow",
      icon: <Globe className="w-5 h-5 text-purple-600" />,
      recommended: false,
      installUrl: null,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-6 space-y-6 border border-blue-100">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-blue-600" />
          Page Location Settings
        </h5>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="text-xs bg-blue-100 text-blue-700"
          >
            Shopify Integration
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 hover:bg-blue-100"
          >
            {isMinimized ? (
              <ChevronDown className="h-4 w-4 text-blue-600" />
            ) : (
              <ChevronUp className="h-4 w-4 text-blue-600" />
            )}
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Info Alert */}
          <Alert className="bg-blue-50/50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Shopify Setup Required:</strong> Choose where your
              post-purchase survey should appear. Each option requires specific
              Shopify checkout extensions to be installed.
            </AlertDescription>
          </Alert>

          {/* Page Selection */}
          <div className="space-y-4">
            <Label className="font-medium text-gray-800">
              Display Location
            </Label>
            <div className="grid gap-4">
              {pageOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    settings.displayLocation === option.id
                      ? "border-blue-500 bg-blue-50/50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() =>
                    onSettingsChange(
                      "postPurchasePage.displayLocation",
                      option.id
                    )
                  }
                >
                  {/* Radio Button */}
                  <input
                    type="radio"
                    name="displayLocation"
                    value={option.id}
                    checked={settings.displayLocation === option.id}
                    onChange={() =>
                      onSettingsChange(
                        "postPurchasePage.displayLocation",
                        option.id
                      )
                    }
                    className="absolute top-4 right-4 w-4 h-4 text-blue-600"
                  />

                  <div className="flex items-start gap-3 pr-8">
                    {option.icon}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h6 className="font-medium text-gray-900">
                          {option.label}
                        </h6>
                        {option.recommended && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-green-100 text-green-700"
                          >
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>

                      {/* Installation Link */}
                      {option.installUrl && (
                        <div className="pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(option.installUrl, "_blank");
                            }}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Install Extension
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Installation Instructions */}
          {settings.displayLocation !== "both" && (
            <div className="bg-yellow-50/50 border border-yellow-200 rounded-lg p-4">
              <h6 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Setup Instructions
              </h6>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>
                  To display surveys on the selected page, you need to install
                  the corresponding Shopify checkout extension:
                </p>
                {settings.displayLocation === "thank-you" && (
                  <div className="flex items-center gap-2">
                    <span>
                      1. Click "Install Extension" above for Thank You Page
                    </span>
                  </div>
                )}
                {settings.displayLocation === "order-status" && (
                  <div className="flex items-center gap-2">
                    <span>
                      1. Click "Install Extension" above for Order Status Page
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span>2. Follow Shopify's setup wizard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>3. Enable the extension in your checkout settings</span>
                </div>
              </div>
            </div>
          )}

          {/* Both Pages Selected Instructions */}
          {settings.displayLocation === "both" && (
            <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-4">
              <h6 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Multiple Page Setup
              </h6>
              <div className="text-sm text-purple-700 space-y-2">
                <p className="font-medium">
                  You'll need to install both extensions:
                </p>
                <div className="space-y-1 ml-4">
                  <div className="flex items-center justify-between">
                    <span>• Thank You Page Extension</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-6"
                      onClick={() =>
                        window.open(
                          settings.installationSteps.thankYouPage,
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Install
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Order Status Page Extension</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-6"
                      onClick={() =>
                        window.open(
                          settings.installationSteps.orderStatusPage,
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Install
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PageLocationSettings;
