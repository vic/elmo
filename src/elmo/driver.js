// -*- js -*-

import S from '../stream'
import {elmoComponent} from './component'

export function makeElmoDriver(Elmo, flags) {
  function elmoComponentDriver (msgSource) {
    const elmo = elmoComponent(Elmo, flags, msgSource)
    return elmo
  }
  return elmoComponentDriver
}

