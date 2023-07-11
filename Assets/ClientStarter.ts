import { GameObject, Input, KeyCode, Material, Mesh, MeshFilter, MeshRenderer, SkinnedMeshRenderer } from 'UnityEngine';
import { ZepetoPlayers, SpawnInfo, LocalPlayer, ZepetoPlayer } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';

export default class ClientStarter extends ZepetoScriptBehaviour {
    public HasLocalPlayerLoaded : boolean = false;
    private localPlayer : LocalPlayer = null;

    Start() {        
        // Grab the user id specified from logging into zepeto through the editor. 
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);             
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {            
            this.HasLocalPlayerLoaded = true; 
            
            this.localPlayer = ZepetoPlayers.instance.LocalPlayer;
            this.localPlayer.zepetoPlayer.character.gameObject.tag = "PLAYER";
        });    
    }

    Update() {

    }
}