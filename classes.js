class Sprite{
    constructor({position, velocity, image, width, height, frames = {max: 1}, sprites, moving, visible}){
        this.position = position
        this.image = image
        this.width = width
        this.height = height
        this.frames = {...frames, val: 0, elapsed: 0}
        this.moving = moving
        this.sprites = sprites
        this.visible = true
    }
    draw(){
        if(!this.visible) return
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
    constructor({position, type}){
        this.position = position
        this.type = type
        if(type === 466){
            this.width = 24
            this.height = 48
            this.offsetX = 24
            this.offsetY = 0
        }
        else if(type === 465){
            this.width = 24
            this.height = 48
            this.offsetX = 0
            this.offsetY = 0
        }
        else if(type === 464){
            this.width = 48
            this.height = 24
            this.offsetX = 0
            this.offsetY = 0
        }
        else {
            this.width = 48
            this.height = 48
            this.offsetX = 0
            this.offsetY = 0
        }
    }
    get hitbox() {
        return {
            position: {
                x: this.position.x + this.offsetX,
                y: this.position.y + this.offsetY
            },
            width: this.width,
            height: this.height
        }
    }
    draw(){
        c.fillStyle = 'red'
        // if(this.type === 472){
        //     c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        // }
        // if(this.type === 466){
        //     c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        // }
        // if(this.t)
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
    }
}