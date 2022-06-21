import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Canvas, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import "./styles.css";

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

const App = () => {
  return (
    <Canvas>
      <CameraController />
      <ambientLight />
      <spotLight intensity={0.3} position={[5, 10, 50]} />
      <primitive object={new THREE.AxesHelper(10)} />
      <mesh>
        <boxGeometry attach="geometry" args={[3, 2, 1]} />
        <meshPhongMaterial attach="material" color="hotpink" />
      </mesh>
    </Canvas>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
document.getElementById("app");
