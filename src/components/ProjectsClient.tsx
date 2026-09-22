"use client";

import React, { useState } from 'react';

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
}

interface ProjectsClientProps {
  repos: Repo[];
}

const ProjectImage = ({ repoName }: { repoName: string }) => {
  const [error, setError] = useState(false);
  // GitHub raw URL for the cover image
  const imageUrl = `https://raw.githubusercontent.com/mmg61/${repoName}/main/cover.png`;

  if (error) {
    return (
      <div className="w-full h-40 bg-[#011e42] flex items-center justify-center p-6 text-center">
        <span className="text-[#00b4d8] font-bold text-2xl truncate w-full" title={repoName}>
          {repoName}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-40 bg-[#011e42] relative overflow-hidden">
      <img 
        src={imageUrl} 
        alt={`${repoName} cover`}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function ProjectsClient({ repos }: ProjectsClientProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedRepos = showAll ? repos : repos.slice(0, 3);

  return (
    <section id="projeler" className="bg-[#0077b6] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12 text-center text-white">Öne Çıkan Projeler</h2>
          
          {repos.length > 0 ? (
            <>
              <div className="flex flex-wrap justify-center gap-8">
                {displayedRepos.map((repo) => (
                  <div 
                    key={repo.id} 
                    className="bg-[#023e8a] rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 transition-transform flex flex-col group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]"
                  >
                    <ProjectImage repoName={repo.name} />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-xl mb-2 text-white truncate" title={repo.name}>
                        {repo.name}
                      </h3>
                      <p className="text-sm text-white/80 mb-6 line-clamp-3 font-medium flex-grow">
                        {repo.description || "Bu proje için henüz bir açıklama eklenmemiş."}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs font-bold px-3 py-1 bg-[#fb8500] text-white rounded">
                          {repo.language || "Code"}
                        </span>
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#00b4d8] text-sm font-bold hover:text-[#ffb703] transition-colors flex items-center gap-1"
                        >
                          İncele &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {repos.length > 3 && (
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setShowAll(!showAll)}
                    className="bg-[#ffb703] hover:bg-[#fb8500] text-[#023e8a] font-extrabold py-3 px-8 rounded-full shadow-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    {showAll ? "Daha Az Gör ↑" : "Daha Fazla Gör ↓"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-white/80 py-10">
              <p>Projeler yükleniyor veya şu an gösterilecek proje bulunamadı...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
