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
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data: Repo[] = await res.json();
      const filtered = data.filter((repo) => !repo.fork);

      repos = await Promise.all(
        filtered.map(async (repo) => {
          const coverUrl = `https://raw.githubusercontent.com/mmg61/${repo.name}/main/cover.png`;
          try {
            const headRes = await fetch(coverUrl, {
              method: 'HEAD',
              next: { revalidate: 3600 },
            });
            return {
              ...repo,
              coverUrl: headRes.ok ? coverUrl : null,
            };
          } catch {
            return {
              ...repo,
              coverUrl: null,
            };
          }
        })
      );
    }
  } catch (error) {
    console.error("Projeler çekilirken hata oluştu:", error);
  }

  return <ProjectsClient repos={repos} />;
}
