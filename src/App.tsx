import * as React from "react"
import { motion } from "framer-motion"
// @ts-ignore
import * as THREE from "https://cdn.skypack.dev/three@0.150.1"

export default function NeonCubeHeroDesktop() {
    const mountRef = React.useRef<HTMLDivElement | null>(null)
    const [offset, setOffset] = React.useState({ x: 0, y: 0 })
    const [activeModal, setActiveModal] = React.useState<
        null | "about" | "projects" | "contact" | "links"
    >(null)
    const modalRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        if (!activeModal) return
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActiveModal(null)
        }
        window.addEventListener("keydown", onKeyDown)
        // focus the modal container for accessibility
        setTimeout(() => modalRef.current?.focus(), 0)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
            document.body.style.overflow = previousOverflow
        }
    }, [activeModal])

    React.useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        // --- THREE.JS SCENE SETUP ---
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            60,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000
        )
        camera.position.z = 5

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        })
        // Cap pixel ratio for mobile performance
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        mount.appendChild(renderer.domElement)

        // Wireframe cube + inner thin neon lines
        const geometry = new THREE.BoxGeometry(3.2, 3.2, 3.2)
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.35,
        })
        const cube = new THREE.Mesh(geometry, wireMat)
        scene.add(cube)

        const innerGeo = new THREE.BoxGeometry(2.6, 2.6, 2.6)
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xff00ff,
            linewidth: 1,
        })
        const edges = new THREE.EdgesGeometry(innerGeo)
        const line = new THREE.LineSegments(edges, lineMat)
        line.renderOrder = 1
        scene.add(line)

        // subtle rotation / bob
        let rafId = 0
        const clock = new THREE.Clock()
        function animate() {
            rafId = requestAnimationFrame(animate)
            const t = clock.getElapsedTime()
            cube.rotation.x = t * 0.06
            cube.rotation.y = t * 0.08
            cube.rotation.z = Math.sin(t * 0.3) * 0.02
            line.rotation.copy(cube.rotation)
            renderer.render(scene, camera)
        }
        animate()

        // Resize handling
        const handleResize = () => {
            if (!mount) return
            camera.aspect = mount.clientWidth / mount.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(mount.clientWidth, mount.clientHeight)
        }
        window.addEventListener("resize", handleResize)

        // Clean up
        return () => {
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(rafId)
            try {
                mount.removeChild(renderer.domElement)
            } catch (e) {
                /* ignore if already removed */
            }
            // Dispose geometries/materials
            geometry.dispose()
            wireMat.dispose()
            innerGeo.dispose()
            lineMat.dispose()
            ;(renderer as any).dispose && (renderer as any).dispose()
        }
    }, [])

    // Pointer parallax offset for heading/card
    const handleMouseMove = (e: React.MouseEvent) => {
        const w = window.innerWidth
        const h = window.innerHeight
        const x = (e.clientX / w - 0.5) * 18 // smaller range for subtlety
        const y = (e.clientY / h - 0.5) * 18
        setOffset({ x, y })
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches && e.touches[0]
        if (!touch) return
        const w = window.innerWidth
        const h = window.innerHeight
        const x = (touch.clientX / w - 0.5) * 18
        const y = (touch.clientY / h - 0.5) * 18
        setOffset({ x, y })
    }

            return (
        <div className="neon-root" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
            {/* Animated Border - Digital Wave Design */}
            <div className="neon-border">
                {/* Digital wave lines */}
                <div className="wave-line top"></div>
                <div className="wave-line right"></div>
                <div className="wave-line bottom"></div>
                <div className="wave-line left"></div>
                
                {/* Corner dots */}
                <div className="corner-dot top-left"></div>
                <div className="corner-dot top-right"></div>
                <div className="corner-dot bottom-left"></div>
                <div className="corner-dot bottom-right"></div>
                
                {/* Glowing orbs */}
                <div className="glow-orb"></div>
                <div className="glow-orb"></div>
                <div className="glow-orb"></div>
                <div className="glow-orb"></div>
                
                {/* Digital segments */}
                <div className="digital-segment top-left"></div>
                <div className="digital-segment top-right"></div>
                <div className="digital-segment bottom-left"></div>
                <div className="digital-segment bottom-right"></div>
                <div className="digital-segment left-top"></div>
                <div className="digital-segment left-bottom"></div>
                <div className="digital-segment right-top"></div>
                <div className="digital-segment right-bottom"></div>
            </div>
            {/* Inline CSS so you can copy-paste — responsive + neon effects */}
            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        
        :root{
          --bg-1: #05040a;
          --cyan: #00f6ff;
          --magenta: #ff3ec6;
          --glass: rgba(255,255,255,0.04);
          --glass-border: rgba(255,255,255,0.12);
          --text-muted: #c7d3df;
        }
        .neon-root{
          height: 100vh;
          height: 100dvh;
          min-height: 100vh;
          width: 100vw;
          background: radial-gradient(ellipse at center, #07060b 0%, #000000 60%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: "Inter", "Segoe UI", Roboto, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Animated Border - Digital Wave Design */
        .neon-border {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 10;
        }

        /* Digital wave lines */
        .wave-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, var(--cyan), var(--magenta), transparent);
          animation: waveFlow 3s linear infinite;
        }

        .wave-line.top {
          top: 8px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--cyan), var(--magenta), var(--cyan), transparent);
          animation: waveFlowTop 4s linear infinite;
        }

        .wave-line.right {
          top: 0;
          right: 8px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, var(--magenta), var(--cyan), var(--magenta), transparent);
          animation: waveFlowRight 4s linear infinite;
        }

        .wave-line.bottom {
          bottom: 8px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--magenta), var(--cyan), var(--magenta), transparent);
          animation: waveFlowBottom 4s linear infinite;
        }

        .wave-line.left {
          top: 0;
          left: 8px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, var(--cyan), var(--magenta), var(--cyan), transparent);
          animation: waveFlowLeft 4s linear infinite;
        }

        /* Corner dots */
        .corner-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--cyan);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--cyan), 0 0 16px var(--cyan);
          animation: dotPulse 2s ease-in-out infinite alternate;
        }

        .corner-dot.top-left { top: 12px; left: 12px; }
        .corner-dot.top-right { top: 12px; right: 12px; }
        .corner-dot.bottom-left { bottom: 12px; left: 12px; }
        .corner-dot.bottom-right { bottom: 12px; right: 12px; }

        /* Glowing orbs */
        .glow-orb {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--magenta);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--magenta), 0 0 12px var(--magenta);
          animation: orbFloat 8s linear infinite;
        }

        .glow-orb:nth-child(1) { top: 15%; left: 5%; animation-delay: 0s; }
        .glow-orb:nth-child(2) { top: 25%; right: 8%; animation-delay: 2s; }
        .glow-orb:nth-child(3) { bottom: 35%; left: 12%; animation-delay: 4s; }
        .glow-orb:nth-child(4) { bottom: 20%; right: 5%; animation-delay: 6s; }

        /* Digital segments */
        .digital-segment {
          position: absolute;
          background: var(--cyan);
          opacity: 0.6;
          animation: segmentGlow 3s ease-in-out infinite alternate;
        }

        .digital-segment.top-left {
          top: 0;
          left: 0;
          width: 60px;
          height: 1px;
        }

        .digital-segment.top-right {
          top: 0;
          right: 0;
          width: 60px;
          height: 1px;
        }

        .digital-segment.bottom-left {
          bottom: 0;
          left: 0;
          width: 60px;
          height: 1px;
        }

        .digital-segment.bottom-right {
          bottom: 0;
          right: 0;
          width: 60px;
          height: 1px;
        }

        .digital-segment.left-top {
          top: 0;
          left: 0;
          width: 1px;
          height: 60px;
        }

        .digital-segment.left-bottom {
          bottom: 0;
          left: 0;
          width: 1px;
          height: 60px;
        }

        .digital-segment.right-top {
          top: 0;
          right: 0;
          width: 1px;
          height: 60px;
        }

        .digital-segment.right-bottom {
          bottom: 0;
          right: 0;
          width: 1px;
          height: 60px;
        }

        @keyframes waveFlowTop {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes waveFlowRight {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 200%; }
        }

        @keyframes waveFlowBottom {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }

        @keyframes waveFlowLeft {
          0% { background-position: 0 200%; }
          100% { background-position: 0 -100%; }
        }

        @keyframes dotPulse {
          0% { opacity: 0.3; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes orbFloat {
          0% { opacity: 0; transform: translateY(0px) scale(0); }
          25% { opacity: 1; transform: translateY(-15px) scale(1); }
          75% { opacity: 1; transform: translateY(-25px) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(0); }
        }

        @keyframes segmentGlow {
          0% { opacity: 0.3; box-shadow: 0 0 3px var(--cyan); }
          100% { opacity: 0.8; box-shadow: 0 0 8px var(--cyan), 0 0 15px var(--cyan); }
        }

        /* Large blurred orb glows */
        .glow-orb.cyan {
          position: absolute;
          width: 52vmax;
          height: 52vmax;
          left: -20%;
          top: -30%;
          background: radial-gradient(circle at 30% 30%, rgba(0,246,255,0.45) 0%, transparent 35%);
          filter: blur(160px);
          pointer-events: none;
          z-index: 0;
          transform: translateZ(0);
        }
        .glow-orb.magenta {
          position: absolute;
          width: 52vmax;
          height: 52vmax;
          right: -20%;
          bottom: -30%;
          background: radial-gradient(circle at 70% 70%, rgba(255,62,198,0.45) 0%, transparent 35%);
          filter: blur(160px);
          pointer-events: none;
          z-index: 0;
          transform: translateZ(0);
        }

        /* three.js mount */
        .three-mount {
          position: absolute;
          inset: 0;
          z-index: 0;
          filter: blur(5px) saturate(1.1);
          pointer-events: none;
        }

        /* Glass card */
        .glass-card {
          position: relative;
          z-index: 5;
          width: min(1100px, 96%);
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          place-items: center;
          padding: 40px;
          border-radius: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid var(--glass-border);
          box-shadow: 0 10px 50px rgba(2,8,20,0.6), 0 0 100px rgba(0,255,255,0.03);
          backdrop-filter: blur(10px) saturate(1.2);
          transition: transform 0.35s ease;
          margin-top: 24px;
          margin-bottom: 24px;
        }

        /* Heading block */
        .hero-title {
          margin: 6px 0 6px 0;
          text-align: center;
          line-height: 1;
        }

        .name {
          font-size: clamp(2.2rem, 7vw, 4.6rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
          padding: 0;
          color: transparent;
          background: linear-gradient(90deg, var(--cyan), #7df, var(--magenta), #ffd65c);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow:
            0 0 2px rgba(255,255,255,0.12),
            0 0 6px rgba(0,246,255,0.45),
            0 0 12px rgba(255,62,198,0.28),
            0 6px 30px rgba(0,0,0,0.65);
          filter: drop-shadow(0 0 10px rgba(0,246,255,0.12));
        }

        /* sharp neon outer stroke using multiple strokes for crispness */
        .name.sharp {
          text-shadow:
            -2px 0 0 rgba(0,246,255,0.95),
            2px 0 0 rgba(255,62,198,0.9),
            0 0 3px rgba(255,255,255,0.15),
            0 0 10px rgba(0,246,255,0.55),
            0 0 18px rgba(255,62,198,0.35);
        }

        .subtitle {
          margin-top: 10px;
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          color: var(--text-muted);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          filter: drop-shadow(0 0 8px rgba(0,246,255,0.08));
        }

        .tagline {
          margin-top: 14px;
          color: rgba(199,211,223,0.85);
          max-width: 820px;
          text-align: center;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.6;
        }

        /* Buttons row */
        .btn-row {
          display:flex;
          gap: 14px;
          margin-top: 26px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .neon-btn {
          padding: 12px 20px;
          border-radius: 999px;
          font-weight: 700;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          color: white;
          cursor: pointer;
          letter-spacing: 0.03em;
          box-shadow: 0 6px 30px rgba(0,0,0,0.6);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          position: relative;
          overflow: hidden;
          font-size: clamp(0.95rem, 1vw, 1rem);
        }
        .neon-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(90deg, rgba(0,246,255,0.08), rgba(255,62,198,0.06));
          transform: translateX(-30%);
          transition: transform 0.35s ease;
          filter: blur(8px);
        }
        .neon-btn:hover{
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0,246,255,0.12);
        }
        .neon-btn:hover::after {
          transform: translateX(0%);
        }

        .btn-cyan { color: #001820; background: linear-gradient(90deg, rgba(0,246,255,1), rgba(0,200,255,0.95)); }
        .btn-magenta { color: #130006; background: linear-gradient(90deg, rgba(255,62,198,1), rgba(255,120,220,0.95)); }
        .btn-outline { color: #cde; background: transparent; border: 1px solid rgba(255,255,255,0.08); }

        /* side nav & top contact */
        .top-contact {
          position: absolute;
          top: calc(20px + env(safe-area-inset-top, 0px));
          right: calc(26px + env(safe-area-inset-right, 0px));
          z-index: 6;
          display:inline-flex;
          align-items:center;
          gap:10px;
        }
        .available-badge {
          position: absolute;
          top: calc(22px + env(safe-area-inset-top, 0px));
          left: calc(28px + env(safe-area-inset-left, 0px));
          z-index: 6;
          display:inline-flex;
          align-items:center;
          gap:10px;
          background: rgba(255,255,255,0.02);
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.06);
          font-size: 0.92rem;
        }
        .available-dot { width: 9px; height: 9px; background: #7CFF6A; border-radius: 50%; box-shadow: 0 0 8px #7CFF6A; }

        .side-links {
          position: absolute;
          right: calc(18px + env(safe-area-inset-right, 0px));
          bottom: calc(38px + env(safe-area-inset-bottom, 0px));
          z-index: 6;
          display:flex;
          flex-direction: column;
          gap: 8px;
          font-weight: 700;
          color: rgba(220,230,240,0.82);
        }

        /* Copyright */
        .scroll-arrow {
          position: absolute;
          bottom: calc(22px + env(safe-area-inset-bottom, 0px));
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.9rem;
          z-index: 6;
          color: rgba(180,240,255,0.7);
          text-shadow: 0 0 8px rgba(0,246,255,0.15);
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(12px) saturate(1.1);
          -webkit-backdrop-filter: blur(12px) saturate(1.1);
          display: grid;
          place-items: center;
          z-index: 20;
          padding: 20px;
          padding-top: calc(20px + env(safe-area-inset-top, 0px));
          padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          padding-left: calc(20px + env(safe-area-inset-left, 0px));
          padding-right: calc(20px + env(safe-area-inset-right, 0px));
        }
        .modal {
          width: min(820px, 96%);
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.06));
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 18px;
          box-shadow: 0 14px 70px rgba(0,0,0,0.65), 0 0 120px rgba(0,255,255,0.06);
          padding: 22px 22px 24px 22px;
          color: white;
          outline: none;
          backdrop-filter: blur(18px) saturate(1.25);
          -webkit-backdrop-filter: blur(18px) saturate(1.25);
          max-height: min(86vh, 720px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }
        .modal-title {
          font-weight: 800;
          font-size: 1.3rem;
          letter-spacing: 0.02em;
          color: transparent;
          background: linear-gradient(90deg, var(--cyan), var(--magenta));
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 0 0 12px rgba(0,246,255,0.22);
        }
        .modal-close {
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.04);
          color: white;
          font-weight: 700;
          cursor: pointer;
        }
        .modal-close:hover {
          border-color: rgba(0,246,255,0.4);
          box-shadow: 0 6px 20px rgba(0,246,255,0.12);
        }
        .modal-body { font-size: 0.98rem; overflow: auto; -webkit-overflow-scrolling: touch; }
        .small-muted { color: rgba(210,225,235,0.8); }
        .modal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin-top: 8px;
        }
        .modal-card {
          padding: 16px;
          border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: inset 0 0 40px rgba(255,255,255,0.03);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          min-height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .modal-card strong {
          display: block;
          margin-bottom: 8px;
          font-size: 1rem;
        }
        .modal-card p {
          margin: 0;
          word-break: break-all;
          line-height: 1.4;
        }

        /* Responsive */
        @media (min-width: 880px) {
          .glass-card { padding: 60px; border-radius: 20px; }
          .name { font-size: 4.6rem; }
          .subtitle { font-size: 1.1rem; }
          .tagline { font-size: 1.05rem; }
        }
        @media (max-width: 879px) {
          .name { font-size: 2.4rem; }
          .hero-title { padding: 0 10px; }
          .glass-card { padding: 26px; border-radius: 14px; }
          .neon-btn { padding: 10px 14px; font-size: 0.95rem; }
        }
        @media (max-width: 540px) {
          .btn-row { gap: 10px; }
          .neon-btn { width: 100%; justify-content: center; }
          .subtitle { letter-spacing: 0.12em; }
          .modal { width: 96%; padding: 16px; border-radius: 14px; max-height: 88vh; }
          .modal-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-arrow { animation: none !important; }
          .neon-btn, .glass-card { transition: none !important; }
        }
      `}</style>

            {/* Big blurred orbs */}
            <div className="glow-orb cyan" />
            <div className="glow-orb magenta" />

            {/* three.js render mount */}
            <div className="three-mount" ref={mountRef}></div>

            {/* Top UI: available + contact */}
            <div className="available-badge">
                <span className="available-dot" />
                <span>
                    Available for <strong>Work</strong>
                </span>
            </div>

            {/* Glass Card containing hero */}
            <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 18, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{
                    transform: `translateZ(0)`,
                }}
            >
                <div
                    className="hero-title"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <motion.h1
                        className="name sharp"
                        initial={{ y: 8, opacity: 0, scale: 0.96 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: "circOut" }}
                        // subtle parallax movement linked to mouse offset
                        style={{
                            transform: `translate3d(${offset.x * 0.35}px, ${-offset.y * 0.25}px, 0)`,
                        }}
                    >
                        Faseeh Khan
                    </motion.h1>

                    <motion.div
                        className="subtitle"
                        initial={{ y: 6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.08 }}
                        style={{
                            transform: `translate3d(${offset.x * 0.18}px, ${-offset.y * 0.12}px, 0)`,
                        }}
                    >
                        DESIGNER & DEVELOPER
                    </motion.div>

                    <motion.p
                        className="tagline"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.14 }}
                    >
                        Crafting Interactive Experiences
                    </motion.p>

                    <div
                        className="btn-row"
                        role="navigation"
                        aria-label="Primary"
                    >
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            className="neon-btn btn-cyan"
                            onClick={() => setActiveModal("about")}
                        >
                            About
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            className="neon-btn btn-magenta"
                            onClick={() => setActiveModal("projects")}
                        >
                            Projects
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            className="neon-btn btn-cyan"
                            onClick={() => setActiveModal("contact")}
                        >
                            Contact
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            className="neon-btn btn-magenta"
                            onClick={() => setActiveModal("links")}
                        >
                            Links
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Copyright */}
            <div className="scroll-arrow" aria-hidden>
                © 2025 Faseeh Khan
            </div>

            {activeModal && (
                <div
                    className="modal-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setActiveModal(null)
                    }}
                >
                    <motion.div
                        className="modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        tabIndex={-1}
                        ref={modalRef}
                    >
                        <div className="modal-header">
                            <div className="modal-title" id="modal-title">
                                {activeModal === "about" && "About"}
                                {activeModal === "projects" && "Projects"}
                                {activeModal === "contact" && "Contact"}
                                {activeModal === "links" && "Links"}
                            </div>
                            <button
                                className="modal-close"
                                onClick={() => setActiveModal(null)}
                            >
                                Close
                            </button>
                        </div>
                        <div className="modal-body">
                            {activeModal === "about" && (
                                <div>
                                    <p className="small-muted">
                                        I'm Faseeh Khan. I make games — that's where I feel at home.
                                    </p>
                                    <p className="small-muted">
                                        I'm not just coding to make things function — I focus on making them feel immersive, responsive, and fun to play. From gameplay mechanics to smooth menus and satisfying feedback, I care about every interaction.
                                    </p>
                                    <p className="small-muted">
                                        I pay attention to the little stuff — timing, animation, how the player moves, how the world reacts. I aim to create experiences that are engaging, polished, and memorable.
                                    </p>
                                    <p className="small-muted">
                                        At the end of the day, I'm a developer who designs games — or a designer who builds them. Depends on the day.
                                    </p>
                                    <div className="modal-grid">
                                        <div className="modal-card">
                                            <strong>Expertise</strong>
                                            <p className="small-muted">
                                                Game Development, Unity, C#, Game Design, UI/UX
                                            </p>
                                        </div>
                                        <div className="modal-card">
                                            <strong>Stack</strong>
                                            <p className="small-muted">
                                                Unity, C#, Game Engines, 3D Graphics, Animation
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeModal === "projects" && (
                                <div className="modal-grid">
                                    <div className="modal-card">
                                        <strong>Neon Portfolio</strong>
                                        <p className="small-muted">
                                            A futuristic landing with 3D cube.
                                        </p>
                                    </div>
                                    <div className="modal-card">
                                        <strong>Visualizer</strong>
                                        <p className="small-muted">
                                            Music-driven particle system.
                                        </p>
                                    </div>
                                    <div className="modal-card">
                                        <strong>Shop UI</strong>
                                        <p className="small-muted">
                                            E-commerce micro-interactions.
                                        </p>
                                    </div>
                                    <div className="modal-card">
                                        <strong>AR Try-On</strong>
                                        <p className="small-muted">Prototype with WebXR.</p>
                                    </div>
                                </div>
                            )}

                            {activeModal === "contact" && (
                                <div>
                                    <p className="small-muted">
                                        Feel free to reach out! Click the button below to open Gmail and send me a message.
                                    </p>
                                    <div style={{ 
                                        display: "flex", 
                                        justifyContent: "center", 
                                        marginTop: "20px" 
                                    }}>
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="neon-btn btn-cyan"
                                            onClick={() => {
                                                window.open('mailto:Faseeh.khan456@gmail.com?subject=Portfolio Contact', '_blank');
                                            }}
                                            style={{
                                                fontSize: "1.1rem",
                                                padding: "16px 32px"
                                            }}
                                        >
                                            📧 Send Email to Faseeh
                                        </motion.button>
                                    </div>
                                    <div style={{ 
                                        marginTop: "20px", 
                                        textAlign: "center",
                                        color: "rgba(210,225,235,0.7)",
                                        fontSize: "0.9rem"
                                    }}>
                                        <p>Or copy my email: <strong>Faseeh.khan456@gmail.com</strong></p>
                                    </div>
                                </div>
                            )}

                            {activeModal === "links" && (
                                <div className="modal-grid">
                                    <div className="modal-card">
                                        <strong>GitHub</strong>
                                        <p className="small-muted">
                                            <a 
                                                href="https://github.com/faseehkhan-dev" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "rgba(210,225,235,0.8)",
                                                    textDecoration: "none",
                                                    borderBottom: "1px solid rgba(0,246,255,0.3)"
                                                }}
                                            >
                                                github.com/faseehkhan-dev
                                            </a>
                                        </p>
                                    </div>
                                    <div className="modal-card">
                                        <strong>LinkedIn</strong>
                                        <p className="small-muted">
                                            <a 
                                                href="https://fs.blabigo.org/s/pcol5Jiz" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "rgba(210,225,235,0.8)",
                                                    textDecoration: "none",
                                                    borderBottom: "1px solid rgba(255,62,198,0.3)"
                                                }}
                                            >
                                                linkedin.com/in/faseeh-rehman-097077299
                                            </a>
                                        </p>
                                    </div>
                                    <div className="modal-card">
                                        <strong>Twitter</strong>
                                        <p className="small-muted">@faseeh (test)</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}


        </div>
    )
}
