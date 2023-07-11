import { Collider, ForceMode, GameObject, Material, MeshRenderer, Rigidbody, Space, Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { EntityType } from './Configs';

export default class ProjectileComponent extends ZepetoScriptBehaviour {
    public ForceAmount : number = 0;
    public LifeTimeSecs : number = 0;
    private _rigidBody : Rigidbody = null;
    private _timer : number = 0;
    public OwnerType : EntityType = null;

    public ProjectileMaterial : MeshRenderer = null;

    Start() {    
        this._rigidBody = this.GetComponent<Rigidbody>();
        this._rigidBody.AddForce(this.transform.forward * this.ForceAmount, ForceMode.Impulse);
    }

    Update() {
        this._timer += Time.deltaTime;
        if (this._timer >= this.LifeTimeSecs) {
            GameObject.Destroy(this.gameObject);
        }
        //this.transform.Translate(this.transform.forward * this.Speed * Time.deltaTime, Space.World);
    }

    OnCollisionEnter(other : Collider) {
        //console.log(`projectile hit: ${other.gameObject.name}`);
        if (other.gameObject.tag === "PLAYER" || other.gameObject.tag === "ENEMY") {
            GameObject.Destroy(this.gameObject);
        }
    }

}