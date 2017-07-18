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
    this.output = this.value * this.weight
  }
}

export default Neuron
