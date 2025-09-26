"use client";

import OrdersByCategoryChart from "./components/orders-by-category/orders-by-category-chart";
import NewOrdersSection from "./components/new-orders/new-orders-section";
import TopSellingSection from "./components/top-selling/top-selling-section";
import StockOutSection from "./components/stock-out/stock-out-section";
import LowStockSection from "./components/low-stock/low-stock-section";
import VisitedByTime from "./components/visited-by-time/visited-by-time";
import OrdersAnalyticsChart from "./components/orders-analytics/orders-analytics";
import StatsCardsSection from "./components/stats-card/stats-cards-section";
import { withPermissions } from "@/hoc/withPermissions";
import { Permissions } from "@/types/permissions copy";

const HomePage = () => {
  return (
    <main className="space-y-8">
      <StatsCardsSection />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrdersAnalyticsChart />
        <OrdersByCategoryChart />
      </section>

      <NewOrdersSection />

      <section className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="w-full lg:w-[68%]">
          <TopSellingSection />
        </div>

        <div className="w-full lg:w-[32%]">
          <StockOutSection />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LowStockSection />
        <VisitedByTime />
      </section>
    </main>
  );
};

export default withPermissions(HomePage, [Permissions.CAN_READ_DASHBOARD]);
