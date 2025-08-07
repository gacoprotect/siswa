import React, { forwardRef } from 'react';
import { Upload, Trash2, AlertCircle } from 'lucide-react';

interface InputFileProps {
  name: string;
  label: string;
  preview?: string;
  showError?: boolean;
  errorMessage?: string;
  processing?: boolean;
  required?: boolean;
  handleRemoveImage: (name: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  className?: string;
}

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  (
    {
      name,
      label,
      preview,
      showError = false,
      errorMessage = '',
      processing = false,
      required = false,
      handleRemoveImage,
      handleFileChange,
      className = ''
    },
    ref
  ) => {
    const handleClick = () => {
      if (!processing && typeof ref !== 'function' && ref?.current) {
        ref.current.click();
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(e, name);
    };

    const handleRemove = () => {
      handleRemoveImage(name);
      if (typeof ref !== 'function' && ref?.current) {
        ref.current.value = '';
      }
    };

    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && '*'}
        </label>

        <div className="flex flex-col space-y-2">
          {preview ? (
            <div className="relative group">
              <img
                src={preview}
                alt={`Preview ${label}`}
                className="max-w-full h-auto max-h-64 rounded border border-gray-200"
              />
              <div className="absolute inset-0 bg-black/50 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  onClick={handleRemove}
                  disabled={processing}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={handleClick}
                className={`flex flex-col items-center justify-center px-4 py-8 bg-white rounded-md border-2 border-dashed ${
                  showError ? 'border-red-300' : 'border-gray-300'
                } cursor-pointer hover:bg-gray-50 transition-colors`}
                aria-invalid={showError}
              >
                <Upload className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-sm font-medium text-gray-700">
                  Upload {label}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  Format: JPG/PNG, maksimal 2MB
                </span>
              </div>
              <input
                ref={ref}
                id={name}
                name={name}
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                onChange={handleChange}
                disabled={processing}
                // Don't use native required attribute
              />
            </>
          )}

          {showError && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-2">
              <AlertCircle className="text-red-500 w-5 h-5" />
              <span>{errorMessage}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
);

InputFile.displayName = 'InputFile';

export default InputFile;