import { useEffect } from "react";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import TWEEN from "@tweenjs/tween.js";
import { SceneFX } from "./lib/SceneFX"
import Loading from './lib/Loading'
import Scene1 from './Scene1'
import React from 'react'

export default function Three({ scrollPercent = 0, onMount }: { scrollPercent: number, onMount: () => void }) {
    const [webGLAvailable, setWebGLAvailable] = React.useState(false);
    // const [sceneFX, setSceneFX] = React.useState<SceneFX>();
    const [scenes, setScenes] = React.useState<SceneFX[]>([]);

    let message: string | undefined = undefined;
    // let dispatch = createEventDispatcher();
    let canvas: HTMLCanvasElement;
    let renderer: THREE.WebGLRenderer;
    let stats: any;
    let loading: boolean = true;
    let introAnimationCompleted: boolean;
    let animationIntro: any;
    let cameraZ: number;
    let progress = 0;

    const totalScenes = 1;

    useEffect(() => {
        let available = WebGL.isWebGLAvailable();
        setWebGLAvailable(available);
        if (!available) {
            const warning = WebGL.getWebGLErrorMessage();
            message = warning.innerText;
            loading = false;
            return;
        }

        init();

        window.onresize = () => onResize();
        onResize();

        requestAnimationFrame(loop);


    }, [])

    const init = () => {
        // renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });

        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        // renderer.setClearColor(0x000000, 1);
        // renderer.useLegacyLights = true;

        // shadows
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // stats
        stats = new Stats();
        document.body.appendChild(stats.dom);
    };

    const onResize = () => {
        scenes?.forEach((f) => f.resize(canvas, renderer));
    };

    const introAnimation = (camera: THREE.PerspectiveCamera) => {
        // @ts-ignore
        animationIntro = new TWEEN.Tween(camera.position)
            .to(
                {
                    // @ts-ignore
                    x: camera.position.x,
                    // @ts-ignore
                    y: camera.position.y,
                    z: cameraZ - 10,
                },
                1000 // 2500
            ) // time take to animate
            .delay(500)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onComplete(() => (introAnimationCompleted = true));
    };

    const loop = () => {
        if (!webGLAvailable) return;

        requestAnimationFrame(loop);

        stats.update();

        if (!loading && !introAnimationCompleted) TWEEN.update();

        console.log(scenes)
        if (loading && scenes?.length == totalScenes) {
            console.log('LOADED!')
            onMount();
            animationIntro.start();
            loading = false;
        }

        scenes?.forEach((f) => {
            if (scrollPercent >= f.start && scrollPercent <= f.end) {
                renderer.render(f.scene, f.camera);
            }
        });
    };

    const onScene1Mount = (sceneFX: SceneFX) => {
        console.log('FROM CHILD');
        // setSceneFX(sceneFX)
        setScenes([...scenes, sceneFX]);
        introAnimation(sceneFX.camera);
    }

    const LoadingIf = () => {
        var result;
        if (loading) {
            result = (<Loading></Loading>)
        }
        if (webGLAvailable) {
            result = (
                <div>
                    <span className="scroll">Scroll progress: {scrollPercent?.toFixed(2)}%</span>
                    <Scene1 canvas={canvas} renderer={renderer} cameraZ={cameraZ} onMount={onScene1Mount} />
                </div>
            )
        }
        if (message) {
            result = (<p className="message">{message}</p>);
        }

        return result;
    }

    return (
        <>
            {LoadingIf()}
        </>
    )
}