import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { EntityType } from './Configs';

export default class EnemyComponent extends ZepetoScriptBehaviour {
    public Id : number = null;
    public EntityType : EntityType = null;

    Init(id : number) {
        this.Id = id;
    }
}