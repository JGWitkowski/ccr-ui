import React from 'react'
import { Link } from 'react-router-dom'

import Spinner from '../../compoments/Spinner'
import { useGetDocsListQuery } from '../../services/docs'

import styles from './index.module.css'

const DocumentList: React.FC = () => {
  const { data, error, isLoading } = useGetDocsListQuery()

  if (error)
    return (
      <div className={styles.container}>
        <p className={styles.error}>{JSON.stringify(error)}</p>
      </div>
    )

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        &gt; Counter
      </Link>
      <header className={styles.header}>
        <h1>Document List</h1>
      </header>
      {isLoading && <Spinner size="xl" />}
      <section className={styles.documentList}>
        {data &&
          data.map((doc, i) => (
            <a key={i} className={styles.button} href={doc.url} target="_blank">
              {doc.name}
            </a>
          ))}
      </section>
    </div>
  )
}

export default DocumentList
