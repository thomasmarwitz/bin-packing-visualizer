
import {Scene} from "./Scene";
import * as THREE from 'three';
import { useState } from "react";

export function AllPackages() {

    let [objects, setObjects] = useState([]);;
    

    const handleClick = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
        const cube = new THREE.Mesh(geometry, material)
        setObjects([...objects, cube,]);
    }

    

    return (<>
        <Scene height={600} width={500} objects={objects}/>
        <button onClick={handleClick}>Klick mich</button>
        </>
    );
}
