
export default {

    clear: function(key) {
        localStorage.removeItem(key)
    },

    get: (key, fallback = null) => {
        //resolve fallback
        fallback = typeof fallback === 'function' ? fallback() : fallback;

        const data = JSON.parse(localStorage.getItem(key));
        
        //If No Cache Data
        if (data === null) 
            return fallback;
        
        //Check expiration
        if (data?.ttl) {
            let expiration = data.ttl
            if(expiration - Date.now() < 0) {
                localStorage.removeItem(key)
                return fallback;
            } 
        }

        return data?.value
    },

    set: (key, value, ttl = null) => {
        value = typeof value == 'function' ? value() : value;
        const data = {value, ttl: ttl ? ttl + Date.now() : null}
        localStorage.setItem(key, JSON.stringify(data));
    }
}