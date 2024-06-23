/**
 * Takes the host, port, and protocol and returns the formatted URL.
 *
 * @param {string} host - the host name or IP address
 * @param {number | string} port - the port number (optional)
 * @param {string} protocol - the URL protocol (e.g. http, https)
 * @return {string} the formatted URL
 */
function formatURL(host, port, protocol) {
    return `${protocol}://${host}${port ? `:${port}` : ''}`
}

/**
 * Symbol representing the 'group' identifier.
 * @type {Symbol}
 */
export const group = Symbol('group')

/**
 * Recursively traverses the endpoints object and updates the values with the
 * formatted URL.
 *
 * @param {string} url - The base URL to be prepended to the endpoint.
 * @param {Object} endpoints - The object containing the endpoints.
 * @param {Object} opts - The options for formatting the URL.
 * @param {string} opts.group - The current group of endpoints.
 * @param {string} opts.endWith - The string to be appended to the URL.
 * @return {void}
 */
function describeEndpoints(url, endpoints, opts) {
    for (const [key, value] of Object.entries(endpoints)) {
        const currentGroup = opts.group
        if (value[group] === true) {
            opts.group = `${opts.group}${key}/`
        }

        if (typeof value === 'object') {
            describeEndpoints(url, value, opts)
        } else if (typeof value === 'string') {
            endpoints[key] = `${url}${opts.group}${value}${opts.endWith}`
        }

        opts.group = currentGroup
    }
}

/**
 * A function that descends through endpoints to update their values with formatted URL.
 *
 * @param {Object} ip - the IP address to construct the URL
 * @param {number | string} port - the port number for the URL (optional)
 * @param {string} procotol - the protocol for the URL (default: 'http')
 * @param {Object} endpoints - the object containing the endpoints to update
 * @param {Object} opts - the options for formatting the URL
 * @return {void}
 */
export function descend ({ip, port, procotol = 'http'}, endpoints, opts) {
    const url = formatURL(ip, port, procotol)
    describeEndpoints(url, endpoints, {endWith: '', group: '/', ...opts})
}