# Breadcrub File Browser

This project displays a breadcrumb file-browser component showing the current location in the directory structure.

## Demo

!["Preview"](https://raw.githubusercontent.com/EbukaMoneme/breadcrumb/main/public/breadcrumb.gif)

## Tech

- JavaScript/Jsx
- Next.js

## Features

- The breadcrumb navigation shows the current location in the directory structure
- Each part in the breadcrumb is separated and clickable. Clicking on a folder in the breadcrumb will take you to that folder.
- The main portion of the page displays the contents of the current directory, or "THIS IS FILE: {filename}" if the path is a file. Clicking on any of the files or folders in this portion of the page takes you to that file.
- There is a simple http server with a single endpoint: GET /path/{mypath} that returns the data about the given path. For directories, it only includes direct children, not the full subtree.

## Development

Run the development server from your terminal:

```bash
yarn dev
```
