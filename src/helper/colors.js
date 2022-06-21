const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
]

function dimensionEqual(dim1, dim2) {
    if (dim1 == dim2) return true;

    return (
        dim1.x === dim2.x &&
        dim1.y === dim2.y &&
        dim1.z === dim2.z
    )

}

const dimensions = []

function indexOfDim(dim) {
    let pos = -1;
    for (let index in dimensions) {
        if (dimensionEqual(dim, dimensions[index])) pos = index;
    }
    return pos;

}

export function getColor(dim) {
    let pos = indexOfDim(dim);
    if (pos === -1) {
        dimensions.push(dim);
        pos = dimensions.length - 1; // new dim is last
    } 
    return colors[pos];
}