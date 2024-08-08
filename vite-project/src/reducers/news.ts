
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;

export const fetchNews = createAsyncThunk<Article[], void, { rejectValue: string }>(
    'news/fetchNews',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`,
          },
          params: {
            q: 'bitcoin',
          },
        });
    
        console.log('API Response:', response.data);
        
        return response.data.articles as Article[]; // Correctly cast to Article[]
        
      } catch (error: any) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        return rejectWithValue('Failed to fetch news');
      }
    }
  );
const newsSlice = createSlice({
  name: 'news',
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
        state.error = action.payload as string;
        
      });
  },
});


export default (newsSlice.reducer);
