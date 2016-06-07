// -*- js -*-

import R from 'ramda'
import S from '../stream'

export function updateFn (update) {
  return R.is(Function, update) ? update : updateBySubject(update)
}

function UpdateBySubject (Updates, Msg, model$) {
  const mutations = R.mapObjIndexed(
    (mutate, subject) =>
      S.withLatestFrom(mutate, Msg[subject], model$)
    , Updates)
  return mergeMutations(mutations)
}

function mergeMutations(mutations) {
  const [first, ...rest] = R.values(mutations)
  return R.reduce(S.merge, first, rest)
}

const updateBySubject = R.curry(UpdateBySubject)
export {updateBySubject}
