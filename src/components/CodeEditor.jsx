import React, { useEffect, useState } from "react";

const CodeEditor = () => {
  // useState for the code
  const [code, setCode] = useState(`// Start writing your code here`);
  // useState for the saved code
  const [savedCode, setSavedCode] = useState(code);
  // useState for the Locking
  const [isLocked, setIsLocked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied Successfully");
  };

  const handleSave = () => {
    // Implementing code saving functionality here
    setSavedCode(code);
    localStorage.setItem("savedCode", code);
  };

  const handleLockUnlock = () => {
    // Implementing code locking/unlocking functionality here
    setIsLocked(!isLocked);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      // Insert four spaces for indentation
      const updatedCode = `${code.substring(0, e.target.selectionStart)}    ${code.substring(
        e.target.selectionEnd
      )}`;
      setCode(updatedCode);
    }
  };

  // Fetch saved code from the localStorage
  useEffect(() => {
    setCode(localStorage.getItem("savedCode"));
  }, []);

  return (
    <div className="code-editor">
      <div className="code-editor__header">
        <div className="code-editor__dropdown">

        </div>
        <button className="code-editor__button" onClick={handleCopy}>
          Copy
        </button>
        <button className="code-editor__button" onClick={handleSave}>
          {savedCode === code ? "Saved" : "Save"}
        </button>
        <button
          className={`code-editor__button code-editor__button--lock${
            isLocked ? " code-editor__button--locked" : ""
          }`}
          onClick={handleLockUnlock}
        >
          {isLocked ? "Unlock" : "Lock"}
        </button>
        <div className="code-editor__dropdown">
          <select className="code-editor__dropdown-select">
            <option className="code-editor__dropdown-option" value="javascript">JavaScript</option>
            <option className="code-editor__dropdown-option" value="python">Python</option>
            <option className="code-editor__dropdown-option" value="cpp">C++</option>
            <option className="code-editor__dropdown-option" value="java">Java</option>
            <option className="code-editor__dropdown-option" value="csharp">C#</option>
            <option className="code-editor__dropdown-option" value="kotlin">Kotlin</option>
            {/* Add more language options as needed */}
          </select>
        </div>       
      </div>
      <textarea
        className="code-editor__input"
        value={code}
        onChange={(e) => {
          if (!isLocked) {
            setCode(e.target.value);
          }
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default CodeEditor;

