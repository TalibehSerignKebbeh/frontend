import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { apiSlice } from '../app/api/apiSlice'
import authReducer from '../features/auth/authSlice'
import thunk from 'redux-thunk' 
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist'
// import persistCombineReducers from 'redux-persist/es/persistCombineReducers'


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer= combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export let store = configureStore({
    reducer:   persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk].concat(apiSlice.middleware)
})
// setupListeners(store.dispatch)

export const persistor = persistStore(store)


