import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { ChevronDown } from "lucide-react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Predefined color palette
const PREDEFINED_COLORS = [
  // Grays and neutral colors
  "#FFFFFF",
  "#F8F9FA",
  "#E9ECEF",
  "#DEE2E6",
  "#CED4DA",
  "#ADB5BD",
  "#6C757D",
  "#495057",
  "#343A40",
  "#212529",
  "#000000",
  // Primary colors
  "#FF5733",
  "#FF6B35",
  "#F7931E",
  "#FFD700",
  "#ADFF2F",
  "#32CD32",
  "#00FF7F",
  "#00CED1",
  "#1E90FF",
  "#4169E1",
  "#8A2BE2",
  // Secondary colors
  "#FF69B4",
  "#FF1493",
  "#DC143C",
  "#B22222",
  "#8B0000",
  "#FF4500",
  "#FF8C00",
  "#FFA500",
  "#FFB347",
  "#FFFF00",
  "#9ACD32",
  // Cool colors
  "#40E0D0",
  "#00FFFF",
  "#87CEEB",
  "#4682B4",
  "#5F9EA0",
  "#7B68EE",
  "#6A5ACD",
  "#9370DB",
  "#BA55D3",
  "#DA70D6",
  "#EE82EE",
  // Earth tones
  "#F5DEB3",
  "#DEB887",
  "#D2691E",
  "#CD853F",
  "#A0522D",
  "#8B4513",
  "#654321",
  "#800080",
  "#4B0082",
  "#2F4F4F",
  "#708090",
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempColor, setTempColor] = useState(value || "#000000");
  const [hexInput, setHexInput] = useState(value || "#000000");

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  const [rgbValues, setRgbValues] = useState(() => {
    const rgb = hexToRgb(value || "#000000");
    return { r: rgb.r, g: rgb.g, b: rgb.b };
  });

  useEffect(() => {
    setTempColor(value || "#000000");
    setHexInput(value || "#000000");
    const rgb = hexToRgb(value || "#000000");
    setRgbValues({ r: rgb.r, g: rgb.g, b: rgb.b });
  }, [value]);

  const handleColorChange = (newColor: string) => {
    setTempColor(newColor);
    setHexInput(newColor);
    const rgb = hexToRgb(newColor);
    setRgbValues({ r: rgb.r, g: rgb.g, b: rgb.b });
  };

  const handleApply = () => {
    onChange(tempColor);
    setIsOpen(false);
  };

  const handlePredefinedColorClick = (color: string) => {
    handleColorChange(color);
    onChange(color);
    setIsOpen(false);
  };

  const handleHexInputChange = (hex: string) => {
    setHexInput(hex);
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
      setTempColor(hex);
      const rgb = hexToRgb(hex);
      setRgbValues({ r: rgb.r, g: rgb.g, b: rgb.b });
    }
  };

  const handleRgbChange = (type: "r" | "g" | "b", val: string) => {
    const numVal = Math.max(0, Math.min(255, parseInt(val) || 0));
    const newRgb = { ...rgbValues, [type]: numVal };
    setRgbValues(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setTempColor(newHex);
    setHexInput(newHex);
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <Label className="text-xs font-medium">{label}</Label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start h-8 px-2 font-normal text-xs"
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded border border-gray-300 shadow-sm"
                style={{ backgroundColor: value || "#000000" }}
              />
              <span className="flex-1 text-left">{label}</span>
              <span className="text-xs text-muted-foreground font-mono">
                {value ? value.toUpperCase() : "#000000"}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-3" side="bottom" align="start">
          <div className="space-y-3">
            {/* Color Spectrum Picker */}
            <div className="space-y-2">
              <div className="w-full h-16 [&_.react-colorful]:!w-full [&_.react-colorful]:!h-full">
                <HexColorPicker
                  color={tempColor}
                  onChange={handleColorChange}
                />
              </div>
            </div>

            {/* Predefined Color Palette */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Colors</Label>
              <div className="grid grid-cols-10 gap-1">
                {PREDEFINED_COLORS.slice(0, 30).map((color, index) => (
                  <button
                    key={index}
                    className="w-4 h-4 rounded border border-gray-200 hover:scale-110 transition-transform cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => handlePredefinedColorClick(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Hex Input */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Hex</Label>
              <Input
                value={hexInput}
                onChange={(e) => handleHexInputChange(e.target.value)}
                placeholder="#000000"
                className="font-mono text-xs h-7"
              />
            </div>

            {/* Color Preview & Apply */}
            <div className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded border shadow-sm"
                  style={{ backgroundColor: tempColor || "#000000" }}
                />
                <div className="text-xs font-mono">
                  {tempColor ? tempColor.toUpperCase() : "#000000"}
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleApply}
                className="h-6 px-2 text-xs"
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPicker;
