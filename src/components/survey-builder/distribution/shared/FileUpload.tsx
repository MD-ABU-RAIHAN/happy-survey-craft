import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  accept?: string;
  maxSizeMB?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  value,
  onChange,
  className = "",
  accept = "image/*",
  maxSizeMB = 5,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
      // Validate file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size should be less than ${maxSizeMB}MB`);
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      setIsUploading(true);
      try {
        const base64 = await convertFileToBase64(file);
        onChange(base64);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [maxSizeMB, onChange]
  );

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            handleFileUpload(file);
            break;
          }
        }
      }
    },
    [handleFileUpload]
  );

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const isImageUploaded = value && value.trim() !== "";

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-xs font-medium">{label}</Label>

      {isImageUploaded ? (
        <div className="relative">
          <div className="border-2 border-muted rounded-lg p-3 bg-white">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center space-x-3 flex-1 cursor-pointer"
                onClick={openFileDialog}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                  <img
                    src={value}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <ImageIcon className="w-6 h-6 text-muted-foreground hidden" />
                </div>
                <div>
                  <p className="text-sm font-medium">Image uploaded</p>
                  <p className="text-xs text-muted-foreground">
                    Click to replace
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20 hover:border-muted-foreground/40 bg-muted/10"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          onPaste={handlePaste}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openFileDialog();
            }
          }}
        >
          <div className="space-y-2">
            <Upload
              className={cn(
                "w-8 h-8 mx-auto",
                isUploading
                  ? "animate-pulse text-primary"
                  : "text-muted-foreground"
              )}
            />
            {isUploading ? (
              <p className="text-sm text-primary font-medium">Uploading...</p>
            ) : (
              <>
                <p className="text-sm font-medium">
                  Drop image here, click to browse, or paste
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to {maxSizeMB}MB
                </p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Button variant="outline" size="sm" type="button">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <span className="text-xs text-muted-foreground">or</span>
                  <span className="text-xs font-medium">Ctrl+V to paste</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
