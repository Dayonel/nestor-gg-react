import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { SceneFX } from "./lib/SceneFX";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import WWater from './WWater'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Scene1({ canvas, renderer, cameraZ = 40, onMount }: { canvas: any, renderer: THREE.WebGLRenderer, cameraZ: number, onMount: (sceneFX: SceneFX) => void }) {
    const start = 0;
    const end = 20;
    const sceneFX = useRef<SceneFX>();
    let water: any;
    // let dispatch = createEventDispatcher();
    let group: THREE.Group;
    let godRays: any;
    let envMap: any;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        sceneFX.current = new SceneFX(
            start,
            end,
            canvas,
            renderer,
            window.innerWidth,
            window.innerHeight,
            30000
        );

        if (!sceneFX) return;

        sceneFX.current.camera.position.set(0, 8, cameraZ);

        console.log('waiting');

        (async () => {
            await loadScene();
        })();

        console.log('waited');

        animateOnScroll();

        console.log('from child')
        onMount(sceneFX.current);

        // dispatch("mount", { sceneFX });
    }, []);

    const loadScene = async () => {
        if (!sceneFX.current) return;

        group = new THREE.Group();

        const loader = new RGBELoader();
        envMap = await loader.loadAsync("textures/skybox/venice_sunset_2k.hdr");
        envMap.mapping = THREE.EquirectangularReflectionMapping;
        // dispatch("progress", 5);

        // amsterdam
        const gltfLoader = new GLTFLoader();
        const draco = new DRACOLoader(); // compression
        draco.setDecoderConfig({ type: "js" });
        draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        gltfLoader.setDRACOLoader(draco);

        const windowMaterial = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: 0x2a2823,
            envMap: envMap,
            reflectivity: 1,
            refractionRatio: 0.98,
            shininess: 100,
        });

        const model1 = (await gltfLoader.loadAsync("models/amsterdam6.gltf"))
            .scene;
        model1.position.set(3.5, -1.5, 0);
        model1.scale.multiplyScalar(1.5);
        model1.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if (obj.name == "Windows") {
                    obj.material = windowMaterial;
                }
            }
        });

        // dispatch("progress", 10);

        const model2 = (await gltfLoader.loadAsync("models/amsterdam2.gltf"))
            .scene;
        model2.position.set(-4.0, -1.0, 0);
        model2.scale.multiplyScalar(1.5);
        model2.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if (obj.name == "Windows") {
                    obj.material = windowMaterial;
                }
            }
        });

        // dispatch("progress", 15);

        const model3 = (await gltfLoader.loadAsync("models/amsterdam3.gltf"))
            .scene;
        model3.position.set(-11.5, -1.5, 0);
        model3.scale.multiplyScalar(1.5);
        model3.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if (obj.name == "Windows") {
                    obj.material = windowMaterial;
                }
            }
        });

        // dispatch("progress", 20);

        const model4 = (await gltfLoader.loadAsync("models/amsterdam4.gltf"))
            .scene;
        model4.position.set(11, -1.5, 0);
        model4.scale.multiplyScalar(1.5);
        model4.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if (obj.name == "Windows") {
                    obj.material = windowMaterial;
                }
            }
        });

        // dispatch("progress", 25);

        const model5 = (await gltfLoader.loadAsync("models/amsterdam5.gltf"))
            .scene;
        model5.position.set(-18.9, -1.0, 0);
        model5.scale.multiplyScalar(1.5);
        model5.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if (obj.name == "Windows") {
                    obj.material = windowMaterial;
                }
            }
        });

        // dispatch("progress", 30);

        const model6 = (await gltfLoader.loadAsync("models/amsterdam1.gltf"))
            .scene;
        model6.position.set(18.6, -1.0, 0);
        model6.scale.multiplyScalar(1.5);
        model6.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if (obj.name == "Windows") {
                    obj.material = windowMaterial;
                }
            }
        });

        // dispatch("progress", 35);

        const model7 = (await gltfLoader.loadAsync("models/amsterdam6.gltf"))
            .scene;
        model7.position.set(-26.5, -1.0, 0);
        model7.scale.multiplyScalar(1.5);
        model7.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if (obj.name == "Windows") {
                    obj.material = windowMaterial;
                }
            }
        });

        // dispatch("progress", 40);

        const model8 = (await gltfLoader.loadAsync("models/amsterdam3.gltf"))
            .scene;
        model8.position.set(26, -1.0, 0);
        model8.scale.multiplyScalar(1.5);
        model8.traverse((obj: any) => {
            if (obj.isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;

                if (obj.name == "Windows") {
                    obj.material = windowMaterial;
                }
            }
        });

        // dispatch("progress", 100);

        // area lights
        RectAreaLightUniformsLib.init();

        const width = 4;
        const height = 25;
        const intensity = 2;

        const rectLight1 = new THREE.RectAreaLight(
            0xff0000,
            intensity,
            width,
            height
        );
        rectLight1.position.set(-5, 0, 0);
        rectLight1.rotation.set(0, THREE.MathUtils.degToRad(180), 0);

        const rectLight2 = new THREE.RectAreaLight(
            0x00ff00,
            intensity,
            width,
            height
        );
        rectLight2.position.set(-1, 0, 0);
        rectLight2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);

        const rectLight3 = new THREE.RectAreaLight(
            0x0000ff,
            intensity,
            width,
            height
        );
        rectLight3.position.set(3, 0, 0);
        rectLight3.rotation.set(0, THREE.MathUtils.degToRad(180), 0);

        const rectLight4 = new THREE.RectAreaLight(
            0xd77e29,
            intensity,
            width,
            height
        );
        rectLight4.position.set(7, 0, 0);
        rectLight4.rotation.set(0, THREE.MathUtils.degToRad(180), 0);

        // sky light
        const rectLight5 = new THREE.RectAreaLight(0x0e1215, 100, 100, 8);
        rectLight5.position.set(0, 20, 0);
        rectLight5.rotation.set(
            THREE.MathUtils.degToRad(90),
            THREE.MathUtils.degToRad(180),
            0
        );

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-0.317, 37.285, 45.0);
        directionalLight.target.position.set(0, 0, 0);

        // lights
        buildingLights();
        sceneLights();

        group.add(model1);
        group.add(model2);
        group.add(model3);
        group.add(model4);
        group.add(model5);
        group.add(model6);
        // group.add(model7);
        // group.add(model8);

        sceneFX.current.scene.add(group);
    };

    const sceneLights = () => {
        if (!sceneFX.current) return;

        // sky color ground color intensity
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 20, -20);
        sceneFX.current.scene.add(hemiLight);

        const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
        // scene.add(hemiLightHelper);

        const dirLight = new THREE.DirectionalLight(0xffffff, 10);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(30);
        sceneFX.current.scene.add(dirLight);

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        const d = 50;

        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;

        const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
        // scene.add(dirLightHelper);
    };

    const buildingLights = () => {
        const rl1 = new THREE.RectAreaLight(0xffffbb, 25.0, 5, 20);
        rl1.position.set(-10, 21, 2);
        rl1.rotation.set(THREE.MathUtils.degToRad(-60), 0, 0);
        const rlh1 = new RectAreaLightHelper(rl1);
        group.add(rl1);
        // group.add(rlh1);

        const rl3 = new THREE.RectAreaLight(0xffffbb, 25.0, 5, 20);
        rl3.position.set(10, 21, 2);
        rl3.rotation.set(THREE.MathUtils.degToRad(-60), 0, 0);
        const rlh3 = new RectAreaLightHelper(rl3);
        group.add(rl3);
        // group.add(rlh3);
    };

    const animateOnScroll = () => {
        if (!sceneFX.current) return;

        gsap.timeline({
            scrollTrigger: {
                scroller: "#scrolling",
                trigger: ".hero",
                start: "top top",
                end: "+=" + window.innerHeight,
                scrub: true,
            },
        }).to(sceneFX.current.camera.position, {
            x: sceneFX.current.camera.position.x,
            y: sceneFX.current.camera.position.y,
            z: cameraZ,
        });

        // scene background color = fog color
        // const color = new THREE.Color("black");
        // sceneFX.scene.background = color;
        // const near = 35;
        // const far = cameraZ;
        // sceneFX.scene.fog = new THREE.Fog(color, near, far);
    };

    const WWaterIf = () => {
        if (sceneFX.current) {
            return (<WWater scene={sceneFX.current.scene} />)
        }
    }

    return (
        <>
            {WWaterIf()}
        </>
    );
}
