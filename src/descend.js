function formatURL(host, port, protocol) {
    return `${protocol}://${host}${port ? `:${port}` : ''}`
}

function describeEndpoints(url, endpoints, opts = {endWith: ''} , group = '') {
    for (const [key, value] of Object.entries(endpoints)) {
        if (typeof value === 'object' && group === '') {
            describeEndpoints(url, value, opts, `/${key}/`)
        } else if (typeof value === 'object' && group !== '') {
            describeEndpoints(url, value, opts, group)
        } else if (typeof value === 'string') {
            endpoints[key] = `${url}${group}${value}${opts.endWith}`
        }
    }
}

export default function descend ({ip, port, procotol = 'http'}) {
    return (endpoints, opts) => {
        const url = formatURL(ip, port, procotol)
        return describeEndpoints(url, endpoints, opts)
    }
}