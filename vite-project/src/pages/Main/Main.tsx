import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../reducers/store';
import { fetchNews } from '../../reducers/news';



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
    <div>
      {articles.map((article: any, index: number) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;