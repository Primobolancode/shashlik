import React from "react";

const FileItem = ({ name, type, children }) => {
  return (
    <div className="flex items-center">
      {type === "file" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-600 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a1 1 0 00-.293-.707l-4-4A1 1 0 0014 2H4zm1.414 1H14v4H8.414l-2-2L5.414 3zM2 6V4h3.586l2 2H2zm0 2v2h6v6H4a2 2 0 01-2-2V8h2zm8 10V10h5v8h-5zm7-1V12h3v4h-3z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-600 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2 5a3 3 0 013-3h6a3 3 0 013 3v1h4a1 1 0 011 1v9a3 3 0 01-3 3H5a3 3 0 01-3-3V6a1 1 0 011-1h4V5zm3 5a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1zm9 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-4 4a1 1 0 100 2h4a1 1 0 100-2h-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <p>{name}</p>
    </div>
  );
};

const FileTree = ({ data }) => {
  const renderTree = (data) => {
    return (
      <ul>
        {data.map((item) => (
          <li key={item.name}>
            <FileItem name={item.name} type={item.type} />
            {item.children && renderTree(item.children)}
          </li>
        ))}
      </ul>
    );
  };

  return <div>{renderTree(data)}</div>;
};

const HierarchyFileSystem = () => {
  const fileSystemData = [
    {
      name: "Documents",
      type: "folder",
      children: [
        {
          name: "Report.pdf",
          type: "file",
        },
        {
          name: "Notes.txt",
          type: "file",
        },
      ],
    },
    {
      name: "Pictures",
      type: "folder",
      children: [
        {
          name: "Vacation.jpg",
          type: "file",
        },
        {
          name: "Family.jpg",
          type: "file",
        },
      ],
    },
    {
      name: "Music",
      type: "folder",
      children: [
        {
          name: "Song1.mp3",
          type: "file",
        },
        {
          name: "Song2.mp3",
          type: "file",
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">File System Hierarchy</h2>
      <FileTree data={fileSystemData} />
    </div>
  );
};

export default HierarchyFileSystem;
