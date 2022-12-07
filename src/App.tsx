import { useEffect, useRef } from "react";
import * as CANNON from "cannon";
import { Scene, HemisphericLight, FreeCamera, Vector3, Color3, MeshBuilder, PhysicsImpostor, CannonJSPlugin } from "@babylonjs/core";
import { GridMaterial } from '@babylonjs/materials';
import SceneComponent from "./components/SceneComponent";
import './App.css';

function App() {
  const inputEle = useRef(null);

  const onSceneReady = (scene: Scene) => {
    const gravityVector = new Vector3(0, -9.8, 0);
    const physicsPlugin = new CannonJSPlugin(false, 10, CANNON);
    scene.enablePhysics(gravityVector, physicsPlugin);

    var camera = new FreeCamera("camera1", new Vector3(0, 10, 80), scene);
    camera.setTarget(new Vector3(0, 10, 400));
    camera.attachControl(inputEle, true);

    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var environment = scene.createDefaultEnvironment({ createGround: false, skyboxSize: 1000 });
    environment?.setMainColor(Color3.FromHexString("#74b9ff"));

    var ground = MeshBuilder.CreateGround("ground", { width: 1000, height: 1000 }, scene);
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.8, restitution: 0.5, disableBidirectionalTransformation: true }, scene);
    ground.checkCollisions = true;
    ground.material = new GridMaterial("mat", scene);
  };

  const onRender = (scene: Scene) => {

  };

  return (
    <div ref={inputEle}>
      <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} />
    </div>
  )
}

export default App
