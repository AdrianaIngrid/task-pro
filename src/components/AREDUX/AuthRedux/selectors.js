export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const isErrorAuth = (state) => state.auth.error;
export const isLoadingAuth = (state) => state.auth.isLoading;
export const selectUser = (state) => state.auth.user;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectAuthToken = (state) => state.auth.token;


