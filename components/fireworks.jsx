import React, { useEffect, useRef } from 'react';

const FireworkAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const max_fireworks = 5;
    const max_sparks = 50;
    let fireworks = [];

    const resetFirework = (firework) => {
      firework.x = Math.floor(Math.random() * canvas.width);
      firework.y = canvas.height;
      firework.age = 0;
      firework.phase = 'fly';
    };

    const explode = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((firework, index) => {
        if (firework.phase === 'explode') {
          firework.sparks.forEach((spark) => {
            for (let i = 0; i < 10; i++) {
              let trailAge = firework.age + i;
              let x = firework.x + spark.vx * trailAge;
              let y = firework.y + spark.vy * trailAge + spark.weight * trailAge ** 2;

              let fade = Math.max(0, 20 - firework.age * 2 + i * 2);
              let r = Math.floor(spark.red * (fade / 20));
              let g = Math.floor(spark.green * (fade / 20));
              let b = Math.floor(spark.blue * (fade / 20));

              context.beginPath();
              context.fillStyle = `rgba(${r},${g},${b},${fade / 20})`;
              context.rect(x, y, 4, 4);
              context.fill();
            }
          });
          firework.age++;
          if (firework.age > 100 && Math.random() < 0.05) {
            resetFirework(firework);
          }
        } else {
          firework.y -= 10;
          for (let spark = 0; spark < 15; spark++) {
            context.beginPath();
            context.fillStyle = `rgba(${index * 50},${spark * 17},0,1)`;
            context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
            context.fill();
          }
          if (Math.random() < 0.001 || firework.y < 200) firework.phase = 'explode';
        }
      });
      requestAnimationFrame(explode);
    };

    for (let i = 0; i < max_fireworks; i++) {
      let firework = { sparks: [] };
      for (let n = 0; n < max_sparks; n++) {
        let spark = {
          vx: (Math.random() * 5 + 0.5) * (Math.random() > 0.5 ? -1 : 1),
          vy: (Math.random() * 5 + 0.5) * (Math.random() > 0.5 ? -1 : 1),
          weight: Math.random() * 0.3 + 0.03,
          red: Math.floor(Math.random() * 256),
          green: Math.floor(Math.random() * 256),
          blue: Math.floor(Math.random() * 256),
        };
        firework.sparks.push(spark);
      }
      fireworks.push(firework);
      resetFirework(firework);
    }

    explode();  // Start rendering fireworks animation
  }, []);

  return <canvas ref={canvasRef} style={{ backgroundColor: 'black', width: '100vw', height: '100vh' }} />;
};

export default FireworkAnimation;
