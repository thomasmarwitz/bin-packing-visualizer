import { Scene } from './Scene';
import { Button, Box, Typography } from "@mui/material";
import React from 'react';

function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
}

function App() {

    let filledSpace = 14;
    let availableSpace = 20;

    return (<>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item><Scene /></Item>
            <Item><Scene /></Item>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item>
                <Button 
                    variant="contained" 
                    onClick={() => {}}
                    sx={{margin: 1}}
                >
                    Previous Step
                </Button>   
                <Button 
                    variant="contained" 
                    onClick={() => {}}
                    sx={{margin: 1}}
                >
                    Next Step
                </Button>   
            </Item>
            <Item>
                <Typography>Filled Space: {filledSpace}</Typography>
                <Typography>Available Space: {availableSpace}</Typography>
            </Item>
        </Box>


        
    </>
  );
}

export default App;
