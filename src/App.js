import { useState, useEffect } from "react";
import Comments from "./components/Comments/Comments";
import useNode from "./hooks/useNode";
import "./styles.css";

const comments = JSON.parse(localStorage.getItem("commentsData")) || {
  id: 1,
  items: [],
};
const App = () => {
  const [commentsData, setCommentsData] = useState(comments);
  
  useEffect(() => {
    localStorage.setItem("commentsData",JSON.stringify(commentsData))
  }, [commentsData])
  

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, name, commentText) => {
    const finalStructure = insertNode(
      commentsData,
      folderId,
      name,
      commentText
    );
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };

  return (
    <div className="App">
      <Comments
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={commentsData}
      />
    </div>
  );
};

export default App;
