class Neuron {
  constructor () {
    this.connections = []
    this.value = 0
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

    this.value = this.sigmoid(this.connections.reduceRight((sum, connection) => (sum + connection.targetNeuron.value * connection.weight), 0))
  }

  sigmoid (value) {
    return 1 / (1 + Math.exp(-value))
  }
}

export default Neuron
