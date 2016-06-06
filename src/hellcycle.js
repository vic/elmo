// -*- js -*-

import R from 'ramda'
import S from './stream'

export function run (main, drivers) {
  console.log('jaja')

  const mimics  = R.mapObjIndexed(_ => S.mimic(), drivers)
  const sources = R.mapObjIndexed((m, k) => drivers[k](m), mimics)
  const sinks   = main(sources)

  R.compose(
    R.map(([key, sink]) => mimics[key].imitate(sink)),
    R.filter(R.identity),
    R.mapObjIndexed((s, k) => S.isStream(s) && [k, s])
  )(sinks)

  return {sinks}
}
