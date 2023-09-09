export function NoteLabels({ note, onRemoveLabel }) {
  const {
    id,
    info: { labels },
  } = note

  function capitalizeLabel(labelName) {
    return labelName.charAt(0).toUpperCase() + labelName.slice(1)
  }

  return (
    <div className='note-labels'>
      {(labels &&
        labels.length &&
        labels.map(({ color, txt }, index) => (
          <span key={index} className='label-item' style={{ backgroundColor: color }}>
            {capitalizeLabel(txt)}
            <a className='material-symbols-outlined icon icon-close' onClick={() => onRemoveLabel(id, index)}>
              close
            </a>
          </span>
        ))) ||
        ''}
    </div>
  )
}
