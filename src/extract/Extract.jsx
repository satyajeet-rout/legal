// import React, { useState } from 'react';
// import ProgressBar from './components/ProgressBar';
// import FileUpload from './components/FileUpload';
// import TagInput from './components/TagInput';
// import DataView from './components/DataView';
// import { Loader2 } from 'lucide-react';

// const Extract = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [files, setFiles] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [extractedData, setExtractedData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [progress, setProgress] = useState(0);

//   const processFile = async (file, tags) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('keyword_list', JSON.stringify(tags));

//     const response = await fetch(`${import.meta.env.VITE_API_URL}legal/extract/`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status} for file: ${file.name}`);
//     }

//     const responseData = await response.json();
//     return {
//       fileName: file.name,
//       response: responseData
//     };
//   };

//   const handleExtraction = async (tags) => {
//     setIsLoading(true);
//     setError(null);
//     setProgress(0);
    
//     try {
//       const results = [];
//       const totalFiles = files.length;

//       // Process files sequentially
//       for (let i = 0; i < files.length; i++) {
//         try {
//           console.log(`Processing file ${i + 1}/${totalFiles}: ${files[i].name}`);
//           const result = await processFile(files[i], tags);
//           results.push(result);
//           setProgress(((i + 1) / totalFiles) * 100);
//         } catch (err) {
//           console.error(`Error processing file ${files[i].name}:`, err);
//           // Continue with other files even if one fails
//         }
//       }

//       console.log('All Results:', results);
//       setExtractedData(results);
//       setCurrentStep(3);
//     } catch (err) {
//       setError(`Error during extraction: ${err.message}`);
//       console.error('Error during extraction:', err);
//     } finally {
//       setIsLoading(false);
//       setProgress(0);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-12 border border-gray-200 rounded-lg shadow-sm px-11 bg-gray-100">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold mb-2">Extract</h1>
//         <p className="text-gray-600">
//           Automated data extraction tool for organizing key information from documents
//         </p>
//       </div>

//       <ProgressBar currentStep={currentStep} />

//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//           {error}
//         </div>
//       )}

//       {isLoading ? (
//         <div className="flex flex-col items-center justify-center p-8">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
//           <p className="text-gray-600">
//             Processing document {Math.round((progress / 100) * files.length)}/{files.length}
//           </p>
//           <div className="w-full max-w-md h-2 bg-gray-200 rounded-full mt-4">
//             <div 
//               className="h-full bg-blue-600 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>
//       ) : (
//         <>
//           {currentStep === 1 && (
//             <FileUpload 
//               files={files} 
//               setFiles={setFiles} 
//               onNext={() => setCurrentStep(2)} 
//             />
//           )}

//           {currentStep === 2 && (
//             <TagInput 
//               onBack={() => setCurrentStep(1)} 
//               onNext={handleExtraction}
//             />
//           )}

//           {currentStep === 3 && (
//             <DataView 
//               extractedData={extractedData} 
//               onBack={() => setCurrentStep(2)} 
//               uploadedFiles={files}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Extract;




import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import FileUpload from './components/FileUpload';
import TagInput from './components/TagInput';
import DataView from './components/DataView';
import { Loader2 } from 'lucide-react';

const Extract = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [extractedData, setExtractedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const processFile = async (file, tags) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('keyword_list', JSON.stringify(tags));

    const response = await fetch(`${import.meta.env.VITE_API_URL}legal/extract/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} for file: ${file.name}`);
    }

    const responseData = await response.json();
    return {
      fileName: file.name,
      response: responseData
    };
  };

  const handleExtraction = async (tags) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      const results = [];
      const totalFiles = files.length;

      for (let i = 0; i < files.length; i++) {
        try {
          console.log(`Processing file ${i + 1}/${totalFiles}: ${files[i].name}`);
          const result = await processFile(files[i], tags);
          results.push(result);
          setProgress(((i + 1) / totalFiles) * 100);
        } catch (err) {
          console.error(`Error processing file ${files[i].name}:`, err);
        }
      }

      console.log('All Results:', results);
      setExtractedData(results);
      setCurrentStep(3);
    } catch (err) {
      setError(`Error during extraction: ${err.message}`);
      console.error('Error during extraction:', err);
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  // Calculate dynamic margin based on chat state
  const containerStyle = {
    transition: 'margin-right 0.3s ease-in-out',
    marginRight: isChatOpen ? '384px' : '0', // 384px = 24rem = width of chat + some padding
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-all duration-300" style={containerStyle}>
      <div className="max-w-4xl mx-auto p-6 mt-12 border border-gray-200 rounded-lg shadow-sm px-11 bg-gray-100">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Extract</h1>
          <p className="text-gray-600">
            Automated data extraction tool for organizing key information from documents
          </p>
        </div>

        <ProgressBar currentStep={currentStep} />

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">
              Processing document {Math.round((progress / 100) * files.length)}/{files.length}
            </p>
            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full mt-4">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            {currentStep === 1 && (
              <FileUpload 
                files={files} 
                setFiles={setFiles} 
                onNext={() => setCurrentStep(2)} 
              />
            )}

            {currentStep === 2 && (
              <TagInput 
                onBack={() => setCurrentStep(1)} 
                onNext={handleExtraction}
              />
            )}

            {currentStep === 3 && (
              <DataView 
                extractedData={extractedData} 
                onBack={() => setCurrentStep(2)} 
                uploadedFiles={files}
                onChatOpen={() => setIsChatOpen(true)}
                onChatClose={() => setIsChatOpen(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Extract;