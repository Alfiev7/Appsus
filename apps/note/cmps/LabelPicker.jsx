const { useState } = React

export function LabelPicker({ onAddLabel, note }) {
  const [selectedLabel, setSelectedLabel] = useState(null)

  const labels = {
    critical: '#D84727',
    work: '#CDEDF6',
    family: '#a569da',
    memories: '#5EB1BF',
  }

  function handleLabelPicked(noteId, label) {
    onAddLabel(noteId, label)
    setSelectedLabel(label)
  }

  return (
    <div className='label-picker'>
      {Object.keys(labels).map((label, index) => {
        const isSelected = selectedLabel === labels[label]
        return (
          <article
            className={`${label} ${isSelected ? 'picked' : ''}`}
            title={label}
            key={index}
            style={{ backgroundColor: labels[label] }}
            onClick={() => handleLabelPicked(note.id, { txt: label, color: labels[label] })}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </article>
        )
      })}
    </div>
  )
}
