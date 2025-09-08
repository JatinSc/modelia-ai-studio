import React from "react";
import { History, RotateCcw, Calendar, Palette } from "lucide-react";
import type { GenerateResponse } from "../utils/mockApi";

interface HistorySectionProps {
  history: GenerateResponse[];
  onRestore: (generation: GenerateResponse) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onRestore,
}) => {
const formatTimestamp = (iso: string) => {
  const date = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // difference in ms

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  // fallback to a readable date for older entries
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};


  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <History className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">History</h2>
          <p className="text-sm text-gray-600">Your recent generations</p>
        </div>
      </div>
      <div className="max-h-[58.2vh] overflow-x-hidden">
        {history.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No generations yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Your generated images will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((gen) => (
              <div
                key={gen.id}
                className="group relative bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={gen.imageUrl}
                    alt="Generated"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <button
                      onClick={() => onRestore(gen)}
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 shadow-lg transition-all duration-200 hover:bg-gray-50"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Restore
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <p className="text-sm text-gray-900 line-clamp-2 mb-2">
                    {gen.prompt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Palette className="h-3 w-3" />
                      <span>{gen.style}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatTimestamp(gen.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;

// import React from 'react';
// import { History, RotateCcw, Calendar, Palette } from 'lucide-react';

// interface Generation {
//   id: string;
//   imageUrl: string;
//   prompt: string;
//   style: string;
//   timestamp: Date;
// }

// interface HistorySectionProps {
//   history: Generation[];
//   onRestore: (generation: Generation) => void;
// }

// const HistorySection: React.FC<HistorySectionProps> = ({ history, onRestore }) => {
//   const formatTimestamp = (date: Date) => {
//     const now = new Date();
//     const diff = now.getTime() - date.getTime();
//     const hours = diff / (1000 * 60 * 60);

//     if (hours < 1) {
//       return 'Just now';
//     } else if (hours < 24) {
//       return `${Math.floor(hours)}h ago`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-2 bg-indigo-100 rounded-lg">
//           <History className="h-5 w-5 text-indigo-600" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">History</h2>
//           <p className="text-sm text-gray-600">Your recent generations</p>
//         </div>
//       </div>

//       {history.length === 0 ? (
//         <div className="text-center py-8">
//           <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <History className="h-6 w-6 text-gray-400" />
//           </div>
//           <p className="text-sm text-gray-500">No generations yet</p>
//           <p className="text-xs text-gray-400 mt-1">Your generated images will appear here</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {history.map((generation) => (
//             <div
//               key={generation.id}
//               className="group relative bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors duration-200"
//             >
//               <div className="aspect-video relative overflow-hidden">
//                 <img
//                   src={generation.imageUrl}
//                   alt="Generated"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
//                   <button
//                     onClick={() => onRestore(generation)}
//                     className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 shadow-lg transition-all duration-200 hover:bg-gray-50"
//                   >
//                     <RotateCcw className="h-3 w-3" />
//                     Restore
//                   </button>
//                 </div>
//               </div>

//               <div className="p-3">
//                 <p className="text-sm text-gray-900 line-clamp-2 mb-2">
//                   {generation.prompt}
//                 </p>

//                 <div className="flex items-center justify-between text-xs text-gray-500">
//                   <div className="flex items-center gap-1">
//                     <Palette className="h-3 w-3" />
//                     <span>{generation.style}</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Calendar className="h-3 w-3" />
//                     <span>{formatTimestamp(generation.timestamp)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistorySection;
