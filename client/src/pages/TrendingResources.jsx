import { Link } from "react-router-dom";

export default function TrendingResources() {
  return (
    <div className="min-h-screen px-4 md:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-4xl font-serif text-medievalRed">📚 Verification Resources</h1>
          <Link to="/trending-fakes" className="px-3 py-1 rounded bg-stone-200 hover:bg-stone-300">← Trending</Link>
        </header>

        <Section title="Image tools">
          <ListItem name="Google Images (Search by image)" url="https://images.google.com/" />
          <ListItem name="TinEye" url="https://tineye.com/" />
          <ListItem name="Yandex Images" url="https://yandex.com/images/" />
        </Section>

        <Section title="Video tools">
          <ListItem name="InVID (keyframes, metadata)" url="https://www.invid-project.eu/tools-and-services/invid-verification-plugin/" />
          <ListItem name="Frame-by-frame (desktop players)" url="https://www.videolan.org/vlc/" />
        </Section>

        <Section title="Metadata / Forensics">
          <ListItem name="Exif.tools (quick EXIF viewer)" url="https://exif.tools/" />
          <ListItem name="exiftool (CLI)" url="https://exiftool.org/" />
        </Section>

        <Section title="Media literacy">
          <ListItem name="First Draft basics" url="https://firstdraftnews.org/" />
          <ListItem name="Stop. Think. Check." url="https://www.ssrc.org/programs/just-tech/stop-think-check/" />
        </Section>

        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-4 rounded-xl">
          ⚠️ Detection tools can help, but **no AI detector is 100% reliable**. Use multiple checks and look for corroborating sources.
        </div>

        <Link to="/trending-fakes/guide" className="inline-block mt-2 text-medievalBrown underline">
          ← Quick Guide
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="bg-white/90 p-5 rounded-xl border border-stone-200">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <ul className="space-y-2">{children}</ul>
    </section>
  );
}
function ListItem({ name, url }) {
  return (
    <li>
      <a href={url} target="_blank" rel="noreferrer" className="text-medievalBrown underline">
        {name}
      </a>
    </li>
  );
}
