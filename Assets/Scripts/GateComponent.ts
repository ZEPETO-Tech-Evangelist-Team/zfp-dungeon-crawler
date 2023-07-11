import { Debug, Time, Transform, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { transform } from 'typescript';
import { DoorState } from './Configs';

export default class GateComponent extends ZepetoScriptBehaviour {
    public ClosePosition : Vector3 = null;
    public OpenPosition : Vector3 = null;
    public GateSpeed : number = null;
    private _fraction : number = null;
    private _doorState : DoorState = null;

    SetDoorState(doorState : DoorState) {
        this._doorState = doorState;
    }

    Start() { 
        this._doorState = DoorState.CLOSE;   
        this._fraction = 0;
    }

    Update() {
        switch (this._doorState) {
            case DoorState.OPEN:
                this.Open();
                break;
            case DoorState.CLOSE:
                this.Close();
                break;
            case DoorState.IDLE:

                break;
        }
    }

    SetOpen() {
        this._doorState = DoorState.IDLE;
        this._fraction = 0;
        this.transform.localPosition = this.OpenPosition;
    }

    SetClose() {
        this._doorState = DoorState.IDLE;
        this._fraction = 0;
        this.transform.localPosition = this.ClosePosition;
    }

    Open() {
        this._doorState = DoorState.OPEN;
		if (this._fraction < 1) {
			this._fraction += Time.deltaTime * this.GateSpeed;
			this.transform.localPosition = Vector3.Lerp(this.ClosePosition, this.OpenPosition, this._fraction);
		}
    }

    Close() {
        this._doorState = DoorState.CLOSE;
		if (this._fraction < 1) {
			this._fraction += Time.deltaTime * this.GateSpeed;
			this.transform.localPosition = Vector3.Lerp(this.OpenPosition, this.ClosePosition, this._fraction);
		}
    }

}