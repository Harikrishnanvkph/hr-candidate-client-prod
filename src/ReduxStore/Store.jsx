import {configureStore} from '@reduxjs/toolkit'
import mySlicer from './Slicer.jsx'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const pConfig = {
    key : "root",
    storage,
    version : 1
}

const pReducer = persistReducer(pConfig,mySlicer);

const store = configureStore({
    reducer : {
        myStore : pReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

const persistor = persistStore(store);

export { store, persistor };