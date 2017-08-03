import Network from './modules/Network'

const canvas = document.getElementById('neural-net')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

const network = new Network([10, 10, 5])

network.input([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

var iteration = 0

function train () {
  network.forward()
  network.train([5, 4, 3, 2, 1])

  // if (iteration < 1000) {
  setTimeout(train)
  // }

  if (iteration % 10) {
    network.draw(ctx, canvas.width, canvas.height)
  }

  iteration++
}

train()

// setInterval(function () {
//   network.input([5, 5, 5, 5, 5])
//   network.forward()
//   network.draw(ctx, canvas.width, canvas.height)

//   setTimeout(function () {
//     network.input([1, 2, 3, 4, 5])
//     network.forward()
//     network.draw(ctx, canvas.width, canvas.height)
//   }, 2500)
// }, 5000)
