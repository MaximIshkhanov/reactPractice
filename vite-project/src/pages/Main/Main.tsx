import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../reducers/store';
import { fetchNews } from '../../reducers/news';
import ImageNews from '../../components/Image/Image';
import Header from '../../components/Header/Header';
import { formatTimeAgo } from '../../helpers/formatTimeAgo';

const NewsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState(''); // Добавляем состояние для опции поиска

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const highlightText = (text: string, query: string, option: string, targetField: string) => {
    if (!query || !text) return <>{text}</>;
  
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
  
    if (parts.length > 1) {
      return (
        <>
          {parts.map((part, i) => {
            let color = 'yellow'; 
            switch (option) { 
              case 'TitleSelect':
                color = 'red';
                break;
              case 'DateSelect':
                color = 'green';
                break;
              case 'AuthorSelect':
                color = 'blue';
                break;
            }
  
            // Применяем цвет, если есть совпадение
            // и (выбрана опция ИЛИ ищем по всем полям)
            if ((i % 2) === 1 && (option === targetField || option === '')) { 
              return <span key={i} style={{ backgroundColor: color }}>{part}</span>;
            } else {
              return <span key={i}>{part}</span>;
            }
          })}
        </>
      );
    } else {
      return <>{text}</>;
    }
  };

  const filterArticles = (articles: any[]) => {
    return articles.filter((article) => {
      const searchText = searchQuery.toLowerCase();
  
      if (searchOption === 'TitleSelect') {
        return article.title.toLowerCase().includes(searchText);
      } else if (searchOption === 'DateSelect') {
        return formatTimeAgo(article.publishedAt)?.toLowerCase().includes(searchText);
      } else if (searchOption === 'AuthorSelect') {
        return article.author?.toLowerCase().includes(searchText);
      } else { 
        // Ищем по всем полям
        return (
          article.title.toLowerCase().includes(searchText) || // Добавили проверку title
          article.description?.toLowerCase().includes(searchText) ||
          article.content?.toLowerCase().includes(searchText) ||
          article.author?.toLowerCase().includes(searchText) ||
          formatTimeAgo(article.publishedAt)?.toLowerCase().includes(searchText)
        );
      }
    });
  };
  const filteredArticles = filterArticles(articles);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Передаем searchOption в Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchOption={searchOption}
        setSearchOption={setSearchOption}
      />
      <div id="allBlock">
        {filteredArticles.map((article: any, index: number) => (
          <div id="newsBlock" key={index}>
            <ImageNews id="newsImage" image={article.urlToImage} />
            <div id="newsText">
  <h5>{highlightText(article.author || '', searchQuery, searchOption, 'AuthorSelect')}</h5>
  <h3>{highlightText(article.title, searchQuery, searchOption, 'TitleSelect')}</h3>
  <i>{highlightText(article.description || '', searchQuery, searchOption, '')}</i> 
  <p>{highlightText(formatTimeAgo(article.publishedAt) || '', searchQuery, searchOption, 'DateSelect')}</p>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;



