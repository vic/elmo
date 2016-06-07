// -*- js -*-

import S from '../stream'
import R from 'ramda'

export function elmoMsg (spec) {
  function Msg (props) {
    Object.defineProperties(this, R.mapObjIndexed(
      value => ({ get: () => value })
      , props))
  }

  const newMsg = R.construct(Msg)

  function MsgComposer(from, ...to) {
    return R.mapObjIndexed(
      (envelop, subject) => (event) => (value) => {
        const payload = envelop(value)(event)
        return newMsg({subject, payload, from, to})
      }
      , spec)
  }

  const isMsg = R.is(Msg)
  const isFrom = R.curry(
    (source, msg) => isMsg(msg) && msg.from === source)
  const isFor = R.curry(
    (target, msg) => isMsg(msg) && R.contains(target, msg.to))

  Object.assign(MsgComposer, {isMsg, isFrom, isFor})
  return MsgComposer
}

export function msgPayloadBySubject (msgSource, ...subjects) {
  const filter = (subject) => msgSource.filter(
    msg => msg.subject === subject)
  const value = (msg) => msg.payload
  return R.compose(
    R.fromPairs,
    R.map(subject => [subject, filter(subject).map(value)])
  )(subjects)
}

export function msgSender (Msg) {
  const msgSink = S.shame()
  const msgSend = R.mapObjIndexed(
    (makeMsg, subject) => (value) => (event) =>
      R.compose(msgSink.shamefullySendNext,
                makeMsg(event))(value)
    , Msg)
  return {msgSend, msgSink}
}

