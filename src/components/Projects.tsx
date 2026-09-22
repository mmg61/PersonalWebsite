import ProjectsClient, { Repo } from './ProjectsClient';

export default async function Projects() {
  let repos: Repo[] = [];
  try {
    const res = await fetch('https://api.github.com/users/mmg61/repos?sort=updated&per_page=30', {
      next: { revalidate: 60 } // Her 1 dakikada bir yenile
    });
    if (res.ok) {
      repos = await res.json();
    }
  } catch (error) {
    console.error("Projeler çekilirken hata oluştu:", error);
  }

  return <ProjectsClient repos={repos} />;
}