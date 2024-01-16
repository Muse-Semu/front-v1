import { MdClose, MdSwipeRight } from "react-icons/md";
import { boxAction } from "../../redux/boxSlice";
import { useDispatch, useSelector } from "react-redux";
type Props = {
  message: { type: string; msg: string };
};
function ConfirmBox(props: Props) {
    const dispatch = useDispatch()
    const box = useSelector(state=>state.box.isConfirmBox)
  return (
    <div className="modal-wrapper">
      <div className="msg-box relative">
        <div
          className={`flex p-2 ${
            props.message.type.toLowerCase() === "error"
              ? "bg-red-500"
              : "bg-green-500"
          } items-center justify-between font-bold gap-2  `}
        >
          <div className="flex items-center gap-2 ">
            <MdSwipeRight />
            {props.message.type.toLowerCase() === "error" ? (
              <h1>Error</h1>
            ) : (
              <h1>Success</h1>
            )}
          </div>
          <button
            className="rounded p-1"
            onClick={() => dispatch(boxAction.showConfirmBox(box))}
          >
            <MdClose size={25} />
          </button>
        </div>
        <div className="flex items-center justify-center p-3 m-auto font-bold">
          <h1>{props.message.msg}</h1>
        </div>
        <div className=" grid  items-center font-bold grid-cols-2 p-2 gap-2 absolute  bottom-3 w-full">
          <button className="submit-btn"> Add</button>
          <button className="bg-red-500 rounded-md px-2 py-2"> Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBox;
