const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720

c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height)
const image = new Image()
image.src = './images/Map demo.png'
const foreGroundImage = new Image()
foreGroundImage.src = './images/foreGroundObjects.png'
const characterDown = new Image()
characterDown.src = './images/rowletDown.png'
const characterUp = new Image()
characterUp.src = './images/rowletUp.png'
const characterLeft = new Image()
characterLeft.src = './images/rowletLeft.png'
const characterRight = new Image()
characterRight.src = './images/rowletRight.png'

const collisionsMap = []
for(i = 0;i < collisions.length;i+=80){
    collisionsMap.push(collisions.slice(i, i + 80))
}
const offset = {
    x: -440,
    y: -440
}
const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j)=>{
        if(symbol === 460){
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
            )
        }
    })
})

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 120 / 4 / 2,
        y: canvas.height / 2 - 28 / 2 
    },
    image: characterDown,
    width: 120 / 4,
    height: 28,
    frames:{
        max: 4
    },
    sprites: {
        up: characterUp,
        down: characterDown,
        left: characterLeft,
        right: characterRight
    }
})
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image,
    width: 3840,
    height: 2400
})
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foreGroundImage,
    width: 3840,
    height: 2400
})
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
let imagesLoaded = 0
function checkLoaded() {
  imagesLoaded++
  if (imagesLoaded === 2) {
    animate()
  }
}
function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}
const movables = [background, ...boundaries, foreground]
image.onload = checkLoaded
foreGroundImage.onload = checkLoaded
function animate(){
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    player.draw()
    foreground.draw()
    boundaries.forEach(boundary =>{
        boundary.draw()
    })
    player.moving = false
    if(keys.w.pressed){
        let moving = true
        player.moving = true
        player.image = player.sprites.up
        for(let i = 0;i < boundaries.length;i++){
        const boundary = boundaries[i]
        if(rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...boundary,
                position: {
                    x: boundary.position.x,
                    y: boundary.position.y + 2
                }
            }
            })
        ){
            moving = false
            break
        }
        }
        if(moving){
            movables.forEach(movable => {
                movable.position.y += 2
            })
        }
    }
    if(keys.a.pressed){
        let moving = true
        player.moving = true
        player.image = player.sprites.left
        for(let i = 0;i < boundaries.length;i++){
        const boundary = boundaries[i]
        if(rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...boundary,
                position: {
                    x: boundary.position.x + 2,
                    y: boundary.position.y
                }
            }
            })
        ){
            moving = false
            break
        }
        }
        if(moving){
            movables.forEach(movable => {
            movable.position.x += 2
        })
        }
    }
    if(keys.s.pressed){
        let moving = true
        player.moving = true
        player.image = player.sprites.down
        for(let i = 0;i < boundaries.length;i++){
        const boundary = boundaries[i]
        if(rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...boundary,
                position: {
                    x: boundary.position.x,
                    y: boundary.position.y - 2
                }
            }
            })
        ){
            moving = false
            break
        }
        }
        if(moving){
            movables.forEach(movable => {
            movable.position.y -= 2
        })
        }
    }
    if(keys.d.pressed){
        let moving = true
        player.moving = true
        player.image = player.sprites.right
        for(let i = 0;i < boundaries.length;i++){
        const boundary = boundaries[i]
        if(rectangularCollision({
            rectangle1: player,
            rectangle2: {
                ...boundary,
                position: {
                    x: boundary.position.x - 2,
                    y: boundary.position.y
                }
            }
            })
        ){
            moving = false
            break
        }
        }
        if(moving){
            movables.forEach(movable => {
            movable.position.x -= 2
        })
        }
    }
}
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        default:
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        default:
            break
    }
})
