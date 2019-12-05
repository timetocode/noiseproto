// converts a value from the range [-1.0, 1.0] to [0, 255]
const rawNoiseToByte = (value) => {
    return (value + 1) * 127.5
}


export {
    rawNoiseToByte
}