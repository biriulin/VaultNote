import styles from './NotionPage.module.css'

import NotionViewer from '../components/Notion/Notion'

type NotionPageProps = {}

const NotionPage: React.FC<NotionPageProps> = () => {
  return (
    <div className={styles.page}>
      <NotionViewer></NotionViewer>
    </div>
  )
}

export default NotionPage
