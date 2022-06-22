import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchBinData, selectResponse } from "../store/apiSlice/apiSlice";
import { IconButton, TextField, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const websiteURL = "http://localhost:3000";

export function PackingReqLoading(props) {
    const response = useSelector(selectResponse);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const testReq = () => {
        dispatch(fetchBinData())
    }



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
        if (!response.data.success) {
            content = <>
                <Typography>Couldn't solve bin packing problem</Typography>
                <Button variant="contained" onClick={() => navigate("/")}>
                    Back to home
                </Button>
            </>
        } else {

            const enc = btoa(JSON.stringify(response.data));
            const linkToShare = `${websiteURL}/shared?data=${enc}`;
        
            content = <>
                <div style={{
                    display: "grid",
                    placeItems: "center",
                    margin: "2rem",
                }}>
                    <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Share Link"
                        defaultValue={linkToShare}
                        InputProps={{
                            readOnly: true,
                        }}
                        style={{width: "80vw"}}
                    />
                        <IconButton color="primary" size="large" onClick={() => navigator.clipboard.writeText(linkToShare)}> 
                            <ContentCopyIcon fontSize="2.5 rem"/>
                        </IconButton>
                    </div>
                    <Button variant="outlined" sx={{margin: "1rem"}} onClick={() => navigate("/bin-packing")}>
                        Open Bin Packing
                    </Button>
                    
                </div>
            </>
        }

    } else if (response.error) {
        content = <>{`Error occurred: ${response.error}`}</>;
    } else {
        content = <>
                <Typography>Invalid State</Typography>
                <Button variant="contained" onClick={() => navigate("/")}>
                    Back to home
                </Button>
            </>
    }

    return content;
}   