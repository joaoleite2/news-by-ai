'use client'

import React, { useState } from 'react'

interface TopicSelectorProps {
  topic: string
  isSelected: boolean
  onSelect: (topic: string) => void
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ topic, isSelected, onSelect }) => {
  return (
    <button 
      onClick={() => onSelect(topic)}
      className={`rounded-full py-2 px-4 cursor-pointer select-none border-2 transition-all duration-300 ${
        isSelected 
          ? 'bg-blue-500 text-white border-blue-500' 
          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
      }`}
    >
      <span>{topic}</span>
    </button>
  )
}

export default TopicSelector