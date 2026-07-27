const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error("localStorage set error:", error)
        }
    },
    get(key) {
        try {
            const value = localStorage.getItem(key)
            return value === null ? null : JSON.parse(value)
        } catch (error) {
            console.error("localStorage get error:", error)
            return null
        }
    },
    remove(key) {
        localStorage.removeItem(key)
    }
}
export default storage