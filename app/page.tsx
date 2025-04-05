import { Footer } from "@/components/footer";
import { RegionChecker } from "@/components/region-checker";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Mobile Legends Server Region Checker</h1>
            <p className="text-slate-300">
              Enter your Mobile Legends server ID to find out which region it belongs to
            </p>
          </div>

          <RegionChecker />

        </div>
      </div>
      <Footer />
    </main>
  );
}