"use client";
import React, { useState, useEffect } from 'react';
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  Squares2X2Icon,
  BeakerIcon,
  SwatchIcon,
  StarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

// Type definitions
interface FilterOption {
  label: string;
  value: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  selectedValues: string[];
  onOptionChange: (value: string, checked: boolean) => void;
}

interface FilterState {
  [key: string]: boolean;
}

interface SelectedFilters {
  [key: string]: string[];
}

// FilterSection Component
const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  options, 
  isOpen, 
  onToggle, 
  icon: Icon,
  selectedValues,
  onOptionChange 
}) => {
  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left font-medium text-gray-800"
        type="button"
        aria-expanded={isOpen}
        aria-controls={`filter-${title.toLowerCase().replace(/\s+/g, '-')}`}
        suppressHydrationWarning
      >
        <div className="flex items-center space-x-3">
          <Icon className="h-5 w-5 text-gray-600" />
          <span>{title}</span>
          {selectedValues.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {selectedValues.length}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div 
          className="p-4 bg-white space-y-2 border-t border-gray-100"
          id={`filter-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {options.map((option: FilterOption) => (
            <label 
              key={option.value} 
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={(e) => onOptionChange(option.value, e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                suppressHydrationWarning
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// Main FilterPanel Component
const FilterPanel: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [openSections, setOpenSections] = useState<FilterState>({});
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    material: [],
    category: [],
    metalType: [],
    metalTones: [],
    diamondWeight: [],
    priceRange: []
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle section open/closed
  const toggleSection = (sectionKey: string): void => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Handle option selection/deselection
  const handleOptionChange = (sectionKey: string, value: string, checked: boolean): void => {
    setSelectedFilters(prev => {
      const currentSection = prev[sectionKey] || [];
      
      if (checked) {
        return {
          ...prev,
          [sectionKey]: [...currentSection, value]
        };
      } else {
        return {
          ...prev,
          [sectionKey]: currentSection.filter(item => item !== value)
        };
      }
    });
  };

  // Clear all filters
  const clearAllFilters = (): void => {
    setSelectedFilters({
      material: [],
      category: [],
      metalType: [],
      metalTones: [],
      diamondWeight: [],
      priceRange: []
    });
  };

  // Apply filters
  const applyFilters = (): void => {
    console.log('Applied Filters:', selectedFilters);
    // Add your filter application logic here
  };

  // Get total count of selected filters
  const getTotalSelectedCount = (): number => {
    return Object.values(selectedFilters).reduce((total, section) => total + section.length, 0);
  };

  // Filter sections data
  const filterSections = [
    {
      key: 'material',
      title: 'Material',
      icon: SparklesIcon,
      options: [
        { label: "Gold", value: "gold" },
        { label: "Silver", value: "silver" },
        { label: "Diamond", value: "diamond" },
      ]
    },
    {
      key: 'category',
      title: 'Category',
      icon: Squares2X2Icon,
      options: [
        { label: "Rings", value: "rings" },
        { label: "Bands", value: "bands" },
        { label: "Earrings", value: "earrings" },
        { label: "Necklaces", value: "necklaces" },
        { label: "Pendants", value: "pendants" },
        { label: "Bangles", value: "bangles" },
        { label: "Bracelets", value: "bracelets" },
      ]
    },
    {
      key: 'metalType',
      title: 'Metal Type',
      icon: BeakerIcon,
      options: [
        { label: "10k", value: "10k" },
        { label: "14k", value: "14k" },
        { label: "Silver", value: "silver" },
      ]
    },
    {
      key: 'metalTones',
      title: 'Metal Tones',
      icon: SwatchIcon,
      options: [
        { label: "Yellow Gold", value: "yellow-gold" },
        { label: "Two Tone", value: "two-tone" },
        { label: "Rose Gold", value: "rose-gold" },
        { label: "White Gold", value: "white-gold" },
        { label: "Pink Two Tone", value: "pink-two-tone" },
        { label: "Dark Polish", value: "dark-polish" },
      ]
    },
    {
      key: 'diamondWeight',
      title: 'Diamond Weight (CT)',
      icon: StarIcon,
      options: [
        { label: "<0.25", value: "lt-0.25" },
        { label: "0.25", value: "0.25" },
        { label: "0.50", value: "0.50" },
        { label: "0.75", value: "0.75" },
        { label: "1.00", value: "1.00" },
        { label: "1.50", value: "1.50" },
        { label: "2.00", value: "2.00" },
        { label: ">2.00", value: "gt-2.00" },
      ]
    },
    {
      key: 'priceRange',
      title: 'Price Range',
      icon: CurrencyDollarIcon,
      options: [
        { label: "Under $100", value: "under-100" },
        { label: "$100 - $500", value: "100-500" },
        { label: "$500 - $1000", value: "500-1000" },
        { label: "Over $1000", value: "over-1000" },
      ]
    }
  ];

  // SSR Loading State
  if (!mounted) {
    return (
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center space-x-3 mb-6 pb-4 border-b border-gray-200">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        </div>
        <div className="space-y-3">
          {/* Loading skeleton */}
          <div className="animate-pulse space-y-3">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Component Render
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-6">
        <div className="flex items-center justify-center space-x-3 mb-6 pb-4 border-b border-gray-200">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          {getTotalSelectedCount() > 0 && (
            <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
              {getTotalSelectedCount()}
            </span>
          )}
        </div>

        <div className="space-y-3">
          {filterSections.map((section) => (
            <FilterSection
              key={section.key}
              title={section.title}
              icon={section.icon}
              options={section.options}
              isOpen={openSections[section.key] || false}
              onToggle={() => toggleSection(section.key)}
              selectedValues={selectedFilters[section.key] || []}
              onOptionChange={(value, checked) => 
                handleOptionChange(section.key, value, checked)
              }
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-3">
          <button 
            onClick={applyFilters}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={getTotalSelectedCount() === 0}
            suppressHydrationWarning
          >
            Apply Filters {getTotalSelectedCount() > 0 && `(${getTotalSelectedCount()})`}
          </button>
          <button 
            onClick={clearAllFilters}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={getTotalSelectedCount() === 0}
            suppressHydrationWarning
          >
            Clear All
          </button>
        </div>

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === 'development' && getTotalSelectedCount() > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs font-mono text-gray-600">
              Selected: {JSON.stringify(selectedFilters, null, 2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
