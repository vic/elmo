// -*- mode: js -*-

import S from './../src/stream'
import R from 'ramda'

import {elmoMsg, elmoLens} from './../src/elmo'

import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'

// type
const Msg = elmoMsg({
  Inc:   R.always
})

// type
const Model = elmoLens({
  count: R.lensProp('count')
})

// init : Flags -> Model
function init (flags) {
  const initialModel = { count: 0 }
  return initialModel
}

// update : Msg -> Model -> Model
function update ({ Inc$ }, model$) {
  const inc = R.over(Model.count, R.inc)
  return S.combine(inc, model$, Inc$)
}

// view : CompMsg -> ModelView -> ViewOpt Html Msg
function view ({Inc}, modelView$) {
  return modelView$.map(
    mview =>
      <div>
        <p>Count: { mview.count }</p>
        <button onClick={ Inc(1) }>Inc</button>
      </div>
  )
}


const Counter = {Msg, Model, init, view, update}
export default Counter
