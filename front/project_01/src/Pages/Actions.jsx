import React from 'react'
import Sidebar from '../Components/Sidebar'
import { ArrowLeft } from "lucide-react";
//import Header from '../Components/Header'

export default function Screen() {
  return (
    <div className="min-h-screen bg-gray-100 rounded-3xl overflow-hidden border">
      
      {/* Gradient Header */}
      <div className="h-24 bg-gradient-to-r from-cyan-400 to-purple-600" />

      <div className="p-6 space-y-6">
        
        <ArrowLeft className="cursor-pointer" />

        <Card horizontal />

        <div className="flex justify-center gap-2">
          <button className="px-6 py-2 bg-gray-700 text-white rounded-full">
            ✓ Label
          </button>
          <button className="px-6 py-2 bg-gray-300 rounded-full">
            Label
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          <Card />
          <Card />
          <Card />
        </div>

      </div>
    </div>
  );
}