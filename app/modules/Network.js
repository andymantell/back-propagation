import Layer from './Layer'

class Network {
  constructor (layers) {
    this.layers = layers.map(neurons => new Layer(neurons))
    this.spacingX = 300
    this.spacingY = 150

    this.layers.forEach((layer, index) => {
      if (this.layers[index + 1]) {
        layer.connect(this.layers[index + 1])
      }
    })
  }

  input (values) {
    this.layers[0].input(values)
  }

  draw (ctx) {
    ctx.translate(-this.spacingX * this.layers.length / 2, 0)

    this.layers.forEach((layer, layerIndex) => {
      ctx.save()
      ctx.translate(0, -this.spacingY * layer.neurons.length / 2)

      layer.neurons.forEach((neuron, neuronIndex) => {
        ctx.beginPath()
        ctx.shadowBlur= 0
        ctx.arc(layerIndex * this.spacingX, neuronIndex * this.spacingY, 7, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()

        neuron.connections.forEach((connection, connectionIndex) => {
          ctx.beginPath()
          ctx.moveTo(layerIndex * this.spacingX, neuronIndex * this.spacingY)
          ctx.lineTo((layerIndex + 1) * this.spacingX, (connectionIndex * this.spacingY) - ((this.layers[layerIndex + 1].neurons.length - layer.neurons.length) * this.spacingY / 2 ) )
          const opacity = ((connection.weight - 0.5) * 0.75) + 0.25
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`
          ctx.shadowBlur= 20 * connection.weight
          ctx.shadowColor = 'blue'
          ctx.lineWidth = 3
          ctx.stroke()
          ctx.closePath()
        })

      })
      
      ctx.restore()
    })
  }

  forward () {
    this.layers.forEach(layer => layer.forward())
  }
}

export default Network
