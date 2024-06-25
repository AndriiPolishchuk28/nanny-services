export const selectNannies = (state) => state.nanny.nannies;
export const selectLastKey = (state) => state.nanny.lastKey;
export const selectPage = (state) => state.nanny.pageSize;
export const selectFilter = (state) => state.nanny.filter?.value;
export const selectFavorites = (state) => state.nanny.favorites;
export const selectNannyIsLoading = (state) => state.nanny.isLoading;
