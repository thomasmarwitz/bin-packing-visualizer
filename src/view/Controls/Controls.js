import { Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../helper/styleHelper";
import { selectAmountLeftBoxes, selectAmountPlacedBoxes, selectHasNext, selectHasPrev, setNext, setPrev } from "../store/packaging/packagingSlice";

export function Controls() {

    const dispatch = useDispatch();
    
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
                <Typography>Filled Space: {filledSpace}</Typography>
                <Typography>Placed Boxes: {amountPlaced}</Typography>
                <Typography>Available Space: {availableSpace}</Typography>
                <Typography>Left Boxes: {amountLeft}</Typography>
            </Item>
        </Box>
    )
}