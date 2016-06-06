// -*- js -*-

import S from '../stream'
import R from 'ramda'

export function elmoMsg (spec) {
  function Msg (props) {
    Object.defineProperties(this, R.mapObjIndexed(
      value => ({ get: () => value })
      , props))
  }

  function ElmoMsg (from, ...to) {
    return R.mapObjIndexed(
      R.compose(
        (fmt, subject) => (value) => {
          const payload = fmt(value)
          return new Msg({subject, payload, from, to})
        })
      , spec
    )
  }

  const isMsg = R.is(Msg)
  const isFrom = R.curry(
    (source, msg) => isMsg(msg) && msg.from === source)
  const isFor = R.curry(
    (target, msg) => isMsg(msg) && R.contains(target, msg.to))

  Object.assign(ElmoMsg, {isMsg, isFrom, isFor})
  return ElmoMsg
}

export function msgBySubject (msgSource, ...subjects) {
  const filter = (subject) => msgSource.filter(
    msg => msg.subject === subject)
  return R.compose(
    R.fromPairs,
    R.map(subject => [subject, filter(subject)])
  )(subjects)
}

export function msgSender (Msg) {
  const msgSink = S.shame()
  const msgSend = R.mapObjIndexed(
    (fmt) => (value) => msgSink.shamefullySendNext(fmt(value))
    , Msg)
  return {msgSend, msgSink}
}
