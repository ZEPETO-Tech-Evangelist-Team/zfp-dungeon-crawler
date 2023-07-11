import { Collider, Debug } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class EnterTest extends ZepetoScriptBehaviour {

    Start() {    

    }

    OnTriggerEnter(other : Collider)
    {
        Debug.LogError("on trigger enter");
    }

}