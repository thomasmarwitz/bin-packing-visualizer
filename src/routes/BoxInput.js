import { DynamicForm } from "../view/DynamicForm/DynamicForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRequestDataBoxes } from "../store/apiSlice/apiSlice";

export function BoxInput() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmittedData = (data) => {
        if (data.length !== 0) {
            dispatch(setRequestDataBoxes(data));
            navigate("/packing-loading");
        } else {
            alert("Please specify atleast 1 valid bin");
        }
    }
    
    return (<>
        <DynamicForm title={"Input Boxes"} handleSubmittedData={handleSubmittedData}/>
    </>);
}