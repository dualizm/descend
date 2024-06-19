import descend from './descend'

describe('descend', () => {
    const endpoints = 
    {
        json: {
            post: {
                add: 'json-add',
                configuration: 'full-json-configuration',
                status: 'json-status'
            },
            get: {
                list: 'json-list'
            }
        }
    };

    descend({
        ip: '127.0.0.1',
        port: 3000,
        procotol: 'http'
    }, endpoints);
})