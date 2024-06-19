function formatURL(host, port, protocol) {
    return `${protocol}://${host}${port ? `:${port}` : ''}`
}

function describeEndpoints(url, endpoints) {
    
}

export default function descend ({ip, port, procotol = 'http'}) {
    return (endpoints) => {
        const url = formatURL(ip, port, procotol)
        return describeEndpoints(url, endpoints)
    }
}