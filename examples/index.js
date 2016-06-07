// -*- js -*-

import {run} from '../src/hellcycle'
import {makeElmoDriver} from '../src/elmo'
import {makeInfernoDriver} from '../src/inferno'

import Counter from './counter'

run(main, drivers())

function main ({counter, inferno}) {
  return {
    counter: counter.msg$,
    inferno: counter.view$
  }
}

function drivers() {
  return {
    counter: makeElmoDriver(Counter),
    inferno: makeInfernoDriver(document.body)
  }
}
