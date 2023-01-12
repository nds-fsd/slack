import { BarraNav } from '../BarraNav/BarraNav';
import styles from './notFound.module.css'
import notFound from '../../Assets/notFound.png'

const NotFound = () => {
    return (
        <>
            <BarraNav />
            <div className={styles.card}>
                <img src={notFound} /><br/>
                <h3>Ups!! algo ha fallado.</h3>
            </div>
        </>

    )
}
export default NotFound;