import { createSlice, createAction } from "@reduxjs/toolkit";
import { postBinPacking } from "../../client/client";
import { setResponseData } from "../packagingSlice/packagingSlice";

const initialState = {
    requestData: {
        bins: [{
            id: 300,
            x: 500,
            y: 600,
            z: 300,
            count: 1,
            maxWeight: 1000,
            emptyWeight: 1,
        }],
        items: [
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
            }
        ],
        algorithm: "LARGEST_AREA_FIT_FIRST",
        binLimit: 1,
    },
    response: {
        data: null,
        loading: null,
        error: null,
    }
}

const fetchBinDataPending = createAction("api/fetchBinData/pending");
const fetchBinDataSuccess = createAction("api/fetchBinData/success");
const fetchBinDataRejected = createAction("api/fetchBinData/rejected");

export const fetchBinData = () => {

    return (dispatch, getState) => {
        const requestData = getState().api.requestData;
        
        dispatch(fetchBinDataPending());

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
        setRequestDataBins(state, action) {
            state.requestData.bins = action.payload;
        },
        setRequestDataBoxes(state, action) {
            state.requestData.items = action.payload;
        },
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
            });
    }
});

export default apiSlice.reducer;

export const {
    setRequestDataAlgorithm,
    setRequestDataBinLimit,
    setRequestDataBins,
    setRequestDataBoxes,
} = apiSlice.actions;

export const selectRequestDataAlgorithm = state => state.api.requestData.algorithm;
export const selectRequestDataBinLimit = state => state.api.requestData.binLimit;
export const selectRequestDataBins = state => state.api.requestData.bins;
export const selectRequestDataBoxes = state => state.api.requestData.items;
export const selectResponse = state => state.api.response;