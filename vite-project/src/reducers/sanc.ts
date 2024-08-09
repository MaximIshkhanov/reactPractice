import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { sanc } from '@sanc/core'; // Импорт из SANC Toolkit

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Интерфейс для статьи
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

// Асинхронное действие для получения новостей
export const fetchNews = createAsyncThunk<Article[]>('news/fetchNews', async () => {
    const response = await sanc(axios.get(BASE_URL, {
        params: {
            apiKey: API_KEY,
            country: 'us'
        }
    }));
    return response.data.articles;
});

// Начальное состояние
interface NewsState {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: NewsState = {
    articles: [],
    status: 'idle',
    error: null,
};

// Создание среза для новостей
const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.status = 'succeeded';
                state.articles = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch news';
            });
    },
});

export default newsSlice.reducer;