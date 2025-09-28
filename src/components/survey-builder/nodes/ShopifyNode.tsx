import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { ShoppingBag, DollarSign, Tag, Users } from "lucide-react";

interface ShopifyNodeData {
  checkType:
    | "customer_ltv"
    | "order_count"
    | "customer_tags"
    | "product_purchase";
  label: string;
}

const ShopifyNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as unknown as ShopifyNodeData;

  const getShopifyIcon = (checkType: string) => {
    switch (checkType) {
      case "customer_ltv":
        return <DollarSign className="w-4 h-4" />;
      case "order_count":
        return <ShoppingBag className="w-4 h-4" />;
      case "customer_tags":
        return <Tag className="w-4 h-4" />;
      case "product_purchase":
        return <Users className="w-4 h-4" />;
      default:
        return <ShoppingBag className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`
        bg-orange-50 border-2 border-orange-200 rounded-lg p-3 min-w-[180px] shadow-sm
        ${selected ? "border-orange-500 shadow-md" : ""}
        hover:shadow-md transition-all duration-200
      `}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-orange-500"
      />

      {/* Node Content */}
      <div className="flex items-center gap-2">
        {getShopifyIcon(nodeData.checkType)}
        <div>
          <div className="text-xs font-medium text-orange-800">
            Shopify Check
          </div>
          <div className="text-sm text-orange-700">
            {nodeData.label || nodeData.checkType.replace("_", " ")}
          </div>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-orange-500"
      />
    </div>
  );
};

export default ShopifyNode;
