import { useEffect, useState } from 'react';
import { SceneCurrentPackage } from './SceneCurrentPackage';
import * as THREE from 'three';

export function CurrentPackage({currentPackage}) {
    return (<>
            <SceneCurrentPackage height={600} width={600} objects={currentPackage} bin={{x: 10, y: 5, z: 8}}/>
        </>
    );
}
