import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { getFilePath } from "../src/api/path";
import Nav from "../src/components/Nav/Nav";
import Content from "../src/components/Content/Content";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const [path, setPath] = useState([]);
  const [content, setContent] = useState([]);

  /**
   * Fetches contents for specific file path
   */
  const fetchFilePath = useCallback(async (path) => {
    const { data, error } = await getFilePath(path);

    if (data) {
      const { contents } = data;
      setContent(contents);
    }

    if (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchFilePath();
  }, [fetchFilePath]);

  return (
    <div className={styles.container}>
      <Head>
        <title>File browser</title>
        <meta name="description" content="File browser for JSON content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav path={path} setPath={setPath} fetchFilePath={fetchFilePath} />
        <Content
          contents={content}
          path={path}
          setPath={setPath}
          fetchFilePath={fetchFilePath}
        />
      </main>
    </div>
  );
}
