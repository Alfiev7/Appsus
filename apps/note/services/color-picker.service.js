const colors = {
  lightgray: '#eeeeee',
  beige: '#e9e3d4',
  blossom: '#f6e2dd',
  lightpurple: '#d3bfdb',
  storm: '#aeccdc',
  gray: '#d4e4ed',
  green: '#b4ddd3',
  lightgreen: '#e2f6d3',
  yellow: '#fff8b8',
  orange: '#f39f76',
  salmon: '#faafa8',
}
const backgrounds = {
  groceries: `url('https://www.gstatic.com/keep/backgrounds/grocery_light_0609_rtl.svg')`,
  food: `url('https://www.gstatic.com/keep/backgrounds/food_light_0609_rtl.svg')`,
  food: `url('https://www.gstatic.com/keep/backgrounds/food_light_0609_rtl.svg')`,
  music: `url('https://www.gstatic.com/keep/backgrounds/music_light_0609_rtl.svg')`,
  recipe: `url('https://www.gstatic.com/keep/backgrounds/recipe_light_0609_rtl.svg')`,
  note: `url('https://www.gstatic.com/keep/backgrounds/notes_light_0609_rtl.svg')`,
  places: `url('https://www.gstatic.com/keep/backgrounds/places_light_0609_rtl.svg')`,
  travel: `url('https://www.gstatic.com/keep/backgrounds/travel_light_0614_rtl.svg')`,
  video: `url('https://www.gstatic.com/keep/backgrounds/video_light_0609_rtl.svg')`,
  celebration: `url('https://www.gstatic.com/keep/backgrounds/celebration_light_0714_rtl.svg')`,
}

export const colorPickerService = {
  getColors,
  getBackgrounds,
}

function getColors() {
  return colors
}

function getBackgrounds() {
  return backgrounds
}
