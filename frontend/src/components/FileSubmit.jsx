import React, { useState, useRef } from 'react';
import { Label, FileInput, Alert, Button, Card } from 'flowbite-react';
import { HiCloudUpload, HiX, HiExternalLink } from 'react-icons/hi';
import axios from '../../api/axios';
export default function FileSubmit() {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Tipo di file non valido. Solo PNG, PDF o JPG sono permessi.';
    }

    if (file.size > maxSize) {
      return 'File troppo grande. Massimo 5MB.';
    }

    return null;
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('api/transaction/upload', formData);
      
      
      const result = response.data;
      
      if (result.success) {
        return { success: true, url: result.fileUrl, fileName: file.name };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      console.error('Upload error:', error);
      
     
      if (error.response && error.response.data) {
        return { success: false, error: error.response.data.message || 'Errore del server' };
      }
      
      return { success: false, error: 'Errore di rete durante il caricamento' };
    }
  };
  const handleFiles = async (files) => {
    setError('');
    setUploading(true);

    const fileArray = Array.from(files);
    const results = [];

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        results.push({ fileName: file.name, success: false, error: validationError });
        continue;
      }

      const result = await uploadFile(file);
      results.push({ fileName: file.name, ...result });
    }

    const successfulUploads = results.filter(r => r.success);
    const failedUploads = results.filter(r => !r.success);

    setUploadedFiles(prev => [...prev, ...successfulUploads]);

    if (failedUploads.length > 0) {
      setError(`${failedUploads.length} file(s) non caricati: ${failedUploads.map(f => f.fileName).join(', ')}`);
    }

    setUploading(false);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return '📄';
    if (['jpg', 'jpeg', 'png'].includes(ext)) return '🖼️';
    return '📁';
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-center space-y-4'>
      <div className="w-full">
        <Label
          htmlFor='dropzone-file'
          className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className='flex flex-col items-center justify-center pb-6 pt-5'>
            {uploading ? (
              <div className='flex flex-col items-center'>
                <div className='mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600'></div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Caricamento in corso...
                </p>
              </div>
            ) : (
              <>
                <HiCloudUpload className='mb-4 h-8 w-8 text-gray-500 dark:text-gray-400' />
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Clicca per caricare</span> o
                  trascina e rilascia
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  PNG, PDF o JPG (Max 10MB)
                </p>
              </>
            )}
          </div>
          <FileInput
            id='dropzone-file'
            className='hidden'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='.png,.jpg,.jpeg,.pdf'
            multiple
          />
        </Label>
      </div>

      {error && (
        <Alert color="failure" className="w-full">
          <span className="font-medium">Errore!</span> {error}
        </Alert>
      )}

      {uploadedFiles.length > 0 && (
        <div className='w-full space-y-4'>
          <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
            File caricati ({uploadedFiles.length})
          </h3>
          <div className='space-y-2'>
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="w-full">
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-3'>
                    <span className='text-lg'>{getFileIcon(file.fileName)}</span>
                    <div>
                      <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                        {file.fileName}
                      </p>
                      <a
                        href={file.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
                      >
                        Visualizza file
                        <HiExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <Button
                    color="failure"
                    size="xs"
                    onClick={() => removeFile(index)}
                    pill
                  >
                    <HiX className="h-3 w-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}