// -*- js -*-

import {run} from '../src/hellcycle'
import {makeElmoDriver, makeElmoComponent} from '../src/elmo'
import {makeInfernoDriver} from '../src/inferno'

import S from '../src/stream'
import R from 'ramda'
import Counter from './counter'

run(main, drivers())

function main ({msg$, counter, inferno}) {
  return {
    counter: S.filter(Counter.Msg.isMsg, msg$),
    msg$:    counter.msg$,
    inferno: counter.view$
  }
}

function drivers() {
  return {
    msg$:    R.identity,
    counter: makeElmoComponent(Counter),
    inferno: makeInfernoDriver(document.body)
  }
}
