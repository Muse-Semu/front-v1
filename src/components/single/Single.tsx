import { slugs } from "../../constant";
import "./single.scss";

type Props = {
  data: Object;
  slug:string
};

const Single = (props: Props) => {
  console.log(props.data);
  
  return (
    <div className="single">
      <div className="view">
        <div className="info">
        
          <div className="header">
          {`${props.slug.toUpperCase()} INFORMATION`}
          </div>
          <div>
            {props.slug === slugs.EXAM && (<div>
              <h1>{props.data.title}</h1>
              <h1>{props.data.givenTime}</h1>
              <h1>{props.data.examCategory.title}</h1>
              <h1>{props.data.subject.title}</h1>
            </div>)}
          </div>
          {}
        </div>
      </div>
      
    </div>
  );
};

export default Single;
