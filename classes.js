class Sprite{
    constructor({position, velocity, image, width, height, frames = {max: 1}, sprites}){
        this.position = position
        this.image = image
        this.width = width
        this.height = height
        this.frames = {...frames, val: 0, elapsed: 0}
        this.moving = false
        this.sprites = sprites
    }
    draw(){
        c.drawImage(
        this.image,
        this.frames.val * this.width,
        0,
        this.image.width/this.frames.max, 
        this.image.height,
        this.position.x,
        this.position.y,
        this.image.width/this.frames.max, 
        this.image.height
        )
        if(!this.moving) return
        if(this.frames.max > 1){
            this.frames.elapsed++
        }
        if(this.frames.elapsed % 10 == 0){
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}
class Boundary{
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.height = 48
        this.width = 48
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}