import { BarraNav } from '../BarraNav/BarraNav';
import styles from './notFound.module.css'

const NotFound = () =>{
    return(
        <>
        <BarraNav />
        <div className={styles.card}>
            <h3>Ups!! algo ha fallado.</h3>
        </div>
        </>
       
    )
}
export default NotFound;