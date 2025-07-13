import React from 'react';

const tools = [
  { name: 'git-flow', category: 'Version Control' },
  { name: 'docker-cli', category: 'Containers' },
  { name: 'kubectl', category: 'Orchestration' },
  { name: 'terraform', category: 'Infrastructure' },
  { name: 'aws-cli', category: 'Cloud' },
  { name: 'gh', category: 'GitHub' },
  { name: 'npm', category: 'Package Manager' },
  { name: 'yarn', category: 'Package Manager' },
  { name: 'curl', category: 'Network' },
  { name: 'jq', category: 'JSON' },
  { name: 'grep', category: 'Search' },
  { name: 'sed', category: 'Text Processing' }
];

const ToolGrid = () => {
  return (
    <section className="bg-black text-white py-32">
      <div className="max-w-5xl mx-auto px-16">
        <div className="grid grid-cols-3 gap-16">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="group cursor-pointer opacity-0 animate-[fadeIn_1s_ease-out_forwards] hover:opacity-30 transition-opacity duration-500"
              style={{ animationDelay: `${1.6 + index * 0.1}s` }}
            >
              <h3 className="text-sm font-light text-white tracking-wide mb-1">
                {tool.name}
              </h3>
              <div className="text-gray-600 font-light tracking-wide text-sm">
                {tool.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolGrid;