export function RateByTextbox({ val = '', onChangeVal }) {
  return (
    <label>
      <input
        placeholder='Insert your rating here...'
        min={1}
        max={5}
        type='number'
        value={val}
        onChange={ev => {
          onChangeVal(ev.target.value)
        }}
      />
    </label>
  )
}
