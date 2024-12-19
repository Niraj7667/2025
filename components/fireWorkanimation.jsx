import React, { useEffect, useRef } from 'react';

const FireworkAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Array to hold fireworks
    const fireworks = [];
    const particles = [];

    // Firework class
    class Firework {
      constructor(x, y, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.distanceToTarget = calculateDistance(x, y, targetX, targetY);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = random(50, 70);
        this.targetRadius = 1;
        this.shootToTarget();
      }

      shootToTarget() {
        this.coordinates.push([this.x, this.y]);
        if (this.distanceTraveled >= this.distanceToTarget) {
          this.createParticles(this.targetX, this.targetY);
        } else {
          this.x += (this.targetX - this.x) / this.distanceToTarget * this.speed;
          this.y += (this.targetY - this.y) / this.distanceToTarget * this.speed;
          this.distanceTraveled += this.speed;
          this.speed *= this.acceleration;

          this.coordinates.push([this.x, this.y]);
        }

        this.drawTrail();
      }

      drawTrail() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
        ctx.stroke();
      }

      createParticles(x, y) {
        for (let i = 0; i < 100; i++) {
          particles.push(new Particle(x, y));
        }
      }
    }

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        this.angle = random(0, Math.PI * 2);
        this.speed = random(1, 10);
        this.friction = 0.95;
        this.gravity = 1;
        this.hue = random(hue - 20, hue + 20);
        this.brightness = random(50, 80);
        this.alpha = 1;
        this.decay = random(0.015, 0.03);
        this.createTrail();
      }

      createTrail() {
        this.coordinates.push([this.x, this.y]);
        if (this.coordinates.length > this.coordinateCount) {
          this.coordinates.shift();
        }
      }

      update() {
        this.coordinates.pop();
        this.coordinates.push([this.x, this.y]);
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.speed *= this.friction;
        this.y += this.gravity;
        this.alpha -= this.decay;

        this.createTrail();
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.stroke();
      }
    }

    // Random function
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Calculate distance function
    function calculateDistance(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // Create fireworks
    function createFirework(x, y) {
      let targetX = random(0, canvas.width);
      let targetY = random(0, canvas.height);
      fireworks.push(new Firework(x, y, targetX, targetY));
    }

    // Update function
    function update() {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      let length = fireworks.length;
      while (length--) {
        fireworks[length].shootToTarget();
        if (fireworks[length].distanceTraveled >= fireworks[length].distanceToTarget) {
          fireworks.splice(length, 1);
        }
      }

      length = particles.length;
      while (length--) {
        particles[length].update();
        particles[length].draw();
        if (particles[length].alpha <= 0) {
          particles.splice(length, 1);
        }
      }
    }

    // Render function
    function render() {
      update();
      requestAnimationFrame(render);
    }

    // Event listener for mouse click
    canvas.addEventListener('click', (e) => {
      createFirework(e.clientX, e.clientY);
    });

    // Event listener for window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Start rendering
    let hue = 120;
    render();

    // Cleanup function
    return () => {
      canvas.removeEventListener('click', (e) => {
        createFirework(e.clientX, e.clientY);
      });
      window.removeEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default FireworkAnimation;