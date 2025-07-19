import React from 'react';
import { FileText } from 'lucide-react';

const NoteCard = ({ note }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-3">
          <FileText className="text-yellow-600 mr-2" size={20} />
          <span className="text-sm text-gray-500">Note - {formatDate(note.created_at)}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap break-words">
              {note.content.length > 150 
                ? `${note.content.substring(0, 150)}...` 
                : note.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;