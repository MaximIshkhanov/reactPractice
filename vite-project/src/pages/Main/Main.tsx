import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../reducers/store';
import { fetchNews } from '../../reducers/news';
import { formatTimeAgo } from '../../helpers/formatTimeAgo';
import ImageNews from '../../components/Image/Image';

const NewsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  };

  const filteredArticles = articles.filter((article:any) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search news..."
      />
      
      <div id='allBlock'>
        {filteredArticles.map((article:any, index:number) => (
          <div id='newsBlock' key={index}>
            <ImageNews id='newsImage' image={article.urlToImage} />
            <div id='newsText'> 
              <h3 dangerouslySetInnerHTML={{ __html: highlightText(article.title, searchQuery) }} />
              <i dangerouslySetInnerHTML={{ __html: highlightText(article.description || '', searchQuery) }} />
              <p>{formatTimeAgo(article.publishedAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;