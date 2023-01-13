import {createSlice, Draft, isAnyOf, PayloadAction} from '@reduxjs/toolkit';
import {AuthResponse, AuthState} from './types';
import {authApi} from './auth-api';

const initialState: AuthState = {
  isAuth: localStorage.getItem('isAuth') === 'true',
  userId: localStorage.getItem('userId') || null,
  email: localStorage.getItem('email') || null,
  accessToken: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail: (state, {payload}: PayloadAction<string>) => {
      state.email = payload;
      localStorage.setItem('email', payload);
    },
    setAuth: (state, {payload}: PayloadAction<AuthResponse | null>) => {
      payload ? setAuthState(state, payload) : resetAuthState(state);
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authApi.endpoints.register.matchFulfilled, authApi.endpoints.login.matchFulfilled),
      (state, {payload}) => setAuthState(state, payload)
    );
    builder.addMatcher(
      isAnyOf(authApi.endpoints.logout.matchFulfilled, authApi.endpoints.logout.matchRejected),
      resetAuthState
    );
  }
});

const setAuthState = (state: Draft<AuthState>, authResponse: AuthResponse) => {
  state.isAuth = true;
  state.userId = authResponse.userId;
  state.accessToken = authResponse.accessToken;
  localStorage.setItem('isAuth', 'true');
  localStorage.setItem('userId', authResponse.userId);
};

const resetAuthState = (state: Draft<AuthState>) => {
  state.isAuth = false;
  state.userId = null;
  state.email = null;
  state.accessToken = null;
  localStorage.removeItem('isAuth');
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
};

export const {setEmail, setAuth} = authSlice.actions;
export default authSlice.reducer;
