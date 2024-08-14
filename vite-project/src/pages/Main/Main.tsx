import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../reducers/store';
import { fetchNews } from '../../reducers/news';
import ImageNews from '../../components/Image/Image';
import Header from '../../components/Header/Header';
import Pagination from '../../pagination/pagination';
import { formatTimeAgo } from '../../helpers/formatTimeAgo';
import { useNavigate } from 'react-router-dom';

const NewsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector((state: RootState) => state.news);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [sortedArticles, setSortedArticles] = useState(articles);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    setSortedArticles(articles);
  }, [articles]);

  const handleNewsClick = (title: string) => {
    navigate(`/news/${encodeURIComponent(title)}`);
  };


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

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Сбрасываем текущую страницу на первую при изменении поискового запроса
  };

  const handleSearchOptionChange = (option: string) => {
    setSearchOption(option);
    setCurrentPage(1); // Сбрасываем текущую страницу на первую при изменении опции поиска
  };

  const filteredArticles = filterArticles(sortedArticles);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={handleSearchQueryChange} // Используем новый обработчик
        searchOption={searchOption}
        setSearchOption={handleSearchOptionChange} // Используем новый обработчик
        sortNewsByDate={sortNewsByDate}
        sortNewsByTitle={sortNewsByTitle}
        sortNewsByAuthor={sortNewsByAuthor}
      />
      <div id="allBlock">
        {currentArticles.map((article: any, index: number) => (
          <div id="newsBlock" key={index} onClick={() => handleNewsClick(article.title)}>
            <ImageNews image={article.urlToImage} />
            <div id="newsText">
              <h5>{highlightText(article.author || '', searchQuery, searchOption, 'AuthorSelect')}</h5>
              <h3>{highlightText(article.title, searchQuery, searchOption, 'TitleSelect')}</h3>
              <i>{highlightText(article.description || '', searchQuery, searchOption, '')}</i>
              <p>{highlightText(formatTimeAgo(article.publishedAt) || '', searchQuery, searchOption, 'DateSelect')}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NewsPage;