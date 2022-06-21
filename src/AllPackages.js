
import {Scene} from "./SceneAllPackages";
import * as THREE from 'three';
import { useState } from "react";

export function AllPackages() {

    let [objects, setObjects] = useState([]);;
    

    const handleClick = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, opacity: 0, transparent: true })
        const cube = new THREE.Mesh(geometry, material)

        const edgeGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry
        const mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
        const edges = new THREE.LineSegments( edgeGeometry, mat );
        setObjects([...objects, cube, edges]);
    }

    

    

    return (<>
        <Scene height={600} width={500} objects={objects} bin={{x: 10, y: 5, z: 8}}/>
        <button onClick={handleClick}>Klick mich</button>
        </>
    );
}
