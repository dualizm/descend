# descend
🏂 A library to make the description of endpoints easier.

## Install

npm:
```sh
npm install @dualizm/descend
```

yarn:
```sh
yarn add @dualizm/descend
```

## Usage

Describe your endpoints

```js
import { descend, group, params } from '@dualizm/descend'

const ip = '127.0.0.1'
const port = 9001

export const endpoints = {
    cats: {
        [group]: true,
        get: {
            all: 'all-cats', // https://127.0.0.1:9001/cats/all-cats
        },
        post: {
            save: 'save-cat',
            create: 'new-cat'
        }
    },
    dogs: {
        get: {
            all: 'all-dogs', // https://127.0.0.1:9001/all-dogs
        }
    }
}

descend({
    ip,
    port,
    procotol: 'https'
}, endpoints);

```

And use it

```js
import { endpoints } from 'endpoints'

const showCats = async () => {
    try {
        const response = await fetch(endpoints.cats.get.all)
        const answer = await response.json()
        console.log(answer)
    } catch (error) {
        console.error(error)
    }
}
```

```js
import { endpoints } from 'endpoints'
import axios from 'axios'

const showLists = async () => {
    try {
        const response = await axios.get(endpoints.dogs.get.all)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}
```

## License

[Apache-2.0](LICENSE)