import { descend, group } from './descend'

describe('descend', () => {
    test('test', () => {
        const endpoints =
        {
            server: {
                [group]: true,
                chains: {
                    [group]: true,
                    post: {
                        delete: 'delete-chain',
                        save: 'save-chain',
                        configuration: 'get-full-chain-configuration',
                        blocks_status: 'get-blocks-status'
                    },
                    get: {
                        list: 'get-chain-list',
                        create: 'get-empty-chain',
                    }
                },
                server_ports: {
                    [group]: true,
                    get: {
                        ports: 'get-ports',
                    }
                }
            },
            updater: {
                file: {
                    [group]: true,
                    post: {
                        check: 'check-file-download-status',
                        upload: 'upload-file',
                        start: 'start-update',
                        delete: 'delete-file',
                    },
                    get: {
                        stop: 'stop-file-download',
                    }
                }
            }
        }
    
        const ip = '127.0.0.1'

        descend({
            ip,
            port: 5003,
            procotol: 'https'
        }, endpoints, {endWith: '/'})

        expect(endpoints.server.chains.get.list).toEqual(`https://127.0.0.1:5003/server/chains/get-chain-list/`)
        expect(endpoints.updater.file.get.stop).toEqual(`https://127.0.0.1:5003/file/stop-file-download/`)
    })
})