import { Material, Input, KeyCode, GameObject, MeshFilter, MeshRenderer, SkinnedMeshRenderer, Mesh } from 'UnityEngine';
import { ZepetoPlayers, SpawnInfo } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';

export default class CopyMeshScript extends ZepetoScriptBehaviour {
    public MeshToCopyName : string = null;
    public TargetGameObject : GameObject = null;

    Start() {        
   
    }

    Update() {
        if (Input.GetKeyDown(KeyCode.R)) {
            this.CopySkinnedMesh();
        }
    }

    CopySkinnedMesh() {
        const GameObjectToCopy : GameObject = GameObject.Find(this.MeshToCopyName);

        const targetMeshFilter : MeshFilter = this.TargetGameObject.GetComponent<MeshFilter>();
        const targetMeshRenderer : MeshRenderer = this.TargetGameObject.GetComponent<MeshRenderer>();

        const skinnedMeshRendererToCopy = GameObjectToCopy.GetComponent<SkinnedMeshRenderer>();
        skinnedMeshRendererToCopy.BakeMesh(targetMeshFilter.mesh, true);
        targetMeshRenderer.material = skinnedMeshRendererToCopy.material;
    }

}