export const ratingService = {
  getById,
  getComponentInfo,
}

function getById() {
  return Promise.resolve(survey)
}

function getComponentInfo(type) {
  return survey.cmps.find(cmp => cmp.type === type).info
}

const survey = {
  title: 'Rating Options',
  cmps: [
    {
      type: 'RateByStars',
      id: 'c101',
      info: {},
    },
    {
      type: 'RateByTextbox',
      id: 'c103',
      info: {},
    },
    {
      type: 'RateBySelect',
      id: 'c102',
      info: {
        opts: [1, 2, 3, 4, 5],
      },
    },
  ],
}
