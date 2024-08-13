import React from 'react';
import { formatDate } from "../../helpers/formatData";
import styles from "./styles.module.css";

// Определяем типы пропсов для Header
interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchOption: string;
  setSearchOption: (option: string) => void;
  sortNewsByDate: () => void; // Добавляем новый пропс для функции сортировки по дате
  sortNewsByTitle: () => void; // Добавляем новый пропс для функции сортировки по заголовку
  sortNewsByAuthor: () => void; // Добавляем новый пропс для функции сортировки по автору
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, searchOption, setSearchOption, sortNewsByDate, sortNewsByTitle, sortNewsByAuthor }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>News reactify</h1>
      <p className={styles.date}>{formatDate(new Date())}</p>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search news..."
        className={styles.searchInput}
      />
      <select
        id="search-select"
        value={searchOption}
        onChange={(e) => setSearchOption(e.target.value)}
      >
        <option value="">All</option>
        <option value="TitleSelect">Title</option>
        <option value="DateSelect">Date</option>
        <option value="AuthorSelect">Author</option>
      </select>
      <button
        className={styles.dateNews}
        onClick={sortNewsByDate} // Вызываем функцию сортировки по дате при нажатии
      >
        date
      </button>
      <button
        className={styles.titleNews}
        onClick={sortNewsByTitle} // Вызываем функцию сортировки по заголовку при нажатии
      >
        title
      </button>
      <button
        className={styles.authorNews}
        onClick={sortNewsByAuthor} // Вызываем функцию сортировки по автору при нажатии
      >
        author
      </button>
    </header>
  );
}

export default Header;