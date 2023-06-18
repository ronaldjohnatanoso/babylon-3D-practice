import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, BallAndSocketConstraint} from "@babylonjs/core"

export class BasicScene{
    scene: Scene;
    engine: Engine;
    constructor(private canvas:HTMLCanvasElement){
        this.engine = new Engine(this.canvas, true)
        this.scene = this.CreateScene();

        //render every
        this.engine.runRenderLoop(()=>{
            this.scene.render()
        })
    }

    CreateScene():Scene{
        const scene = new Scene(this.engine)

        //camera
        const camera = new FreeCamera("camera",new Vector3(0,1,0), this.scene)
        //attach control
        camera.attachControl();
        camera.position = new Vector3(0,2,5)
        
        //type of light
        const hemiLight = new HemisphericLight("hemiLight",new Vector3(0,1,0), this.scene)
        //light intensity , default 1
        hemiLight.intensity = 0.5

        //floor
        const ground = MeshBuilder.CreateGround("ground",{width:10, height:10}, this.scene)
        
        const ball = MeshBuilder.CreateSphere("ball",{diameter:1},this.scene)
        //adjust ball postion, 1 higher than ground
        ball.position = new Vector3(0,1,0)
        return scene
    }
}