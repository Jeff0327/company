import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three-stdlib";
import { OrbitControls } from "three-stdlib";

interface ThreeSectionProps {
  modelURL: string;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThreeSection: React.FC<ThreeSectionProps> = ({ modelURL, isLoading, setIsLoading }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const loader = new STLLoader();

    setIsLoading(true); // Set loading to true when starting to load new model

    loader.load(
      modelURL,
      (geometry: THREE.BufferGeometry) => {
        geometry.center();
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhongMaterial({
          color: 0x6699ff,
          specular: 0x111111,
          shininess: 200,
        });
        const model = new THREE.Mesh(geometry, material);

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3()).length();
        const scale = 5 / size;
        model.scale.set(scale, scale, scale);

        if (modelRef.current) {
          scene.remove(modelRef.current);
        }

        modelRef.current = model;
        scene.add(model);
        setIsLoading(false);

        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (event: ErrorEvent) => {
        console.error("An error occurred loading the 3D model:", event.message);
        setIsLoading(false);
      }
    );

    const handleResize = () => {
      if (!mount) return;
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
  }, [modelURL, setIsLoading]);

  return (
    <div ref={mountRef} className="flex w-screen h-screen relative">
      {isLoading && (
        <div className="absolute flex-col inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <div className="loader"/>
          <strong className="text-center p-2">로딩중</strong>
        </div>
      )}
    </div>
  );
};

export default ThreeSection;