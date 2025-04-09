import React from 'react';
import { SearchFilterProps } from '@/types/type';

const SearchFilter = ({
  search,
  filter,
  setSearch,
  setFilter,
  categories,
}: SearchFilterProps) => {
  return (
    <div className="text-gray-500 flex flex-col gap-2 md:flex-row md:items-center mb-6">
      <input
        placeholder="Search"
        className="border p-2 flex-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="border p-2"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(SearchFilter);