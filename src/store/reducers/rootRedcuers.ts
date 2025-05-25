import { combineReducers } from '@reduxjs/toolkit';
import user from './users/users.reducer';

const rootReducer = combineReducers({
    user,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
