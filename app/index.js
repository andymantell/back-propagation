import Network from './modules/Network'

const canvas = document.getElementById('neural-net')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')
ctx.translate(canvas.width / 2, canvas.height / 2)

const network = new Network([2, 5, 3])
network.draw(ctx)
