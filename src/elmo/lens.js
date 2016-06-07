// -*- js -*-
import R from 'ramda'

export function elmoLens (spec, lensReader) {
  const lens = {}
  Object.assign(lens, spec, {
    readOnly: readOnlyLens(spec, lensReader)
  })
  return lens
}

function readOnlyLens (spec, reader) {
  const lensReader = reader || R.view
  return buildLens(spec, (lens, model) => ({
    __proto__: null,
    get: () => lensReader(lens, model)
  }))
}

function buildLens (spec, descriptorFn) {
  function ModelLens (model) {
    Object.defineProperties(this, R.mapObjIndexed(
      lens => descriptorFn(lens, model),
      spec))
  }
  return R.construct(ModelLens)
}
