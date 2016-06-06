// -*- js -*-

import S from '../stream'
import {elmoComponent} from './component'

export function makeElmoDriver(Elmo, flags) {
  function elmoDriver (msgSource) {
    const elmo = elmoComponent(Elmo, flags, msgSource)
    return elmo
  }
  return elmoDriver
}
