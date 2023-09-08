export function NoteLabels({ note, onRemoveLabel }) {
  const {
    id,
    info: { labels },
  } = note
  return (
    <div className='note-labels'>
      {(labels &&
        labels.length &&
        labels.map(({ color, txt }, index) => (
          <span key={index} className='label-item' style={{ backgroundColor: color }}>
            {txt.charAt(0).toUpperCase() + txt.slice(1)}
            <a className='material-symbols-outlined icon icon-close' onClick={() => onRemoveLabel(id, index)}>
              close
            </a>
          </span>
        ))) ||
        ''}
    </div>
  )
}
