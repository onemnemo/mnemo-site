import styles from "./scheduling.module.css"

export function SchedulingFigure() {
  return (
    <figure className={styles.figure}>
      <figcaption>Each review gives your memory more time.</figcaption>
      <svg viewBox="0 0 650 150" role="img" aria-label="An illustrative memory curve. After each review, recall rises and then fades more slowly, allowing longer gaps between reviews.">
        <g stroke="#8d72b3" strokeOpacity="0.14">
          {[30, 60, 90, 120].map((y) => <path key={y} d={`M12 ${y}H638`} />)}
        </g>
        <path d="M12 22 C65 37 80 83 126 96 S270 119 638 124" stroke="#9d84bc" strokeWidth="1.5" strokeDasharray="7 7" fill="none" opacity="0.65" />
        <path d="M12 22 C65 37 80 83 126 96 M126 32 C180 47 215 64 288 82 M288 38 C355 43 420 60 478 68 M478 40 C535 43 590 50 638 56" stroke="#76529f" strokeWidth="2.6" fill="none" />
        <g stroke="#9d84bc" strokeDasharray="3 4">
          <path d="M126 96V32M288 82V38M478 68V40" />
        </g>
        <g fill="#76529f"><circle cx="126" cy="32" r="5" /><circle cx="288" cy="38" r="5" /><circle cx="478" cy="40" r="5" /></g>
      </svg>
      <div className={styles.labels}><span>Just learned</span><span>Time passes →</span></div>
    </figure>
  )
}
