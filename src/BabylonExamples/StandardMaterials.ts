import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, BallAndSocketConstraint, StandardMaterial, Texture, RawTexture2DArray} from "@babylonjs/core"

export class StandardMaterials{
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
        camera.speed = 0.25
        camera.position = new Vector3(0,1,-5)
        
        //type of light
        const hemiLight = new HemisphericLight("hemiLight",new Vector3(0,1,0), this.scene)
        //light intensity , default 1
        hemiLight.intensity = 1

        //floor
        const ground = MeshBuilder.CreateGround("ground",{width:10, height:10}, this.scene)
        
        const ball = MeshBuilder.CreateSphere("ball",{diameter:1},this.scene)
        //adjust ball postion, 1 higher than ground
        ball.position = new Vector3(0,1,0)

        //assign material to ball and ground
        ground.material = this.CreateGroundMaterial();
        ball.material = this.CreateBallMaterial();

        return scene
    }

    CreateGroundMaterial():StandardMaterial{
        const groundMat = new StandardMaterial("groundMat",this.scene)

        const uvScale:number = 4;
        const texArray: Texture[] = []

        //texture mat
        const diffuseTex = new Texture("../textures/stone/stone_diffuse.jpg",this.scene) 
        groundMat.diffuseTexture = diffuseTex;

        const normalTex = new Texture("../textures/stone/stone_normal.jpg",this.scene)
        groundMat.bumpTexture = normalTex

        const aoTex = new Texture("../textures/stone/stone_ao.jpg",this.scene)
        groundMat.ambientTexture = aoTex

        const specTex = new Texture("../textures/stone/stone_spec.jpg",this.scene)
        groundMat.specularTexture = specTex

        //push all texture to the array to set their u and v scales
        texArray.push(diffuseTex)
        texArray.push(normalTex)
        texArray.push(aoTex)
        texArray.push(specTex)

        //assign the v and v scales
        texArray.forEach((tex:Texture)=>{
            tex.uScale = uvScale;
            tex.vScale = uvScale;
        })


        return groundMat
    }
    CreateBallMaterial():StandardMaterial{
        const ballMat = new StandardMaterial("ballMat",this.scene)

        const uvScale:number = 1;
        const texArray: Texture[] = []

        //texture mat
        const diffuseTex = new Texture("../textures/metal/metal_diffuse.jpg",this.scene) 
        ballMat.diffuseTexture = diffuseTex;

        const normalTex = new Texture("../textures/metal/metal_normal.jpg",this.scene)
        ballMat.bumpTexture = normalTex
        ballMat.invertNormalMapX = true;
        ballMat.invertNormalMapY = true;

        const aoTex = new Texture("../textures/metal/metal_ao.jpg",this.scene)
        ballMat.ambientTexture = aoTex

        const specTex = new Texture("../textures/metal/metal_spec.jpg",this.scene)
        ballMat.specularTexture = specTex
        ballMat.specularPower = 1;

        //push all texture to the array to set their u and v scales
        texArray.push(diffuseTex)
        texArray.push(normalTex)
        texArray.push(aoTex)
        texArray.push(specTex)

        //assign the v and v scales
        texArray.forEach((tex:Texture)=>{
            tex.uScale = uvScale;
            tex.vScale = uvScale;
        })


        return ballMat
    }
}