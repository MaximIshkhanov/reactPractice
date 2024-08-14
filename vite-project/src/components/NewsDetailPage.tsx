import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/store';



import { formatTimeAgo } from '../helpers/formatTimeAgo';

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles } = useSelector((state: RootState) => state.news);

  const decodedId = decodeURIComponent(id || '');
  const article = articles.find((article: any) => article.title === decodedId);

  if (!article) {
    return <div>News not found</div>;
  }

  return (
    <div>
      <h1>NEWS title: {article.title}</h1>
      <h2>NEWS author: {article.author}</h2>
      <p>NEWS date:{formatTimeAgo(article.publishedAt)}</p>
      <h2>NEWS content:{article.content}</h2>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default NewsDetailPage;