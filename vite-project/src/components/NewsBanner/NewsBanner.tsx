import { formatTimeAgo } from "../../helpers/formatTimeAgo";
import ImageNews from "../Image/Image";
import styles from "./styles.module.css"
const NewsBanner = ({item}:any) => {
    return (
    <div className={styles.banner}>
        <ImageNews image={item?.image} />
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.extra}>
            {formatTimeAgo(item.publishedAt)} by {item.author}
        </p>
    </div>
    );
}
export default NewsBanner;