import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../reducers/store';
import { fetchNews } from '../../reducers/news';
import { formatTimeAgo } from '../../helpers/formatTimeAgo';
import ImageNews from '../../components/Image/Image';

import Header from '../../components/Header/Header';


console.log('print header:',Header)

const NewsPage: React.FC = () => {
 
  const dispatch = useDispatch<AppDispatch>();

  const { articles, status, error } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  console.log('Articles in Component:', articles);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  return (
    
    <div id='allBlock'>
      {articles.map((article: any, index: number) => (
        <div id='newsBlock' key={index}>

          <div><ImageNews id='newsImage'image={article.urlToImage}/></div>
          <div id='newsText'> 
          <h3>{article.title}</h3>
          <i>{article.description}</i>
          <p>{formatTimeAgo(article.publishedAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;



