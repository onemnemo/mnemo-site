import { Heart } from "lucide-react"
import styles from "./interactions.module.css"

export function HeartMap() {
  return (
    <figure className={styles.heartMap}>
      <div className={styles.mapRoot}>An octopus needs<br /><strong>oxygen throughout its body.</strong></div>
      <div className={styles.mapBranches}>
        <div className={styles.mapNode}>
          <div aria-hidden><Heart /><Heart /></div>
          <strong>Two hearts</strong>
          <p>Move blood past the gills<br />to pick up oxygen.</p>
        </div>
        <div className={styles.mapNode}>
          <div aria-hidden><Heart /></div>
          <strong>One heart</strong>
          <p>Sends that blood around<br />the rest of the body.</p>
        </div>
      </div>
      <figcaption>Now the number has a reason behind it.</figcaption>
    </figure>
  )
}
