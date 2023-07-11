import { GameObject, Transform } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { LevelType } from './Configs';
import GateComponent from './GateComponent';

export default class LevelComponent extends ZepetoScriptBehaviour {
    public LevelType : LevelType = null;
    public PlayerSpawnPoint : Transform = null;
    public EnemySpawnPoints : Transform[] = null;

    public GateGameObject : GameObject = null;
    public GateComponent : GateComponent = null;

    Start() {    
        this.GateComponent = this.GateGameObject.GetComponent<GateComponent>();
    }
}