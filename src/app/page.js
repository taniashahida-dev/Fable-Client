import Image from "next/image";

export default function Home() {
  return (
    <div className="block pt-24 min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-5 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Home Page
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Welcome to Fable! Your home page content is now perfectly visible.
        </p>
      </div>
    </div>
  );
}