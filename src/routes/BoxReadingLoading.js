import { CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoxData, selectBoxResponse } from "../store/apiSlice/apiSlice";

export function BoxReadingLoading() {
    const response = useSelector(selectBoxResponse);
    const dispatch = useDispatch();

    const testReq = () => {
        dispatch(fetchBoxData());
    }

    let content;
    if (response.loading) {
        content = <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <CircularProgress size={100}/> 
            <Typography sx={{margin: "1%"}}>Loading Bin Packing</Typography>
        </div>;
    } else if (response.data ) {
        console.log(response.data);
    } else if (response.error) {
        content = <>{`Error occurred: ${response.error}`}</>;
    } else {
        content = <button onClick={() => testReq()}>Simulate req</button>
    }

    return content;
}