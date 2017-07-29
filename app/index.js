import Network from './modules/Network'

const canvas = document.getElementById('neural-net')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

const network = new Network([5, 10, 8])

network.input([1, 2, 3, 4, 5])

var iteration = 0

function train () {

  network.forward()
  network.train([1, 2, 3, 4, 1, 2, 3, 4])

  setTimeout(train)

  if (iteration % 100) {
    network.draw(ctx, canvas.width, canvas.height)
  }

  iteration++
}

train()
