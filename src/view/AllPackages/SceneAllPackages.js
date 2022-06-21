
import * as THREE from 'three';
import React from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export function Scene(props) {
    const { useRef, useEffect, useState } = React
    const mount = useRef(null)
    const [isAnimating, setAnimating] = useState(true)
    const controls = useRef(null)
    
    useEffect(() => {
        let width =  props.width; // Math.max(mount.current.clientWidth, 400);
        let height = props.height; // propMath.max(mount.current.clientHeight, 400);
        let frameId;
    
        const scene = new THREE.Scene({background: 0xffffff})
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.set(props.bin.x * 1.25, 0, 0)
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        const geometry = new THREE.BoxGeometry(props.bin.x, props.bin.y, props.bin.z)
        const material = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: true })
        const cube = new THREE.Mesh(geometry, material)

        // remove later
        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );
        // The X axis is red. The Y axis is green. The Z axis is blue.

        var edgeGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry
        var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
        var edges = new THREE.LineSegments( edgeGeometry, mat );
        scene.add(edges);
        
    
        //camera.position.z = 4
        scene.add(cube)
        cube.position.set(-props.bin.x * 0.5, -props.bin.y * 0.5, -props.bin.z * 0.5);
        renderer.setClearColor( 0xffffff, 0);
        renderer.setSize(width, height)
    
        const renderScene = () => {
            renderer.render(scene, camera)
        }
    
        const handleResize = () => {
            width = mount.current.clientWidth
            height = mount.current.clientHeight
            renderer.setSize(width, height)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderScene()
        }
        
        const animate = () => {
            /*
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            edges.rotation.x += 0.01
            edges.rotation.y += 0.01
            */
    
            renderScene()
            frameId = window.requestAnimationFrame(animate)
        }
    
        const start = () => {
            if (!frameId) {
            frameId = requestAnimationFrame(animate)
            }
        }
    
        const stop = () => {
            cancelAnimationFrame(frameId)
            frameId = null
        }
    
        mount.current.appendChild(renderer.domElement)
        window.addEventListener('resize', handleResize)
        start()
    
        controls.current = { start, stop }
        controls.control = new OrbitControls( camera, renderer.domElement );
        controls.scene = scene;
        
        return () => {
            stop()
            window.removeEventListener('resize', handleResize)
            mount.current.removeChild(renderer.domElement)
    
            scene.remove(cube)
            geometry.dispose()
            material.dispose()
        }
    }, [])
    
    useEffect(() => {
    if (isAnimating) {
        controls.current.start()
    } else {
        controls.current.stop()
    }
    }, [isAnimating])

    if (props.objects) {

        for (let obj of props.objects) {
            controls.scene.add(obj);
            obj.position.set(0, 0, 0);
        }
    }
       
    return <div className="vis" ref={mount} />
}