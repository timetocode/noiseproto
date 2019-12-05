var Chunk = require('./Chunk')


/**
* Converts a world x,y to a chunk (cx, cy) and corresponding tile (tx, ty) coordinate
* @method converToFullCoords
* @param {Integer} cx The x coordinate of a chunk
* @param {Integer} cy The y coordinate of a chunk
* @return {Object} Returns object with chunk (cx, cy) and tile (tx, ty) coordinates
*/
var convertToFullCoords = function (x, y) {
    return {
        // calculate chunk coordinates 
        cx: Math.floor(x / Chunk.dim),
        cy: Math.floor(y / Chunk.dim),

        // calculate tile coordinates (within the chunk)
        tx: (x >= 0) ? x % Chunk.dim : Chunk.dim + x % Chunk.dim,
        ty: (y >= 0) ? y % Chunk.dim : Chunk.dim + y % Chunk.dim
    }
}

/** 
* Creates a uniqe key for a chunk, so that it may be stored as a key value pair
* @method keyify
* @param {Integer} cx The x coordinate of a chunk
* @param {Integer} cy The y coordinate of a chunk
* @return {String} Returns a string key
*/
var keyify = function (cx, cy) {
    return cx + ',' + cy
}

/** 
* Converts a chunk key string into chunk coordinates (not tile coordinates)
* @method parseKey
* @param {String} chunkKey A chunkKey to convert
* @return {Object} Returns the x, y coordinates of the chunk
*/
var parseKey = function (chunkKey) {
    var parts = chunkKey.split(',')
    return { x: parts[0], y: parts[1] }
}

/**
* Map describes a physical world
* provides interaction with ground, surface, and (later) air blocks
* answers questions about mobility at any given position ##NOT THIS VERSION
* abstracts underlying Chunk implementation away
* Underlying Chunks are stored as a dictionary by key chunkX, chunkY, see: Chunk
*/
class ChunkMap {
    constructor() {
        this.chunks = {}
    }

    addChunk(chunk) {
        this.chunks[keyify(chunk)] = chunk
    }

    get(x, y) {
        var pos = convertToFullCoords(x, y)
        var key = keyify(pos.cx, pos.cy)
        if (!(key in this.chunks)) {
            this.chunks[key] = Chunk.newEmpty()
        }
        return this.chunks[keyify(pos.cx, pos.cy)].getTile(pos.tx, pos.ty)
    }

    set(x, y, value) {
        var pos = convertToFullCoords(x, y)
        var key = keyify(pos.cx, pos.cy)
        if (!(key in this.chunks)) {
            this.chunks[key] = Chunk.newEmpty()
        }
        this.chunks[keyify(pos.cx, pos.cy)].setTile(pos.tx, pos.ty, value)
    }
}

module.exports = ChunkMap