import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TDocumentCategory } from '../../utils/types';
import { getDocumentsCategoriesApi } from '../../utils/wb-api';

interface DocumentsCategoriesState {
  categories: Array<TDocumentCategory>;
  isLoading: boolean;
  error: string | null;
}

const initialState: DocumentsCategoriesState = {
  categories: [],
  isLoading: false,
  error: null
};

export const getDocumentsCategories = createAsyncThunk(
  'categories/getAll',
  getDocumentsCategoriesApi
);

const documentsCategoriesSlice = createSlice({
  name: 'documentsCategories',
  initialState,
  reducers: {},
  selectors: {
    getCategories: (state) => state.categories,
    isLoadingCategories: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDocumentsCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDocumentsCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getDocumentsCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;
      });
  }
});

export const { getCategories, isLoadingCategories } =
  documentsCategoriesSlice.selectors;
export default documentsCategoriesSlice.reducer;
