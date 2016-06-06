// -*- js -*-

export default function FlydAdapter() {
  const adapter = this

  const flyd = require('flyd')
  const flydFilter = require('flyd/module/filter')

  function Stream (stream) {
    if (!flyd.isStream()) {
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
    const unadapt = (...args) =>
          R.map(a => isStream(a) ? a.unadapted : a, args)
    const apply = R.apply(fn)
    return R.compose(adapter.adapt, apply, unadapt)
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

  function shameStream (shame) {
    shame.shamefullySendNext = shame.unadapted
    return shame
  }

  function mimicStream (mimic) {
    mimic.imitate = (source) => { source.map(mimic.unadapted) }
    return mimic
  }

  Object.assign(this, {
    adapt    : R.construct(Stream),
    stream   : adapt(flyd.stream),
    merge    : adapt(flyd.merge),
    filter   : adapt(flyd.filter),
    isStream : isStream,
    mimic    : R.compose(mimic, adapt, flyd.stream),
    shame    : R.compose(shame, adapt, flyd.stream),
    combine  : adapt(combineLatest),
  })

}
