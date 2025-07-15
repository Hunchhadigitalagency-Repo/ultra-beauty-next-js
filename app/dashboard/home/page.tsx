import React from "react";
import StatsCard from "./components/stats-card/stats-card";
import RevenueIcon from "@/components/common/icons/revenue-icon";
import SalesIcon from "@/components/common/icons/sales-icon";
import InventoryIcon from "@/components/common/icons/inventory-icon";
import VisitorsIcon from "@/components/common/icons/visitors-icon";
import SalesByCategoryChart from "./components/sales-by-category/sales-by-category-chart";
import NewOrdersSection from "./components/new-orders/new-orders-section";
import TopSellingSection from "./components/top-selling/top-selling-section";
import StockOutSection from "./components/stock-out/stock-out-section";
import LowStockSection from "./components/low-stock/low-stock-section";
import NewReviewSection from "./components/new-review/new-review-section";
import VisitedByTime from "./components/visited-by-time/visited-by-time";
import SalesAnalyticsChart from "./components/sales-analytics/sales-analytics";

const HomePage = () => {
  return (
    <main className="space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          Icon={RevenueIcon}
          title="Total Orders"
          value="20124581245555"
          percentage={100}
        />
        <StatsCard
          Icon={SalesIcon}
          title="Total Sales"
          value="475869"
          percentage={100}
        />
        <StatsCard
          Icon={InventoryIcon}
          title="Inventory Items"
          value="546895"
          percentage={100}
        />
        <StatsCard
          Icon={VisitorsIcon}
          title="Total Visitors"
          value="25468975"
          percentage={-5}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SalesAnalyticsChart />
        <SalesByCategoryChart />
      </section>

      <NewOrdersSection />

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="col-span-3 sm:col-span-3 lg:col-span-3">
          <TopSellingSection />
        </div>

        <div className="col-span-3 lg:col-span-2">
          <StockOutSection />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LowStockSection />
        <VisitedByTime />
      </section>

      <NewReviewSection />
    </main>
  );
};

export default HomePage;
