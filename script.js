const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720
var progress = 0
c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height)
const image = new Image()
image.src = './images/mapDemo.png'
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
const flower1 = new Image()
flower1.src = './images/Flower1.png'
const flower2 = new Image()
flower2.src = './images/Flower2.png'
const flower3 = new Image()
flower3.src = './images/Flower3.png'
const flower4 = new Image()
flower4.src = './images/Flower4.png'
const flower5 = new Image()
flower5.src = './images/Flower5.png'
const collisionsMap = []
for(i = 0;i < collisions.length;i+=80){
    collisionsMap.push(collisions.slice(i, i + 80))
}
console.log(collisionsMap)
const offset = {
    x: -440,
    y: -440
}
const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j)=>{
        if(symbol != 0){
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
                type: symbol
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
    },
    moving: false,
    maxElapsed: 10
})
console.log(player)
const Flower1 = new Sprite({
    position: {
        x: offset.x + 1520,
        y: offset.y + 1900
    },
    image: flower1,
    width: 32,
    height: 64,
    frames: {
        max: 1
    },
    moving: false,
})
const Flower2 = new Sprite({
    position: {
        x: offset.x + 2265,
        y: offset.y + 224
    },
    image: flower2,
    width: 32,
    height: 48,
    frames: {
        max: 1
    },
    moving: false,
})
const Flower3 = new Sprite({
    position: {
        x: offset.x + 2180,
        y: offset.y + 1042
    },
    image: flower3,
    width: 48,
    height: 48,
    frames: {
        max: 1
    },
    moving: false,
})
const Flower4 = new Sprite({
    position: {
        x: offset.x + 250,
        y: offset.y + 2200
    },
    image: flower4,
    width: 32,
    height: 48,
    frames: {
        max: 1
    },
    moving: false,
})
const Flower5 = new Sprite({
    position: {
        x: offset.x + 3700,
        y: offset.y + 1441
    },
    image: flower5,
    width: 32,
    height: 48,
    frames: {
        max: 1
    },
    moving: false,
})
const flowers = [Flower1, Flower2, Flower3, Flower4, Flower5]
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image,
    width: 3840,
    height: 2400,
    moving: false
})
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foreGroundImage,
    width: 3840,
    height: 2400,
    moving: false
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
function gameCompleted(){
    document.getElementById("ui").hidden = false
    gameScreen = document.getElementById("gameScreen")
    gameScreen.style.filter = "blur(3px)"
    gameScreen.style.pointerEvents = "none"
    gameScreen.style.zIndex = 0
}
function continueText(){
    const congrats = document.getElementById("congrats")
    congrats.innerHTML = ""
    var newNode = document.createElement("h3")
    const text = document.createTextNode("For the time you spent finding these flowers, they are actually for you!")
    newNode.appendChild(text)
    congrats.appendChild(newNode)
    newNode = document.createElement("img")
    newNode.src = "./images/GivingFlowers.jpg"
    newNode.alt = ""
    congrats.appendChild(newNode)
}
function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.hitbox.position.x &&
        rectangle1.position.y + rectangle1.height >= rectangle2.hitbox.position.y &&
        rectangle1.position.x <= rectangle2.hitbox.position.x + rectangle2.hitbox.width &&
        rectangle1.position.y <= rectangle2.hitbox.position.y + rectangle2.hitbox.height
    )
}
function pickingFlowers(flower){
    if(
        player.position.x + player.width >= flower.position.x &&
        player.position.y + player.height >= flower.position.y &&
        player.position.x <= flower.position.x + flower.width &&
        player.position.y <= flower.position.y + flower.height
    ){
        console.log("Picking !")
        flower.visible = false
        flower.position.x = offset.x - 100
        flower.position.y = offset.y - 100
        progress++;
        console.log(progress + "/5")
    }
}
const movables = [background, ...boundaries, foreground, ...flowers]
image.onload = checkLoaded
foreGroundImage.onload = checkLoaded
function animate(){
    if(progress != 5){
        window.requestAnimationFrame(animate)
    }
    else{
        gameCompleted()
    }
    c.clearRect(0, 0, canvas.width, canvas.height)
    background.draw()
    player.draw()
    flowers.forEach(flower => {
        flower.draw()
        pickingFlowers(flower)
    })
    foreground.draw()
    player.moving = false
    if (keys.w.pressed) {
    let moving = true
    player.moving = true
    player.image = player.sprites.up

    for (const boundary of boundaries) {
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                hitbox: {
                    position: {
                        x: boundary.hitbox.position.x,
                        y: boundary.hitbox.position.y + 2
                    },
                    width: boundary.hitbox.width,
                    height: boundary.hitbox.height
                }
            }
        })) {
            moving = false
            break
        }
    }

    if (moving) {
        movables.forEach(m => m.position.y += 2)
    }
}
    if (keys.a.pressed) {
    let moving = true
    player.moving = true
    player.image = player.sprites.left

    for (const boundary of boundaries) {
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                hitbox: {
                    position: {
                        x: boundary.hitbox.position.x + 2,
                        y: boundary.hitbox.position.y
                    },
                    width: boundary.hitbox.width,
                    height: boundary.hitbox.height
                }
            }
        })) {
            moving = false
            break
        }
    }

    if (moving) {
        movables.forEach(m => m.position.x += 2)
    }
}

if (keys.s.pressed) {
    let moving = true
    player.moving = true
    player.image = player.sprites.down

    for (const boundary of boundaries) {
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                hitbox: {
                    position: {
                        x: boundary.hitbox.position.x,
                        y: boundary.hitbox.position.y - 2
                    },
                    width: boundary.hitbox.width,
                    height: boundary.hitbox.height
                }
            }
        })) {
            moving = false
            break
        }
    }

    if (moving) {
        movables.forEach(m => m.position.y -= 2)
    }
}

if (keys.d.pressed) {
    let moving = true
    player.moving = true
    player.image = player.sprites.right

    for (const boundary of boundaries) {
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: {
                hitbox: {
                    position: {
                        x: boundary.hitbox.position.x - 2,
                        y: boundary.hitbox.position.y
                    },
                    width: boundary.hitbox.width,
                    height: boundary.hitbox.height
                }
            }
        })) {
            moving = false
            break
        }
    }

    if (moving) {
        movables.forEach(m => m.position.x -= 2)
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
