import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CustomSwitch } from "@/components/ui/custom-switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Gift, ChevronDown, ChevronRight } from "lucide-react";
import DiscountConfiguration from "./incentives/DiscountConfiguration";

interface DiscountTabRefactoredProps {
  isDiscountEnabled: boolean;
  setIsDiscountEnabled: (enabled: boolean) => void;
  discountType: "percentage" | "fixed";
  setDiscountType: (type: "percentage" | "fixed") => void;
  discountValue: string;
  setDiscountValue: (value: string) => void;
  discountDescription: string;
  setDiscountDescription: (description: string) => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountExpiryDays: string;
  setDiscountExpiryDays: (days: string) => void;

  // New customization props
  rewardTitle: string;
  setRewardTitle: (title: string) => void;
  discountMessage: string;
  setDiscountMessage: (message: string) => void;
  actionMessage: string;
  setActionMessage: (message: string) => void;
  deliveryMethod: "email" | "thank_you_page";
  setDeliveryMethod: (method: "email" | "thank_you_page") => void;

  // Email configuration props
  fromEmail: string;
  setFromEmail: (email: string) => void;
  emailSubject: string;
  setEmailSubject: (subject: string) => void;
  emailBody: string;
  setEmailBody: (body: string) => void;
}

const DiscountTabRefactored: React.FC<DiscountTabRefactoredProps> = ({
  isDiscountEnabled,
  setIsDiscountEnabled,
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
  discountDescription,
  setDiscountDescription,
  discountCode,
  setDiscountCode,
  discountExpiryDays,
  setDiscountExpiryDays,
  rewardTitle,
  setRewardTitle,
  discountMessage,
  setDiscountMessage,
  actionMessage,
  setActionMessage,
  deliveryMethod,
  setDeliveryMethod,
  fromEmail,
  setFromEmail,
  emailSubject,
  setEmailSubject,
  emailBody,
  setEmailBody,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(!isDiscountEnabled);

  // Auto-expand when enabled, auto-collapse when disabled
  React.useEffect(() => {
    if (isDiscountEnabled) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }, [isDiscountEnabled]);

  return (
    <div className="p-6 pt-4 space-y-6">
      <Collapsible
        open={!isCollapsed}
        onOpenChange={(open) => setIsCollapsed(!open)}
      >
        <Card
          className={`transition-all duration-300 border-2 ${
            isDiscountEnabled
              ? "border-primary/20 shadow-lg"
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
                    isDiscountEnabled ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <Gift
                    className={`w-5 h-5 ${
                      isDiscountEnabled
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold flex items-center gap-2">
                    Discount
                    {isDiscountEnabled ? (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-muted text-muted-foreground"
                      >
                        Inactive
                      </Badge>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {isDiscountEnabled
                      ? "Customers will receive a discount code after survey completion"
                      : "Enable discount rewards to boost survey completion rates"}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <CustomSwitch
                  checked={isDiscountEnabled}
                  onCheckedChange={setIsDiscountEnabled}
                />
              </div>
            </div>
          </CardHeader>

          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
            <CardContent className="pt-0 space-y-6">
              <DiscountConfiguration
                discountType={discountType}
                setDiscountType={setDiscountType}
                discountValue={discountValue}
                setDiscountValue={setDiscountValue}
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
                discountExpiryDays={discountExpiryDays}
                setDiscountExpiryDays={setDiscountExpiryDays}
                discountDescription={discountDescription}
                setDiscountDescription={setDiscountDescription}
                rewardTitle={rewardTitle}
                setRewardTitle={setRewardTitle}
                discountMessage={discountMessage}
                setDiscountMessage={setDiscountMessage}
                actionMessage={actionMessage}
                setActionMessage={setActionMessage}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                fromEmail={fromEmail}
                setFromEmail={setFromEmail}
                emailSubject={emailSubject}
                setEmailSubject={setEmailSubject}
                emailBody={emailBody}
                setEmailBody={setEmailBody}
              />
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default DiscountTabRefactored;
