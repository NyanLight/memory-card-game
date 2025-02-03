import styles from "./Card.module.css";

export function Card({
  name,
  url,
  handler,
}: {
  name: string;
  url: string;
  handler: (e: EventTarget, name: string) => void;
}) {
  return (
    <article className={styles.card} onClick={(e) => handler(e, name)}>
      <div className={styles.spriteWrapper}>
        <img className={styles.img} src={url} alt="" />
      </div>
      <h3 className={styles.name}>{name}</h3>
    </article>
  );
}
