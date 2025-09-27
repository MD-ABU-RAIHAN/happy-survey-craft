import React from "react";
import { ArrowLeft } from "lucide-react";

const SimpleHeader: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12 mt-6">
          <div className="flex gap-3 items-start">
            <ArrowLeft className="w-5 h-5 text-muted-foreground mt-1.5" />
            <div>
              <h1 className="text-lg font-medium text-foreground">
                Create Survey
              </h1>

              <p className="text-sm text-muted-foreground">
                Design and configure your customer survey with advanced
                targeting and incentives
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
