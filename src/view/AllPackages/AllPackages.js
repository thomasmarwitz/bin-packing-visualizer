
import {Scene} from "./SceneAllPackages";
import * as THREE from 'three';
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectPlacedPackages } from "../../store/packagingSlice/packagingSlice";

export function AllPackages() {

    
    const objects = useSelector(selectPlacedPackages);
    //console.log("placed", objects);
    

    return (<>
            <Scene height={600} width={600} objects={objects} bin={{x: 10, y: 5, z: 8}} style={{minWidth: "100%", minHeight: "100%"}}/>
        </>
    );
}
