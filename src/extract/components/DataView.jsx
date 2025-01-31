// import React, { useState } from 'react';
// import { ChevronRight, MessageCircle, Loader2 } from 'lucide-react';
// import FloatingChatBot from './FloatingChatBot';

// const ChatButton = ({ onClick, isLoading, disabled }) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={isLoading || disabled}
//       className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed min-w-[140px] justify-center transition-all duration-200"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="w-4 h-4 animate-spin" />
//           <span>Processing...</span>
//         </>
//       ) : (
//         <>
//           <MessageCircle className="w-4 h-4" />
//           <span>Chat with Doc</span>
//         </>
//       )}
//     </button>
//   );
// };

// const DataView = ({ extractedData = [], onBack, onDocumentSelect, uploadedFiles = [], onChatOpen, onChatClose }) => {
//   const [selectedDoc, setSelectedDoc] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showChat, setShowChat] = useState(false);
  
//   const formatValue = (value, key) => {
//     if (!value) return '';
    
//     // Check if the field likely contains an address
//     const addressFields = ['address', 'location', 'premises', 'property', 'site'];
//     const isAddressField = addressFields.some(field => key.toLowerCase().includes(field));
    
//     if (Array.isArray(value)) {
//       const formattedValue = value.map((item, index) => 
//         index === value.length - 1 ? item : item + ','
//       ).join('\n');
      
//       return isAddressField ? 
//         <div className="max-h-[4.5em] overflow-hidden text-ellipsis" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
//           {formattedValue}
//         </div> :
//         formattedValue;
//     }
    
//     const items = String(value).split(/[,;]\s*/);
//     const formattedValue = items.map((item, index) => 
//       index === items.length - 1 ? item.trim() : item.trim() + ','
//     ).join('\n');
    
//     return isAddressField ? 
//       <div className="max-h-[4.5em] overflow-hidden text-ellipsis" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
//         {formattedValue}
//       </div> :
//       formattedValue;
//   };

//   const cleanFileName = (fileName) => {
//     return fileName ? fileName.replace(/\.[^/.]+$/, '') : '';
//   };

//   const handleDocSelect = (value) => {
//     setSelectedDoc(value);
//     if (showChat) {
//       handleChatClose();
//     }
//     if (onDocumentSelect) {
//       onDocumentSelect(value);
//     }
//   };

//   const handleChatClose = () => {
//     setShowChat(false);
//     onChatClose?.();
//   };

//   const chatWithDoc = async () => {
//     if (!selectedDoc) {
//       alert('Please select a document first');
//       return;
//     }

//     const selectedFile = uploadedFiles.find(file => file.name === selectedDoc);
//     if (!selectedFile) {
//       alert('File not found in uploaded files');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('files', selectedFile);

//       const response = await fetch('https://legal-ai-backend-draft-drh9bmergvh7a4a9.southeastasia-01.azurewebsites.net/legal/process-document/', {
//         method: 'POST',
//         body: formData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to process document');
//       }

//       const data = await response.json();
//       if (data.status === 'success') {
//         handleChatClose();
//         setTimeout(() => {
//           setShowChat(true);
//           onChatOpen?.();
//         }, 100);
//       }
//     } catch (error) {
//       console.error('Error processing document:', error);
//       alert('Failed to process document. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const exportData = () => {
//     try {
//       if (!extractedData || !Array.isArray(extractedData) || extractedData.length === 0) {
//         console.warn('No data to export');
//         return;
//       }

//       const allKeys = ['agreementName', ...new Set(extractedData.flatMap(data => 
//         data && data.response ? Object.keys(data.response) : []
//       ))];
      
//       const rows = [
//         allKeys.join(','),
//         ...extractedData.map(({ fileName, response }) => {
//           const rowData = [
//             `"${cleanFileName(fileName)}"`,
//             ...allKeys.slice(1).map(key => {
//               const value = response?.[key];
//               return `"${value ? String(value).replace(/"/g, '""') : ''}"`;
//             })
//           ];
//           return rowData.join(',');
//         })
//       ];
      
//       const csvContent = 'data:text/csv;charset=utf-8,' + rows.join('\n');
//       const encodedUri = encodeURI(csvContent);
//       const link = document.createElement('a');
//       link.setAttribute('href', encodedUri);
//       link.setAttribute('download', 'extracted_data.csv');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error exporting data:', error);
//     }
//   };

//   if (!Array.isArray(extractedData) || extractedData.length === 0) {
//     return (
//       <div className="bg-white rounded-lg p-6 shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
//         <p className="text-gray-600">No data available.</p>
//         <div className="mt-8">
//           <button
//             onClick={onBack}
//             className="flex items-center px-6 py-2 text-lg border-2 border-gray-300 text-gray-600 rounded-lg bg-gray-200 hover:bg-gray-300 hover:border-gray-400 transition-colors"
//           >
//             <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
//             Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const allKeys = [...new Set(extractedData.flatMap(data => 
//     data && data.response ? Object.keys(data.response) : []
//   ))];

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-sm">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold">Extracted Data</h2>
//         <div className="flex items-center gap-3">
//           <select 
//             className="min-w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) => handleDocSelect(e.target.value)}
//             value={selectedDoc}
//           >
//             <option value="">Select Document</option>
//             {uploadedFiles.map((file, index) => (
//               <option 
//                 key={index} 
//                 value={file.name}
//                 className={extractedData.some(data => data.fileName === file.name) ? 'font-normal' : 'text-gray-500 italic'}
//               >
//                 {cleanFileName(file.name)} {!extractedData.some(data => data.fileName === file.name) ? '(Not Processed)' : ''}
//               </option>
//             ))}
//           </select>
          
//           <ChatButton 
//             onClick={chatWithDoc}
//             isLoading={isLoading}
//             disabled={!selectedDoc}
//           />
//         </div>
//       </div>
      
//       <div className="overflow-x-auto border border-gray-200 rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 border-r border-gray-200">
//                 Agreement Name
//               </th>
//               {allKeys.map((key, index) => (
//                 <th 
//                   key={key} 
//                   className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 ${
//                     index < allKeys.length - 1 ? 'border-r border-gray-200' : ''
//                   }`}
//                 >
//                   {key}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {extractedData.map(({ fileName, response }, index) => (
//               <tr 
//                 key={index}
//                 className={index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
//                   {cleanFileName(fileName)}
//                 </td>
//                 {allKeys.map((key, colIndex) => (
//                   <td 
//                     key={key} 
//                     className={`px-6 py-4 text-sm text-gray-900 ${
//                       colIndex < allKeys.length - 1 ? 'border-r border-gray-200' : ''
//                     }`}
//                   >
//                     {formatValue(response?.[key], key)}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between mt-8">
//         <button
//           onClick={onBack}
//           className="flex items-center px-6 py-2 text-lg border-2 border-gray-300 text-gray-600 rounded-lg bg-gray-200 hover:bg-gray-300 hover:border-gray-400 transition-colors"
//           >
//             <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
//             Back
//           </button>
//         <button
//           onClick={exportData}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg"
//         >
//           Export Data (CSV)
//         </button>
//       </div>

//       <FloatingChatBot 
//         documentName={selectedDoc}
//         onClose={handleChatClose}
//         isOpen={showChat}
//       />
//     </div>
//   );
// };

// export default DataView;









import React, { useState } from 'react';
import { ChevronRight, MessageCircle, Loader2 } from 'lucide-react';
import FloatingChatBot from './FloatingChatBot';

const ChatButton = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed min-w-[140px] justify-center transition-all duration-200"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <MessageCircle className="w-4 h-4" />
          <span>Chat with Doc</span>
        </>
      )}
    </button>
  );
};

const DataView = ({ extractedData = [], onBack, onDocumentSelect, uploadedFiles = [], onChatOpen, onChatClose }) => {
  const [selectedDoc, setSelectedDoc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const formatValue = (value, key) => {
    if (!value) return '';
    
    // Check if the field likely contains an address
    const addressFields = ['address', 'location', 'premises', 'property', 'site'];
    const isAddressField = addressFields.some(field => key.toLowerCase().includes(field));
    
    if (Array.isArray(value)) {
      const formattedValue = value.map((item, index) => 
        index === value.length - 1 ? item : item + ','
      ).join('\n');
      
      return isAddressField ? 
        <div className="max-h-[4.5em] overflow-hidden text-ellipsis" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
          {formattedValue}
        </div> :
        formattedValue;
    }
    
    const items = String(value).split(/[,;]\s*/);
    const formattedValue = items.map((item, index) => 
      index === items.length - 1 ? item.trim() : item.trim() + ','
    ).join('\n');
    
    return isAddressField ? 
      <div className="max-h-[4.5em] overflow-hidden text-ellipsis" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
        {formattedValue}
      </div> :
      formattedValue;
  };

  const cleanFileName = (fileName) => {
    return fileName ? fileName.replace(/\.[^/.]+$/, '') : '';
  };

  const handleDocSelect = (value) => {
    setSelectedDoc(value);
    if (showChat) {
      handleChatClose();
    }
    if (onDocumentSelect) {
      onDocumentSelect(value);
    }
  };

  const handleChatClose = () => {
    setShowChat(false);
    onChatClose?.();
  };

  const chatWithDoc = async () => {
    if (!selectedDoc) {
      alert('Please select a document first');
      return;
    }

    const selectedFile = uploadedFiles.find(file => file.name === selectedDoc);
    if (!selectedFile) {
      alert('File not found in uploaded files');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('files', selectedFile);

      const response = await fetch('https://legal-ai-backend-draft-drh9bmergvh7a4a9.southeastasia-01.azurewebsites.net/legal/process-document/', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to process document');
      }

      const data = await response.json();
      if (data.status === 'success') {
        handleChatClose();
        setTimeout(() => {
          setShowChat(true);
          onChatOpen?.();
        }, 100);
      }
    } catch (error) {
      console.error('Error processing document:', error);
      alert('Failed to process document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    try {
      if (!extractedData || !Array.isArray(extractedData) || extractedData.length === 0) {
        console.warn('No data to export');
        return;
      }

      const allKeys = ['agreementName', ...new Set(extractedData.flatMap(data => 
        data && data.response ? Object.keys(data.response) : []
      ))];
      
      const rows = [
        allKeys.join(','),
        ...extractedData.map(({ fileName, response }) => {
          const rowData = [
            `"${cleanFileName(fileName)}"`,
            ...allKeys.slice(1).map(key => {
              const value = response?.[key];
              return `"${value ? String(value).replace(/"/g, '""') : ''}"`;
            })
          ];
          return rowData.join(',');
        })
      ];
      
      const csvContent = 'data:text/csv;charset=utf-8,' + rows.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'extracted_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  if (!Array.isArray(extractedData) || extractedData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
        <p className="text-gray-600">No data available.</p>
        <div className="mt-8">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-2 text-lg border-2 border-gray-300 text-gray-600 rounded-lg bg-gray-200 hover:bg-gray-300 hover:border-gray-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Back
          </button>
        </div>
      </div>
    );
  }

  const allKeys = [...new Set(extractedData.flatMap(data => 
    data && data.response ? Object.keys(data.response) : []
  ))];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Extracted Data</h2>
        <div className="flex items-center gap-3">
          {/* <select 
            className="min-w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleDocSelect(e.target.value)}
            value={selectedDoc}
          >
            <option value="">Select Document</option>
            {uploadedFiles.map((file, index) => (
              <option 
                key={index} 
                value={file.name}
                className={extractedData.some(data => data.fileName === file.name) ? 'font-normal' : 'text-gray-500 italic'}
              >
                {cleanFileName(file.name)} {!extractedData.some(data => data.fileName === file.name) ? '(Not Processed)' : ''}
              </option>
            ))}
          </select> */}

<select
  className="min-w-48 max-w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  onChange={(e) => handleDocSelect(e.target.value)}
  value={selectedDoc}
>
  <option value="">Select Document</option>
  {uploadedFiles.map((file, index) => (
    <option
      key={index}
      value={file.name}
      className="truncate max-w-[200px]" // Add truncate for ellipsis
      title={cleanFileName(file.name)} // Tooltip for the full name
    >
      {cleanFileName(file.name)}
    </option>
  ))}
</select>


          
          <ChatButton 
            onClick={chatWithDoc}
            isLoading={isLoading}
            disabled={!selectedDoc}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 border-r border-gray-200">
                Agreement Name
              </th>
              {allKeys.map((key, index) => (
                <th 
                  key={key} 
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 ${
                    index < allKeys.length - 1 ? 'border-r border-gray-200' : ''
                  }`}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {extractedData.map(({ fileName, response }, index) => (
              <tr 
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}
              >
                <td
                  className="px-6 py-4 whitespace-normal break-words text-sm font-medium text-gray-900 border-r border-gray-200"
                >
                  <div className="max-w-[200px] break-words">
                    {cleanFileName(fileName)}
                  </div>
                </td>

                {allKeys.map((key, colIndex) => (
                  <td 
                    key={key} 
                    className={`px-6 py-4 text-sm text-gray-900 ${
                      colIndex < allKeys.length - 1 ? 'border-r border-gray-200' : ''
                    }`}
                  >
                    {formatValue(response?.[key], key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-2 text-lg border-2 border-gray-300 text-gray-600 rounded-lg bg-gray-200 hover:bg-gray-300 hover:border-gray-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
            Back
          </button>
        <button
          onClick={exportData}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg"
        >
          Export Data (CSV)
        </button>
      </div>

      <FloatingChatBot 
        documentName={selectedDoc}
        onClose={handleChatClose}
        isOpen={showChat}
      />
    </div>
  );
};

export default DataView;