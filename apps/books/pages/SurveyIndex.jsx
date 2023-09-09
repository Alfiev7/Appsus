import { DynamicCmp } from '../cmps/rating/DynamicCmp.jsx'
import { ratingService } from '../services/rating.service.js'

const { useState, useEffect } = React

export function SurveyIndex({ onSetRating }) {
  const [survey, setSurvey] = useState(null)
  const [answersMap, setAnswersMap] = useState({})
  const [selectedComponent, setSelectedComponent] = useState('RateByStars')

  useEffect(() => {
    ratingService.getById().then(survey => {
      setSurvey(survey)
    })
  }, [])

  function onChangeVal(id, val) {
    const answersToSave = { ...answersMap }
    answersToSave[id] = val
    setAnswersMap(answersToSave)
    onSetRating(val)
  }

  if (!survey) return '<div></div>'

  const style = {
    backgroundColor: '',
    padding: '5px',
    margin: '5px',
  }

  return (
    <section className='survey-app'>
      <div>
        <input
          type='radio'
          id='rateByStars'
          value='RateByStars'
          checked={selectedComponent === 'RateByStars'}
          onChange={() => setSelectedComponent('RateByStars')}
        />
        <label htmlFor='rateByStars'>Rate By Stars</label>
      </div>

      <div>
        <input
          type='radio'
          id='rateByTextbox'
          value='RateByTextbox'
          checked={selectedComponent === 'RateByTextbox'}
          onChange={() => setSelectedComponent('RateByTextbox')}
        />
        <label htmlFor='rateByTextbox'>Rate By Textbox</label>
      </div>

      <div>
        <input
          type='radio'
          id='rateBySelect'
          value='RateBySelect'
          checked={selectedComponent === 'RateBySelect'}
          onChange={() => setSelectedComponent('RateBySelect')}
        />
        <label htmlFor='rateBySelect'>Rate By Select</label>
      </div>

      <div key={survey.cmps.id} style={style}>
        <DynamicCmp
          type={selectedComponent}
          info={ratingService.getComponentInfo(selectedComponent)}
          val={answersMap[survey.cmps.id] || ''}
          onChangeVal={val => onChangeVal(survey.cmps.id, val)}
        />
      </div>
    </section>
  )
}
