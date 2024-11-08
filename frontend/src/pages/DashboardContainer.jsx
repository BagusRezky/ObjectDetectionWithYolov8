import StatsCard from "../components/StatsCard";
import LineGraph from "../components/LineGraph";
import BarGraph from "../components/BarGraph";
import PieChart from "../components/PieChart";
import { IconChartBar, IconEyeUp, IconGraph, IconPresentation, IconRoute, IconRoute2 } from "@tabler/icons-react";
import '../../src/index.css';
import TopBar from "../components/topbar/TopBar";

function DashboardContainer() {
  return (
    <div className="flex flex-col">
      <TopBar title="Dashboard" />
      <div className="safe-area-page">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={IconGraph}
            title="Total Interactions"
            value="7,265"
            percentage={11.02}
          />
          <StatsCard
            icon={IconChartBar}
            title="Total Engagement"
            value="3,671"
            percentage={-0.23}
          />
          <StatsCard
            icon={IconEyeUp}
            title="Total Billboard Views"
            value="156"
            percentage={85.02}
          />
          <StatsCard
            icon={IconRoute2}
            title="Total Travel"
            value="2,318"
            percentage={4.03} />
        </div>
        <LineGraph />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 md:col-span-4">
            <BarGraph />
          </div>
          <div className="col-span-6 md:col-span-2">
            <PieChart />
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;
