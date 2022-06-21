import { useEffect } from 'react'
import * as THREE from 'three'

let scene;
let renderer;
let geometry;
let material;
let cube;
let camera;
let frameId;
let mount;

export function NewDesign() {

    const componentWillUnmount = () => {
        stop()
        mount.removeChild(renderer.domElement)
    }

    const componentDidMount = () => {
        const width = mount.clientWidth
        const height = mount.clientHeight
    
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )

        renderer = new THREE.WebGLRenderer({ antialias: true })
        geometry = new THREE.BoxGeometry(1, 1, 1)
        material = new THREE.MeshBasicMaterial({ color: '#433F81' })
        cube = new THREE.Mesh(geometry, material)
    
        camera.position.z = 4
        scene.add(cube)
        renderer.setClearColor('#000000')
        renderer.setSize(width, height)
    
        mount.appendChild(renderer.domElement)
        start()
        return componentWillUnmount;
    
    };
    
    useEffect(componentDidMount, []); // mount

    const start = () => {
        if (!frameId) {
            frameId = requestAnimationFrame(animate)
        }
    };
    
    const stop = () => {
        cancelAnimationFrame(frameId)
    };

    const animate = () => {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        renderScene()
        frameId = window.requestAnimationFrame(animate)
    };

    const renderScene = () => {
        renderer.render(scene, camera)
    }

    return (
        <div
            style={{ width: '400px', height: '400px' }}
            ref={(_mount) => { mount = _mount }}
        />
    )

      
}
