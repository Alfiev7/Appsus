import { showErrorMsg } from '../../../services/event-bus.service.js'
const { useState } = React

export function LabelPicker({ onAddLabel, note }) {
  const [selectedLabel, setSelectedLabel] = useState(null)
  const {
    id,
    info: { labels },
  } = note

  const labelsDB = {
    critical: '#D84727',
    work: '#CDEDF6',
    family: '#a569da',
    memories: '#5EB1BF',
  }

  function handleLabelPicked(noteId, label) {
    if (labels && labels.length && labels.some(l => l.txt === label.txt)) {
      showErrorMsg('Label already exists')
      return
    }
    onAddLabel(noteId, label)
    setSelectedLabel(label)
  }

  return (
    <div className='label-picker'>
      {Object.keys(labelsDB).map((label, index) => {
        const isSelected = selectedLabel === labelsDB[label]
        return (
          <article
            className={`${label} ${isSelected ? 'picked' : ''}`}
            title={label}
            key={index}
            style={{ backgroundColor: labelsDB[label] }}
            onClick={() => handleLabelPicked(id, { txt: label, color: labelsDB[label] })}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </article>
        )
      })}
    </div>
  )
}
