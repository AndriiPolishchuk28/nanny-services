export const selectUserName = (state) => state.auth.currentUser?.name;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectUser = (state) => state.auth.currentUser;
