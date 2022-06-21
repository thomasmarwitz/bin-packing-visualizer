
import { CurrentPackage } from './view/CurrentPackage/CurrentPackage';
import React from 'react';
import { AllPackages } from './view/AllPackages/AllPackages';
import { generateBox } from './helper/boxHelper';
import { Controls } from './view/Controls/Controls';
import { Box } from '@mui/material';
import { Item } from './helper/styleHelper';
import { useSelector } from 'react-redux';
import { selectCurrentPackage } from './view/store/packaging/packagingSlice';
import { getColor } from './helper/colors';

function App() {

    const box = useSelector(selectCurrentPackage);
    

    return (<>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item style={{ height: "70vh" }}><CurrentPackage currentPackage={box}/></Item>
            <Item><AllPackages /></Item>
        </Box>
        
        <Controls />
        
    </>
  );
}

export default App;
