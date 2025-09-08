import React, { useState, useCallback, useRef } from "react";
import { Upload, X, Image as ImageIcon, AlertCircle } from "lucide-react";

interface UploadImageProps {
  onImageUpload: (imageUrl: string | null) => void;
  onError: (error: string) => void;
  uploadedImage: string | null;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onImageUpload,
  onError,
  uploadedImage,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);
  const validateFile = (file: File): string | null => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      return "Please upload a valid image file (JPG, JPEG, or PNG)";
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleFile = useCallback(
    async (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setLocalError(validationError);
        onError(validationError);
        return;
      }

      setIsUploading(true);
      setLocalError(null);

      try {
        const imageUrl = URL.createObjectURL(file);
        onImageUpload(imageUrl);
      } catch {
        const errorMsg = "Failed to upload image";
        setLocalError(errorMsg);
        onError(errorMsg);
      } finally {
        setIsUploading(false);
      }
    },
    [onImageUpload, onError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) handleFile(files[0]);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) handleFile(files[0]);
    },
    [handleFile]
  );

  const removeImage = () => {
    if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    onImageUpload(null);
    setLocalError(null);
  };

return (
  <div
    className="max-h-[30vh] bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[100%]"
    role="region"
    aria-labelledby="upload-title"
  >
    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-indigo-100 rounded-lg">
        <ImageIcon className="h-5 w-5 text-indigo-600" />
      </div>
      <div>
        <h2 id="upload-title" className="text-lg font-semibold text-gray-900">
          Upload Image
        </h2>
        <p className="text-sm text-gray-600">
          Upload your image to get started
        </p>
      </div>
    </div>

    {/* Upload Area */}
    {!uploadedImage ? (
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? "border-indigo-400 bg-indigo-50"
            : localError
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        role="button"
        tabIndex={0}
        aria-label="Upload image area. Click or drag and drop an image."
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <div className="space-y-4">
          <div
            className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
              localError ? "bg-red-100" : "bg-gray-100"
            }`}
          >
            {localError ? (
              <AlertCircle className="h-6 w-6 text-red-600" />
            ) : (
              <Upload
                className={`h-6 w-6 ${
                  isDragging ? "text-indigo-600" : "text-gray-400"
                }`}
              />
            )}
          </div>

          {isUploading ? (
            <div>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Uploading...</p>
            </div>
          ) : localError ? (
            <div>
              <p className="text-sm font-medium text-red-600">{localError}</p>
              <p className="text-xs text-gray-500 mt-1">
                Please try again with a valid image
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-gray-900">
                {isDragging
                  ? "Drop image here"
                  : "Drop image here or click to browse"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports JPG, JPEG, PNG up to 10MB
              </p>
            </div>
          )}
        </div>
      </div>
    ) : (
      // Preview image
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <img
            src={uploadedImage}
            alt="Uploaded preview"
            className="w-full h-64 object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-3 right-3 p-1.5 bg-gray-800 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Remove uploaded image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="text-green-600 font-medium flex items-center gap-1">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Image uploaded successfully
          </span>
          <button
            onClick={removeImage}
            className="text-gray-500 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Remove
          </button>
        </div>
      </div>
    )}
  </div>
);

};

export default UploadImage;

// import React, { useState, useCallback } from 'react';
// import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

// interface UploadImageProps {
//   onImageUpload: (imageUrl: string) => void;
//   onError: (error: string) => void;
//   uploadedImage: string | null;
// }

// const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload, onError, uploadedImage }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [localError, setLocalError] = useState<string | null>(null);

//   const validateFile = (file: File): string | null => {
//     // Check file type
//     const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (!validTypes.includes(file.type)) {
//       return 'Please upload a valid image file (JPG, JPEG, or PNG)';
//     }

//     // Check file size (10MB = 10 * 1024 * 1024 bytes)
//     const maxSize = 10 * 1024 * 1024;
//     if (file.size > maxSize) {
//       return 'File size must be less than 10MB';
//     }

//     return null;
//   };

//   const handleFile = useCallback(async (file: File) => {
//     const validationError = validateFile(file);
//     if (validationError) {
//       setLocalError(validationError);
//       onError(validationError);
//       return;
//     }

//     setIsUploading(true);
//     setLocalError(null);

//     try {
//       // Create preview URL
//       const imageUrl = URL.createObjectURL(file);
//       onImageUpload(imageUrl);
//     } catch (err) {
//       const errorMsg = 'Failed to upload image';
//       setLocalError(errorMsg);
//       onError(errorMsg);
//     } finally {
//       setIsUploading(false);
//     }
//   }, [onImageUpload, onError]);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0) {
//       handleFile(files[0]);
//     }
//   }, [handleFile]);

//   const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       handleFile(files[0]);
//     }
//   }, [handleFile]);

//   const removeImage = () => {
//     onImageUpload('');
//     setLocalError(null);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="p-2 bg-indigo-100 rounded-lg">
//           <ImageIcon className="h-5 w-5 text-indigo-600" />
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">Upload Image</h2>
//           <p className="text-sm text-gray-600">Upload your image to get started</p>
//         </div>
//       </div>

//       {!uploadedImage ? (
//         <div
//           className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
//             isDragging
//               ? 'border-indigo-400 bg-indigo-50'
//               : localError
//               ? 'border-red-300 bg-red-50'
//               : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
//           }`}
//           onDrop={handleDrop}
//           onDragOver={(e) => {
//             e.preventDefault();
//             setIsDragging(true);
//           }}
//           onDragLeave={() => setIsDragging(false)}
//         >
//           <input
//             type="file"
//             accept="image/jpeg,image/jpg,image/png"
//             onChange={handleFileInput}
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             disabled={isUploading}
//           />

//           <div className="space-y-4">
//             <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
//               localError ? 'bg-red-100' : 'bg-gray-100'
//             }`}>
//               {localError ? (
//                 <AlertCircle className="h-6 w-6 text-red-600" />
//               ) : (
//                 <Upload className={`h-6 w-6 ${isDragging ? 'text-indigo-600' : 'text-gray-400'}`} />
//               )}
//             </div>

//             {isUploading ? (
//               <div>
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
//                 <p className="mt-2 text-sm text-gray-600">Uploading...</p>
//               </div>
//             ) : localError ? (
//               <div>
//                 <p className="text-sm font-medium text-red-600">{localError}</p>
//                 <p className="text-xs text-gray-500 mt-1">Please try again with a valid image</p>
//               </div>
//             ) : (
//               <div>
//                 <p className="text-sm font-medium text-gray-900">
//                   {isDragging ? 'Drop image here' : 'Drop image here or click to browse'}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Supports JPG, JPEG, PNG up to 10MB
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="relative">
//           <div className="relative rounded-lg overflow-hidden border border-gray-200">
//             <img
//               src={uploadedImage}
//               alt="Uploaded"
//               className="w-full h-64 object-cover"
//             />
//             <button
//               onClick={removeImage}
//               className="absolute top-3 right-3 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-sm"
//               aria-label="Remove image"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//           <div className="mt-3 flex items-center justify-between text-sm">
//             <span className="text-green-600 font-medium flex items-center gap-1">
//               <div className="w-2 h-2 bg-green-600 rounded-full"></div>
//               Image uploaded successfully
//             </span>
//             <button
//               onClick={removeImage}
//               className="text-gray-500 hover:text-red-600 transition-colors duration-200"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadImage;
