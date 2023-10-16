import { useEffect, useRef } from "react";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import TWEEN from "@tweenjs/tween.js";
import { SceneFX } from "./lib/SceneFX"
import Loading from './lib/Loading'
import Scene1 from './Scene1'
import React from 'react'
import styles from './Three.module.scss';

export default function Three({ scrollPercent = 0, onMount }: { scrollPercent: number, onMount: () => void }) {
    const webGLAvailable = React.useRef(false);
    const scenes = React.useRef<SceneFX[]>([]);
    const loading = React.useRef(true);

    let cameraZ: number = 40;
    let canvas = React.useRef<HTMLCanvasElement>(null);
    let message: string | undefined = undefined;
    // let dispatch = createEventDispatcher();
    let renderer: THREE.WebGLRenderer;
    let stats: any;
    let introAnimationCompleted: boolean;
    let animationIntro: any;
    let progress = 0;

    const totalScenes = 2;

    useEffect(() => {
        let available = WebGL.isWebGLAvailable();
        webGLAvailable.current = available;
        if (!available) {
            const warning = WebGL.getWebGLErrorMessage();
            message = warning.innerText;
            loading.current = false;
            return;
        }

        init();

        window.onresize = () => onResize();
        onResize();
        loop();
    }, [])

    const init = () => {
        if (!canvas.current) return;

        // renderer
        renderer = new THREE.WebGLRenderer({
            canvas: canvas.current,
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

        console.log('canvas initialized')
    };

    const onResize = () => {
        scenes.current?.forEach((f) => {
            if (!canvas.current) return;

            f.resize(canvas.current, renderer);
        });
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
        if (!webGLAvailable.current) return;

        requestAnimationFrame(loop);

        stats?.update();

        if (!loading.current && !introAnimationCompleted) TWEEN.update();

        if (loading.current && scenes.current?.length == totalScenes) {
            console.log('LOADED!')
            onMount();
            animationIntro.start();
            loading.current = false
        }

        scenes.current?.forEach((f) => {
            if (scrollPercent >= f.start && scrollPercent <= f.end) {
                renderer.render(f.scene, f.camera);
            }
        });
    };

    const onScene1Mount = (sceneFX: SceneFX) => {
        console.log('FROM CHILD');
        scenes.current = [...scenes.current, sceneFX];
        introAnimation(sceneFX.camera);
    }

    const LoadingIf = () => {
        var result;
        if (loading.current) {
            result = (<Loading></Loading>)
        }
        if (webGLAvailable) {
            result = (
                <>
                    <span className="scroll">Scroll progress: {scrollPercent?.toFixed(2)}%</span>
                    <Scene1 canvas={canvas.current} renderer={renderer} cameraZ={cameraZ} onMount={onScene1Mount} />
                </>
            )
        }
        if (message) {
            result = (<p className="message">{message}</p>);
        }

        return result;
    }

    return (
        <>
            <canvas ref={canvas} />
            {LoadingIf()}
        </>
    )
}