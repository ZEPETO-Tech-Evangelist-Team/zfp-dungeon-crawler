import { Vector3 } from 'UnityEngine';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { EntityType } from './Configs';
import EnemyComponent from './EnemyComponent';
import Main from './Main';

export default class LookAtComponent extends ZepetoScriptBehaviour {
    public LookAtType : EntityType = null;

    Start() {    

    }

    Update() {
        switch (this.LookAtType) {
            case EntityType.PLAYER:
                if (ZepetoPlayers.instance.LocalPlayer !== null) {
                    this.transform.LookAt(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position, new Vector3(0,1,0));
                }
                break;
            case EntityType.ENEMY:
                let closestEnemyComponent : EnemyComponent = null;
                let distanceToCompare : number = Number.MAX_VALUE;

                Main.instance.LevelManager.EnemyComponents.forEach(element => {
                    if (element !== null) {
                        const distance :number = Vector3.Distance(this.gameObject.transform.position, element.gameObject.transform.position);
                        if (distance < distanceToCompare) {
                            distanceToCompare = distance;
                            closestEnemyComponent = element;
                        }
                        this.transform.LookAt(closestEnemyComponent.transform.position, new Vector3(0,1,0));
                    }
                });
                break;
    
        }
    }



}