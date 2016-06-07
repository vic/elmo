// -*- js -*-

import {run} from '../src/hellcycle'
import {makeElmoDriver, makeElmoComponent} from '../src/elmo'
import {makeInfernoDriver} from '../src/inferno'

import S from '../src/stream'
import R from 'ramda'
import Counter from './counter'

run(main, drivers())

function main ({elmoBus, counter, inferno}) {
  return {
    counter: counter.msg$
    inferno: counter.view$
  }
}

function drivers() {
  return {
    counter: makeElmoDriver(Counter),
    inferno: makeInfernoDriver(document.body)
  }
}
