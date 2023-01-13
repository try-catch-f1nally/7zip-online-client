import {RootState} from '../store';

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectToken = (state: RootState) => state.auth.accessToken;
