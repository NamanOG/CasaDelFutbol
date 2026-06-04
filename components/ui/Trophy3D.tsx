"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { Loader2, AlertCircle } from "lucide-react"

interface Trophy3DProps {
  modelPath?: string
  fallbackImage?: string
}

export default function Trophy3D({ 
  modelPath = "/trophy.glb", 
  fallbackImage = "/images/world_cup_trophy_1780508105236.png" 
}: Trophy3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [usingFallbackGeometry, setUsingFallbackGeometry] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    // ─── THREE.JS SCENE SETUP ───────────────────────────────────────────
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      100
    )
    camera.position.set(0, 1.8, 5.5)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // ─── CONTROLS ────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.minDistance = 3
    controls.maxDistance = 8
    controls.enablePan = false
    // Auto rotation settings
    controls.autoRotate = true
    controls.autoRotateSpeed = 2.0 // Slow elegant spin
    
    // Custom target offset to frame the trophy
    controls.target.set(0, 0.4, 0)
    controls.update()

    // ─── LIGHTING SYSTEM ────────────────────────────────────────────────
    // Hemisphere light for uniform ambient levels
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111111, 2.5)
    scene.add(hemiLight)

    // Ambient light for shadow details
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // High intensity downward Spotlight
    const spotlight = new THREE.SpotLight(0xffffff, 180.0)
    spotlight.position.set(0, 5, 0)
    spotlight.angle = Math.PI / 6
    spotlight.penumbra = 0.9
    spotlight.castShadow = true
    spotlight.shadow.mapSize.width = 1024
    spotlight.shadow.mapSize.height = 1024
    spotlight.shadow.camera.near = 0.5
    spotlight.shadow.camera.far = 10
    spotlight.shadow.bias = -0.001
    scene.add(spotlight)

    // Back rim point light for golden silhouette glow
    const rimLight = new THREE.PointLight(0xD5AD1F, 65.0, 10)
    rimLight.position.set(2, 3, -3)
    scene.add(rimLight)

    // Subtler fill light from front (neutral white light for color reproduction)
    const fillLight = new THREE.DirectionalLight(0xffffff, 6.0)
    fillLight.position.set(-3, 2, 3)
    scene.add(fillLight)

    // ─── VOLUMETRIC SPOTLIGHT BEAM ──────────────────────────────────────
    // A custom cylinder shader with gradient transparency representing the beam
    const beamGeo = new THREE.CylinderGeometry(0.15, 1.8, 5.0, 32, 1, true)
    beamGeo.translate(0, -2.5, 0) // Shift origin to top apex
    
    const beamMat = new THREE.ShaderMaterial({
      uniforms: {
        colorUniform: { value: new THREE.Color(0xffffff) },
        opacityUniform: { value: 0.18 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorUniform;
        uniform float opacityUniform;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          // vUv.y is 1.0 at the top apex, 0.0 at the bottom base
          float heightFade = pow(vUv.y, 2.2); 
          // Soften the cylinder edges
          float edgeFade = dot(vNormal, vec3(0.0, 0.0, 1.0));
          edgeFade = smoothstep(0.0, 1.0, edgeFade);
          
          gl_FragColor = vec4(colorUniform, opacityUniform * heightFade * edgeFade);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    })
    
    const beamMesh = new THREE.Mesh(beamGeo, beamMat)
    beamMesh.position.set(0, 4.9, 0)
    scene.add(beamMesh)

    // ─── TROPHY PARENT ROTATION GROUP ───────────────────────────────────
    const trophyGroup = new THREE.Group()
    scene.add(trophyGroup)

    // ─── PROCEDURAL FALLBACK MODEL GENERATION ────────────────────────────
    const createProceduralTrophy = () => {
      setUsingFallbackGeometry(true)
      const fallbackGroup = new THREE.Group()

      // Materials
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xD5AD1F,
        roughness: 0.12,
        metalness: 0.95,
        bumpScale: 0.05
      })

      const greenMarbleMat = new THREE.MeshStandardMaterial({
        color: 0x0b2413,
        roughness: 0.25,
        metalness: 0.3,
        bumpScale: 0.02
      })

      // 1. Marble Base (Cylinder stack)
      const baseGeo1 = new THREE.CylinderGeometry(0.65, 0.75, 0.3, 32)
      const base1 = new THREE.Mesh(baseGeo1, greenMarbleMat)
      base1.position.y = 0.15
      base1.castShadow = true
      base1.receiveShadow = true
      fallbackGroup.add(base1)

      const baseGeo2 = new THREE.CylinderGeometry(0.58, 0.62, 0.35, 32)
      const base2 = new THREE.Mesh(baseGeo2, greenMarbleMat)
      base2.position.y = 0.45
      base2.castShadow = true
      base2.receiveShadow = true
      fallbackGroup.add(base2)

      // Gold rings dividing base sections
      const ringGeo1 = new THREE.CylinderGeometry(0.66, 0.66, 0.04, 32)
      const ring1 = new THREE.Mesh(ringGeo1, goldMat)
      ring1.position.y = 0.3
      fallbackGroup.add(ring1)

      const ringGeo2 = new THREE.CylinderGeometry(0.59, 0.59, 0.04, 32)
      const ring2 = new THREE.Mesh(ringGeo2, goldMat)
      ring2.position.y = 0.63
      fallbackGroup.add(ring2)

      // 2. Trophy Body/Shaft (Stylized upward arms)
      const stemGeo = new THREE.CylinderGeometry(0.2, 0.4, 0.9, 32)
      const stem = new THREE.Mesh(stemGeo, goldMat)
      stem.position.y = 1.05
      stem.castShadow = true
      stem.receiveShadow = true
      fallbackGroup.add(stem)

      const collarGeo = new THREE.TorusGeometry(0.28, 0.08, 16, 32)
      const collar = new THREE.Mesh(collarGeo, goldMat)
      collar.rotation.x = Math.PI / 2
      collar.position.y = 1.45
      fallbackGroup.add(collar)

      // Flares holding the globe
      const cupGeo = new THREE.CylinderGeometry(0.55, 0.22, 0.7, 32)
      const cup = new THREE.Mesh(cupGeo, goldMat)
      cup.position.y = 1.8
      cup.castShadow = true
      cup.receiveShadow = true
      fallbackGroup.add(cup)

      // 3. Globe on top (The World Cup ball)
      const globeGeo = new THREE.SphereGeometry(0.48, 32, 32)
      const globe = new THREE.Mesh(globeGeo, goldMat)
      globe.position.y = 2.25
      globe.castShadow = true
      globe.receiveShadow = true
      fallbackGroup.add(globe)

      // Center the fallback group
      fallbackGroup.position.set(0, -1.0, 0)
      trophyGroup.add(fallbackGroup)
      setLoading(false)
    }

    // ─── MODEL LOADER (GLTF / GLB) ──────────────────────────────────────
    const loader = new GLTFLoader()

    loader.load(
      modelPath,
      (gltf) => {
        // Traverse scene and setup shadows/gold styling properties
        gltf.scene.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh
            mesh.castShadow = true
            mesh.receiveShadow = true
            
            // Enhance physical materials for premium reflections
            if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const mat = mesh.material as THREE.MeshStandardMaterial
              mat.roughness = 0.35 // higher roughness for wider diffuse lighting spread
              mat.metalness = 0.55 // lower metalness so it reflects diffuse point lights without black reflection
              mat.emissive.setHex(0x3a2d0a) // warm golden ambient glow
              // Ensure color has nice warmth if it is gold
              if (mat.color.r > 0.5 && mat.color.g > 0.4 && mat.color.b < 0.3) {
                mat.color.setHex(0xD5AD1F)
              }
            }
          }
        })

        // Auto-center and fit model size inside viewport
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())

        const maxDim = Math.max(size.x, size.y, size.z)
        const targetHeight = 2.6 // Scale factor height
        const scale = targetHeight / maxDim
        gltf.scene.scale.set(scale, scale, scale)

        // Center model origin
        gltf.scene.position.x = -center.x * scale
        gltf.scene.position.y = -center.y * scale + 0.35 // Elevate slightly above grid
        gltf.scene.position.z = -center.z * scale

        trophyGroup.add(gltf.scene)
        setLoading(false)
      },
      // Progress
      (xhr) => {
        if (xhr.total > 0) {
          // Can monitor loading percent if needed
        }
      },
      // Error callback - fallback to procedural geometry
      (error) => {
        console.warn("Failed to load custom GLTF trophy model, generating procedural model:", error)
        createProceduralTrophy()
      }
    )

    // ─── RENDER LOOP ────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Slow bobbing/floaty animation
      const elapsed = clock.getElapsedTime()
      trophyGroup.position.y = Math.sin(elapsed * 1.6) * 0.08

      // Update controls (handles automatic rotation & user dragging damping)
      controls.update()

      // Subtly rotate spotlight beam cone in opposite direction for visual dynamics
      beamMesh.rotation.y = -elapsed * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // ─── RESPONSIVE RESIZE HANDLING ──────────────────────────────────────
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(container)

    // ─── CLEANUP ON UNMOUNT ─────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      
      // Clean up geometries/materials to prevent memory leaks
      scene.traverse((object) => {
        if (!(object as THREE.Mesh).isMesh) return
        const mesh = object as THREE.Mesh
        mesh.geometry.dispose()
        
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => mat.dispose())
        } else {
          mesh.material.dispose()
        }
      })

      renderer.dispose()
    }
  }, [modelPath])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full min-h-[350px] md:min-h-[420px] select-none cursor-grab active:cursor-grabbing flex items-center justify-center bg-black/20"
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas/60 backdrop-blur-xs transition-opacity duration-300 z-10">
          <Loader2 className="w-8 h-8 text-primary-gold animate-spin mb-3" />
          <span className="text-xs uppercase tracking-widest text-text-muted font-mono">
            Rendering 3D Showcase...
          </span>
        </div>
      )}

      {/* Volumetric Spotlight Backdrop helper lines in HTML (Enhances atmosphere) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Spotlight source glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-[60px]" />
        
        {/* Floor landing glow */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-12 bg-primary-gold/15 rounded-full blur-[24px]" />
      </div>

      {/* Indicator overlay for interactive controls */}
      {!loading && (
        <div className="absolute bottom-4 right-4 pointer-events-none font-mono text-[9px] uppercase tracking-wider text-text-muted/65 bg-canvas/30 px-2.5 py-1 border border-hairline rounded-sm">
          Drag to Orbit · Scroll to Zoom
        </div>
      )}

      {/* Debug notice if using procedural geometry */}
      {usingFallbackGeometry && !loading && (
        <div className="absolute top-4 left-4 pointer-events-none font-mono text-[9px] uppercase tracking-wider text-primary-gold/75 bg-primary-gold/5 px-2.5 py-1 border border-primary-gold/20 rounded-sm flex items-center gap-1.5">
          <AlertCircle size={10} />
          Procedural Fallback Active
        </div>
      )}
    </div>
  )
}
