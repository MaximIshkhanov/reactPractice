import { useEffect } from "react";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import styles from "./styles.module.css"
import { getNews } from "../../api/apiNews";
const Main = () => {

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const news = await getNews()
                console.log(news)
            }catch (error){
                console.log(error)
            }
        }
        fetchNews();
    }, [])
    return (
    <main className={styles.main}>
        <NewsBanner />
    </main>
    );
}
export default Main;