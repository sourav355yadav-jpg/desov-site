'use client';

import { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  
  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ) );
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse.xy / u_resolution.xy;
    mouse.x *= u_resolution.x / u_resolution.y;

    // Mouse interaction (warp space)
    float dist = distance(st, mouse);
    float mouseEffect = smoothstep(0.6, 0.0, dist);
    
    // Displace coordinates based on mouse
    vec2 displacedSt = st + (st - mouse) * mouseEffect * 0.4;
    
    // Slow moving time
    float t = u_time * 0.15;
    
    // Multiscale noise
    float n1 = snoise(displacedSt * 2.0 + t);
    float n2 = snoise(displacedSt * 4.0 - t * 0.8);
    float n = (n1 + n2 * 0.5) * 0.5 + 0.5;
    
    // Define colors:
    // Color 1: #ffffff (White base)
    vec3 color1 = vec3(1.0, 1.0, 1.0);
    // Color 2: #FBF9F6 (Cream)
    vec3 color2 = vec3(251.0/255.0, 249.0/255.0, 246.0/255.0);
    // Color 3: #E8A1B5 (Accent Pink)
    vec3 color3 = vec3(232.0/255.0, 161.0/255.0, 181.0/255.0);
    // Color 4: #111827 (Dark Navy)
    vec3 color4 = vec3(17.0/255.0, 24.0/255.0, 39.0/255.0);

    // Mix colors based on noise
    vec3 finalColor = mix(color1, color2, smoothstep(0.1, 0.4, n));
    finalColor = mix(finalColor, color3, smoothstep(0.4, 0.8, n) * 0.3); // Soft pink clouds
    
    // Add some depth with the dark navy slightly creeping in
    float darkMask = snoise(displacedSt * 1.2 - t * 0.5) * 0.5 + 0.5;
    finalColor = mix(finalColor, color4, smoothstep(0.7, 1.0, darkMask) * 0.08); // Very subtle dark areas
    
    // Extra pink glow near mouse
    finalColor = mix(finalColor, color3, mouseEffect * 0.5);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }
    const webgl = gl as WebGLRenderingContext;

    // Compile Shader
    const compileShader = (type: number, source: string) => {
      const shader = webgl.createShader(type);
      if (!shader) return null;
      webgl.shaderSource(shader, source);
      webgl.compileShader(shader);
      if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
        console.error('Shader compile error:', webgl.getShaderInfoLog(shader));
        webgl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(webgl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(webgl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // Link Program
    const program = webgl.createProgram();
    if (!program) return;
    webgl.attachShader(program, vertexShader);
    webgl.attachShader(program, fragmentShader);
    webgl.linkProgram(program);
    if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
      console.error('Program link error:', webgl.getProgramInfoLog(program));
      return;
    }
    webgl.useProgram(program);

    // Set up geometry (a simple quad)
    const positionBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    webgl.bufferData(webgl.ARRAY_BUFFER, positions, webgl.STATIC_DRAW);

    const positionLocation = webgl.getAttribLocation(program, 'position');
    webgl.enableVertexAttribArray(positionLocation);
    webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);

    // Uniforms
    const resolutionLocation = webgl.getUniformLocation(program, 'u_resolution');
    const timeLocation = webgl.getUniformLocation(program, 'u_time');
    const mouseLocation = webgl.getUniformLocation(program, 'u_mouse');

    // Resize handler
    const resize = () => {
      // Use device pixel ratio for sharper rendering on high DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      webgl.viewport(0, 0, canvas.width, canvas.height);
      webgl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    
    const handleMouseMove = (e: MouseEvent) => {
      const dpr = window.devicePixelRatio || 1;
      targetMouseX = e.clientX * dpr;
      targetMouseY = (window.innerHeight - e.clientY) * dpr; // WebGL y is inverted
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    let animationFrameId: number;
    const startTime = Date.now();

    const render = () => {
      // Lerp mouse for smoothness
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const currentTime = (Date.now() - startTime) / 1000.0;
      
      webgl.uniform1f(timeLocation, currentTime);
      webgl.uniform2f(mouseLocation, mouseX, mouseY);
      
      webgl.drawArrays(webgl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      webgl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
}
