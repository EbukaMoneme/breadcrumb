import styles from "./Nav.module.scss";
import { IoCaretForward } from "react-icons/io5";

/**
 * Display breadcrumb showing current location in directory structure
 * @param fetchFilePath - function to fetch the contents for the current file path
 * @param path - string array containing the file path
 * @param setPath - function to set the file path
 * @returns Breadcrumb nav component
 */
export default function Nav({ fetchFilePath, path, setPath }) {
  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <div
          className={styles.linkText}
          onClick={() => {
            fetchFilePath();
            setPath([]);
          }}
        >
          root
        </div>
      </div>
      {path.map((file, index) => {
        return (
          <div
            key={index}
            className={`${styles.link} ${styles.nestedLink}`}
            onClick={() => {
              // Return if clicking the current path location
              if (path[path.length - 1] === file) return;

              // If going up the directory slice path array
              let newPath;
              for (let i = 0; i < path.length; i++) {
                if (path[i] === file) {
                  newPath = path.slice(0, i + 1);
                  break;
                }
              }
              setPath(newPath);

              // fetch contents for new path location
              const newFilePath = ["root"].concat(newPath);
              fetchFilePath(newFilePath.join("/"));
            }}
          >
            <IoCaretForward className={styles.caret} />
            <div className={styles.linkText}>{file}</div>
          </div>
        );
      })}
    </div>
  );
}
