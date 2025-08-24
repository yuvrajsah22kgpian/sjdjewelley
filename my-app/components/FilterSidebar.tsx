'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface PriceRange {
  min: number;
  max: number;
  label: string;
}

interface Filters {
  category?: string[];
  material?: string[];
  gemstone?: string[];
  occasion?: string[];
  discount?: number[];
  priceMin?: number;
  priceMax?: number;
  customPriceMin?: number;
  customPriceMax?: number;
  inStock?: boolean;
  newArrivals?: boolean;
  certified?: boolean;
  customizable?: boolean;
}

interface FilterSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  defaultExpandedOption: string;
  onClose?: () => void; // Added this back to fix the ProductPage error
}

export function FilterSidebar({
  filters,
  setFilters,
  defaultExpandedOption,
  onClose
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    [defaultExpandedOption]: true
  });

  const categoryOptions: FilterOption[] = [
    { id: 'rings', label: 'Rings', count: 156 },
    { id: 'necklaces', label: 'Necklaces', count: 89 },
    { id: 'earrings', label: 'Earrings', count: 124 },
    { id: 'bracelets', label: 'Bracelets', count: 67 },
    { id: 'pendants', label: 'Pendants', count: 43 },
    { id: 'brooches', label: 'Brooches', count: 12 }
  ];

  const materialOptions: FilterOption[] = [
    { id: 'gold', label: 'Gold', count: 245 },
    { id: 'silver', label: 'Silver', count: 189 },
    { id: 'platinum', label: 'Platinum', count: 67 },
    { id: 'rose-gold', label: 'Rose Gold', count: 98 },
    { id: 'white-gold', label: 'White Gold', count: 134 }
  ];

  const gemstoneOptions: FilterOption[] = [
    { id: 'diamond', label: 'Diamond', count: 312 },
    { id: 'ruby', label: 'Ruby', count: 45 },
    { id: 'sapphire', label: 'Sapphire', count: 67 },
    { id: 'emerald', label: 'Emerald', count: 34 },
    { id: 'pearl', label: 'Pearl', count: 89 },
    { id: 'opal', label: 'Opal', count: 23 },
    { id: 'amethyst', label: 'Amethyst', count: 56 },
    { id: 'topaz', label: 'Topaz', count: 29 }
  ];

  const priceRanges: PriceRange[] = [
    { min: 0, max: 500, label: 'Under $500' },
    { min: 500, max: 1000, label: '$500 - $1,000' },
    { min: 1000, max: 2000, label: '$1,000 - $2,000' },
    { min: 2000, max: 5000, label: '$2,000 - $5,000' },
    { min: 5000, max: 10000, label: '$5,000 - $10,000' },
    { min: 10000, max: Infinity, label: 'Over $10,000' }
  ];

  const occasionOptions: FilterOption[] = [
    { id: 'engagement', label: 'Engagement', count: 78 },
    { id: 'wedding', label: 'Wedding', count: 92 },
    { id: 'anniversary', label: 'Anniversary', count: 56 },
    { id: 'birthday', label: 'Birthday', count: 134 },
    { id: 'graduation', label: 'Graduation', count: 23 },
    { id: 'everyday', label: 'Everyday Wear', count: 201 }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper function to safely get array from filters
  function getStringArray(key: keyof Filters): string[] {
    const value = filters[key];
    return Array.isArray(value) && value.every(item => typeof item === 'string') ? value as string[] : [];
  }

  function getNumberArray(key: keyof Filters): number[] {
    const value = filters[key];
    return Array.isArray(value) && value.every(item => typeof item === 'number') ? value as number[] : [];
  }

  function updateFilter(
    filterType: keyof Filters,
    value: string | number | boolean,
    isMultiple: boolean = true
  ) {
    if (isMultiple) {
      if (typeof value === 'string') {
        // Handle string array filters (category, material, gemstone, occasion)
        const currentArray = getStringArray(filterType);
        const newArray = currentArray.includes(value)
          ? currentArray.filter(v => v !== value)
          : [...currentArray, value];
        setFilters({
          ...filters,
          [filterType]: newArray.length > 0 ? newArray : undefined
        });
      } else if (typeof value === 'number') {
        // Handle number array filters (discount)
        const currentArray = getNumberArray(filterType);
        const newArray = currentArray.includes(value)
          ? currentArray.filter(v => v !== value)
          : [...currentArray, value];
        setFilters({
          ...filters,
          [filterType]: newArray.length > 0 ? newArray : undefined
        });
      }
    } else {
      // Handle single value filters (boolean values)
      setFilters({
        ...filters,
        [filterType]: filters[filterType] === value ? undefined : value
      });
    }
  }

  function clearAllFilters() {
    setFilters({});
  }

  function getActiveFilterCount() {
    return Object.values(filters).filter(val =>
      val !== undefined &&
      (Array.isArray(val) ? val.length > 0 : true)
    ).length;
  }

  // Helper function to check if a string option is selected
  function isStringOptionSelected(key: keyof Filters, optionId: string): boolean {
    return getStringArray(key).includes(optionId);
  }

  function renderFilterSection(
    title: string,
    key: keyof Filters,
    options: FilterOption[],
    isMultiple: boolean = true
  ) {
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => toggleSection(key)}
          type="button"
        >
          <h3 className="font-medium text-gray-900">{title}</h3>
          {expandedSections[key] ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {expandedSections[key] && (
          <div className="mt-3 space-y-2">
            {options.map(option => (
              <label key={option.id} className="flex items-center cursor-pointer">
                <input
                  type={isMultiple ? "checkbox" : "radio"}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  checked={isStringOptionSelected(key, option.id)}
                  onChange={() => updateFilter(key, option.id, isMultiple)}
                />
                <span className="ml-2 text-sm text-gray-700 flex-1">{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-xs text-gray-500">({option.count})</span>
                )}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  }

  function renderPriceFilter() {
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => toggleSection('price')}
          type="button"
        >
          <h3 className="font-medium text-gray-900">Price Range</h3>
          {expandedSections['price'] ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {expandedSections['price'] && (
          <div className="mt-3 space-y-2">
            {priceRanges.map((range, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                  checked={filters.priceMin === range.min && filters.priceMax === range.max}
                  onChange={() => {
                    if (filters.priceMin === range.min && filters.priceMax === range.max) {
                      setFilters({
                        ...filters,
                        priceMin: undefined,
                        priceMax: undefined
                      });
                    } else {
                      setFilters({
                        ...filters,
                        priceMin: range.min,
                        priceMax: range.max
                      });
                    }
                  }}
                />
                <span className="ml-2 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 mb-2">Custom Range</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  value={filters.customPriceMin ?? ''}
                  onChange={e => setFilters({
                    ...filters,
                    customPriceMin: e.target.value ? Number(e.target.value) : undefined
                  })}
                />
                <span className="text-gray-500 self-center">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  value={filters.customPriceMax ?? ''}
                  onChange={e => setFilters({
                    ...filters,
                    customPriceMax: e.target.value ? Number(e.target.value) : undefined
                  })}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderDiscountFilter() {
    const discountArray = getNumberArray('discount');
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => toggleSection('discount')}
          type="button"
        >
          <h3 className="font-medium text-gray-900">Discount</h3>
          {expandedSections['discount'] ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        {expandedSections['discount'] && (
          <div className="mt-3 space-y-2">
            {[10, 20, 30, 40, 50].map(discount => (
              <label key={discount} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  checked={discountArray.includes(discount)}
                  onChange={() => updateFilter('discount', discount, true)}
                />
                <span className="ml-2 text-sm text-gray-700">
                  {discount}% or more
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white h-full overflow-y-auto">
      {/* Mobile header - only show when onClose is provided */}
      {onClose && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="p-4">
        {getActiveFilterCount() > 0 && (
          <div className="mb-4">
            <button
              onClick={clearAllFilters}
              className="text-sm text-yellow-600 hover:text-yellow-800 font-medium"
              type="button"
            >
              Clear all filters ({getActiveFilterCount()})
            </button>
          </div>
        )}
        <div className="space-y-0">
          {renderFilterSection('Category', 'category', categoryOptions)}
          {renderPriceFilter()}
          {renderFilterSection('Material', 'material', materialOptions)}
          {renderFilterSection('Gemstone', 'gemstone', gemstoneOptions)}
          {renderFilterSection('Occasion', 'occasion', occasionOptions)}
          {renderDiscountFilter()}

          <div className="border-b border-gray-200 py-4">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => toggleSection('additional')}
              type="button"
            >
              <h3 className="font-medium text-gray-900">Additional</h3>
              {expandedSections['additional'] ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            {expandedSections['additional'] && (
              <div className="mt-3 space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    checked={Boolean(filters.inStock)}
                    onChange={() => updateFilter('inStock', !filters.inStock, false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    checked={Boolean(filters.newArrivals)}
                    onChange={() => updateFilter('newArrivals', !filters.newArrivals, false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">New Arrivals</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    checked={Boolean(filters.certified)}
                    onChange={() => updateFilter('certified', !filters.certified, false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Certified Diamonds</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    checked={Boolean(filters.customizable)}
                    onChange={() => updateFilter('customizable', !filters.customizable, false)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Customizable</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile apply button - only show when onClose is provided */}
      {onClose && (
        <div className="p-4 border-t border-gray-200 md:hidden">
          <button
            onClick={onClose}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-medium"
            type="button"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
