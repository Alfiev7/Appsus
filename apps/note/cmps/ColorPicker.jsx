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

  function handleColorChange(noteId, color) {
    onChangeColor(noteId, color)
    setSelectedColor(color)
  }

  return (
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
  )
}
