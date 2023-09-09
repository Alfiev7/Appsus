const { useState } = React

export function RateByStars({ onChangeVal }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  return (
    <div className='star-rating'>
      {[...Array(5)].map((_, index) => {
        index += 1
        return (
          <button
            type='button'
            key={index}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => {
              setRating(index)
              onChangeVal(index)
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className='star'>
              <i className='fa-solid fa-star fa-lg'></i>
            </span>
          </button>
        )
      })}
    </div>
  )
}
