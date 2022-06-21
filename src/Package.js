import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react'

export function Package(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={1}>
            <boxGeometry args={[1, 2, 3]} />
            <meshStandardMaterial color={'orange'} />
        </mesh>
    )
  }