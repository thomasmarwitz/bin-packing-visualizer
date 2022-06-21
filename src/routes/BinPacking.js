import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectCurrentPackage } from "../store/packagingSlice/packagingSlice";
import { Item } from "../helper/styleHelper";
import { CurrentPackage } from "../view/CurrentPackage/CurrentPackage";
import { AllPackages } from "../view/AllPackages/AllPackages";
import { Controls } from "../view/Controls/Controls";


export function BinPacking() {
    const box = useSelector(selectCurrentPackage);
    

    return (<>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <Item style={{ height: "70vh" }}><CurrentPackage currentPackage={box}/></Item>
            <Item><AllPackages /></Item>
        </Box>
        
        <Controls />
        
    </>);
}