import ProjectsClient, { Repo } from './ProjectsClient';

export default async function Projects() {
  let repos: Repo[] = [];
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch('https://api.github.com/users/mmg61/repos?sort=updated&per_page=30', {
      headers,
      next: { revalidate: 3600 } // Her 1 saatte bir yenile (GitHub API rate limit koruması)
    });
    if (res.ok) {
      const data: Repo[] = await res.json();
      repos = data.filter((repo) => !repo.fork);
    }
  } catch (error) {
    console.error("Projeler çekilirken hata oluştu:", error);
  }

  return <ProjectsClient repos={repos} />;
}