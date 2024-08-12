import styles from "./styles.module.css"


const ImageNews = ({image}:any) => {
    
    return (
    <img src={image} alt='news' className={styles.image}/>
    
    );
};
export default ImageNews;