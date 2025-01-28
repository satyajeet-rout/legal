// components/FileUpload.jsx
import React from 'react';
import { Upload, X, FileText, ChevronRight } from 'lucide-react';

const FileUpload = ({ files, setFiles, onNext }) => {
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#FFF7ED] border border-gray-700 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          accept=".pdf,.doc,.docx"
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <p className="text-gray-600">Upload files</p>
        </label>
      </div>

      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-700">
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm">{file.name}</span>
            </div>
            <button
              onClick={() => removeFile(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          disabled={files.length === 0}
        >
          Next <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default FileUpload;