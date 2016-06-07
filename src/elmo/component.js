// -*- js -*-

import R from 'ramda'
import S from '../stream'
import {msgSender, msgPayloadBySubject} from './msg'
import {updateFn} from './update'

export function elmoComponent (component, flags, msgSource) {
  const {Msg, Model, init, view, update} = component

  const msgToSelf = Msg(component, component)
  const {msgSend, msgSink} = msgSender(msgToSelf)
  const msgForSelf = msgSource.filter(Msg.isFor(component))
  const msgBySubject = msgPayloadBySubject(
    msgForSelf, ...R.keys(msgSend))

  const initModel = component.init(flags)
  const modelMimic$ = S.mimic()
  const modelRo$ = modelMimic$.map(Model.readOnly)
  const modelRw$ = modelMimic$.map(Model.readWrite)

  const update$ = updateFn(update)(msgBySubject, modelRw$)
  const view$ = view(msgSend, modelRo$)

  const model$ = modelMimic$.imitate(
    S.merge(S.stream(initModel), update$))

  return {model$, view$, msg$: msgSink}
}
