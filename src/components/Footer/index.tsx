import styles from './styles.module.scss'

export const Footer = () => {
  return (
    <footer
      className={styles.footer}
    >
       A TO-DO App with react by
       <a
       href="https://www.linkedin.com/in/alexvfornazierie/"
       target="_blank"
       rel="noreferrer"
       >
        Alex V. Fornazieri
        </a>
    </footer>
  )
}
