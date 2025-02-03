import styles from './Card.module.css'

export function Card ({name, url, handler}: {name: string, url: string, handler: () => void}) {
    return <article className={styles.card} onClick={handler}>
        <div className={styles.spriteWrapper}>
            <img src={url} alt="" />
        </div>
        <h3>{name}</h3>
    </article>
}