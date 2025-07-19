import React from 'react';
import { Download, Eye } from 'lucide-react';

const FileCard = ({ file, icon, apiUrl }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
  };

  const handleView = () => {
    // Use serve_file.php to securely serve the file
    window.open(`${apiUrl}/serve_file.php?path=${encodeURIComponent(file.path)}`, '_blank');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `${apiUrl}/serve_file.php?path=${encodeURIComponent(file.path)}&download=1`;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="mr-3">{icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-800 truncate" title={file.name}>
              {file.name}
            </h3>
            <p className="text-sm text-gray-500">
              {getFileExtension(file.name).toUpperCase()} - {formatDate(file.created_at)}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
        <button
          onClick={handleView}
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg p-2 transition-colors"
          aria-label="View file"
          title="View file"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-100 text-green-700 hover:bg-green-200 rounded-lg p-2 transition-colors"
          aria-label="Download file"
          title="Download file"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};

export default FileCard;