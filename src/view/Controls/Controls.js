import { Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../helper/styleHelper";
import { selectAmountLeftBoxes, selectAmountPlacedBoxes, selectCurrentPackage, selectCurrentPackageRaw, selectHasNext, selectHasPrev, setNext, setPrev } from "../../store/packagingSlice/packagingSlice";

export function Controls() {

    const dispatch = useDispatch();

    const packageRaw = useSelector(selectCurrentPackageRaw);
    
    const hasNext = useSelector(selectHasNext);
    const hasPrev = useSelector(selectHasPrev);
    const amountLeft = useSelector(selectAmountLeftBoxes);
    const amountPlaced = useSelector(selectAmountPlacedBoxes);

    const handleNext = () => {
        dispatch(setNext());
    }
    
    const handlePrev = () => {
        dispatch(setPrev());
    }
    
    /*
    readd:
    <Typography>Filled Space: {filledSpace}</Typography>
                    <Typography>x: {filledSpace}</Typography>
                    <Typography>Placed Boxes: {amountPlaced}</Typography>
                    <Typography>y: {filledSpace}</Typography>
                    <Typography>Available Space: {availableSpace}</Typography>
                    <Typography>z: {filledSpace}</Typography>
                    <Typography>Left Boxes: {amountLeft}</Typography>

    */

    let filledSpace = 14;
    let availableSpace = 20;

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item>
                <Button 
                    variant="contained" 
                    onClick={() => handlePrev()}
                    sx={{margin: 1}}
                    disabled={!hasPrev}
                    >
                    Previous Step
                </Button> 
                <Button 
                    variant="contained" 
                    onClick={() => handleNext()}
                    sx={{margin: 1}}
                    disabled={!hasNext}
                    >
                    Next Step
                </Button>   
            </Item>
            <Item>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>

                    <Typography>x: {packageRaw.dimensions.x}</Typography>
                    <Typography>Placement x: {packageRaw.placement.x}</Typography>
                    <Typography>y: {packageRaw.dimensions.y}</Typography>
                    <Typography>Placement y: {packageRaw.placement.y}</Typography>
                    <Typography>z: {packageRaw.dimensions.z}</Typography>
                    <Typography>Placement z: {packageRaw.placement.z}</Typography>

                </div>
            </Item>
        </Box>
    )
}