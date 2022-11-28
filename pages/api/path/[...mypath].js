export default function handler(req, res) {
  // directory structure (can be replaced as long as it is called root)
  let root = {
    type: "dir",
    children: {
      home: {
        type: "dir",
        children: {
          myname: {
            type: "dir",
            children: {
              "filea.txt": {
                type: "file",
              },
              "fileb.txt": {
                type: "file",
              },
              projects: {
                type: "dir",
                children: {
                  mysupersecretproject: {
                    type: "dir",
                    children: {
                      mysupersecretfile: {
                        type: "file",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  /**
   * create an array of contents for the current path
   * @param currentPath - string array containing the file path
   * @returns array of objects containing file name and type (directory or file)
   */
  const getContents = (currentPath) => {
    const contents = [];
    let location = root.children;

    if (currentPath.length > 1) {
      // i starts at 1 because "root" is at index 0
      for (let i = 1; i < currentPath.length; i++) {
        // if path has children, location becomes children so they can be listed
        if (location[currentPath[i]].children) {
          location = location[currentPath[i]].children;
        } else {
          // otherwise the current location is a file
          location = location[currentPath[i]];
          contents.push({
            name: `THIS IS FILE: ${currentPath[i]}`,
            type: location.type,
          });
          return contents;
        }
      }
    }

    // map through the children and push them to the contents array (not including subtree)
    const contentNames = Object.keys(location);
    contentNames.map((name) => {
      contents.push({ name, type: location[name].type });
    });

    return contents;
  };

  const { mypath } = req.query;
  if (req.method == "GET") {
    const contents = getContents(mypath);

    res.status(200).json({ data: { contents }, error: null });
    return;
  }

  res.status(500).json({ data: null, error: "Only accepting GET requests" });
}
