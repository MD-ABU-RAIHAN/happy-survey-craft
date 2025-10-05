import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, ChevronDown, ChevronUp } from "lucide-react";

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

  return (
    <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-lg p-6 space-y-6 border border-blue-100">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Installation Instructions
        </h5>
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

      {!isMinimized && (
        <div className="space-y-4">
          {/* Text Instructions */}
          <div className="bg-white/70 rounded-lg p-5 space-y-3 border border-blue-100">
            <h6 className="font-medium text-gray-900 mb-3">
              How to Install Post-Purchase Survey
            </h6>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex gap-3">
                <span className="font-semibold text-blue-600 min-w-[20px]">
                  1.
                </span>
                <p>
                  Go to your Shopify admin panel and navigate to Settings →
                  Checkout
                </p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-blue-600 min-w-[20px]">
                  2.
                </span>
                <p>
                  Scroll down to "Order status page" or "Thank you page"
                  section
                </p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-blue-600 min-w-[20px]">
                  3.
                </span>
                <p>Click "Add app block" and select "Happy Survey Craft"</p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-blue-600 min-w-[20px]">
                  4.
                </span>
                <p>
                  Configure the survey settings and click "Save" to activate
                </p>
              </div>
            </div>
          </div>

          {/* Video Tutorial */}
          <div className="bg-white/70 rounded-lg p-5 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-600" />
                <h6 className="font-medium text-gray-900">Video Tutorial</h6>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/watch?v=example",
                    "_blank"
                  )
                }
              >
                Watch Video
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Watch our step-by-step video guide to install and configure your
              post-purchase survey
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLocationSettings;
