import React, { useState, useEffect } from "react";
import UploadImage from "./components/UploadImage";
import PromptAndStyle from "./components/PromptAndStyle";
import GenerateSection from "./components/GenerateSection";
import HistorySection from "./components/HistorySection";

import type { GenerateResponse } from "./utils/mockApi";

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Editorial");

  const [history, setHistory] = useState<GenerateResponse[]>(() => {
    const stored = localStorage.getItem("generationHistory");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("generationHistory", JSON.stringify(history));
  }, [history]);

  const addToHistory = (item: GenerateResponse) => {
    setHistory((prev) => [item, ...prev].slice(0, 5)); // last 5 only
  };

  const restoreFromHistory = (item: GenerateResponse) => {
    setUploadedImage(item.imageUrl);
    setPrompt(item.prompt);
    setStyle(item.style);
  };
return (
  <div className="min-h-screen bg-gray-50">
    {/* Skip link for keyboard users */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-indigo-600 text-white px-2 py-1 rounded z-50"
    >
      Skip to main content
    </a>

    {/* Header */}
    <header
      className="bg-white border-b border-gray-200"
      role="banner"
      aria-label="Site header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Studio</h1>
            <p className="text-gray-600 mt-1">
              Transform your images with AI-powered editing
            </p>
          </div>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main
      id="main-content"
      className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      role="main"
      aria-label="AI Studio main content"
    >
      <div className="w-full flex flex-row">
        {/* Left Column */}
        <div className="w-full flex flex-row gap-5">
          {/* Upload + Prompt/Style side by side */}
          <div className="w-3/4 flex lg:flex-row gap-6">
            <div className="min-w-[32%] max-h-[60vh] flex flex-col gap-2">
              <UploadImage
                onImageUpload={setUploadedImage}
                onError={(err) => console.error(err)}
                uploadedImage={uploadedImage}
                aria-label="Upload image section"
              />
              <GenerateSection
                uploadedImage={uploadedImage}
                prompt={prompt}
                style={style}
                addToHistory={addToHistory}
              />
            </div>
            <div className="min-w-[65%] min-h-[70vh]">
              <PromptAndStyle
                prompt={prompt}
                setPrompt={setPrompt}
                selectedStyle={style}
                setSelectedStyle={setStyle}
                preview={uploadedImage}
                aria-label="Prompt and style selection section"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/4">
            <HistorySection
              history={history}
              onRestore={restoreFromHistory}
              aria-label="Generation history section"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
);

};

export default App;

// import React, { useState } from 'react';
// import UploadImage from './components/UploadImage';
// import PromptAndStyle from './components/PromptAndStyle';
// import GenerateSection from './components/GenerateSection';
// import HistorySection from './components/HistorySection';

// interface Generation {
//   id: string;
//   imageUrl: string;
//   prompt: string;
//   style: string;
//   timestamp: Date;
// }

// function App() {
//   const [uploadedImage, setUploadedImage] = useState<string | null>(null);
//   const [prompt, setPrompt] = useState('');
//   const [selectedStyle, setSelectedStyle] = useState('Editorial');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedImage, setGeneratedImage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [history, setHistory] = useState<Generation[]>([]);

//   const handleImageUpload = (imageUrl: string) => {
//     setUploadedImage(imageUrl);
//     setError(null);
//   };

//   const handleUploadError = (errorMessage: string) => {
//     setError(errorMessage);
//   };

//   const handleGenerate = async () => {
//     if (!uploadedImage || !prompt.trim()) {
//       setError('Please upload an image and enter a prompt');
//       return;
//     }

//     setIsGenerating(true);
//     setError(null);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 3000));

//       // Mock generated image
//       const mockGeneratedImage = 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop';
//       setGeneratedImage(mockGeneratedImage);

//       // Add to history
//       const newGeneration: Generation = {
//         id: Date.now().toString(),
//         imageUrl: mockGeneratedImage,
//         prompt,
//         style: selectedStyle,
//         timestamp: new Date()
//       };
//       setHistory(prev => [newGeneration, ...prev]);
//     } catch (err) {
//       setError('Failed to generate image. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleAbort = () => {
//     setIsGenerating(false);
//   };

//   const handleRestore = (generation: Generation) => {
//     setPrompt(generation.prompt);
//     setSelectedStyle(generation.style);
//     setGeneratedImage(generation.imageUrl);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">AI Studio</h1>
//               <p className="text-gray-600 mt-1">Transform your images with AI-powered editing</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="xl:col-span-2 space-y-6">
//             {/* Upload Section */}
//             <UploadImage
//               onImageUpload={handleImageUpload}
//               onError={handleUploadError}
//               uploadedImage={uploadedImage}
//             />

//             {/* Prompt and Style Section */}
//             <PromptAndStyle
//               prompt={prompt}
//               setPrompt={setPrompt}
//               selectedStyle={selectedStyle}
//               setSelectedStyle={setSelectedStyle}
//               uploadedImage={uploadedImage}
//             />

//             {/* Generate Section */}
//             <GenerateSection
//               onGenerate={handleGenerate}
//               onAbort={handleAbort}
//               isGenerating={isGenerating}
//               generatedImage={generatedImage}
//               prompt={prompt}
//               style={selectedStyle}
//               error={error}
//             />
//           </div>

//           {/* Right Column - History */}
//           <div className="xl:col-span-1">
//             <HistorySection
//               history={history}
//               onRestore={handleRestore}
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;
