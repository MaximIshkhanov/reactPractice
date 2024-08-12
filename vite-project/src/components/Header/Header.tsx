import React, { useState } from 'react';
import { formatDate } from "../../helpers/formatData";
import styles from "./styles.module.css";

const Header = () => {
    const [inputValue, setInputValue] = useState(''); // Состояние для хранения значения инпута

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // Обновляем состояние при изменении значения инпута
        console.log('INPUT VALUE:', event.target.value); // Логируем значение инпута
        
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>News reactify</h1>
            <p className={styles.date}>{formatDate(new Date())}</p>
            <input 
                className={styles.input}
                placeholder="search news"
                value={inputValue} // Привязываем значение к состоянию
                onChange={handleInputChange} // Добавляем обработчик изменения
            />
        </header>
    );
}
console.log('INPUT VALUE222222222222222:', Header); 
export default Header;