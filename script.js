const canvas = document.getElementById("canvas"); // Make sure the ID matches
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Mouse object to track position and interaction radius
const mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

// Event listener for mouse movement
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Particle class to create individual particles
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 3, false);
    ctx.fillStyle = "#f2b800"; // Particle color
    ctx.fill();
  }

  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 5;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 5;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 5;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 5;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

// Initialize particles
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 2;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = (Math.random() - 0.5) * 2;
    let directionY = (Math.random() - 0.5) * 2;
    let color = "#f2b800";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

// Connect particles
function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        let opacityValue = 1 - distance / 30000;
        ctx.strokeStyle = "rgba(255, 255, 255," + opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

// Resize canvas on window resize
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.width / 80);
  init();
});

// Start animation
init();
animate();

/*  Another spider web canvas  */

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// let dots = [];
// const colors = ["#eee", "#545454", "#596d91", "#bb5a68", "#696541"];
// const particleColors = ["#f0f", "#0ff", "#ff0", "#f00", "#0f0"];

// function createDots() {
//   dots = [];
//   for (let i = 0; i < 100; i++) {
//     dots.push({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       size: Math.random() * 3 + 2,
//       color: colors[Math.floor(Math.random() * colors.length)],
//       dx: Math.random() * 2 - 1,
//       dy: Math.random() * 2 - 1,
//     });
//   }
// }

// function drawDots() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   dots.forEach((dot) => {
//     ctx.fillStyle = dot.color;
//     ctx.beginPath();
//     ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
//     ctx.fill();
//   });
// }

// function drawLines() {
//   for (let i = 0; i < dots.length; i++) {
//     for (let j = i + 1; j < dots.length; j++) {
//       const distance = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
//       if (distance < 150) {
//         let gradient = ctx.createLinearGradient(
//           dots[i].x,
//           dots[i].y,
//           dots[j].x,
//           dots[j].y
//         );
//         gradient.addColorStop(0, dots[i].color);
//         gradient.addColorStop(1, dots[j].color);
//         ctx.strokeStyle = gradient;
//         ctx.lineWidth = 0.5;
//         ctx.beginPath();
//         ctx.moveTo(dots[i].x, dots[i].y);
//         ctx.lineTo(dots[j].x, dots[j].y);
//         ctx.stroke();
//       }
//     }
//   }
// }

// function updateDots() {
//   dots.forEach((dot) => {
//     dot.x += dot.dx;
//     dot.y += dot.dy;

//     if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
//     if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
//   });
// }

// function animate() {
//   drawDots();
//   drawLines();
//   updateDots();
//   requestAnimationFrame(animate);
// }

// function drawParticles(x, y) {
//   for (let i = 0; i < 30; i++) {
//     let size = Math.random() * 3 + 1;
//     let color =
//       particleColors[Math.floor(Math.random() * particleColors.length)];
//     let dx = (Math.random() - 0.5) * 5;
//     let dy = (Math.random() - 0.5) * 5;
//     particles.push({ x, y, size, color, dx, dy });
//   }
// }

// const particles = [];

// function updateParticles() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawDots();
//   drawLines();
//   particles.forEach((particle) => {
//     ctx.fillStyle = particle.color;
//     ctx.beginPath();
//     ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//     ctx.fill();
//     particle.x += particle.dx;
//     particle.y += particle.dy;
//     particle.size *= 0.95;
//   });
//   particles = particles.filter((p) => p.size > 0.5);
// }

// canvas.addEventListener("mousemove", (event) => {
//   const rect = canvas.getBoundingClientRect();
//   const mouseX = event.clientX - rect.left;
//   const mouseY = event.clientY - rect.top;

//   dots.forEach((dot) => {
//     const distance = Math.hypot(mouseX - dot.x, mouseY - dot.y);
//     if (distance < 100) {
//       ctx.strokeStyle = dot.color;
//       ctx.lineWidth = 0.5;
//       ctx.beginPath();
//       ctx.moveTo(dot.x, dot.y);
//       ctx.lineTo(mouseX, mouseY);
//       ctx.stroke();

//       // Pulsating effect
//       dot.size = 5 + Math.sin(Date.now() / 100) * 2;
//     } else {
//       dot.size = Math.random() * 3 + 2;
//     }
//   });

//   drawParticles(mouseX, mouseY);
// });

// canvas.addEventListener("click", (event) => {
//   const rect = canvas.getBoundingClientRect();
//   const mouseX = event.clientX - rect.left;
//   const mouseY = event.clientY - rect.top;
//   drawParticles(mouseX, mouseY);
// });

// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   createDots();
//   drawDots();
// });

// createDots();
// animate();

/*  for text effect */
const dynamicText = document.getElementById("dynamic-text");
const words = [
  "Web Designer",
  "Software Developer",
  "UX/UI Designer",
  "Database Administrator",
  "Cyber Security expert ",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    dynamicText.textContent = currentWord.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Move to the next word
      setTimeout(typeEffect, 500); // Pause before typing the next word
    } else {
      setTimeout(typeEffect, 100); // Speed up while deleting
    }
  } else {
    dynamicText.textContent = currentWord.substring(0, charIndex++);
    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500); // Pause before deleting
    } else {
      setTimeout(typeEffect, 200); // Typing speed
    }
  }
}

// Start the typing effect
typeEffect();

// extra features

particles = particles.filter((p) => p.size > 0.5);

let debounceTimeout;
canvas.addEventListener("mousemove", (event) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    // Your existing mousemove logic here
  }, 100); // Adjust the debounce time as needed
});
