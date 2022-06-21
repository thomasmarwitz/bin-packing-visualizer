import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectCurrentPackage } from "../../store/packagingSlice/packagingSlice";
import { Item } from "../../helper/styleHelper";
import { CurrentPackage } from "../CurrentPackage/CurrentPackage";
import { AllPackages } from "../AllPackages/AllPackages";
import { Controls } from "../Controls/Controls";


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