import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { SlimSwitch } from "@/components/ui/slim-switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Users, ChevronDown, ChevronUp } from "lucide-react";

interface UserTargetingSettings {
  type: "all-users" | "segment-users";
  userTag: {
    enabled: boolean;
    selectedTags: string[];
  };
  newCustomer: boolean;
  returningCustomer: boolean;
  productPurchase: {
    enabled: boolean;
    selectedProducts: string[];
  };
}

interface UserTargetingProps {
  settings: UserTargetingSettings;
  onSettingsChange: (key: string, value: string | boolean | string[]) => void;
}

const UserTargeting: React.FC<UserTargetingProps> = ({
  settings,
  onSettingsChange,
}) => {
  // Modal states
  const [userTagModalOpen, setUserTagModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Temporary states for modals
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
  const [tempSelectedProducts, setTempSelectedProducts] = useState<string[]>(
    []
  );

  // Available options
  const availableTags = [
    "VIP Customer",
    "Premium User",
    "Loyal Customer",
    "First Time Buyer",
    "Frequent Shopper",
    "High Value Customer",
  ];

  const availableProducts = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
    "Product F",
  ];

  // Handle User Tag Modal
  const handleUserTagToggle = (checked: boolean) => {
    if (checked) {
      setTempSelectedTags(settings.userTag.selectedTags);
      setUserTagModalOpen(true);
    } else {
      onSettingsChange("userTargeting.userTag.enabled", false);
      onSettingsChange("userTargeting.userTag.selectedTags", []);
    }
  };

  const handleUserTagSave = () => {
    onSettingsChange(
      "userTargeting.userTag.enabled",
      tempSelectedTags.length > 0
    );
    onSettingsChange("userTargeting.userTag.selectedTags", tempSelectedTags);
    setUserTagModalOpen(false);
  };

  const handleUserTagCancel = () => {
    setTempSelectedTags(settings.userTag.selectedTags);
    setUserTagModalOpen(false);
    if (settings.userTag.selectedTags.length === 0) {
      onSettingsChange("userTargeting.userTag.enabled", false);
    }
  };

  // Handle Product Modal
  const handleProductToggle = (checked: boolean) => {
    if (checked) {
      setTempSelectedProducts(settings.productPurchase.selectedProducts);
      setProductModalOpen(true);
    } else {
      onSettingsChange("userTargeting.productPurchase.enabled", false);
      onSettingsChange("userTargeting.productPurchase.selectedProducts", []);
    }
  };

  const handleProductSave = () => {
    onSettingsChange(
      "userTargeting.productPurchase.enabled",
      tempSelectedProducts.length > 0
    );
    onSettingsChange(
      "userTargeting.productPurchase.selectedProducts",
      tempSelectedProducts
    );
    setProductModalOpen(false);
  };

  const handleProductCancel = () => {
    setTempSelectedProducts(settings.productPurchase.selectedProducts);
    setProductModalOpen(false);
    if (settings.productPurchase.selectedProducts.length === 0) {
      onSettingsChange("userTargeting.productPurchase.enabled", false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-secondary-brand/5 to-survey-info/5 rounded-lg p-6 space-y-4 border border-secondary-brand/10">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-secondary-brand" />
          User Targeting
        </h5>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMinimized(!isMinimized)}
          className="h-8 w-8 p-0 hover:bg-secondary-brand/10"
        >
          {isMinimized ? (
            <ChevronDown className="h-4 w-4 text-secondary-brand" />
          ) : (
            <ChevronUp className="h-4 w-4 text-secondary-brand" />
          )}
        </Button>
      </div>

      {!isMinimized && (
        <>
          <div className="space-y-6">
            {/* Target Type Selection */}
            <div className="space-y-3">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="all-users"
                    name="targetType"
                    value="all-users"
                    checked={settings.type === "all-users"}
                    onChange={() =>
                      onSettingsChange("userTargeting.type", "all-users")
                    }
                    className="w-4 h-4 text-primary"
                  />
                  <Label htmlFor="all-users" className="text-sm cursor-pointer">
                    All Users
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="segment-users"
                    name="targetType"
                    value="segment-users"
                    checked={settings.type === "segment-users"}
                    onChange={() =>
                      onSettingsChange("userTargeting.type", "segment-users")
                    }
                    className="w-4 h-4 text-primary"
                  />
                  <Label
                    htmlFor="segment-users"
                    className="text-sm cursor-pointer"
                  >
                    A Segment of Users
                  </Label>
                </div>
              </div>
            </div>

            {/* Segment Options */}
            {settings.type === "segment-users" && (
              <div className="space-y-4 ml-6">
                {/* User Tag Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">User Tag</Label>
                    <SlimSwitch
                      checked={settings.userTag.selectedTags.length > 0}
                      onCheckedChange={handleUserTagToggle}
                    />
                  </div>
                  {settings.userTag.selectedTags.length > 0 && (
                    <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                      <span className="text-sm text-muted-foreground">
                        {settings.userTag.selectedTags.length} tag(s) selected
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTempSelectedTags(settings.userTag.selectedTags);
                          setUserTagModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>

                {/* New Customer Section */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm">New Customer</Label>
                  <SlimSwitch
                    checked={settings.newCustomer}
                    onCheckedChange={(checked) =>
                      onSettingsChange("userTargeting.newCustomer", checked)
                    }
                  />
                </div>

                {/* Returning Customer Section */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Returning Customer</Label>
                  <SlimSwitch
                    checked={settings.returningCustomer}
                    onCheckedChange={(checked) =>
                      onSettingsChange(
                        "userTargeting.returningCustomer",
                        checked
                      )
                    }
                  />
                </div>

                {/* Products Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Product purchased</Label>
                    <SlimSwitch
                      checked={
                        settings.productPurchase.selectedProducts.length > 0
                      }
                      onCheckedChange={handleProductToggle}
                    />
                  </div>
                  {settings.productPurchase.selectedProducts.length > 0 && (
                    <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                      <span className="text-sm text-muted-foreground">
                        {settings.productPurchase.selectedProducts.length}{" "}
                        product(s) selected
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTempSelectedProducts(
                            settings.productPurchase.selectedProducts
                          );
                          setProductModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Tag Modal */}
          <Dialog open={userTagModalOpen} onOpenChange={setUserTagModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Select User Tags</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      checked={tempSelectedTags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTempSelectedTags([...tempSelectedTags, tag]);
                        } else {
                          setTempSelectedTags(
                            tempSelectedTags.filter((t) => t !== tag)
                          );
                        }
                      }}
                    />
                    <Label className="text-sm">{tag}</Label>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleUserTagCancel}>
                  Cancel
                </Button>
                <Button onClick={handleUserTagSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Product Modal */}
          <Dialog open={productModalOpen} onOpenChange={setProductModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Select Products Purchased</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {availableProducts.map((product) => (
                  <div key={product} className="flex items-center space-x-2">
                    <Checkbox
                      checked={tempSelectedProducts.includes(product)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTempSelectedProducts([
                            ...tempSelectedProducts,
                            product,
                          ]);
                        } else {
                          setTempSelectedProducts(
                            tempSelectedProducts.filter((p) => p !== product)
                          );
                        }
                      }}
                    />
                    <Label className="text-sm">{product}</Label>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleProductCancel}>
                  Cancel
                </Button>
                <Button onClick={handleProductSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default UserTargeting;
