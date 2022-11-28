import styles from "./Content.module.scss";
import { AiFillFileText, AiFillFolderOpen } from "react-icons/ai";

/**
 * Displays file contents
 * @param contents - array of objects containing file name and type (directory or file)
 * @param fetchFilePath - function to fetch the contents for the current file path
 * @param path - string array containing the file path
 * @param setPath - function to set the file path
 * @returns Content component
 */
export default function Content({ contents, fetchFilePath, path, setPath }) {
  return (
    <>
      {contents[0]?.name.includes("THIS") ? (
        <div className={styles.filePage}>{contents[0]?.name}</div>
      ) : (
        <div className={styles.container}>
          {contents.map((content, index) => {
            return (
              <div
                key={index}
                className={styles.file}
                onClick={() => {
                  // Copy current path, add clicked on file/directory, and set new path
                  let tempPath = [...path];
                  tempPath.push(content.name);
                  setPath(tempPath);

                  // fetch content for new path
                  const newPath = ["root"].concat(tempPath);
                  fetchFilePath(newPath.join("/"));
                }}
              >
                {content.type === "file" ? (
                  <AiFillFileText className={styles.fileIcon} />
                ) : (
                  <AiFillFolderOpen className={styles.fileIcon} />
                )}
                <div className={styles.fileName}>{content.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
