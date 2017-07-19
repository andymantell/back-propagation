class Neuron {
  constructor () {
    this.connections = []
  }

  connect (targetNeuron) {
    this.connections.push({
      targetNeuron: targetNeuron,
      weight: Math.random() + 0.5
    })
  }

  input (value) {
    this.value = value
  }

  forward () {
    const output = this.value * this.weight

    this.connections.forEach(connection => {
      const value = this.value * connection.weight
      connection.targetNeuron.input(value)
    })
  }
}

export default Neuron
