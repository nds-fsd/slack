import styles from './notFound.module.css'
import notFound from '../../Assets/notFound.png'

const NotFound = () => {
    return (
        <>
        
            <div className={styles.card}>
                <img src={notFound} alt="" /><br/>
                <h3>Ups!! algo ha fallado.</h3>
            </div>
        </>

    )
}
export default NotFound;