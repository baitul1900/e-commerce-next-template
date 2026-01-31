import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome Home</h1>
      <p className="text-gray-600">
        This is the main content area. The sidebar is on the left side.
      </p>
    </div>
  );
}
