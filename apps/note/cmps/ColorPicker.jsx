const { useState } = React

export function ColorPicker({ onChangeColor, note }) {
  const [selectedColor, setSelectedColor] = useState(null)

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

  function handleColorChange(noteId, color, isBackground = false) {
    console.log('color', color)
    onChangeColor(noteId, color, isBackground)
    setSelectedColor(color)
  }

  return (
    <div className='background-container'>
      <div className='color-picker'>
        {/* First set of color pickers */}
        {Object.keys(colors).map((color, index) => {
          const isSelected = selectedColor === colors[color]
          return (
            <article
              className={`${color} ${isSelected ? 'picked' : ''}`}
              title={color}
              key={index}
              style={{ backgroundColor: colors[color] }}
              onClick={() => handleColorChange(note.id, colors[color])}
            ></article>
          )
        })}
        <article
          className={`material-icons-outlined no-color ${selectedColor === '#fff' ? 'picked' : ''}`}
          onClick={() => handleColorChange(note.id, '#fff')}
        >
          format_color_reset
        </article>
      </div>
      <hr /> {/* Horizontal line separator */}
      <div className='color-picker'>
        {/* Second set of color pickers */}
        {Object.keys(backgrounds).map((background, index) => {
          const isSelected = selectedColor === backgrounds[background]
          return (
            <article
              className={`${background} ${isSelected ? 'picked' : ''}`}
              title={background}
              key={index + background}
              style={{ background: backgrounds[background], backgroundSize: 'cover' }}
              onClick={() => handleColorChange(note.id, backgrounds[background], true)}
            ></article>
          )
        })}
        <article
          className={`material-icons-outlined no-color ${selectedColor === '#fff' ? 'picked' : ''}`}
          onClick={() => handleColorChange(note.id, '#fff')}
        >
          hide_image
        </article>
      </div>
    </div>
  )
}

//   return (
//     <React.Fragment>
//       <div className='color-picker'>
//         {Object.keys(colors).map((color, index) => {
//           const isSelected = selectedColor === colors[color]
//           return (
//             <article
//               className={`${color} ${isSelected ? 'picked' : ''}`}
//               title={color}
//               key={index}
//               style={{ backgroundColor: colors[color] }}
//               onClick={() => handleColorChange(note.id, colors[color])}
//             ></article>
//           )
//         })}
//         <article
//           className={`material-icons-outlined no-color ${selectedColor === '#fff' ? 'picked' : ''}`}
//           onClick={() => handleColorChange(note.id, '#fff')}
//         >
//           format_color_reset
//         </article>
//       </div>
//       <div className='color-picker'>
//         {Object.keys(backgrounds).map((background, index) => {
//           const isSelected = selectedColor === backgrounds[background]
//           return (
//             <article
//               className={`${background} ${isSelected ? 'picked' : ''}`}
//               title={background}
//               key={index + background}
//               style={{ background: backgrounds[background], backgroundSize: 'cover' }}
//               onClick={() => handleColorChange(note.id, backgrounds[background], true)}
//             ></article>
//           )
//         })}
//         <article
//           className={`material-icons-outlined no-color ${selectedColor === '#fff' ? 'picked' : ''}`}
//           onClick={() => handleColorChange(note.id, '#fff')}
//         >
//           hide_image
//         </article>
//       </div>
//     </React.Fragment>
//   )
// }
