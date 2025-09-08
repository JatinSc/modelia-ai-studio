import React from "react";
import { Type, Palette, Eye } from "lucide-react";

interface PromptAndStyleProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  preview: string | null;
}

const styles = [
  {
    value: "Editorial",
    label: "Editorial",
    description: "Clean",
  },
  {
    value: "Streetwear",
    label: "Streetwear",
    description: "Urban",
  },
  {
    value: "Vintage",
    label: "Vintage",
    description: "Classic",
  },
];

const PromptAndStyle: React.FC<PromptAndStyleProps> = ({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  preview,
}) => {
return (
  <div
    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    role="region"
    aria-labelledby="prompt-style-title"
  >
    {/* Header */}
    <div className="flex items-center gap-5 mb-6">
      <div className="p-2 bg-indigo-100 rounded-lg">
        <Type className="h-5 w-5 text-indigo-600" />
      </div>
      <div>
        <h2
          id="prompt-style-title"
          className="text-lg font-semibold text-gray-900"
        >
          Prompt & Style
        </h2>
        <p className="text-sm text-gray-600">
          Describe your vision and choose a style
        </p>
      </div>
    </div>

    {/* Prompt Input */}
    <div className="flex flex-row gap-5">
      <div className="w-[100%]">
        <label
          htmlFor="prompt"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Prompt
        </label>
        <div className="relative">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the transformation you want to apply..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
            maxLength={500}
            aria-describedby="prompt-counter"
          />
          <div
            id="prompt-counter"
            className="absolute bottom-3 right-3 text-xs text-gray-400"
            aria-live="polite"
          >
            {prompt.length}/500
          </div>
        </div>
      </div>
    </div>

    {/* Style Selection */}
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Style
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {styles.map((style) => (
          <div
            key={style.value}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
              selectedStyle === style.value
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedStyle(style.value)}
            role="radio"
            aria-checked={selectedStyle === style.value}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedStyle(style.value);
              }
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                      selectedStyle === style.value
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedStyle === style.value && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <h3
                    className={`font-medium ${
                      selectedStyle === style.value
                        ? "text-indigo-900"
                        : "text-gray-900"
                    }`}
                  >
                    {style.label}
                  </h3>
                </div>
                <div className="flex flex-row justify-start items-center gap-2">
                  <Palette
                    className={`h-4 w-4 ${
                      selectedStyle === style.value
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`text-sm mt-1 ${
                      selectedStyle === style.value
                        ? "text-indigo-700"
                        : "text-gray-500"
                    }`}
                  >
                    {style.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Live Preview Summary */}
    {(prompt.trim() || preview) && (
      <div
        className="bg-gray-50 rounded-lg p-4 mt-7"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2 mb-3">
          <Eye className="h-4 w-4 text-gray-600" />
          <h4 className="font-medium text-gray-900">Live Summary</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-gray-500">Image:</span>
            <span className={preview ? "text-green-600" : "text-gray-400"}>
              {preview ? "Uploaded ✓" : "Not uploaded"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-500">Style:</span>
            <span className="text-gray-900">{selectedStyle}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-gray-500">Prompt:</span>
            <span className={prompt.trim() ? "text-gray-900" : "text-gray-400"}>
              {prompt.trim() || "No prompt entered"}
            </span>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default PromptAndStyle;

// import React from 'react';
// import { Type, Palette, Eye } from 'lucide-react';

// interface PromptAndStyleProps {
//   prompt: string;
//   setPrompt: (prompt: string) => void;
//   selectedStyle: string;
//   setSelectedStyle: (style: string) => void;
//   uploadedImage: string | null;
// }

// const styles = [
//   { value: 'Editorial', label: 'Editorial', description: 'Clean, professional magazine-style' },
//   { value: 'Streetwear', label: 'Streetwear', description: 'Urban, casual, contemporary' },
//   { value: 'Vintage', label: 'Vintage', description: 'Classic, retro, timeless' },
// ];

// const PromptAndStyle: React.FC<PromptAndStyleProps> = ({
//   prompt,
//   setPrompt,
//   selectedStyle,
//   setSelectedStyle,
//   uploadedImage,
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-2 bg-indigo-100 rounded-lg">
//           <Type className="h-5 w-5 text-indigo-600" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">Prompt & Style</h2>
//           <p className="text-sm text-gray-600">Describe your vision and choose a style</p>
//         </div>
//       </div>

//       <div className="space-y-6">
//         {/* Prompt Input */}
//         <div>
//           <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
//             Prompt
//           </label>
//           <div className="relative">
//             <textarea
//               id="prompt"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Describe the transformation you want to apply to your image..."
//               rows={4}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
//             />
//             <div className="absolute bottom-3 right-3 text-xs text-gray-400">
//               {prompt.length}/500
//             </div>
//           </div>
//         </div>

//         {/* Style Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Style
//           </label>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//             {styles.map((style) => (
//               <div
//                 key={style.value}
//                 className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
//                   selectedStyle === style.value
//                     ? 'border-indigo-500 bg-indigo-50'
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//                 onClick={() => setSelectedStyle(style.value)}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <Palette className={`h-4 w-4 ${
//                         selectedStyle === style.value ? 'text-indigo-600' : 'text-gray-400'
//                       }`} />
//                       <h3 className={`font-medium ${
//                         selectedStyle === style.value ? 'text-indigo-900' : 'text-gray-900'
//                       }`}>
//                         {style.label}
//                       </h3>
//                     </div>
//                     <p className={`text-sm mt-1 ${
//                       selectedStyle === style.value ? 'text-indigo-700' : 'text-gray-500'
//                     }`}>
//                       {style.description}
//                     </p>
//                   </div>
//                   <div className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
//                     selectedStyle === style.value
//                       ? 'border-indigo-500 bg-indigo-500'
//                       : 'border-gray-300'
//                   }`}>
//                     {selectedStyle === style.value && (
//                       <div className="w-full h-full rounded-full bg-white scale-50"></div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Live Preview Summary */}
//         {(prompt.trim() || uploadedImage) && (
//           <div className="bg-gray-50 rounded-lg p-4">
//             <div className="flex items-center gap-2 mb-3">
//               <Eye className="h-4 w-4 text-gray-600" />
//               <h4 className="font-medium text-gray-900">Preview Summary</h4>
//             </div>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-start gap-2">
//                 <span className="text-gray-500 min-w-0 flex-shrink-0">Image:</span>
//                 <span className={uploadedImage ? 'text-green-600' : 'text-gray-400'}>
//                   {uploadedImage ? 'Uploaded ✓' : 'Not uploaded'}
//                 </span>
//               </div>
//               <div className="flex items-start gap-2">
//                 <span className="text-gray-500 min-w-0 flex-shrink-0">Style:</span>
//                 <span className="text-gray-900">{selectedStyle}</span>
//               </div>
//               <div className="flex items-start gap-2">
//                 <span className="text-gray-500 min-w-0 flex-shrink-0">Prompt:</span>
//                 <span className={prompt.trim() ? 'text-gray-900' : 'text-gray-400'}>
//                   {prompt.trim() || 'No prompt entered'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PromptAndStyle;
