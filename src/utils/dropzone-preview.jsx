import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ files, setFiles, setPhoto, label }) => {
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const previewURL = URL.createObjectURL(acceptedFiles[0]);
      setPhoto(previewURL);
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
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="pointer"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#c4c4c4",
        outline: "none",
        transition: "border .24s ease-in-out",
      }}
    >
      <input {...getInputProps()} />
      <p>{label}</p>
    </div>
  );
};

export default MyDropzone;
