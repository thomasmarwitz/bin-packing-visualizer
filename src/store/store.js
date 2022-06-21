import { configureStore } from '@reduxjs/toolkit';
import packagingReducer from './packagingSlice/packagingSlice';

export default configureStore({
    reducer: {
        packaging: packagingReducer,
    }
})