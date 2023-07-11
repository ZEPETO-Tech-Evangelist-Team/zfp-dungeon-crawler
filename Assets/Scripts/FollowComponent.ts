import { GameObject, Space, Time, Transform } from 'UnityEngine'
import { NavMeshAgent } from 'UnityEngine.AI';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class FollowComponent extends ZepetoScriptBehaviour {
    public FollowTarget : GameObject = null;
    public NavMeshAgent : NavMeshAgent = null;

    Start() {    
        this.NavMeshAgent = this.GetComponent<NavMeshAgent>();
    }

    Update() {
        if (ZepetoPlayers.instance.LocalPlayer !== null) {
            this.NavMeshAgent.SetDestination(ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.transform.position);
        }
    }

}