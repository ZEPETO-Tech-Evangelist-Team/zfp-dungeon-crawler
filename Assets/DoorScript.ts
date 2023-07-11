import { Time, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class DoorScript extends ZepetoScriptBehaviour {

    Start() {    

    }

    Update() {
        this.transform.position += new Vector3(0, Time.deltaTime, 0);
    }

}