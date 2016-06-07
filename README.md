# elmo - A cyclic elm architectured framework.

ELMo riding a HellCycle down to Inferno

### About

Elmo is my experiment for trying to unify some concepts from two of
my favourite js projects: [Cycle][cycle] and [Elm][elm].
I tend to learn by doing, and this experiment is helping me
understand better how both cycle and elm work and are designed.

###### Cyclic

Like Cycle, elmo uses [reactive streams][reactive] 
to transform data all the way down and everything
flows by combining those streams using just pure functions.

<img src="https://raw.githubusercontent.com/vic/elmo/master/etc/hellcycle.jpg" width="312">

Elmo has it's own `Cycle.run` function named 
`HellCycle`
used to connect the _side-effect-free_ [Elmo Components][component] 
(things you write like [counter app][counter]) with
_effect-producing_ [drivers](http://cycle.js.org/drivers.html).
Now, being this an experiment I just wanted to implement my own [ten-lines cycle][hellcycle].

In theory it's possible to use any Cycle [Driver](http://cycle.js.org/drivers.html) with elmo as they
have the same interface, it's something I'm planning to experiment this days, and maybe extracting the
[Elmo Driver][elmo_driver] so you could implement Elm-architectured components with Cycle.

<img src="https://raw.githubusercontent.com/vic/elmo/master/etc/elmodriver.gif" width="312">

Elmo has a tiny [stream adaptor][stream] around [Flyd][flyd] but
I expect to experiment with other libraries or even using cycle's
own stream adaptor.

Elmo has a [driver][inferno_driver] for the [Inferno](https://github.com/trueadm/inferno) rendering library.
I'll try to implement something like TodoMVC with elmo and see how that benchmarks.
Also I'd be nice to have a Cycle driver for rendering with Inferno.

<img src="https://raw.githubusercontent.com/vic/elmo/master/etc/hellmo.gif" width="312">

###### [elmish](http://guide.elm-lang.org/architecture/index.html)

Elmo, as it's name implies tries to follow the [Elm Architecture](http://guide.elm-lang.org/architecture/index.html)
so every [component][counter] exposes `init`, `update`, `view` functions along with their `Msg` and `Model` definition.
I'm planning on implementing elmish like `Cmd` and `Subscription` for talking to other existing cyclic drivers.

But instead of calling the `update` or `view` functions everytime, Elmo follows the reactive way, having those
functions receive and return streams for when data needs to be changed.

The view (in the example counter app implemented with inferno's jsx) for example, returns an stream of Inferno DOM
nodes to be updated on the browser by the [Inferno Driver][inferno_driver]

###### functional

I've tried to keep things functional and as pure as possible, and Elmo itself uses [Ramda](ramdajs.com) extensively for this.

One thing I've found interesting on explosing is having the 
Elmo Component's `update` and `view` functions not having direct access to the model object.
Instead, the [`view`][view] has *read-only* access to [lens](http://ramdajs.com/docs/#lens) of the current model.
Even the [`update`][update] function is given just a *read-write* version of the lens to update current state.
- as a side note, of course it's possible get the actual model object, but I was just trying to hide it
to prevent object mutation.


To be continued...


[cycle]: http://cycle.js.org
[elm]: http://elm-lang.org
[flyd]: https://github.com/paldepind/flyd
[stream]: https://github.com/vic/elmo/blob/master/src/stream/flyd_adapter.js
[hellcycle]: https://github.com/vic/elmo/blob/master/src/hellcycle/index.js
[component]: https://github.com/vic/elmo/blob/master/src/elmo/component.js
[elmo_driver]: https://github.com/vic/elmo/blob/master/src/elmo/driver.js
[counter]: https://github.com/vic/elmo/blob/master/examples/counter.js
[inferno_driver]: https://github.com/vic/elmo/blob/master/src/inferno.js
[reactive]: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
[cyclic_example]: https://github.com/vic/elmo/blob/master/examples/index.js
[view]: https://github.com/vic/elmo/blob/master/examples/counter.js#L40
[update]: https://github.com/vic/elmo/blob/master/examples/counter.js#L33
