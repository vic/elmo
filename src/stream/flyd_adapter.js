// -*- js -*-
import R from 'ramda'
import flyd from 'flyd'
import flydFilter from 'flyd/module/filter'
import flydSwitch from 'flyd/module/switchlatest'

export default function FlydAdapter() {
  const adapter = this

  function Stream (stream) {
    if (!flyd.isStream(stream)) {
      throw 'Can only adapt flyd streams'
    }

    Object.assign(this, {
      adapter: adapter,
      unadapted: stream,
      map: adapt(R.partialRight(flyd.map, [stream])),
      filter: adapt(R.partialRight(flydFilter, [stream]))
    })
  }

  const isStream = R.is(Stream)

  function adapt(fn) {
    const unadapt = R.map(a => isStream(a) ? a.unadapted : a)
    return function (...args) {
      return adapter.adapt(fn(...unadapt(args)))
    }
  }

  function withLatestFrom(project, A, B) {
    const stream = B.map(b => A.map(a => project(a, b)))
    return flydSwitch(stream)
  }

  function combineLatest(project, ...streams) {
    function valueProject(...args) {
      return R.compose(
        R.apply(project),
        R.map(s => s()),
        R.slice(0, -2) // except flyd.combine two last args
      )(args)
    }
    return flyd.combine(valueProject, streams);
  }

  function shameStream () {
    const stream = flyd.stream()
    const shame = adapter.adapt(stream)
    shame.shamefullySendNext = (v) => stream(v)
    return shame
  }

  function mimicStream () {
    const stream = flyd.stream()
    const mimic = adapter.adapt(stream)
    function imitate (source) {
      flyd.endsOn(source.end, stream)
      source.map(stream)
      return source
    }
    mimic.imitate = adapt(imitate)
    return mimic
  }

  Object.assign(this, {
    adapt    : R.construct(Stream),
    stream   : adapt(flyd.stream),
    merge    : adapt(flyd.merge),
    filter   : adapt(flydFilter),
    isStream : isStream,
    mimic    : mimicStream,
    shame    : shameStream,
    combine  : adapt(combineLatest),
    scan     : adapt(flyd.scan),
    withLatestFrom : adapt(withLatestFrom)
  })

}
