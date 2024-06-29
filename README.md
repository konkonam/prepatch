Dependency free micro framework for dependency injection

Inspired by [mitt](https://github.com/developit/mitt)
```ts
const contributors = [
    { name: 'konkonam', url: 'https://github.com/konkonam' },
    { name: 'freb97', url: 'https://github.com/freb97' },
]
```

### Table of Contents
- [Installation](#installation)
- [Usage](#usage)

### Installation
```sh
npm install prepatch
```

### Usage
```ts
import { usePrepatch } from 'prepatch';

const { apply } = usePrepatch();

// prepare and inject your dependencies
const container = apply(({ patch }) => {
    const mitt = mitt()

    mitt.on('greet', console.log)

    return {
        injectMitt: patch({
            mitt,
            audience: 'World',
        })
    }
})

// use your dependencies
const emitter = container.injectMitt(({ mitt, audience }) => {
    // write any logic you want in any style...

    const sayHello = () => mitt.emit('greet', `Hello ${audience}!`)

    return {
        sayHello,
    }
})

emitter.sayHello()
// Hello World!

// setup with new dependencies
const newEmitter = emitter._context.setup({
    ...emitter._context.dependencies,
    audience: 'Mars',
})

newEmitter.sayHello()
// Hello Mars!
```