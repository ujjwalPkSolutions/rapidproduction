"use client"; // This marks the component as a client-side component

import { useEffect, useState } from "react";
import Script from "next/script";

const MyEditorComponent = ({ onChange, value }) => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    // Dynamically load CKEditor only when the window is available
    if (typeof window !== "undefined" && window.CKEDITOR) {
      const editorInstance = CKEDITOR.replace("content", {
        height: 400,
        filebrowserUploadUrl: "http://localhost:5000/api/upload-image", // Your upload endpoint
        removeButtons: "PasteFromWord", // Customize toolbar buttons
      });

      // Update the editor's content if `value` changes (e.g., from the parent component)
      if (value) {
        editorInstance.setData(value);
      }

      // Store the editor instance in the state to interact with it
      setEditor(editorInstance);

      // Listen for changes and pass data back to the parent component
      editorInstance.on("change", () => {
        const data = editorInstance.getData();
        onChange(data); // Send updated content to parent
      });

      // Cleanup editor instance on unmount
      return () => {
        if (editorInstance) {
          editorInstance.destroy(true);
        }
      };
    }
  }, [value]); // Reinitialize editor if `value` prop changes

  const handleSave = () => {
    if (editor) {
      console.log(editor.getData()); // You can perform further actions with the editor data here
    }
  };

  return (
    <div>
      {/* Load CKEditor script only once */}
      <Script
        src="https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js"
        strategy="beforeInteractive"
      />

      {/* Textarea for CKEditor */}
      <textarea id="content"></textarea>

      {/* Button to manually trigger save */}
      <button onClick={handleSave}>Save Content</button>
    </div>
  );
};

export default MyEditorComponent;
