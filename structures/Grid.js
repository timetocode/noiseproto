class Grid {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.cells = []
        for (let index = 0; index < width * height; index++) {
            this.cells[index] = 0
        }
    }

    index(x, y) {
        return x * this.height + y
    }

    xy(index) {
        return { x: Math.floor(index / this.height), y: index % this.height }
    }

    get(x, y) {
        return this.cells[this.index(x, y)]
    }

    set(x, y, value) {
        this.cells[this.index(x, y)] = value
    }
}

export default Grid