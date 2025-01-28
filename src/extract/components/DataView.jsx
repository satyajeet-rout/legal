

// import React from 'react';
// import { ChevronRight } from 'lucide-react';

// const DataView = ({ extractedData, onBack }) => {
//   const formatArrayValue = (arr) => {
//     if (!Array.isArray(arr)) return '';
//     return arr.join('; ');
//   };

//   const cleanFileName = (fileName) => {
//     // Remove file extension
//     return fileName.replace(/\.[^/.]+$/, '');
//   };

//   const exportData = () => {
//     try {
//       // Get all possible keys from all responses
//       const allKeys = ['agreementName', ...new Set(extractedData.flatMap(data => Object.keys(data.response)))];
      
//       // Create CSV rows
//       const rows = [
//         // Header row
//         allKeys.join(','),
//         // Data rows
//         ...extractedData.map(({ fileName, response }) => {
//           const rowData = [
//             `"${cleanFileName(fileName)}"`,
//             ...allKeys.slice(1).map(key => {
//               const value = response[key];
//               return Array.isArray(value) ? `"${value.join('; ')}"` : '""';
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

//   // If no data, show a message
//   if (!extractedData || extractedData.length === 0) {
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

//   // Get all unique keys from all responses
//   const allKeys = [...new Set(extractedData.flatMap(data => Object.keys(data.response)))];

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Agreement Name
//               </th>
//               {allKeys.map((key) => (
//                 <th key={key} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   {key}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {extractedData.map(({ fileName, response }, index) => (
//               <tr key={index}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {cleanFileName(fileName)}
//                 </td>
//                 {allKeys.map((key) => (
//                   <td key={key} className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900">
//                     {formatArrayValue(response[key])}
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
//         >
//           <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
//           Back
//         </button>
//         <button
//           onClick={exportData}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg"
//         >
//           Export Data (CSV)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DataView;




// import React from 'react';
// import { ChevronRight } from 'lucide-react';

// const DataView = ({ extractedData, onBack }) => {
//   const formatArrayValue = (arr) => {
//     if (!Array.isArray(arr)) return '';
//     return arr.join('; ');
//   };

//   const cleanFileName = (fileName) => {
//     return fileName.replace(/\.[^/.]+$/, '');
//   };

//   const exportData = () => {
//     try {
//       const allKeys = ['agreementName', ...new Set(extractedData.flatMap(data => Object.keys(data.response)))];
      
//       const rows = [
//         allKeys.join(','),
//         ...extractedData.map(({ fileName, response }) => {
//           const rowData = [
//             `"${cleanFileName(fileName)}"`,
//             ...allKeys.slice(1).map(key => {
//               const value = response[key];
//               return Array.isArray(value) ? `"${value.join('; ')}"` : '""';
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

//   if (!extractedData || extractedData.length === 0) {
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

//   const allKeys = [...new Set(extractedData.flatMap(data => Object.keys(data.response)))];

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
      
//       <div className="overflow-x-auto border border-gray-200 rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                 Agreement Name
//               </th>
//               {allKeys.map((key) => (
//                 <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
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
//                     className={`px-6 py-4 whitespace-pre-wrap text-sm text-gray-900 ${
//                       colIndex < allKeys.length - 1 ? 'border-r border-gray-200' : ''
//                     }`}
//                   >
//                     {formatArrayValue(response[key])}
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
//         >
//           <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
//           Back
//         </button>
//         <button
//           onClick={exportData}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg"
//         >
//           Export Extracted Data (CSV)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DataView;




// import React from 'react';
// import { ChevronRight } from 'lucide-react';

// const DataView = ({ extractedData, onBack }) => {
//   const formatArrayValue = (arr) => {
//     if (!Array.isArray(arr)) return '';
//     return arr.join('; ');
//   };

//   const cleanFileName = (fileName) => {
//     return fileName.replace(/\.[^/.]+$/, '');
//   };

//   const exportData = () => {
//     try {
//       const allKeys = ['agreementName', ...new Set(extractedData.flatMap(data => Object.keys(data.response)))];
      
//       const rows = [
//         allKeys.join(','),
//         ...extractedData.map(({ fileName, response }) => {
//           const rowData = [
//             `"${cleanFileName(fileName)}"`,
//             ...allKeys.slice(1).map(key => {
//               const value = response[key];
//               return Array.isArray(value) ? `"${value.join('; ')}"` : '""';
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

//   if (!extractedData || extractedData.length === 0) {
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

//   const allKeys = [...new Set(extractedData.flatMap(data => Object.keys(data.response)))];

//   return (
//     <div className="bg-[#FFF7ED] rounded-lg p-6 border border-gray-500 shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
      
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
//                     className={`px-6 py-4 whitespace-pre-wrap text-sm text-gray-900 ${
//                       colIndex < allKeys.length - 1 ? 'border-r border-gray-200' : ''
//                     }`}
//                   >
//                     {formatArrayValue(response[key])}
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
//         >
//           <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
//           Back
//         </button>
//         <button
//           onClick={exportData}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg"
//         >
//           Export Extracted Data (CSV)
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DataView;













import React from 'react';
import { ChevronRight } from 'lucide-react';

const DataView = ({ extractedData, onBack }) => {
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return value.join('; ');
    }
    // If it's not an array, return the value as is
    return value || '';
  };

  const cleanFileName = (fileName) => {
    return fileName.replace(/\.[^/.]+$/, '');
  };

  const exportData = () => {
    try {
      const allKeys = ['agreementName', ...new Set(extractedData.flatMap(data => Object.keys(data.response)))];
      
      const rows = [
        allKeys.join(','),
        ...extractedData.map(({ fileName, response }) => {
          const rowData = [
            `"${cleanFileName(fileName)}"`,
            ...allKeys.slice(1).map(key => {
              const value = response[key];
              return `"${formatValue(value)}"`; // Use formatValue for both array and non-array values
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

  if (!extractedData || extractedData.length === 0) {
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

  const allKeys = [...new Set(extractedData.flatMap(data => Object.keys(data.response)))];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Extracted Data</h2>
      
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {cleanFileName(fileName)}
                </td>
                {allKeys.map((key, colIndex) => (
                  <td 
                    key={key} 
                    className={`px-6 py-4 whitespace-pre-wrap text-sm text-gray-900 ${
                      colIndex < allKeys.length - 1 ? 'border-r border-gray-200' : ''
                    }`}
                  >
                    {formatValue(response[key])}
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
    </div>
  );
};

export default DataView;