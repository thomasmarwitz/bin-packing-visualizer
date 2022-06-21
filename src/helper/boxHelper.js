import * as THREE from 'three';

export function generateBox(dim, color, transparent=false) {
    const geometry = new THREE.BoxGeometry(dim.x, dim.y, dim.z)
    const material = new THREE.MeshBasicMaterial({ color, transparent, opacity: 0 }); // opacity 0 only becomes active if transparent = true
    const cube = new THREE.Mesh(geometry, material)

    const edgeGeometry = new THREE.EdgesGeometry( geometry ); // or WireframeGeometry
    const mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
    const edges = new THREE.LineSegments( edgeGeometry, mat );
    return [cube, edges];
}