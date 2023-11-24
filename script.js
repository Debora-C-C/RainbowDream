
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const starsArray = [];
let hue = 0;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++){
        starsArray.push(new Star());
    }   
});
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 9; i++){
       starsArray.push(new Star());
    }
});

class Star {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)'; 
        }
        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }
        draw(){
            ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)'; 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
}

function handleStars() {
    for (let i = 0; i < starsArray.length; i++){
        starsArray[i].update();
        starsArray[i].draw();
        if (starsArray[i].size <= 0.3) {
            starsArray.splice(i, 1);
        }
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0.1,0,0,0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleStars();
    requestAnimationFrame(animate);
    hue++;
}
animate(); 