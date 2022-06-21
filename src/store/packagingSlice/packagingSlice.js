import { createSlice } from "@reduxjs/toolkit";
import { generateBox } from "../../helper/boxHelper";
import { getColor } from "../../helper/colors";


const packages = [
{
    dimensions: {
        x: 1, 
        y: 1,
        z: 1,
    },
    placement: {
        x: 0, 
        y: 0,
        z: 0,
    },
},
{
    dimensions: {
        x: 1, 
        y: 2,
        z: 1,
    },
    placement: {
        x: 1, 
        y: 1,
        z: 1,
    },
},
{
    dimensions: {
        x: 1, 
        y: 1,
        z: 2,
    },
    placement: {
        x: 2, 
        y: 2,
        z: 2,
    },
},
]

const initialState = {

    packages, // list of objects

    bin: {
        dimensions: {
            x: 10,
            y: 8,
            z: 12,    
        },

        filledUntil: -1, // index, -1 = empty
    }
}

const packagingSlice = createSlice({
    name: "packaging",
    initialState,
    reducers: {
        setNext(state, action) {
            if (state.bin.filledUntil < state.packages.length -1) state.bin.filledUntil++;
        },

        setPrev(state, action) {
            if (state.bin.filledUntil >= 0) state.bin.filledUntil--;
        }
    }
})

export const {
    setNext,
    setPrev
} = packagingSlice.actions;

export default packagingSlice.reducer; // main reducer

// selectors
export const selectHasNext = state => state.packaging.bin.filledUntil < state.packaging.packages.length - 1 - 1; 

export const selectHasPrev = state => state.packaging.bin.filledUntil >= 0;

export const selectCurrentPackage = state => {
    const box = state.packaging.packages[state.packaging.bin.filledUntil + 1];
    return generateBox(box.dimensions, getColor(box.dimensions), false);
};

export const selectPlacedPackages = state => {
    const boxes = [];
    const placement = [];
    //state.packaging.bin.filledUntil
    const maxIndex = state.packaging.bin.filledUntil + 2;
    for (let index = 0; index < maxIndex; ++index) {
        const rawBox = state.packaging.packages[index];
        boxes.push(...generateBox(rawBox.dimensions, getColor(rawBox.dimensions), index !== maxIndex - 1));
        placement.push(rawBox.placement, rawBox.placement);
    }
    return {
        boxes,
        placement,
    };
}

export const selectAmountPlacedBoxes = state => state.packaging.bin.filledUntil + 1 + 1; // first is alreadyd place, should we change this?

export const selectAmountLeftBoxes = state => state.packaging.packages.length - state.packaging.bin.filledUntil - 1 - 1;