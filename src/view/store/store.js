import { configureStore } from '@reduxjs/toolkit';
import packagingReducer from './packaging/packagingSlice';

export default configureStore({
    reducer: {
        packaging: packagingReducer,
    }
})