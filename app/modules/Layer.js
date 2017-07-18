import Neuron from './Neuron'

class Layer {
  constructor (neurons) {
    this.neurons = []
    for (var i = 0; i < neurons; i++) {
      this.neurons.push(new Neuron())
    }
  }

  connect (targetLayer) {
    this.neurons.forEach(neuron => {
      targetLayer.neurons.forEach(targetNeuron => {
        neuron.connect(targetNeuron)
      })
    })
  }

  input (values) {
    this.neurons.forEach((neuron, index) => neuron.input(values[index]))
  }

  forward () {
    this.neurons.forEach(neuron => neuron.forward())
  }
}

export default Layer
