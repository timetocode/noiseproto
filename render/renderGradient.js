export default (context, grid, theme, xOffset = 0, yOffset = 0, tileSize = 1) => {
    const start = Date.now()
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            const value = grid.get(x, y)
            context.beginPath()
            context.fillStyle = theme.getRGBA(value)
            context.rect(xOffset + x * tileSize, yOffset + y * tileSize, tileSize, tileSize)
            context.fill()
            context.closePath()
        }
    }
    console.log(`render grayscale, ${ Date.now() - start } ms`)
}
