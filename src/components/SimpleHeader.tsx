import React from "react";
import { ArrowLeft } from "lucide-react";

const SimpleHeader: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-12">
          <div className="flex items-center space-x-3">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <h1 className="text-lg font-medium text-foreground">New Product</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
