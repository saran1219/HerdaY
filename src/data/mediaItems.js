// Birthday tribute media — Cloudinary + local /public photos (e.g. /photo1.png).
// Growth timeline: set `age` (0–20) and `timelineLabel` per entry; order follows age.
// Captions stay as the personal line for cards, modal, and timeline subtitles.
export const mediaItems = [
  {
    id: 1,
    type: 'photo',
    age: 3,
    timelineLabel: 'Little spark',
    src: 'https://res.cloudinary.com/dyvdwi1yj/image/upload/v1773853835/WhatsApp_Image_2025-11-08_at_17.33.10_946f376a_vlbypk.jpg',
    thumbnail:
      'https://res.cloudinary.com/dyvdwi1yj/image/upload/c_fill,w_400,h_530,q_auto,f_auto/v1773853835/WhatsApp_Image_2025-11-08_at_17.33.10_946f376a_vlbypk.jpg',
    alt: 'Memory',
    caption: '💖 Always Cherished',
    color: '#fb7185',
  },
  {
    id: 2,
    type: 'photo',
    age: 6,
    timelineLabel: 'Bright eyes',
    src: '/photo1.png',
    thumbnail: '/photo1.png',
    alt: 'Birthday Cake',
    caption: '🎂 A Sweet New Chapter',
    color: '#f59e0b',
  },
  {
    id: 3,
    type: 'photo',
    age: 9,
    timelineLabel: 'Finding your laugh',
    src: '/photo2.png',
    thumbnail: '/photo2.png',
    alt: 'Party with Friends',
    caption: '🥳 Squad Goals Forever',
    color: '#c084fc',
  },
  {
    id: 4,
    type: 'photo',
    age: 12,
    timelineLabel: 'Growing bold',
    src: '/photo3.png',
    thumbnail: '/photo3.png',
    alt: 'Birthday Gift',
    caption: '🎁 Wrapped with Love',
    color: '#fde68a',
  },
  {
    id: 5,
    type: 'photo',
    age: 15,
    timelineLabel: 'Golden hours',
    src: '/photo4.png',
    thumbnail: '/photo4.png',
    alt: 'Birthday Flowers',
    caption: '🌸 Blooming Beautifully',
    color: '#fb7185',
  },
  {
    id: 6,
    type: 'photo',
    age: 17,
    timelineLabel: 'Almost there',
    src: '/photo5.png',
    thumbnail: '/photo5.png',
    alt: 'Celebration Toast',
    caption: '🥂 Cheers to You!',
    color: '#fbbf24',
  },
  {
    id: 7,
    type: 'photo',
    age: 20,
    timelineLabel: 'At twenty',
    src: '/photo6.png',
    thumbnail: '/photo6.png',
    alt: 'Birthday Balloons',
    caption: '🎈 Sky is the Limit',
    color: '#a855f7',
  },
];

/** Items with ages, sorted for the horizontal growth timeline */
export function getGrowthTimelineItems() {
  return [...mediaItems]
    .filter((m) => typeof m.age === 'number')
    .sort((a, b) => a.age - b.age);
}
