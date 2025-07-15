export const getOutlineStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "in stock":
      return "border-green text-green";
    case "low stock":
      return "border-yellow text-yellow";
    case "empty":
      return "border-red text-red";
    default:
      return "border-gray-100 text-gray-800";
  }
};

export const getBackgroundStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "processing":
      return "bg-primary ";
    case "delivered":
      return "bg-green ";
    case "cancelled":
      return "bg-red ";
    case "placed":
      return "bg-text-accent-foreground ";
    default:
      return "bg-text-accent-foreground ";
  }
};
