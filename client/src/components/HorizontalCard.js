import React from 'react';

export default function HorizontalCard() {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg max-w-[600px] p-4 m-5">
      {/* Image Section */}
      <div className="flex items-center p-2">
        <div className="aspect-square w-[90px] max-w-[100px] rounded-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="ml-4 flex-1">
        <h2 className="text-green-600 font-medium text-lg">Name</h2>
        <p className="mt-2 text-gray-500 text-sm">
          Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph.
        </p>
      </div>
    </div>
  );
}
