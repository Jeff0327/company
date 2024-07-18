import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ThreeSectionProps {
  modelURL: string;
}

const ThreeSection: React.FC<ThreeSectionProps> = ({ modelURL }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Mesh>();

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Light gray background

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10); // More natural camera position

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Add orbit controls for interactive viewing
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const loader = new STLLoader();

    loader.load(
      modelURL,
      (geometry: THREE.BufferGeometry) => {
        geometry.center(); // Center the geometry
        geometry.computeVertexNormals(); // Compute vertex normals for smooth shading

        const material = new THREE.MeshPhongMaterial({
          color: 0x6699ff,
          specular: 0x111111,
          shininess: 200,
        });
        const model = new THREE.Mesh(geometry, material);

        // Scale the model to fit the scene
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const scale = 5 / size;
        model.scale.set(scale, scale, scale);

        // Remove the previous model if it exists
        if (modelRef.current) {
          scene.remove(modelRef.current);
        }

        // Save the current model reference
        modelRef.current = model;
        scene.add(model);

        // Animation function
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (err: Error) => {
        console.error("An error occurred loading the 3D model:", err);
      }
    );

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [modelURL]); // Dependency array to reload when modelURL changes

  return <div ref={mountRef} className="flex w-screen h-screen" />;
};

export default ThreeSection;
