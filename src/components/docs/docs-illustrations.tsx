import { ChevronDown, FileText, Folder } from "lucide-react"

import { ConnectionExample, RecallExample } from "@/components/landing/tool-cards"
import styles from "./illustrations.module.css"

export function UseIllustration() {
  return (
    <div className={styles.use}>
      <div className={styles.note} aria-hidden="true">
        <span>Note</span>
        <p>A thought<br />worth keeping.</p>
        <i /><i /><i />
      </div>
      <ConnectionExample className={styles.map} />
      <RecallExample className={styles.card} />
    </div>
  )
}

export function BuildIllustration() {
  return (
    <div className={styles.build} aria-hidden="true">
      <div className={styles.terminal}>
        <div className={styles.lights}><i /><i /><i /></div>
        <code>$ dotnet run --project<br />&nbsp; Mnemo.Host -- --dev<br /><span>▏</span></code>
      </div>
      <div className={styles.files}>
        <div><ChevronDown />Mnemo</div>
        <ul>
          {["Mnemo.Core", "Mnemo.Infrastructure", "Mnemo.Host", "mnemo-web", "tests"].map((name) => <li key={name}><Folder />{name}</li>)}
          <li><FileText />README.md</li>
          <li><FileText />CONTRIBUTING.md</li>
        </ul>
      </div>
    </div>
  )
}
