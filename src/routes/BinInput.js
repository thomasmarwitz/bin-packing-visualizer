import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export function BinInput() {

    const [algoritm, setAlgorithm] = React.useState('LARGEST_AREA_FIT_FIRST');

    const formBoxLine = (id) => ([
        <TextField id={`x-${id}`} key={`x-${id}`} label="x" variant="outlined"/>,
        <TextField id={`y-${id}`} key={`y-${id}`} label="y" variant="outlined"/>,
        <TextField id={`z-${id}`} key={`z-${id}`} label="z" variant="outlined"/>,
        <TextField id={`weight-${id}`} key={`weight-${id}`} label="Weight" variant="outlined"/>,
        <TextField id={`amount-${id}`} key={`amount-${id}`} label="Amount" variant="outlined"/>,
    ]);

    const [formState, setFormState] = React.useState(formBoxLine(0));

    console.log(formState);

    const handleChange = (event) => {
        setAlgorithm(event.target.value);
    };

    const handleSubmit = (event) => {
        const boxes = [];
        for (let i = 0; i < Math.floor(formState.length / 5); ++i) {
            const box = {};
            for (let key of ["x", "y", "z", "weight", "amount"]) {
                box[key] = document.getElementById(`${key}-${i}`).value
            }
            boxes.push(box);
        }
        console.log(boxes);
    }

    const handleAddRow = () => {
        const newId = Math.floor(formState.length / 5);
        setFormState([...formState, ...formBoxLine(newId)]);
    }

    return (<>
            <FormControl fullWidth sx={{marginBottom: "1%"}}>
                <InputLabel id="demo-simple-select-label">Algorithm Strategy</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={algoritm}
                    label="Algorithm Strategy"
                    onChange={handleChange}
                >
                    <MenuItem value={'LARGEST_AREA_FIT_FIRST'}>Largest Area Fit First</MenuItem>
                    <MenuItem value={'BRUTE_FORCE'}>Brute Force</MenuItem>
                </Select>
            </FormControl>

            <Typography>Specify Boxes</Typography>

            <Box
                component="form"
                style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", columnGap: "1%", rowGap: "5%"}}
            >
                {formState}
                
            </Box>

            <Button 
                variant="contained" 
                onClick={handleAddRow}
                sx={{marginTop: `${formState.length / 5 * 2}%`, marginRight: "1%"}}
                >
                Add Box Type
            </Button> 

            <Button 
                
                variant="contained" 
                onClick={handleSubmit}
                sx={{marginTop: `${formState.length / 5 * 2}%`, type: "submit"}}
                color="success"
                >
                Submit
            </Button> 
        </>
    )
}