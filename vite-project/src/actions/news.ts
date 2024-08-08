
export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNewsRequest = () => ({
    type: FETCH_NEWS_REQUEST,
});

export const fetchNewsSuccess = (news: any) => ({
    type: FETCH_NEWS_SUCCESS,
    payload: news,
});

export const fetchNewsFailure = (error: any) => ({
    type: FETCH_NEWS_FAILURE,
    payload: error,
});