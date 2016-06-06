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
    Object.assign(this, R.mapObjIndexed(
      R.compose(
        (fmt, key) => (value) => {
          const payload = fmt(value)
          return new Msg({payload, from, to})
        },
      , spec
    ))
  }

  const isMsg = R.is(Msg)
  const isFrom = R.curry(
    (source, msg) => isMsg(msg) && msg.from === source)
  const isFor = R.curry(
    (target, msg) => isMsg(msg) && R.contains(target, msg.to))

  Object.assign(ElmoMsg, {isMsg, isFrom, isFor})
  return ElmoMsg
}

export function msgSender (Msg) {
  const msgSink = S.shame()
  const msgSend = R.mapObjIndexed(
    R.compose(msgSink.shamefullySendNext, R.__)
    , Msg)
  return {msgSend, msgSink}
}
