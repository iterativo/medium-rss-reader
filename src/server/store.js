export class History {
    history = []
    maxSize = 5

    push(item) {
        if (this.history.includes(item)) {
            this.history.sort((x, y) => x === item ? -1 : y === item ? 1 : 0)
        } else {
            this.history.unshift(item)
            this.history = this.history.slice(0, this.maxSize)
        }
    }

    get recent() {
        return this.history
    }
}
