import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

export default function Responses() {
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sample data for the question types chart
  const questionTypesData = [
    { name: 'shortText', value: 6 },
    { name: 'multipleChoice', value: 1 },
    { name: 'paragraph', value: 2 }
  ];
  const questionTypesData2 = [
    { name: 'Excellent', value: 0 },
    { name: 'Good', value: 0 },
    { name: 'Okay', value: 0 },
    { name: 'Poor', value: 0 }
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 text-white px-3 py-2 rounded shadow-lg text-sm">
          <div className="font-medium">{label}</div>
          <div>value : {payload[0].value}</div>
        </div>
      );
    }
    return null;
  };
  const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 text-white px-3 py-2 rounded shadow-lg text-sm">
          <div className="font-medium">{label}</div>
          <div>value : {payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  // Sample data for responses over time (empty for now)
  const responsesOverTimeData = [];

  // Function to handle the print action
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mt-6 rounded-xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-gray-600 text-sm mb-1">Total Responses</h2>
            <div className="text-4xl font-bold">0</div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 justify-end">
            <input
              type="text"
              placeholder="Search text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
            />
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-1/2 sm:w-auto"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-1/2 sm:w-auto"
              />
            </div>
            
            <button
              className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col gap-6">
        {/* Question Types Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-4">Question types</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={questionTypesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 14, fill: '#666' }}
                />
                <YAxis 
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 14, fill: '#666' }}
                  domain={[0, 8]}
                  ticks={[0, 2, 4, 6, 8]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="#000000"
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Responses Over Time Chart */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-4">Responses over time</h3>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responsesOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-4">Top words (open answers)</h3>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responsesOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-4">Overall Experience</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={questionTypesData2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={true}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: '#666' }}
                />
                <YAxis 
                  axisLine={true}
                  tickLine={true}
                  tick={{ fontSize: 14, fill: '#666' }}
                  domain={[0, 8]}
                  ticks={[0, 2, 4, 6, 8]}
                />
                <Tooltip content={<CustomTooltip2 />} />
                <Bar 
                  dataKey="value" 
                  fill=""
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-gray-600 text-sm mb-4">Individual responses</h3>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responsesOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="responses" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}