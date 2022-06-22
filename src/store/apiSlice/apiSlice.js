import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getScannedBox, postBinPacking } from "../../client/client";
import { dimensionEqual } from "../../helper/boxHelper";
import { setCurrentBin, setResponseData } from "../packagingSlice/packagingSlice";

const findById = (arr, id) => {
    return arr.filter(el => el.id === id)[0];
}

const initialState = {
    requestData: {
        bins: [{
            id: 1,
            x: 500,
            y: 600,
            z: 300,
            count: 10,
            maxWeight: 1000,
            emptyWeight: 1,
        },
        {
            id: 2,
            x: 500,
            y: 600,
            z: 300,
            count: 10,
            maxWeight: 1000,
            emptyWeight: 1,
        }
    
        ],
        items: [
            {
                id: 0,
                x: 400,
                y: 500,
                z: 200,
                count: 10,
                weight: 1,
            }
            /*
            {
                id: 1,
                x: 50,
                y: 30,
                z: 70,
                count: 100,
                weight: 1,
            },
            {
                id: 2,
                x: 50,
                y: 60,
                z: 10,
                count: 100,
                weight: 1,
            },
            {
                id: 3,
                x: 10,
                y: 70,
                z: 100,
                count: 100,
                weight: 1,
            }*/
        ],
        algorithm: "LARGEST_AREA_FIT_FIRST",
        binLimit: 10,
    },
    response: {
        data: null,
        loading: null,
        error: null,
    },
    boxResponse: {
        data: null,
        loading: null,
        error: null,
    }
}

const fetchBinDataPending = createAction("api/fetchBinData/pending");
const fetchBinDataSuccess = createAction("api/fetchBinData/success");
const fetchBinDataRejected = createAction("api/fetchBinData/rejected");

export const fetchBoxData  = createAsyncThunk("api/fetchBox", async () => {
    const response = await getScannedBox();
    return response.data;
});

export const fetchBinData = () => {

    return (dispatch, getState) => {
        const requestData = getState().api.requestData;
        
        dispatch(fetchBinDataPending());
        dispatch(setCurrentBin({currentBin: 0}));

        return postBinPacking(requestData).then(
            response => {
                dispatch(fetchBinDataSuccess({data: response.data}));
                dispatch(setResponseData({data: response.data}));
            },
            error => dispatch(fetchBinDataRejected({error: error.message})),
        );

    }

}

const apiSlice = createSlice({
    name: "api", 
    initialState,
    reducers: {
        setRequestDataAlgorithm(state, action) {
            state.requestData.algorithm = action.payload;
        },
        setRequestDataBinLimit(state, action) {
            state.requestData.binLimit = action.payload;
        },
        addRequestDataBox(state, action) {
            const box = action.payload;
            for (let item of state.requestData.items) {
                if (dimensionEqual(item, box)) {
                    item.count++;
                    return;
                }
            }

            state.requestData.items.push({
                id: state.requestData.items.length,
                x: box.x,
                y: box.y,
                z: box.z,
                count: 1,
                weight: 1,
            })
        },
        setRequestDataBins(state, action) {
            state.requestData.bins = action.payload;
        },
        setRequestDataBoxAttr(state, action) {
            const {id, key, val} = action.payload;
            const item = findById(state.requestData.items, id);
            const parse = parseInt(val)
            item[key] = isNaN(parse) ? 0 : parse;

        },
        setRequestDataBoxes(state, action) {
            state.requestData.items = action.payload;
        },
        resetBoxes(state, action) {
            state.requestData.items = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBinDataPending, (state, action) => {
                state.response.loading = true;
            })
            .addCase(fetchBinDataSuccess, (state, action) => {
                state.response.loading = false;
                state.response.data = action.payload.data;
            })
            .addCase(fetchBinDataRejected, (state, action) => {
                state.response.loading = false;
                state.response.error = action.payload.error;
            })
            .addCase(fetchBoxData.pending, (state, action) => {
                state.boxResponse.data = null;
                state.boxResponse.loading= true;
            })
            .addCase(fetchBoxData.fulfilled, (state, action) => {
                state.boxResponse.loading= false;
                state.boxResponse.data = action.payload;
                
            })
            .addCase(fetchBoxData.rejected, (state, action) => {
                state.boxResponse.loading= false;
                state.boxResponse.data = null;
                state.boxResponse.error = action.error.message;
            })
    }
});

export default apiSlice.reducer;

export const {
    setRequestDataAlgorithm,
    setRequestDataBinLimit,
    setRequestDataBins,
    setRequestDataBoxes,
    addRequestDataBox,
    setRequestDataBoxAttr,
    resetBoxes
} = apiSlice.actions;

export const selectRequestDataAlgorithm = state => state.api.requestData.algorithm;
export const selectRequestDataBinLimit = state => state.api.requestData.binLimit;
export const selectRequestDataBins = state => state.api.requestData.bins;
export const selectRequestDataBoxes = state => state.api.requestData.items;
export const selectResponse = state => state.api.response;
export const selectBoxResponse = state => state.api.boxResponse;
export const selectRequestDataBoxById = (state, id) => state.api.requestData.items[id];