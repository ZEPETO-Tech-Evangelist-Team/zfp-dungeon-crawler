import { ZepetoPlayers, SpawnInfo, LocalPlayer } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';

export default class ClientStarter extends ZepetoScriptBehaviour {
    LocalPlayer : LocalPlayer = null;
    
    Start() {    
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);             
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {                        
            this.LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
            this.LocalPlayer.zepetoPlayer.character.gameObject.tag = "PLAYER";
        });
    }

}