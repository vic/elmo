// -*- js -*-

import R from 'ramda'
import S from '../stream'
import {msgPipe} from './msg'


export function elmoComponent (component, flags, msgSource) {
  const {Msg, Model, init, view, update} = component

  const msgToSelf = Msg(component, component)
  const {msgSend, msgSink} = msgSender(msgToSelf)
  const msgForSelf$ = msgSource.filter(Msg.isFor(component))

  const initModel = component.init(flags)
  const modelMimic$ = S.mimic()
  const modelView$ = modelMimic$.map(Model)

  const update$ = update(msgForSelf$, modelMimic$)
  const view$ = view(msgSend, modelView$)

  const model$ = modelMimic$.imitate(
    S.merge(S.stream(initModel), update$))

  return {model$, view$, msg$: msgSink}
}
