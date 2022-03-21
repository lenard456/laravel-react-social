
const getFallback = (fallback) => {
    return typeof fallback === 'function' ? fallback() : fallback;
}

const hasExpired = (expiration) => {
    if (expiration) {
        const remainingTime = expiration - Date.now()
        return remainingTime < 0
    }
    return false
}

const get = function(key, fallback) {
    const cache = JSON.parse(localStorage.getItem(key))

    //No cache
    if (!cache || typeof cache !== 'object') return getFallback(fallback);

    //Extract data
    const { value, expiration } = cache

    //Check if expired
    if (hasExpired(expiration)) return getFallback(fallback)

    return value;
}

const set = function(key, value, ttl = null) {
    const cache = JSON.stringify({value, expiration: Date.now() + ttl})
    localStorage.setItem(key, cache)
}

export default {
    get,
    set
}