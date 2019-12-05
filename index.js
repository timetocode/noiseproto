
import SimplexNoise from 'simplex-noise'
import MersenneTwister from 'mersenne-twister'
import Grid from './structures/Grid'
import clouds from './gen/clouds'
import renderGrayscale from './render/renderGrayscale'
import octave from './gen/octave'
import renderGradient from './render/renderGradient'
import { oahu } from './render/themes'

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    }
    resize()

    const seed = 5123 // change me and refresh :D

    // draws a strip of terrain, colorized
    {
        // initialize a PRNG 
        const mt = new MersenneTwister(seed)
        const simplex = new SimplexNoise(() => { return mt.random() })
        // initialize a grid
        const grid = new Grid(512, 64)
        // generate clouds in the grid using the noise generator
        clouds(simplex, grid)
        // set some pixel to black for no real reason
        grid.set(5, 10, -1)
        // render the clouds to the canvas
        renderGradient(context, grid, oahu, 0, 0)
    }

    // initializes an identical prng as above, drawing its results in grayscale
    {
        const mt = new MersenneTwister(seed)
        const simplex = new SimplexNoise(() => { return mt.random() })

        // initialize a grid
        const grid = new Grid(512, 64)
        // generate clouds in the grid using the noise generator
        clouds(simplex, grid)
        // set some pixel to black for no real reason (can see it if you look close!)
        grid.set(5, 10, -1)
        // render the clouds to the canvas
        renderGrayscale(context, grid, 0, 64)
    }

    // draws each octave of the 'clouds' generator, but one at a time
    for (let i = 8; i >= 1; i--) {
        // showing off the layers made by clouds, but one at a time
        const mt = new MersenneTwister(seed)
        const simplex = new SimplexNoise(() => { return mt.random() })
        const grid = new Grid(512, 64)

        octave(simplex, grid, i)
        renderGrayscale(context, grid, 0, 70 + i * 64)
    }
})