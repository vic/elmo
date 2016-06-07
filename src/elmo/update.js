// -*- js -*-

import R from 'ramda'
import S from '../stream'

function UpdateBySubject (Updates, Msg, model$) {
  const mutations = R.mapObjIndexed(
    (mutate, subject) =>
      S.withLatestFrom(mutate, Msg[subject], model$)
      .map(x => {
        console.log('New update ', x)
        return x
      })
    , Updates)
  return mergeMutations(mutations)
    .map(x => {
      console.log('All updates', x)
      return x
    })
}

function mergeMutations(mutations) {
  const [first, ...rest] = R.values(mutations)
  return R.reduce(S.merge, first, rest)
}

const updateBySubject = R.curry(UpdateBySubject)
export {updateBySubject}
