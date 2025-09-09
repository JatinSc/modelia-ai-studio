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
    const stored = localStorage.getItem("generatedImages");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("generatedImages", JSON.stringify(history));
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
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex flex-row justify-center items-center gap-5">
              <img className="w-[3rem] h-[3rem]" src="../src/assets/dress.png" alt="" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Studio</h1>
              <p className="text-gray-600 mt-1">
                Transform your images with AI-powered editing
              </p>
            </div>
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