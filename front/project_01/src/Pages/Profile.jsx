import React from 'react';
import { Search, Bell, Mail, Plus, ChevronDown } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex">
        
        {/* Sidebar Minimalista */}
        <div className="border-r border-gray-100 flex flex-col items-center py-8 gap-8">
          <div className="w-8 h-8 bg-blue-100 rounded-lg"></div>
          <div className="flex flex-col gap-6 text-gray-400">
            <div className="w-5 h-5 border-2 border-current rounded-full"></div>
            <div className="w-5 h-5 border-2 border-current rounded-md"></div>
            <div className="w-5 h-5 border-2 border-current rounded-full"></div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 p-8">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome, Amanda</h1>
              <p className="text-gray-400 text-sm">Tue, 07 June 2022</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 w-64 focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Banner Gradiente */}
          <div className="h-24 w-full rounded-2xl bg-gradient-to-r from-purple-400 via-purple-500 to-teal-400 mb-8"></div>

          {/* Info do Perfil */}
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Lorem Ipsum</h2>
                <p className="text-gray-400 text-sm">Loremipsum@gmail.com</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Edit
            </button>
          </div>

          {/* Formulário */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12">
            {[
              { label: 'Nome Completo', placeholder: 'Your First Name' },
              { label: 'Nome Fantasia', placeholder: 'Your First Name' },
              { label: 'Gênero', placeholder: 'Your First Name', select: true },
              { label: 'Profissão', placeholder: 'Your First Name', select: true },
              { label: 'Language', placeholder: 'Your First Name', select: true },
              { label: 'Time Zone', placeholder: 'Your First Name', select: true },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium text-sm">{field.label}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={field.placeholder}
                    className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-gray-400 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  {field.select && <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>

          {/* Seção de Email */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800">My email Address</h3>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-full text-blue-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">alexarowles@gmail.com</p>
                <p className="text-xs text-gray-400">1 month ago</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors">
              <Plus className="w-4 h-4" />
              Add Email Address
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;