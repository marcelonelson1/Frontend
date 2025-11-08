import React, { useState } from 'react';
import { PlusIcon, DocumentTextIcon, ArchiveBoxIcon, TagIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  activeTab: 'active' | 'archived';
  onTabChange: (tab: 'active' | 'archived') => void;
  onNewNote: () => void;
  onManageCategories: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onNewNote, onManageCategories }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 sm:gap-4">
          {/* Logo and Title */}
          <div className="flex items-center justify-between min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <DocumentTextIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">My Notes</h1>
                <p className="text-sm text-gray-500 hidden sm:block truncate">Capture your ideas effortlessly</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Navigation Tabs */}
            <div className="flex items-center space-x-0.5 sm:space-x-1 bg-gray-100 rounded-md sm:rounded-lg p-0.5 sm:p-1">
              <button
                onClick={() => onTabChange('active')}
                className={`flex-1 xs:flex-none px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'active'
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center xs:justify-start space-x-1 sm:space-x-2">
                  <DocumentTextIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline sm:hidden">Active</span>
                  <span className="hidden sm:inline">My Notes</span>
                  <span className="xs:hidden">Act</span>
                </div>
              </button>
              <button
                onClick={() => onTabChange('archived')}
                className={`flex-1 xs:flex-none px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  activeTab === 'archived'
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center xs:justify-start space-x-1 sm:space-x-2">
                  <ArchiveBoxIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline sm:hidden">Archive</span>
                  <span className="hidden sm:inline">Archived</span>
                  <span className="xs:hidden">Arc</span>
                </div>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Categories Button */}
              <button
                onClick={onManageCategories}
                className="flex-1 xs:flex-none btn btn-secondary btn-sm flex items-center justify-center space-x-1 sm:space-x-2 min-w-0"
              >
                <TagIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="hidden xs:inline sm:hidden truncate">Tags</span>
                <span className="hidden sm:inline truncate">Organize</span>
                <span className="xs:hidden">T</span>
              </button>

              {/* New Note Button */}
              <button
                onClick={onNewNote}
                className="flex-1 xs:flex-none btn btn-primary btn-sm flex items-center justify-center space-x-1 sm:space-x-2 shadow-sm min-w-0"
              >
                <PlusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="hidden xs:inline sm:hidden truncate">Add</span>
                <span className="hidden sm:inline truncate">Add Note</span>
                <span className="xs:hidden">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;