export default (simplex, grid) => {
    const start = Date.now()
    let min = Number.MAX_VALUE
    let max = Number.MIN_VALUE
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            // 8 octaves typed by hand
            let value = simplex.noise2D(x, y) * 1/256
            value += simplex.noise2D(x / 2, y / 2) * 1/128
            value += simplex.noise2D(x / 4, y / 4) * 1/64
            value += simplex.noise2D(x / 8, y / 8) * 1/32
            value += simplex.noise2D(x / 16, y / 16) * 1/16
            value += simplex.noise2D(x / 32, y / 32) * 1/8
            value += simplex.noise2D(x / 64, y / 64) * 1/4
            value += simplex.noise2D(x / 128, y / 128) * 1/2
    
            // track the upper and lower ranges, for debugging
            if (min > value) { min = value }
            if (max < value) { max = value }

            grid.set(x, y, value)
        }
    }
    const elapsed  = Date.now() - start
    console.log(`generation complete, range ${ min } - ${ max} in ${ elapsed } ms`)
}