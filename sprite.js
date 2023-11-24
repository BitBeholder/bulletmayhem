class Sprite {
    constructor({ position, imageSrc, scale = 1 }) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale
        )
    }

    update(ctx) {
        this.draw(ctx)
    }
}
export default Sprite;