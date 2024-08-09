import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../reducers/store';
import { fetchNews } from '../../reducers/news';
import { formatTimeAgo } from '../../helpers/formatTimeAgo';
import ImageNews from '../../components/Image/Image';



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
          <hr></hr>
          <ImageNews image={article.image}/>
          
          <h3>{article.title}</h3>
          <i>{article.description}</i>
          <p>{formatTimeAgo(article.publishedAt)}</p>
          
        </div>
      ))}
    </div>
  );
};

export default NewsPage;