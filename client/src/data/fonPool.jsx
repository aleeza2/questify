// Mixed images/videos. Replace/add your own items anytime.
// id must be unique; isFake marks the ground truth.

export const MEDIA_POOL = [
  {
    id: "christmas",
    mediaUrl:
      "https://api.deepai.org/job-view-file/5c02b855-944e-4b93-926f-be74f177ec21/outputs/output.jpg",
    mediaType: "image",
    isFake: true,
    title: "Christmas night",
  },
  {
    id: "scenic",
    mediaUrl:
      "https://c4.wallpaperflare.com/wallpaper/176/397/237/real-nature-hd-1920x1200-wallpaper-preview.jpg",
    mediaType: "image",
    isFake: false,
    title: "Mountains",
  },
  {
    id: "River mountain",
    mediaUrl:
      "https://e0.pxfuel.com/wallpapers/516/620/desktop-wallpaper-nature-real.jpg",
    mediaType: "image",
    isFake: false,
    title: "River Mountain",
  },
  {
    id: "Night city",
    mediaUrl:
      "https://api.deepai.org/job-view-file/f7db84b2-1fc0-4052-a52f-0f1ebb6f5633/outputs/output.jpg",
    mediaType: "image",
    isFake: true,
    title: "Night city",
  },
  {
    id: "ufo-clip",
    mediaUrl:
      "/videos/fakevid.mp4",
    mediaType: "video",
    isFake: true,
    title: "‘UFO over town’ (clip)",
  },
];
