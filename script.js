const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720

c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height)
const image = new Image()
image.src = './images/Map demo.png'
const character = new Image()
character.src = './images/rowletDown.png'
class Sprite{
    constructor({position, velocity, image}){
        this.position = position
        this.image = image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
const background = new Sprite({
    position: {
        x: -455,
        y: -410
    },
    image: image
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
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    c.drawImage(
        character,
        0,
        0,
        character.width/4, 
        character.height,
        canvas.width/2 - character.width/4, 
        canvas.height/2,
        character.width/4, 
        character.height
    );
    if(keys.w.pressed){
        background.position.y += 2
    }
    if(keys.a.pressed){
        background.position.x += 2
    }
    if(keys.s.pressed){
        background.position.y -= 2
    }
    if(keys.d.pressed){
        background.position.x -= 2
    }
}
animate()
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