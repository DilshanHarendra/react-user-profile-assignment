import { createSlice } from '@reduxjs/toolkit';
import { UserSliceI } from './types';

const initialState: UserSliceI = {
    isAuthenticated:false,
    user: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setRegister: (state, action) => {
            state.isAuthenticated = true;
            state.user ={
                id: action.payload.userId,
                userId:action.payload.userId,
            }
        },
        setLogin: (state, action) => {
            state.isAuthenticated = true;
            const payload = {...action.payload};
            delete payload.password;
            state.user = {...state.user, ...payload};
        },
        updateUser: (state, action) => {
            const payload = {...action.payload};
            delete payload.password;
            delete payload.userId;
            delete payload.id;
            state.user = {...state.user, ...payload};
        },
        clearUser: () => initialState,
    },
});

// Action creators are generated for each case reducer function
export const {  updateUser, clearUser,setRegister, setLogin } = userSlice.actions;

export default userSlice.reducer;
