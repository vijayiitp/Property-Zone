import { useEffect, useRef } from "react";
import Globe, { GlobeInstance } from "globe.gl";

const RotatingGlobe: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const world: GlobeInstance = new Globe(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .backgroundColor("rgba(15, 23, 42, 0.0)");

    // Enable auto rotation
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;

    // Disable zoom & pan, lock vertical angle
    const controls = world.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2; // lock vertical angle
    controls.maxPolarAngle = Math.PI / 2;

    // Resize canvas with container
    const resizeHandler = () => {
      world.width(globeRef.current!.clientWidth);
      world.height(globeRef.current!.clientHeight);
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="w-full relative mx-auto my-0 sm:my-0 md:my-0 lg:my-10 rounded-xl overflow-hidden flex justify-center items-center h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto">
  <div ref={globeRef} className="w-full h-full" />
</div>

  );
};

export default RotatingGlobe;
