import ReactDOM from "react-dom"
import React, { useRef, useEffect, useMemo, useState, useContext, useCallback } from "react"
import { Vector2 } from "three"
import { Canvas, extend, useFrame, useThree } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"
import "./styles.css"

extend({ OrbitControls, EffectComposer, RenderPass, OutlinePass, ShaderPass })

const Controls = () => {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} target={[0, 0, 0]} enableDamping args={[camera, gl.domElement]} />
}

function useHover() {
  const ref = useRef()
  const setHovered = useContext(context)
  const onPointerOver = useCallback(() => setHovered(state => [...state, ref.current]), [])
  const onPointerOut = useCallback(() => setHovered(state => state.filter(mesh => mesh !== ref.current)), [])
  return { ref, onPointerOver, onPointerOut }
}

const Thing = ({ radius = 1, detail = 64, color = "indianred", ...props }) => {
  return (
    <mesh {...props} {...useHover()}>
      <dodecahedronGeometry attach="geometry" args={[50]} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

const context = React.createContext()
const Outline = ({ children }) => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()
  const [hovered, set] = useState([])
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size])
  useEffect(() => composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
    <context.Provider value={set}>
      {children}
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <outlinePass
          attachArray="passes"
          args={[aspect, scene, camera]}
          selectedObjects={hovered}
          visibleEdgeColor="white"
          edgeStrength={50}
          edgeThickness={1}
        />
        <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
      </effectComposer>
    </context.Provider>
  )
}

const App = () => (
  <Canvas pixelRatio={window.devicePixelRatio} orthographic camera={{ position: [0, 0, 500], far: 10000 }}>
    <ambientLight intensity={1.5} />
    <pointLight position={[10, 10, 10]} />
    <Controls />
    <Outline>
      <Thing position={[0, 50, 0]} color="hotpink" />
      <Thing position={[-50, -50, 0]} color="indianred" />
      <Thing position={[50, -50, 0]} color="lightgreen" />
    </Outline>
  </Canvas>
)

ReactDOM.render(<App />, document.getElementById("root"))
