/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // সাময়িকভাবে সব এক্সটার্নাল ইমেজের পারমিশন দেওয়ার জন্য
      },
    ],
  },
};

export default nextConfig;
