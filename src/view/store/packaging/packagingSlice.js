import { createSlice } from "@reduxjs/toolkit";


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

        state: {
            filledUntil: -1, // index, -1 = empty
        }
    }
}

const packagingSlice = createSlice({
    name: "packaging",
    initialState,
    reducers: {
        setNext(state, action) {
            if (state.bin.state.filledUntil < state.packages.length -1) state.bin.state.filledUntil++;
        },

        setPrev(state, action) {
            if (state.bin.state.filledUntil >= 0) state.bin.state.filledUntil--;
        }
    }
})

export const {
    setNext,
    setPrev
} = packagingSlice.actions;

export default packagingSlice.reducer; // main reducer

// selectors
export const selectHasNext = state => state.bin.state.filledUntil < state.packages.length -1; 

export const selectHasPrev = state => state.bin.state.filledUntil >= 0;

export const selectCurrentPackage = state => {
    return state.packages[state.bin.state.filledUntil + 1]
};