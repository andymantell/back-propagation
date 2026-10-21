class Neuron {
  constructor () {
    this.connections = []
    this.value = 0
    this.outputNeuron = false
    this.bias = Math.random() - 0.5
    this.errorSum = 0
  }

  connect (targetNeuron) {
    this.connections.push({
      targetNeuron: targetNeuron,
      weight: Math.random() - 0.5
    })
  }

  input (value) {
    this.value = value
  }

  forward () {
    if (this.connections.length === 0) {
      return
    }

    const sum = this.connections.reduce((sum, connection) => (sum + connection.targetNeuron.value * connection.weight), this.bias)

    if (this.outputNeuron) {
      this.value = sum
    } else {
      this.value = this.sigmoid(sum)
    }
  }

  sigmoid (value) {
    return 1 / (1 + Math.exp(-value))
  }

  train (learningRate, expectedValue) {
    if (this.connections.length === 0) {
      return
    }

    // Output neurons are linear, so their delta is just the error. Hidden
    // neurons use the error summed from the layer above, scaled by the
    // derivative of the sigmoid.
    const delta = this.outputNeuron
      ? expectedValue - this.value
      : this.errorSum * this.value * (1 - this.value)

    this.errorSum = 0

    this.connections.forEach(connection => {
      // Pass the error back using the weight before it is updated
      connection.targetNeuron.errorSum += delta * connection.weight

      connection.weight += learningRate * delta * connection.targetNeuron.value
    })

    this.bias += learningRate * delta
  }
}

export default Neuron
