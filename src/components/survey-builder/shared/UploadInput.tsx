import React from "react";
import FileUpload from "./FileUpload";

interface UploadInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showUploadButton?: boolean;
  onUpload?: () => void;
  className?: string;
}

const UploadInput: React.FC<UploadInputProps> = ({
  label,
  value,
  onChange,
  className = "",
}) => {
  return (
    <FileUpload
      label={label}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default UploadInput;
