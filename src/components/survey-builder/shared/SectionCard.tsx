import React from "react";

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  badge,
  description,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-white/60 rounded-lg p-6 space-y-4 border border-muted ${className}`}>
      <div className="flex items-center justify-between">
        <h5 className="font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h5>
        {badge}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
};

export default SectionCard;