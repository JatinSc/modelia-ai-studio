import React, { useState, useRef, useEffect } from "react";
import { Loader2, Download, XCircle } from "lucide-react";
import { mockGenerate, type GenerateResponse } from "../utils/mockApi";

interface GenerateSectionProps {
  uploadedImage: string | null;
  prompt: string;
  style: string;
  addToHistory: (item: GenerateResponse) => void;
}

const GenerateSection: React.FC<GenerateSectionProps> = ({
  uploadedImage,
  prompt,
  style,
  addToHistory,
}) => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [showModal]);

  const handleGenerate = async () => {
    if (!uploadedImage || !prompt.trim()) return;

    setLoading(true);
    setError(null);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const maxAttempts = 3;
    let attempts = 0;
    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

    while (attempts < maxAttempts) {
      try {
        const result = await mockGenerate({
          imageDataUrl: uploadedImage,
          prompt,
          style,
          signal: controller.signal,
        });
        setGenerated(result);
        addToHistory(result);
        setShowModal(true);
        break; // success
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("Generation aborted by user");
            break;
          }
          attempts++;
          if (attempts < maxAttempts) {
            const delay = 2 ** attempts * 500;
            console.log(`Retrying in ${delay}ms (attempt ${attempts})`);
            await wait(delay);
          } else {
            console.error("Generation failed:", err.message);
            setError("Generation failed. Please try again.");
          }
        }
      }
    }

    setLoading(false);
    abortControllerRef.current = null;
  };

  const handleAbort = () => {
    abortControllerRef.current?.abort();
    setLoading(false);
  };

  const handleDownload = () => {
    if (!generated) return;
    const link = document.createElement("a");
    link.href = generated.imageUrl;
    link.download = "ai-generation.png";
    link.click();
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        role="region"
        aria-labelledby="generate-section-title"
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            id="generate-section-title"
            className="text-lg font-semibold text-gray-900"
          >
            Generate
          </h2>
          {error && (
            <p
              data-testid="error-message"
              className="text-red-600 mt-3 font-medium"
            >
              {error}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            disabled={!uploadedImage || !prompt.trim() || loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-disabled={!uploadedImage || !prompt.trim() || loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Generating..." : "Generate Image"}
          </button>

          {loading && (
            <button
              onClick={handleAbort}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <XCircle className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && generated && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="generated-image-title"
          aria-describedby="generated-image-desc"
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Close generated image modal"
            >
              <XCircle className="h-6 w-6" />
            </button>

            <h3
              id="generated-image-title"
              className="text-lg font-semibold mb-4 text-gray-900"
            >
              Generated Image
            </h3>

            <div className="rounded-lg overflow-hidden border mb-4">
              <img
                src={generated.imageUrl}
                alt={`Generated image for prompt: ${generated.prompt}`}
                className="w-full h-64 object-cover"
                id="generated-image-desc"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateSection;

// import React from 'react';
// import { Zap, Square, AlertCircle, CheckCircle2, Download } from 'lucide-react';

// interface GenerateSectionProps {
//   onGenerate: () => void;
//   onAbort: () => void;
//   isGenerating: boolean;
//   generatedImage: string | null;
//   prompt: string;
//   style: string;
//   error: string | null;
// }

// const GenerateSection: React.FC<GenerateSectionProps> = ({
//   onGenerate,
//   onAbort,
//   isGenerating,
//   generatedImage,
//   prompt,
//   style,
//   error,
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="p-2 bg-indigo-100 rounded-lg">
//           <Zap className="h-5 w-5 text-indigo-600" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">Generate</h2>
//           <p className="text-sm text-gray-600">Transform your image with AI</p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="space-y-4">
//         {!isGenerating ? (
//           <button
//             onClick={onGenerate}
//             disabled={!prompt.trim()}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//           >
//             <Zap className="h-5 w-5" />
//             Generate Image
//           </button>
//         ) : (
//           <button
//             onClick={onAbort}
//             className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//           >
//             <Square className="h-4 w-4" />
//             Abort Generation
//           </button>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
//             <div>
//               <p className="text-sm font-medium text-red-800">Generation Failed</p>
//               <p className="text-sm text-red-700 mt-1">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Loading State */}
//         {isGenerating && (
//           <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//             <div>
//               <p className="text-sm font-medium text-blue-800">Generating your image...</p>
//               <p className="text-sm text-blue-700 mt-1">This may take a few moments</p>
//             </div>
//           </div>
//         )}

//         {/* Generated Image */}
//         {generatedImage && !isGenerating && (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
//               <CheckCircle2 className="h-5 w-5 text-green-600" />
//               <div>
//                 <p className="text-sm font-medium text-green-800">Generation Complete!</p>
//                 <p className="text-sm text-green-700 mt-1">Your image has been successfully generated</p>
//               </div>
//             </div>

//             <div className="border border-gray-200 rounded-lg overflow-hidden">
//               <img
//                 src={generatedImage}
//                 alt="Generated result"
//                 className="w-full h-80 object-cover"
//               />
//               <div className="p-4 bg-gray-50 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <div className="space-y-1">
//                     <p className="text-sm font-medium text-gray-900">Generation Details</p>
//                     <div className="space-y-1 text-xs text-gray-600">
//                       <p><span className="font-medium">Prompt:</span> {prompt}</p>
//                       <p><span className="font-medium">Style:</span> {style}</p>
//                       <p><span className="font-medium">Created:</span> {new Date().toLocaleString()}</p>
//                     </div>
//                   </div>
//                   <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-white rounded-lg transition-colors duration-200">
//                     <Download className="h-4 w-4" />
//                     Download
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GenerateSection;
