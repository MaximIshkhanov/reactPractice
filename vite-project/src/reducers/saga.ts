import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

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
  

export const fetchNews = createAsyncThunk<Article[]>('news/fetchNews', async () => {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        country: 'us'
      }
    });
    return response.data.articles;
  });