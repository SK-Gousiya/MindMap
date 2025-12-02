import React from 'react';
// Assuming you have a basic App.css for global styles, otherwise you can remove this
import '../App.css'; 
// Import icons for a sleek look
import { Info, X, Link, Key, ChevronRight, Hash } from 'lucide-react';

const DetailsDrawer = ({ selectedPage, onClose, isOpen }) => {
  // Safe access to nested properties
  const url = selectedPage?.metadata?.url ?? "N/A";
  const keyElements = selectedPage?.keyElements ?? [];
  const pageLabel = selectedPage?.label ?? "Page Details";

  return (
    // 1. Drawer Container (Fixed, full screen when open, smooth transition)
    <div
      className={`
        fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
      // This prevents interaction with the content behind the closed drawer
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }} 
    >
      {/* 2. Backdrop Overlay (Dark and slightly transparent) */}
      <div
        className="absolute inset-0 bg-gray-900 opacity-60"
        onClick={onClose}
      ></div>

      {/* 3. Drawer Content Panel (Styled to slide in, Fixed Max Width) */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col"
      >
        {/* 3.1. Header Section with Title and Close Button */}
        <header className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center space-x-3">
            <Info className="w-5 h-5 text-[#003057]" />
            <h2 className="text-xl font-bold text-gray-800 break-words max-w-[80%]">
              {pageLabel}
            </h2>
          </div>
          {/* Close Button (X icon) - Stylish and prominent */}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-[#003057] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* 3.2. Content Body (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto pb-8">

          {/* Page Details Section */}
          <section className="p-5 border-b border-gray-100">
            <h3 className="text-base font-semibold text-[#003057] mb-3 flex items-center">
                <Link className="w-4 h-4 mr-2" /> Page URL & Metadata
            </h3>
            <div className="text-sm text-gray-700 space-y-3">
              <div>
                <span className="font-medium text-gray-600 block mb-1">URL:</span>
                <a
                  href={url !== "N/A" ? url : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-800 hover:text-[#003057] underline truncate block"
                >
                  {url}
                </a>
              </div>
              <div>
                <span className="font-medium text-gray-600 block mb-1">Metadata Status:</span>
                <p className="text-gray-500 italic">No specific metadata found.</p>
              </div>
            </div>
          </section>

          {/* Key Elements Section */}
          <section className="p-5">
            <h3 className="text-base font-semibold text-[#003057] mb-4 flex items-center">
              <Key className="w-4 h-4 mr-2" /> Key Elements
            </h3>

            {keyElements.length > 0 ? (
              <ul className="space-y-3">
                {keyElements.map((el, index) => (
                  <li
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between text-sm">
                      <p className="text-sm font-medium text-gray-800 mr-2 break-all">{el.text}</p>
                      {/* Stylish Badges */}
                      <span className={`
                        flex-shrink-0 px-2 py-0.5 rounded-md text-xs font-bold uppercase
                        ${el.type === 'link' ? 'bg-[#003057] text-white' :
                          el.type === 'button' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'}
                      `}>
                        {el.type}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm italic text-gray-500 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
                <Hash className="w-4 h-4 inline mr-1 text-gray-400" /> No key elements documented for this page.
              </div>
            )}
          </section>

          {/* Detailed Flow Information Section (Uses a cleaner call-out box) */}
          <section className="p-5">
            <h3 className="text-base font-semibold text-[#003057] mb-4 flex items-center">
               <ChevronRight className="w-4 h-4 mr-2" /> Detailed Flow Information
            </h3>
            <div className="text-sm text-gray-600 space-y-4">
              <p>
                This section would display comprehensive flow data, including history, access metrics, and component relationships for this specific page node.
              </p>
              {/* Call-to-Action / Info Box */}
              <div className="bg-[#003057] text-white p-4 rounded-lg text-center h-16 flex items-center justify-center shadow-lg">
                <Info className="w-5 h-5 mr-2" /> Select a node in the map to load its detailed information.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailsDrawer;
