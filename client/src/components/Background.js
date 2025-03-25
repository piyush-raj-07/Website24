import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Sidebar from "./Sidebar";

const Bg = () => {
  const canvasRef = useRef(null);
  const largeHeaderRef = useRef(null);

  useEffect(() => {
    let width, height, points, target, ctx, animateHeader = true;
    let dpr = 1;

    const initHeader = () => {
      const canvas = canvasRef.current;
      const largeHeader = largeHeaderRef.current;

      width = window.innerWidth;
       height =window.innerHeight<750?window.innerHeight-150:window.innerHeight;
      // height=window.innerHeight;
      target = { x: width / 2, y: height / 2 };
      dpr = window.devicePixelRatio || 1;

      largeHeader.style.height = `${height}px`;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);

      const particleDensity = width <= 480 ? 11 : width <= 768 ? 13 : 20;

      points = [];
      for (let x = 0; x < width; x += width / particleDensity) {
        for (let y = 0; y < height; y += height / particleDensity) {
          const px = x + Math.random() * (width / particleDensity);
          const py = y + Math.random() * (height / particleDensity);
          const p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }
      for (const p1 of points) {
        const closest = [];
        for (const p2 of points) {
          if (p1 !== p2) {
            if (closest.length < 5) {
              closest.push(p2);
            } else {
              closest.sort((a, b) => getDistance(p1, a) - getDistance(p1, b));
              if (getDistance(p1, p2) < getDistance(p1, closest[4])) {
                closest[4] = p2;
              }
            }
          }
        }
        p1.closest = closest;
      }

      points.forEach((p) => {
        p.circle = new Circle(p, 2 + Math.random() * 2, "rgba(255,255,255,0.3)");
      });
    };

    const initAnimation = () => {
      animate();
      points.forEach(shiftPoint);
    };

    const animate = () => {
      if (animateHeader) {
        ctx.clearRect(0, 0, width * dpr, height * dpr);
        points.forEach((point) => {
          if (Math.abs(getDistance(target, point)) < 6000) {
            point.active = 0.6;
            point.circle.active = 0.9;
          } else if (Math.abs(getDistance(target, point)) < 30000) {
            point.active = 0.3;
            point.circle.active = 0.4;
          } else {
            point.active = 0.0;
            point.circle.active = 0.0;
          }
          drawLines(point);
          point.circle.draw();
        });
      }
      requestAnimationFrame(animate);
    };

    const shiftPoint = (p) => {
      gsap.to(p, {
        duration: 2 + Math.random(),
        x: p.originX - 50 + Math.random() * 150,
        y: p.originY - 50 + Math.random() * 150,
        ease: "sine.inOut",
        onComplete: () => shiftPoint(p),
      });
    };

    const drawLines = (p) => {
      if (!p.active) return;
      p.closest.forEach((close) => {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(close.x, close.y);
        ctx.strokeStyle = `rgba(142, 44, 192,${p.active})`;
        ctx.stroke();
      });
    };

    const getDistance = (p1, p2) =>
      Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);

    function Circle(pos, rad, color) {
      this.pos = pos;
      this.radius = rad;
      this.color = color;

      this.draw = function () {
        if (!this.active) return;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(142, 44, 192,${this.active})`;
        ctx.fill();
      };
    }

    const mouseMove = (e) => {
      target.x = e.pageX;
      target.y = e.pageY;
    };

    const touchMove = (e) => {
      if (e.touches.length > 0) {
        target.x = e.touches[0].clientX;
        target.y = e.touches[0].clientY;
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeaderRef.current.style.height = `${height}px`;
      const canvas = canvasRef.current;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove);
    window.addEventListener("resize", resize);

    initHeader();
    initAnimation();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div>
      <div ref={largeHeaderRef} className="w-full bg-black overflow-x-hidden">
        <Sidebar />
        <h1 className="absolute text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-wide z-10">
          <span className="font-libre tracking-wide">EESA</span>{" "}
          <span className="font-light font-raleway text-purple-400">IIT Indore</span>
        </h1>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />
    </div>
  );
};

export default Bg;
