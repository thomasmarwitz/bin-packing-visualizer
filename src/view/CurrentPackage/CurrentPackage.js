import { useEffect, useState } from 'react';
import { SceneCurrentPackage } from './SceneCurrentPackage';
import * as THREE from 'three';

export function CurrentPackage() {
    
    let [currentObj, setCurrentObj] = useState([]);
  
    const handleClick = () =>  {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
        const cube = new THREE.Mesh(geometry, material)

        const edgeGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry
        const mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
        const edges = new THREE.LineSegments( edgeGeometry, mat );
        setCurrentObj([cube, edges])
    }

    return (<>
            <SceneCurrentPackage height={600} width={600} objects={currentObj} bin={{x: 10, y: 5, z: 8}}/>
            <button onClick={handleClick}>Klick mich!</button>
        </>
    );
}
