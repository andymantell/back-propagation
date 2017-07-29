import Layer from './Layer'

class Network {
  constructor (layers) {
    this.layers = layers.map(neurons => new Layer(neurons))
    this.spacingX = 400
    this.spacingY = 40

    this.layers[this.layers.length - 1].outputLayer = true

    this.layers.forEach((layer, index) => {
      if (this.layers[index - 1]) {
        layer.connect(this.layers[index - 1])
      }
    })
  }

  input (values) {
    this.layers[0].input(values)
  }

  forward () {
    this.layers.forEach(layer => layer.forward())
  }

  train (values) {
    this.layers[this.layers.length - 1].neurons.forEach((neuron, index) => {
      neuron.train(values[index])
    })
  }

  draw (ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
    ctx.save()

    ctx.translate(width / 2, height / 2)

    ctx.translate(-this.spacingX * this.layers.length / 2, 0)

    this.layers.forEach((layer, layerIndex) => {
      ctx.save()
      ctx.translate(0, -this.spacingY * layer.neurons.length / 2)

      layer.neurons.forEach((neuron, neuronIndex) => {

        const lineStart = [ layerIndex * this.spacingX, neuronIndex * this.spacingY ]

        ctx.beginPath()
        ctx.arc(...lineStart, 6, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgb(0,0,0)'
        ctx.fill()
        ctx.closePath()

        neuron.connections.forEach((connection, connectionIndex) => {
          ctx.beginPath()

          const lineEnd = [ (layerIndex - 1) * this.spacingX, (connectionIndex * this.spacingY) - ((this.layers[layerIndex - 1].neurons.length - layer.neurons.length) * this.spacingY / 2 ) ]
          // const lineMidpoint = lineStart.map((item, index) => (lineEnd[index] + item) / 2)
          ctx.moveTo(...lineStart)
          ctx.lineTo(...lineEnd)

          // ctx.font = '10px Arial'
          // ctx.textAlign = 'right'
          // ctx.fillStyle = 'rgb(0,0,255)'
          // ctx.fillText(connection.weight, ...lineMidpoint)

          const opacity = (Math.abs(connection.weight) * 0.98) + 0.02
          ctx.strokeStyle = `rgba(0,0,0,${opacity})`
          ctx.lineWidth = 2
          ctx.stroke()
          ctx.closePath()
        })

        ctx.font = '12px Arial'
        ctx.textAlign = 'left'
        ctx.fillStyle = 'rgb(255,0,0)'
        ctx.fillText(neuron.value, lineStart[0] - 8, lineStart[1] - 10)
      })

      ctx.restore()
    })

    ctx.restore()
  }
}

export default Network
