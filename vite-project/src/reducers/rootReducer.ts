
import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE,
} from '../actions/news';


const initialState = {
    status: 'idle',
    articles: [],
    error: null,
};
function newsReducer(state = initialState, action: any) {
    switch (action.type) {
        case FETCH_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                news: action.payload,
            };
        case FETCH_NEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default newsReducer;