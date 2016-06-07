// -*- mode: js -*-

import S from '../src/stream'
import R from 'ramda'

import {elmoMsg, elmoLens, updateBySubject} from '../src/elmo'

import Inferno from 'inferno'
import InfernoDOM from 'inferno-dom'

// type
const Msg = elmoMsg({
  Inc: R.always
})

// type
const Model = elmoLens({
  // the model lens lets you retrieve the whole model
  model: R.lens(R.identity, R.identity),

  // but you'd prefer to use lens to keep it functional
  count: R.lensProp('count')
})

// init : Flags -> Model
function init (flags) {
  const initialModel = { count: 0 }
  return initialModel
}

// Msg -> ModelLens -> Model
const update = {
  Inc: (n, ml) => ml.count(R.add(n))
}

// view : MsgComposer -> ModelRead -> Html Msg
function view ({ Inc }, modelRead$) {
  return modelRead$.map(model =>
    <div>
      <p>Count: { model.count }</p>
      <button onClick={ Inc(1) }>Inc</button>
      <button onClick={ Inc(-1) }>Dec</button>
      <button onClick={ Inc(-model.count) }>Reset</button>
    </div>
  )
}


const Counter = {Msg, Model, init, view, update}
export default Counter
