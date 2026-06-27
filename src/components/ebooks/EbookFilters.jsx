"use client";

import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function EbookFilters({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  priceRange,
  setPriceRange,
  availability,
  setAvailability,
  sortBy,
  setSortBy,
}) {
  const genres = ["fiction", "non-fiction", "sci-fi", "mystery", "biography","horro"];

  return (
    <div className="bg-slate-50 border border-slate-100 p-4 md::p-5 rounded-2xl space-y-5">
      {/* 1. Interactive Search Input */}
      <TextField value={searchQuery} onChange={(v) => setSearchQuery(v)} className="w-full">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Search</span>
        <InputGroup className="bg-white border-slate-200 focus-within:border-indigo-500 rounded-xl shadow-sm transition-all">
          <InputGroup.Prefix className="pl-3 text-slate-400">
            <Magnifier className="w-4 h-4" />
          </InputGroup.Prefix>
          <InputGroup.Input
            placeholder="Search books..."
            className="bg-transparent text-slate-800 placeholder-slate-400 text-sm py-2.5 px-3 outline-none w-full"
          />
        </InputGroup>
      </TextField>

      {/* 2. Sorting Control */}
      <div className="w-full">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Sort By</span>
        <Select selectedKey={sortBy} onSelectionChange={(key) => setSortBy(key)}>
          <Select.Trigger className="w-full flex items-center justify-between bg-white text-slate-800 border border-slate-200 hover:border-slate-300 rounded-xl py-2.5 px-4 text-sm shadow-sm transition-all">
            <Select.Value>
              {sortBy === "newest" ? "Sort: Newest" : sortBy === "price-low" ? "Price: Low to High" : "Price: High to Low"}
            </Select.Value>
            <Select.Indicator><ChevronDown className="w-4 h-4 text-slate-400" /></Select.Indicator>
          </Select.Trigger>
          {/* FIXED: Changed invalid class 'min-w-45' to 'min-w-[180px]' to prevent layout breakdown */}
          <Select.Popover className="bg-white border border-slate-200 rounded-xl shadow-xl mt-1 overflow-hidden z-50 min-w-[180px]">
            <ListBox className="p-1">
              <ListBox.Item id="newest" className="text-slate-700 hover:bg-indigo-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">Newest</ListBox.Item>
              <ListBox.Item id="price-low" className="text-slate-700 hover:bg-indigo-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">Price: Low to High</ListBox.Item>
              <ListBox.Item id="price-high" className="text-slate-700 hover:bg-indigo-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer">Price: High to Low</ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* 3. Genre Filter */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Genre Category</span>
        <div className="space-y-1.5 pt-1">
          <label className="flex items-center gap-2.5 text-sm font-medium text-slate-600 cursor-pointer select-none">
            <input
              type="radio"
              name="genre"
              checked={selectedGenre === "all"}
              onChange={() => setSelectedGenre("all")}
              className="accent-indigo-600 w-4 h-4 rounded-full border-slate-300 cursor-pointer"
            />
            <span className="capitalize">All Genres</span>
          </label>
          {genres.map((g) => (
            <label key={g} className="flex items-center gap-2.5 text-sm font-medium text-slate-600 cursor-pointer select-none">
              <input
                type="radio"
                name="genre"
                checked={selectedGenre === g}
                onChange={() => setSelectedGenre(g)}
                className="accent-indigo-600 w-4 h-4 rounded-full border-slate-300 cursor-pointer"
              />
              <span className="capitalize">{g.replace("-", " ")}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Price Range Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Price Range</span>
          <span className="text-xs font-mono font-bold text-indigo-600">${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100" // FIXED: Explicitly set max value to 100 to sync with the container state
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
          className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none"
        />
      </div>

      {/* 5. Availability Filter */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Availability</span>
        <div className="flex flex-col gap-1.5 pt-1">
          {["all", "in-stock", "sold"].map((status) => (
            <label key={status} className="flex items-center gap-2.5 text-sm font-medium text-slate-600 cursor-pointer select-none">
              <input
                type="radio"
                name="availability"
                checked={availability === status}
                onChange={() => setAvailability(status)}
                className="accent-indigo-600 w-4 h-4 rounded-full border-slate-300 cursor-pointer"
              />
              <span className="capitalize">
                {status === "all" ? "All Formats" : status === "in-stock" ? "In Stock" : "Sold Out"}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}