import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBinData, selectRequestDataBoxes, selectResponse } from "../store/apiSlice/apiSlice";

export function PackingReqLoading(props) {
    const response = useSelector(selectResponse);
    const dispatch = useDispatch();
    
    const testReq = () => {
        dispatch(fetchBinData())
    }

    const navigate = useNavigate();

    let content = null;
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
    } else if (response.data) {
        content = <>Retrieved Data</>
    } else if (response.error) {
        content = <>{`Error occurred: ${response.error}`}</>;
    } else {
        content = <button onClick={() => testReq()}>Simulate req</button>
    }

    useEffect(() => {
        if (response.data) navigate("/bin-packing");
    }, [response.data])

    return content;
}