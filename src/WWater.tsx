import { useEffect } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water2.js";

export default function WWater({ scene }: { scene: THREE.Scene }) {
    let water;

    const params = {
        color: "#ffffff",
        scale: 4,
        flowX: 0.5,
        flowY: 0.5,
    };

    useEffect(() => {
        init();
    })

    const init = () => {
        // water
        const waterGeometry = new THREE.PlaneGeometry(100, 100);

        water = new Water(waterGeometry, {
            color: params.color,
            scale: params.scale,
            flowDirection: new THREE.Vector2(params.flowX, params.flowY),
            // textureWidth: 1024,
            // textureHeight: 1024,
            reflectivity: 1,
        });

        water.position.z = 50;
        water.position.y = -0.05;
        water.rotation.x = THREE.MathUtils.degToRad(-90);
        scene.add(water);
    };

    return (
        <></>
    )
}