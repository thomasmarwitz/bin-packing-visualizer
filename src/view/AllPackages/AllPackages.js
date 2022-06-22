
import {Scene} from "./SceneAllPackages";
import { useSelector } from "react-redux";
import { selectCurrentBinDimensions, selectPlacedPackages } from "../../store/packagingSlice/packagingSlice";
import { generateBox } from "../../helper/boxHelper";

export function AllPackages() {

    const currentBinDims = useSelector(selectCurrentBinDimensions);
    const newBin = generateBox(currentBinDims, 0x000000, true);
    
    const objects = useSelector(selectPlacedPackages);
    objects.boxes.push(...newBin);
    const origin = {x: 0, y: 0, z: 0};
    objects.placement.push(origin, origin);
    

    return (<>
            <Scene height={600} width={600} objects={objects} bin={{x: 10, y: 5, z: 8}} style={{minWidth: "100%", minHeight: "100%"}}/>
        </>
    );
}
