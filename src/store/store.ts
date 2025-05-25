import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers/rootRedcuers';

const persistConfig = {
    key: 'v1',
    storage,
    whitelist: ['user'],
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
