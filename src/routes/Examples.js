import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { fetchBinData, setRequestDataAlgorithm, setRequestDataBinLimit, setRequestDataBins, setRequestDataBoxes } from "../store/apiSlice/apiSlice";
import { useNavigate } from "react-router-dom";

const exReq1 = {
    bins: [{
        id: 1,
            x: 215,
            y: 70,
            z: 166,
            count: 1,
            maxWeight: 1000,
            emptyWeight: 0,
    }],
    boxes: [{
        id: 1,
        x: 144,
        y: 53,
        z: 115,
        count: 1,
        weight: 1,
    },
    {
        id: 2,
        x: 142,
        y: 51,
        z: 92,
        count: 1,
        weight: 1,
    }],
    algorithm: "BRUTEFORCE",
    binLimit: 1,
}

export function Examples() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (<>
        <Button onClick={() => {
            dispatch(setRequestDataBins(exReq1.bins));
            dispatch(setRequestDataBoxes(exReq1.boxes));
            dispatch(setRequestDataAlgorithm(exReq1.algorithm));
            dispatch(setRequestDataBinLimit(exReq1.binLimit));
            dispatch(fetchBinData());
            navigate("/packing-loading");
        }} variant="outlined">Example 1</Button>
        <br />
        Example 2
    </>);
}