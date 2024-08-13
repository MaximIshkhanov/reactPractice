import React from 'react';
import { formatDate } from "../../helpers/formatData";
import styles from "./styles.module.css";


// Определяем типы пропсов для Header
interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchOption: string;
    setSearchOption: (option: string) => void;
  }
  
const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, searchOption, setSearchOption }) => {
    return (
        <header className={styles.header}>
    
        <h1 className={styles.title}>News reactify</h1>
        <p className={styles.date}>{formatDate(new Date())}</p>
        
        {/* Добавляем инпут для поиска */}
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
      </header>
    );
  }
export default Header;