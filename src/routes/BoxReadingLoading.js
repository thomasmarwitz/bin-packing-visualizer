import { CircularProgress, Typography } from "@mui/material";

export function BoxReadingLoading() {
    return <>
        <CircularProgress size={100}/> <br/>
        <Typography>Reading Boxes</Typography>
    </>
}