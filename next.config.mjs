const isGithubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: isGithubPages ? 'export' : undefined,
  basePath: isGithubPages ? '/sat-1600' : '',
  assetPrefix: isGithubPages ? '/sat-1600' : '',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
