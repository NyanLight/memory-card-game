import styles from "./Card.module.css";

export function Card({
  name,
  url,
  handler,
}: {
  name: string;
  url: string;
  handler: (name: string) => void;
}) {
  return (
    <article className={styles.card} onClick={() => handler(name)}>
      <div className={styles.spriteWrapper}>
        <img className={styles.img} src={url} alt="" />
      </div>
      <h3 className={styles.name}>{name}</h3>
    </article>
  );
}
