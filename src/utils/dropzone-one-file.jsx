import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "5px",
  borderWidth: 1,
  borderRadius: 4,
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#c4c4c4",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#f2f",
};

const acceptStyle = {
  borderColor: "#f8f",
};

const rejectStyle = {
  borderColor: "#f2f",
};
function Dropzone({files, setFiles, label}) {
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) =>
        acceptedFiles.reduce(
          (acc, file) => ({
            [file.name]: {
              file,
              fileType: "",
            },
          }),
          prevFiles
        )
      );
    },
    // accept: {'image/*': []},
    // maxSize: 1500000,
    multiple: false
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  const acceptedFileItems = Object.keys(files).map((fileName) => {
    const currentFile = files[fileName].file;

    return (
        <li key={currentFile.path}>
        {currentFile.path} - {currentFile.size} bytes
      </li>
    );
  });

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <em>{label}</em>
        <aside>
          <ul>{acceptedFileItems}</ul>
        </aside>
      </div>
    </section>
  );
}

export default Dropzone;
