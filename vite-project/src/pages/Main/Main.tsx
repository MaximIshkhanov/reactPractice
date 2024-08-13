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
  const [sortedArticles, setSortedArticles] = useState(articles); // Добавляем состояние для отсортированных новостей
  
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    setSortedArticles(articles); // Обновляем отсортированные новости при изменении articles
  }, [articles]);

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
    const searchText = searchQuery.toLowerCase();
    const filterCondition = (article: any) => {
      switch (searchOption) {
        case 'TitleSelect':
          return article.title.toLowerCase().includes(searchText);
        case 'DateSelect':
          return formatTimeAgo(article.publishedAt)?.toLowerCase().includes(searchText);
        case 'AuthorSelect':
          return article.author?.toLowerCase().includes(searchText);
        default:
          return (
            article.title.toLowerCase().includes(searchText) ||
            article.description?.toLowerCase().includes(searchText) ||
            article.content?.toLowerCase().includes(searchText) ||
            article.author?.toLowerCase().includes(searchText) ||
            formatTimeAgo(article.publishedAt)?.toLowerCase().includes(searchText)
          );
      }
    };

    return articles.filter(filterCondition);
  };

  const sortNewsByDate = () => {
    const sorted = [...sortedArticles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    setSortedArticles(sorted);
  };

  const sortNewsByTitle = () => {
    const sorted = [...sortedArticles].sort((a, b) => a.title.localeCompare(b.title));
    setSortedArticles(sorted);
  };

  const sortNewsByAuthor = () => {
    const sorted = [...sortedArticles].sort((a, b) => (a.author || '').localeCompare(b.author || ''));
    setSortedArticles(sorted);
  };

  const filteredArticles = filterArticles(sortedArticles);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Передаем searchOption, sortNewsByDate, sortNewsByTitle и sortNewsByAuthor в Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchOption={searchOption}
        setSearchOption={setSearchOption}
        sortNewsByDate={sortNewsByDate} // Передаем функцию сортировки по дате
        sortNewsByTitle={sortNewsByTitle} // Передаем функцию сортировки по заголовку
        sortNewsByAuthor={sortNewsByAuthor} // Передаем функцию сортировки по автору
      />
      <div id="allBlock">
        {filteredArticles.map((article: any, index: number) => (
          <div id="newsBlock" key={index}>
            <ImageNews id="newsImage" image={article.urlToImage} />
            <div id="newsText" className='sss'>
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