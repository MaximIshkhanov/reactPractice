import styles from "./styles.module.css"


const ImageNews = ({image}:any) => {
    return (
    <div className={styles.wrapper}>
        {image ? <img src={image} alt='news' className={styles.image}/> :null}
    </div>
    );
};
export default ImageNews;