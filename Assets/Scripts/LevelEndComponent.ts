import { Collider, Collision, Debug } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { GameState } from './Configs';
import Main from '../Main';

export default class LevelEndComponent extends ZepetoScriptBehaviour {

    OnTriggerEnter(other : Collider)
    {
        if (other.gameObject.tag === "PLAYER") {
            Main.instance.SetGameState(GameState.END_FIGHTING);
        }
    }

}