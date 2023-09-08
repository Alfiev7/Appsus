const { useState } = React

export function LongTxt({ txt, length = 200 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <React.Fragment>
      {(txt.length <= length && txt) || (
        <span onClick={() => !isExpanded && setIsExpanded(true)} onBlur={() => setIsExpanded(false)}>
          {isExpanded ? txt : txt.substring(0, length)}
          <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '   Less' : ' ...'}
          </span>
        </span>
      )}
    </React.Fragment>
  )
}
