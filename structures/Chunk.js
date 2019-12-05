class Chunk {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.cells = null
    }

    newEmpty() {
        var chunk = new Chunk()
        chunk.cells = new Array(Chunk.dim * Chunk.dim)
        for (var i = 0; i < chunk.cells.length; i++) {
            chunk.cells[i] = {}
        }
        return chunk
    }

    index(x, y) {
        return (y * Chunk.dim) + x
    }

    xy(index) {
        return { x: Math.floor(index / Chunk.dim), y: index % Chunk.dim }
    }

    get(x, y) {
        return this.cells[Chunk.index(x, y)]
    }

    set(x, y, value) {
        this.cells[Chunk.index(x, y)] = value
    }
}

export default Chunk