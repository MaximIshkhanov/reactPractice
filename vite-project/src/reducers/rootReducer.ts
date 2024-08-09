import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// Thunk для получения новостей
export const fetchNews = createAsyncThunk<Article[]>('news/fetchNews', async () => {
  const response = await axios.get(import.meta.env.VITE_NEWS_BASE_API_URL, {
    params: {
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
      country: 'us'
    }
  });
  return response.data.articles;
});

// Начальное состояние
const initialState = {
  articles: [] as Article[],
  loading: false,
  error: null as string | null,
};

// Slice для управления состоянием новостей
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;