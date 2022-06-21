import { Canvas, useThree } from '@react-three/fiber';
import { Package } from './Package';
import { useState, useEffect } from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as THREE from "three";
//import 

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
  
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
};

export function CurrentPackage() {
  
    const [mousePosition, setMousePosition] = useState({
        left: 0,
        top: 0
    })
  
    function handleMouseMove(ev) { 
        setMousePosition({left: ev.pageX, top: ev.pageY}); 
        console.log({left: ev.pageX, top: ev.pageY});
    }
  
    return (<>
        <Canvas
            onMouseMove={handleMouseMove}
            camera={{ fov: 20, near: 0.1, far: 1000, position: [0, 0, 30] }}
        >
            <CameraController />
            <ambientLight />
            <pointLight intensity={1} position={[5, 10, 50]} />
            <Package position={[0, 0, 0]} />
        </Canvas>
    </>
    );
}
