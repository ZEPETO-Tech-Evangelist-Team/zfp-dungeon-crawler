import { Camera, Collider, Debug, GameObject, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import EnemyComponent from './EnemyComponent';
import ProjectileComponent from './ProjectileComponent';
import SharpComponent from './SharpComponent';
import { EntityType, GameState, PLAYER_STARTING_HEALTH, PROJECTILE_DAMAGE, SHARP_DAMAGE } from './Configs';
import { TextMeshProUGUI } from 'TMPro';
import Main from './Main';

export default class HealthComponent extends ZepetoScriptBehaviour {

    public HealthUI : GameObject = null;
    public HealthText : TextMeshProUGUI = null;
    public HealthPower : number = null;
    private _enemyComponent : EnemyComponent = null;

    Start() {
        this._enemyComponent = this.gameObject.GetComponent<EnemyComponent>()
        this.HealthPower = PLAYER_STARTING_HEALTH;
    }

    Update() {
        if (this.HealthUI !== null) {
            const camera : Camera = Main.instance.ZepetoCamera;
            this.HealthUI.transform.LookAt(new Vector3(camera.transform.position.x, this.HealthUI.transform.position.y, camera.transform.position.z));
            this.HealthText.text = this.HealthPower.toString();
        }
    }

    OnTriggerEnter(other : Collider) {
        if (other.gameObject.tag === "PROJECTILE") {

            //check for friendly fire
            if (other.gameObject.GetComponent<ProjectileComponent>().OwnerType !== this.gameObject.GetComponent<EnemyComponent>().EntityType) {
                this.HealthPower -= PROJECTILE_DAMAGE;
                if (this.HealthPower <= 0) {
                    this.Destroy();
                }
            }
        }

        if (other.gameObject.tag === "SHARP") {

            //check for friendly fire
            if (other.gameObject.GetComponent<SharpComponent>().OwnerType !== this.gameObject.GetComponent<EnemyComponent>().EntityType) {
                this.HealthPower -= SHARP_DAMAGE;
                if (this.HealthPower <= 0) {
                    this.Destroy();
                }
            }
        }
    }

    Destroy() {
        switch (this._enemyComponent.EntityType) {
            case EntityType.ENEMY:
                GameObject.Destroy(this.gameObject);
                Main.instance.LevelManager.EnemyComponents.set(this._enemyComponent.Id, null);
            break;
            case EntityType.PLAYER:
                Main.instance.LevelManager.RestartGame();
            break;
        }
    }
}