'use client'

import React from 'react'

interface TopicSelectorProps {
  topic: string
  isSelected: boolean
  onSelect: (topic: string) => void
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ topic, isSelected, onSelect }) => {
  return (
    <button 
      onClick={() => onSelect(topic)}
      className={`rounded-full py-1.5 px-2 sm:py-2 sm:px-3 md:py-2 md:px-4 cursor-pointer select-none border-2 transition-all duration-300 text-xs sm:text-sm md:text-base ${
        isSelected 
          ? 'bg-blue-500 text-white border-blue-500' 
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
      }`}
    >
      <span className="whitespace-nowrap">{topic}</span>
    </button>
  )
}

export default TopicSelector