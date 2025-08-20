import React, { useEffect, useRef } from 'react';
import styles from '../css/matrixRain.module.css';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Matrix characters
    const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*(){}[]<>/|\\";
    const charArray = matrixChars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height;
    }

    const draw = () => {
      // Semi-transparent black background for fade effect
      ctx.fillStyle = 'rgba(20, 20, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#4a90e2';
      ctx.font = fontSize + 'px Courier New';

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
      // Recalculate columns and reset drops
      const newColumns = Math.floor(canvas.width / fontSize);
      drops.length = newColumns;
      for (let x = 0; x < newColumns; x++) {
        if (drops[x] === undefined) {
          drops[x] = Math.random() * canvas.height;
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.matrixCanvas}
    />
  );
};

export default MatrixRain;
