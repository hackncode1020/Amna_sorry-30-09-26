/**
 * CONFIGURATION OBJECT
 * You can easily customize sister and brother names, photos, and song URL here.
 * The website dynamically reflects all changes made here.
 */
export interface MemoryPhoto {
  id: string;
  title: string;
  subtitle: string;
  url: string; // If empty or fails, shows a graceful artistic placeholder card
  caption: string;
}

export const CONFIG = {
  sisterName: "Amna",
  brotherName: "Abdaal Manzoor",
  // Replace this with any direct MP3 audio URL, e.g. "https://example.com/song.mp3"
  // If set to "SONG_URL_HERE" or left blank, the website uses a built-in soft soothing piano lullaby generator!
  // If it's a YouTube link, an "Open Song 🎵" button will be displayed cleanly.
  songUrl: "SONG_URL_HERE",
  songTitle: "A Gentle Piano Lullaby For My Sister",
  
  // Photo URLs for the memory section:
  // If left as placeholders or if the URL fails to load, a beautiful artistic illustrated card is shown gracefully
  photos: [
    {
      id: "memory-1",
      title: "Add Your Favorite Memory",
      subtitle: "The days that made us smile",
      url: "PHOTO_URL_1",
      caption: "From childhood mischief to growing up together.",
    },
    {
      id: "memory-2",
      title: "Add A Funny Memory",
      subtitle: "When we couldn't stop laughing",
      url: "PHOTO_URL_2",
      caption: "The goofy fights and inside jokes nobody else understands.",
    },
    {
      id: "memory-3",
      title: "Add A Special Moment",
      subtitle: "A day worth cherishing",
      url: "PHOTO_URL_3",
      caption: "Moments that remind me how blessed I am to have you as my sister.",
    },
    {
      id: "memory-4",
      title: "Add Your Best Photo Together",
      subtitle: "Brother & Sister forever",
      url: "PHOTO_URL_4",
      caption: "Through every disagreement, you will always be my sister.",
    },
  ] as MemoryPhoto[],
};
