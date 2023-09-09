import { colorPickerService } from '../services/color-picker.service.js'

const { useState } = React

export function ColorPicker({ onChangeColor, note }) {
  const [selectedColor, setSelectedColor] = useState(null)

  const colors = colorPickerService.getColors()
  const backgrounds = colorPickerService.getBackgrounds()

  function handleColorChange(noteId, color, isBackground = false) {
    onChangeColor(noteId, color, isBackground)
    setSelectedColor(color)
  }

  return (
    <div className='background-container'>
      <div className='color-picker'>
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
      <hr />
      <div className='color-picker'>
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
