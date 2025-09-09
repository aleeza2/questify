// Replace/extend this with real items later.
// Keep ids unique. status is for the badge; verdict: "Fake" | "Misleading" | "Satire" | "Unverified".
export const TRENDING_FAKES = [
  {
    id: "two-moons-city",
    title: "Viral photo shows 'two moons' above a city skyline",
    summary:
      "A striking night photo claims to capture two full moons above the skyline. The post amassed 1.3M views in 24 hours.",
    image:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1200&auto=format",
    type: "Image",
    category: "Science",
    status: "Debunked",
    verdict: "Fake",
    publishedAt: "2025-09-10T10:12:00Z",
    evidence: [
      "Reverse image search finds the base photo from 2017; second 'moon' added later.",
      "Specular reflections on windows show only one light source.",
      "Moon size vs. skyline is inconsistent with lens focal length."
    ],
    tips: [
      "Use reverse image search to find earlier versions.",
      "Check reflections/shadows for extra light sources.",
      "Zoom in on edges—look for soft halos/blending artifacts."
    ],
    sources: [
      { name: "How to reverse image search", url: "https://images.google.com/" },
      { name: "TinEye", url: "https://tineye.com/" }
    ]
  },
  {
    id: "ufo-parade-clip",
    title: "Clip claims a UFO hovered over a parade for 12 minutes",
    summary:
      "A shaky smartphone video shows a bright disc above a street parade. Captions claim 'no sound' and 'no planes nearby'.",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format",
    type: "Video",
    category: "World",
    status: "Likely Fake",
    verdict: "Likely Fake",
    publishedAt: "2025-09-10T08:05:00Z",
    evidence: [
      "Object edges remain pin-sharp despite camera shake—common in compositing.",
      "Light falloff on buildings doesn't change as the object 'moves'.",
      "Audio spectrogram reveals copy-pasted wind loop."
    ],
    tips: [
      "Look for motion mismatch between camera shake and object.",
      "Frame-by-frame: does the light affect the scene consistently?",
      "Check audio for loops/cuts."
    ],
    sources: [
      { name: "InVID video analysis (keyframes)", url: "https://www.invid-project.eu/tools-and-services/invid-verification-plugin/" }
    ]
  },
  {
    id: "dragon-market",
    title: "AI image shows 'dragon above medieval market' shared as historical painting",
    summary:
      "A widely shared image is presented as a 'rediscovered 14th-century painting'.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format",
    type: "Image",
    category: "Culture",
    status: "Debunked",
    verdict: "Fake",
    publishedAt: "2025-09-09T16:30:00Z",
    evidence: [
      "Finger counts and jewelry merge artifacts visible at 2× zoom.",
      "Inscription text is warped and inconsistent across letters.",
      "No museum accession record; first appearance is this week."
    ],
    tips: [
      "Zoom into hands, ears, and text for tell-tale AI artifacts.",
      "Search museum databases or catalog IDs.",
      "Check if uploader shares multiple 'discoveries' in days."
    ],
    sources: []
  },
  {
    id: "miracle-cure",
    title: "Post claims a 'plant tincture' cures all chronic pain in 48 hours",
    summary:
      "Promotional posts link to a storefront with 'doctor testimonials'.",
    image:
      "https://images.unsplash.com/photo-1520975661595-6456f1dd4f68?q=80&w=1200&auto=format",
    type: "Claim",
    category: "Health",
    status: "Misleading",
    verdict: "Misleading",
    publishedAt: "2025-09-09T09:00:00Z",
    evidence: [
      "Testimonials are stock photos tied to unrelated names.",
      "No randomized trials; citations point to petri-dish studies.",
      "Refund policy requires non-existent 'lab confirmation'."
    ],
    tips: [
      "Beware miracle cures + storefronts + testimonial collages.",
      "Look for peer-reviewed trials; read the outcomes & limitations.",
      "Check the refund policy for impossible conditions."
    ],
    sources: []
  },
  {
    id: "storm-splits-ocean",
    title: "Timelapse shows storm 'splitting the ocean in half'",
    summary:
      "A dramatic time-lapse claims a storm carved a perfect straight trench.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format",
    type: "Video",
    category: "Science",
    status: "Debunked",
    verdict: "Fake",
    publishedAt: "2025-09-08T21:45:00Z",
    evidence: [
      "Seam line aligns with compression blocks between frames.",
      "Waves keep a constant pattern despite 'trench' appearing.",
      "Weather data that hour shows no such event."
    ],
    tips: ["Scrub frame-by-frame for repeating blocks.", "Compare with local weather archives."],
    sources: []
  },
  {
    id: "castle-on-clouds",
    title: "Photo of a castle 'floating on clouds' over a highway",
    summary:
      "Goes viral as 'rare mirage'; actually a composite of stock photos.",
    image:
      "https://images.unsplash.com/photo-1520975922284-9bcd5f0b9d46?q=80&w=1200&auto=format",
    type: "Image",
    category: "World",
    status: "Debunked",
    verdict: "Fake",
    publishedAt: "2025-09-08T07:20:00Z",
    evidence: ["Edges glow uniformly; foreground reflections don't match.", "Stock castle appears on multiple wallpaper sites."],
    tips: ["Check for identical castle on wallpaper sites.", "Reflections in cars/windows should mirror the object."],
    sources: []
  }
];
