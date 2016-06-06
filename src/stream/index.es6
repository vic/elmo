// -*- js -*-

import R from 'ramda'
import FlydAdapter from './flyd_adapter'

export default function Stream (lib) {
  return defaultAdapter()
}

Object.extend(Stream, defaultAdapter())

function defaultAdapter () {
  return new FlydAdapter(require('flyd'))
}
