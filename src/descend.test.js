import descend from './descend'

describe('descend', () => {
    test('test', () => {
        const endpoints = 
        {
            server: {
                chains: {
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
                    get: {
                        ports: 'get-ports',
                    }
                }
            },
            updater: {
                file: {
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
        };
    
        const ip = '127.0.0.1';

        descend({
            ip,
            port: 5003,
            procotol: 'https'
        })(endpoints.updater, {endWith: '/'});

        console.dir(endpoints.updater);

        expect(endpoints.updater.file.post.upload).toEqual(`https://127.0.0.1:5003/file/upload-file/`);
    })
})