// // components/TagInput.jsx
// import React, { useState } from 'react';
// import { ChevronRight } from 'lucide-react';

// const TagInput = ({ tags, setTags, onBack, onNext }) => {
//   const [newTag, setNewTag] = useState('');

//   const handleAddTag = (e) => {
//     e.preventDefault();
//     if (newTag && !tags.includes(newTag)) {
//       setTags([...tags, newTag]);
//       setNewTag('');
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter(tag => tag !== tagToRemove));
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Add Extraction Tags</h2>

//       <div className="flex flex-wrap gap-2 mb-4">
//         {tags.map((tag, index) => (
//           <div key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center text-lg">
//             <span>{tag}</span>
//             <button
//               onClick={() => removeTag(tag)}
//               className="ml-3 text-blue-800 hover:text-blue-900"
//               aria-label="Remove tag"
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="relative mb-8">
//         <input
//           type="text"
//           value={newTag}
//           onChange={(e) => setNewTag(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               handleAddTag(e);
//             }
//           }}
//           placeholder="Type a tag and press Enter"
//           className="w-full p-3 border-2 border-blue-600 rounded-lg text-gray-900 pr-20"
//         />
//         <button
//           onClick={handleAddTag}
//           className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gray-200 text-gray-700 rounded"
//         >
//           Add
//         </button>
//       </div>

//       <div className="flex justify-between mt-12">
//         <button
//           onClick={onBack}
//           className="text-gray-600 px-6 py-2 rounded hover:bg-gray-100 text-lg"
//         >
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 text-lg flex items-center"
//         >
//           Next <ChevronRight className="w-5 h-5 ml-1" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TagInput;










// // components/TagInput.jsx
// import React, { useState } from 'react';
// import { ChevronRight } from 'lucide-react';

// const TagInput = ({ tags, setTags, onBack, onNext }) => {
//   const [newTag, setNewTag] = useState('');
  
//   const suggestedTags = [
//     "agreement_date",
//     "parties_involved",
//     "address",
//     "organization_involved",
//     "important_dated",
//     "amount",
//     "partner_capital_contribution %",
//     "amount_contributed_for_all_partners"
//   ];

//   const handleAddTag = (e) => {
//     e.preventDefault();
//     if (newTag && !tags.includes(newTag)) {
//       setTags([...tags, newTag]);
//       setNewTag('');
//     }
//   };

//   const addSuggestedTag = (tag) => {
//     if (!tags.includes(tag)) {
//       setTags([...tags, tag]);
//     }
//   };

//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter(tag => tag !== tagToRemove));
//   };

//   return (
//     <div className="bg-white rounded-lg p-6 shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Add Extraction Tags</h2>



//       {/* Tag Input */}
//       <div className="relative mb-4">
//         <input
//           type="text"
//           value={newTag}
//           onChange={(e) => setNewTag(e.target.value)}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               handleAddTag(e);
//             }
//           }}
//           placeholder="Type a tag and press Enter"
//           className="w-full p-3 border-2 border-blue-600 rounded-lg text-gray-900 pr-20"
//         />
//         <button
//           onClick={handleAddTag}
//           className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gray-200 text-gray-700 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* Suggested Tags */}
//       <div className="mb-8">
//         <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Tags:</h3>
//         <div className="flex flex-wrap gap-2">
//           {suggestedTags.map((tag, index) => (
//             <button
//               key={index}
//               onClick={() => addSuggestedTag(tag)}
//               className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 text-sm"
//               disabled={tags.includes(tag)}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>
//       </div>
      
//             {/* Added Tags */}
//       <div className="flex flex-wrap gap-2 mb-4 items-center">
//         <h4 className="text-sm font-medium text-gray-700 mb-2">Added Tags:</h4>
//         {tags.map((tag, index) => (
//           <div key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center text-sm">
//             <span>{tag}</span>
//             <button
//               onClick={() => removeTag(tag)}
//               className="ml-3 text-blue-800 hover:text-blue-900"
//               aria-label="Remove tag"
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-between mt-8">
//         <button
//           onClick={onBack}
//           className="text-gray-600 hover:text-gray-800 text-lg"
//         >
//           Back
//         </button>
//         <button
//           onClick={onNext}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg flex items-center"
//         >
//           Next <ChevronRight className="w-5 h-5 ml-1" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TagInput;






import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const TagInput = ({ onBack, onNext }) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  
  const suggestedTags = [
    "agreement date",
    "parties involved",
    "address",
    "organization involved",
    "important dates",
    "amount",
    "partner capital contribution %",
    "amount contributed for all partners"
  ];

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setNewTag('');
      console.log('Current tags array:', updatedTags); // For debugging
    }
  };

  const addSuggestedTag = (tag) => {
    if (!tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      console.log('Current tags array after suggestion:', updatedTags); // For debugging
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    console.log('Current tags array after removal:', updatedTags); // For debugging
  };

  // Function to get all tags
  const getAllTags = () => {
    return tags;
  };

  // Modified onNext to include tags
  const handleNext = () => {
    const allTags = getAllTags();
    console.log('Final tags array:', allTags);
    onNext(allTags); // Pass tags to parent component
  };

  return (
    <div className="bg-[#FFF7ED] rounded-lg p-6 border border-gray-400 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Add Extraction Tags</h2>

      {/* Tag Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag(e);
            }
          }}
          placeholder="Type a tag and press Enter"
          className="w-full p-3 border-2 border-blue-600 rounded-lg text-gray-900 pr-20"
        />
        <button
          onClick={handleAddTag}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gray-200 text-gray-700 rounded"
        >
          Add
        </button>
      </div>

      {/* Suggested Tags */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestedTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => addSuggestedTag(tag)}
              className="px-3 py-1.5 bg-gray-100 border border-gray-500 text-gray-700 rounded-full hover:bg-gray-200 text-sm"
              disabled={tags.includes(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Added Tags */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Added Tags:</h4>
        {tags.map((tag, index) => (
          <div key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center text-sm">
            <span>{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="ml-3 text-blue-800 hover:text-blue-900"
              aria-label="Remove tag"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-2 text-lg border-2 border-gray-300 text-gray-600 rounded-lg bg-gray-200 hover:bg-gray-300 hover:border-gray-400 transition-colors"
        >
          <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg flex items-center"
        >
          Next <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;