import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";

type Props = {
  data: {};
};

const Single = (props: Props) => {
  console.log(props.data);

  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{props.data.title}</h1>
            <button>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
