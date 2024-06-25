export const selectUserName = (state) => state.auth.currentUser?.name;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUser = (state) => state.auth.currentUser;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectId = (state) => state.auth.id;
export const selectIsLoading = (state) => state.auth.isLoading;
