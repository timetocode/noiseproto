export default (simplex, grid, count) => {
    const start = Date.now()
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            grid.set(x, y, simplex.noise2D(x / count, y / count) * 1 / (1 / count))
        }
    }
    const elapsed  = Date.now() - start
    console.log(`octave complete, in ${ elapsed } ms`)
}