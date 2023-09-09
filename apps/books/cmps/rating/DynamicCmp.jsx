import { RateBySelect } from './RateBySelect.jsx'
import { RateByStars } from './RateByStars.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'

export function DynamicCmp(props) {
  switch (props.type) {
    case 'RateByTextbox':
      return <RateByTextbox {...props} />
    case 'RateBySelect':
      return <RateBySelect {...props} />
    case 'RateByStars':
      return <RateByStars {...props} />
  }
}
