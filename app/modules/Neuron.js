class Neuron {
  constructor () {
    this.connections = []
    this.value = 0
    this.outputNeuron = false
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

    if (this.outputNeuron) {
      this.value = this.connections.reduceRight((sum, connection) => (sum + connection.targetNeuron.value * connection.weight), 0)
    } else {
      this.value = this.sigmoid(this.connections.reduceRight((sum, connection) => (sum + connection.targetNeuron.value * connection.weight), 0))
    }
  }

  sigmoid (value) {
    // return value
    return 1 / (1 + Math.exp(-value))
  }

  train (expectedValue) {

    this.connections.forEach(connection => {
      const oldWeight = connection.weight

      // UPDATE WEIGHTS SOMEHOW!

      connection.weight = connection.weight + 0.001 * (expectedValue - this.value)

      connection.targetNeuron.train(this.value * oldWeight)
    })
  }
}

export default Neuron
