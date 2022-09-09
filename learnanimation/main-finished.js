// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {

    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
} 

class Ball extends Shape {

    constructor(x, y, velX, velY, color, size) {
         super(x, y, velX, velY)
         this.color = color;
         this.size = size;
         this.exists = true;
    }
 
   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   update() {
      if ((this.x + this.size) >= width) {
         this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) {
         this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) {
         this.velY = -(this.velY);
      }

      if ((this.y - this.size) <= 0) {
         this.velY = -(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
   }

   collisionDetect() {
      for (const ball of balls) {
         if (!(this === ball) && ball.exists) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
              ball.color = this.color = randomRGB();
            }
         }
      }
   }

}

class RotationalPoint extends Ball {
   constructor(x, y, velX, velY, color, size, degree){
      super(x, y, velX, velY, color, size);
      this.degree = degree;
   }

   rotateBall() {
      if (this.degree > 360) {
         this.degree = 1;
         ctx.rotate(this.degree * Math.PI / 180);
         this.degree = this.degree + 5;
      } else {
            ctx.rotate(this.degree * Math.PI / 180);
            this.degree = this.degree + 5;
         }
      }
   }


const centerBall = new Ball (
   x = 750, 
   y = 450, 
   velX = 100, 
   velY = 100, 
   color = 'rgba(128, 128, 255, 1)', 
   size = 50, 
)

const ballRotate = new RotationalPoint (
   x = 250, 
   y = 250, 
   velX = 100, 
   velY = 100, 
   color = 'rgba(128, 30, 255, 1)', 
   size = 25, 
   degree = 1
   );






   

function loop() {
   ctx.fillStyle = 'rgba(255, 255, 255, 1)';
   ctx.fillRect(0, 0,  width, height);
   
   centerBall.draw();
   ctx.save();
   ctx.translate(centerBall.x, centerBall.y);
   ballRotate.rotateBall();
   ballRotate.draw();
   ctx.restore();

   requestAnimationFrame(loop);
}

loop();
