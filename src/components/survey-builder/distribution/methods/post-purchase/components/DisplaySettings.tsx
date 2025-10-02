import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react";

interface DisplaySettings {
  delay: number;
  position: "center" | "bottom-right" | "top-center";
  showOnPages: string[];
}

interface DisplaySettingsProps {
  settings: DisplaySettings;
  onSettingsChange: (key: string, value: any) => void;
}

const DisplaySettingsComponent: React.FC<DisplaySettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="bg-white/60 rounded-lg p-6 space-y-4 border border-muted">
      <h5 className="font-semibold flex items-center gap-2">
        <Settings className="w-5 h-5 text-survey-purple" />
        Display Settings
      </h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm">Show Delay (seconds)</Label>
          <Input
            type="number"
            value={settings.delay}
            onChange={(e) =>
              onSettingsChange("display.delay", parseInt(e.target.value))
            }
            min={0}
            max={30}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm">Position</Label>
          <Select
            value={settings.position}
            onValueChange={(value) =>
              onSettingsChange("display.position", value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
              <SelectItem value="top-center">Top Center</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettingsComponent;