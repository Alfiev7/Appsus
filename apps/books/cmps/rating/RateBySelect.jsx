export function RateBySelect({ info, val = '', onChangeVal }) {
  const { opts } = info
  return (
    <label>
      <select
        value={val}
        onChange={ev => {
          onChangeVal(ev.target.value)
        }}
      >
        <option value=''>Select an option</option>
        {opts.map(opt => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}
