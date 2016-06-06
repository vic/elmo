// -*- js -*-
import R from 'ramda'

export function elmoLens (spec) {
  function LensView (model) {
    Object.defineProperties(this, R.mapObjIndexed(
      lens => ({ get: () => R.view(lens, model) })
      , spec))
  }

  const lenses = R.construct(LensView)
  Object.assign(lenses, spec)
  return lenses
}
