import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import "./home.scss";

const Home = () => {
  return (
    <div className="gap-3 grid grid-cols-1 sm:mr-3  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 ">
      
      <div className="p-5 rounded border 1 row-span-2 ">
        <TopBox />
      </div>
      <div className="p-5 rounded border 2  ">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="p-5 rounded border 3 ">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="p-5 rounded border  4">
        <PieChartBox />
      </div>
      <div className="p-5 rounded border 5">
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className="p-5 rounded border 6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className=" p-5 rounded border 7">
        <BigChartBox />
      </div>
      <div className="border p-5 rounded 8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="border p-5 rounded 9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
