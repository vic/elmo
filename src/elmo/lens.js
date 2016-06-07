// -*- js -*-
import R from 'ramda'

// Get-Set-Mutate for R.lens
const RGSM = {
  get: R.view, // lens -> model -> model
  set: R.set,  // lens -> value -> model -> model
  mut: R.over  // lens -> mutate -> model -> model
}

export function elmoLens (spec, gsm) {
  const lens = {}
  Object.assign(lens, spec, {
    readOnly: readOnlyLens(spec, gsm || RGSM),
    readWrite: readWriteLens(spec, gsm || RGSM)
  })
  return lens
}

function readWriteLens (spec, {get, set, mut}) {
  return buildLens(spec, (lens, model) => ({
    __proto__: null,
    get: () => {
      const gsm = {
        get: () => get(lens, model),
        set: (value) => set(lens, value, model),
        mut: (mutate) => mut(lens, mutate, model)
      }
      function rwLens (value) {
        return arguments.length === 0
          ? gsm.get()
          : R.is(Function, value)
          ? gsm.mut(value)
          : gsm.set(value)
      }
      Object.assign(rwLens, {lens}, gsm)
      return rwLens
    }
  }))
}

function readOnlyLens (spec, {get}) {
  return buildLens(spec, (lens, model) => ({
    __proto__: null,
    get: () => get(lens, model)
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
