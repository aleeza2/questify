import { Link } from "react-router-dom";

export default function TrendingGuide() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl font-serif text-medievalRed">🛡️ Spot the Fakes: Quick Guide</h1>
          <Link to="/trending-fakes" className="px-3 py-1 rounded bg-stone-200 hover:bg-stone-300">← Trending</Link>
        </header>

        <p className="text-stone-700">
          A 2-minute checklist for images & videos that look a little too magical. When several of these appear together, treat the content as suspect until verified.
        </p>

        <section className="grid md:grid-cols-2 gap-5">
          <Card title="Lighting & Shadows">
            <ul className="list-disc pl-5 space-y-1">
              <li>Shadows point in inconsistent directions</li>
              <li>Highlights where there’s no light source</li>
              <li>Reflections don’t include the object</li>
            </ul>
          </Card>
          <Card title="Edges & Textures">
            <ul className="list-disc pl-5 space-y-1">
              <li>Soft halos, smeared edges, or double contours</li>
              <li>Skin/grass/water patterns look “melted”</li>
              <li>Repeated tiles or textures</li>
            </ul>
          </Card>
          <Card title="Hands, Faces & Details">
            <ul className="list-disc pl-5 space-y-1">
              <li>Finger counts, earrings, or glasses morph between frames</li>
              <li>Teeth/gums blur together; eyes reflect impossible scenes</li>
              <li>Micro-details (logos, labels) look invented</li>
            </ul>
          </Card>
          <Card title="Text & Signs">
            <ul className="list-disc pl-5 space-y-1">
              <li>Warped or inconsistent lettering</li>
              <li>Foreign characters appear where they shouldn’t</li>
              <li>License plates or signage change across frames</li>
            </ul>
          </Card>
          <Card title="Audio & Motion (video)">
            <ul className="list-disc pl-5 space-y-1">
              <li>Lip-sync off by a few frames</li>
              <li>Camera shake doesn’t affect the object</li>
              <li>Looped background audio</li>
            </ul>
          </Card>
          <Card title="Source & Context">
            <ul className="list-disc pl-5 space-y-1">
              <li>New account posting dozens of “discoveries”</li>
              <li>No original uploader or location info</li>
              <li>Old image reused with new caption</li>
            </ul>
          </Card>
        </section>

        <section className="bg-white/90 p-5 rounded-xl border border-stone-200">
          <h2 className="text-xl font-semibold mb-2">Workflow (60 seconds)</h2>
          <ol className="list-decimal pl-5 space-y-1 text-stone-800">
            <li>Screenshot or copy the URL.</li>
            <li>Run a reverse image search (Google Images, TinEye).</li>
            <li>For video, extract keyframes (InVID) and search those.</li>
            <li>Check weather/maps/timetables if a real-world event is claimed.</li>
            <li>Scan comments for earlier posts or location clues.</li>
          </ol>
        </section>

        <div className="flex gap-3">
          <Link to="/trending-fakes/resources" className="px-4 py-2 rounded-lg bg-medievalGold text-black font-semibold hover:bg-medievalBrown hover:text-white">Resources</Link>
          <Link to="/trending-fakes" className="px-4 py-2 rounded-lg border border-stone-300 bg-white/90 hover:bg-stone-100">Back to Trending</Link>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white/90 p-5 rounded-xl border border-stone-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
