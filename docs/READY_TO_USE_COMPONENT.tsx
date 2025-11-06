/**
 * Ready-to-use File Manager component
 * 
 * Copy this file to your project and use it!
 * 
 * Installation:
 * npm install squarefi-bff-api-module
 * 
 * Usage:
 * import { FileManager } from './FileManager';
 * 
 * <FileManager userId="user-123" />
 */

import React, { useState } from 'react';
import {
  useFileUpload,
  useUserFiles,
  DEFAULT_BUCKET,
} from 'squarefi-bff-api-module';

interface FileManagerProps {
  userId: string;
  bucket?: string;
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
  onFileUpload?: (path: string) => void;
  onFileDelete?: (fileName: string) => void;
}

/**
 * Universal component for managing user files
 */
export const FileManager: React.FC<FileManagerProps> = ({
  userId,
  bucket = DEFAULT_BUCKET,
  maxFileSize = 10 * 1024 * 1024, // 10MB by default
  allowedTypes = ['*/*'], // all types by default
  onFileUpload,
  onFileDelete,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // File upload hook
  const { upload, uploading, progress, error: uploadError } = useFileUpload({
    userId,
    bucket,
    onSuccess: (result) => {
      setSelectedFile(null);
      setValidationError(null);
      if (result.path) {
        onFileUpload?.(result.path);
      }
      reload(); // Refresh list after upload
    },
  });

  // File list hook
  const {
    files,
    loading,
    error: listError,
    reload,
    deleteOne,
  } = useUserFiles({
    userId,
    bucket,
    autoLoad: true,
    autoGenerateUrls: true,
    urlExpiresIn: 3600,
  });

  // File validation
  const validateFile = (file: File): string | null => {
    // Size check
    if (file.size > maxFileSize) {
      return `File too large. Maximum ${(maxFileSize / 1024 / 1024).toFixed(0)}MB`;
    }

    // Type check
    if (!allowedTypes.includes('*/*')) {
      const isAllowed = allowedTypes.some((type) => {
        if (type.endsWith('/*')) {
          // Example: image/*
          const prefix = type.split('/')[0];
          return file.type.startsWith(prefix + '/');
        }
        return file.type === type;
      });

      if (!isAllowed) {
        return `Unsupported file type. Allowed: ${allowedTypes.join(', ')}`;
      }
    }

    return null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      setSelectedFile(null);
      return;
    }

    setValidationError(null);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${selectedFile.name}`;
    await upload(selectedFile, uniqueFileName);
  };

  const handleDelete = async (fileName: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${fileName}"?`);
    if (!confirmed) return;

    const success = await deleteOne(fileName);
    if (success) {
      onFileDelete?.(fileName);
    } else {
      alert('Failed to delete file');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>File Management</h2>

      {/* Upload section */}
      <div style={styles.uploadSection}>
        <h3 style={styles.sectionTitle}>📤 Upload File</h3>

        <input
          type="file"
          onChange={handleFileSelect}
          disabled={uploading}
          style={styles.fileInput}
          accept={allowedTypes.join(',')}
        />

        {selectedFile && !validationError && (
          <div style={styles.selectedFile}>
            <p style={styles.fileName}>
              📄 {selectedFile.name} ({formatFileSize(selectedFile.size)})
            </p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{
                ...styles.button,
                ...styles.uploadButton,
                ...(uploading ? styles.buttonDisabled : {}),
              }}
            >
              {uploading ? `⏳ Uploading... ${progress}%` : '✅ Upload'}
            </button>
          </div>
        )}

        {validationError && (
          <p style={styles.errorText}>❌ {validationError}</p>
        )}

        {uploadError && (
          <p style={styles.errorText}>❌ Upload error: {uploadError}</p>
        )}
      </div>

      {/* File list section */}
      <div style={styles.listSection}>
        <div style={styles.listHeader}>
          <h3 style={styles.sectionTitle}>
            📁 Your Files ({files.length})
          </h3>
          <button
            onClick={reload}
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.refreshButton,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            🔄 Refresh
          </button>
        </div>

        {loading && <p style={styles.loadingText}>Loading file list...</p>}

        {listError && (
          <p style={styles.errorText}>❌ List loading error: {listError}</p>
        )}

        {!loading && files.length === 0 && (
          <p style={styles.emptyText}>You don't have any uploaded files yet</p>
        )}

        {files.length > 0 && (
          <div style={styles.filesList}>
            {files.map((file) => (
              <div key={file.id} style={styles.fileItem}>
                <div style={styles.fileInfo}>
                  <a
                    href={file.signedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.fileLink}
                  >
                    📄 {file.name}
                  </a>
                  <p style={styles.fileDate}>
                    {formatDate(file.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(file.name)}
                  style={{
                    ...styles.button,
                    ...styles.deleteButton,
                  }}
                >
                      🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Стили компонента
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
  },
  uploadSection: {
    marginBottom: '40px',
    padding: '25px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
  },
  listSection: {
    padding: '25px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#555',
  },
  fileInput: {
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    cursor: 'pointer',
  },
  selectedFile: {
    marginTop: '15px',
    padding: '15px',
    backgroundColor: '#e8f5e9',
    borderRadius: '8px',
  },
  fileName: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '500',
  },
  uploadButton: {
    backgroundColor: '#4caf50',
    color: 'white',
  },
  refreshButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    fontSize: '14px',
    padding: '8px 16px',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    fontSize: '14px',
    padding: '6px 12px',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  filesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
    transition: 'background-color 0.2s ease',
  },
  fileInfo: {
    flex: 1,
  },
  fileLink: {
    color: '#1976d2',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  },
  fileDate: {
    margin: '5px 0 0 0',
    fontSize: '13px',
    color: '#888',
  },
  errorText: {
    color: '#f44336',
    marginTop: '10px',
    fontSize: '14px',
  },
  loadingText: {
    textAlign: 'center',
    color: '#888',
    fontSize: '16px',
  },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: '16px',
    padding: '30px',
  },
};

export default FileManager;

