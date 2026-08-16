import React, { useEffect, useRef } from 'react';
import jsnes from 'jsnes';

export function LightNesPlayer({ romUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(256, 240);
    const buf = new ArrayBuffer(imageData.data.length);
    const buf8 = new Uint8ClampedArray(buf);
    const buf32 = new Uint32Array(buf);

    const nes = new jsnes.NES({
      onFrame: (frameBuffer) => {
        for (let i = 0; i < frameBuffer.length; i++) {
          buf32[i] = 0xff000000 | frameBuffer[i];
        }
        imageData.data.set(buf8);
        ctx.putImageData(imageData, 0, 0);
      },
    });

    // Fetch ROM binary and run
    fetch(romUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        nes.loadROM(binary);

        // 60 FPS loop
        function step() {
          nes.frame();
          requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
  }, [romUrl]);

  return <canvas ref={canvasRef} width={256} height={240} style={{ width: '100%', height: 'auto' }} />;
}import React, { useEffect, useRef } from 'react';
import jsnes from 'jsnes';

export function LightNesPlayer({ romUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(256, 240);
    const buf = new ArrayBuffer(imageData.data.length);
    const buf8 = new Uint8ClampedArray(buf);
    const buf32 = new Uint32Array(buf);

    const nes = new jsnes.NES({
      onFrame: (frameBuffer) => {
        for (let i = 0; i < frameBuffer.length; i++) {
          buf32[i] = 0xff000000 | frameBuffer[i];
        }
        imageData.data.set(buf8);
        ctx.putImageData(imageData, 0, 0);
      },
    });

    // Fetch ROM binary and run
    fetch(romUrl)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        nes.loadROM(binary);

        // 60 FPS loop
        function step() {
          nes.frame();
          requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
  }, [romUrl]);

  return <canvas ref={canvasRef} width={256} height={240} style={{ width: '100%', height: 'auto' }} />;
}