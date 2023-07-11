import { Debug, GameObject, Input, KeyCode, Material, Quaternion, Resources, Transform, Vector3, WaitForSeconds } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import ProjectileComponent from './ProjectileComponent';
import { EntityType } from './Configs';

export default class CanonComponent extends ZepetoScriptBehaviour {
    public projectile : GameObject = null;
    public projectileOrigin : Transform = null
    public fireRatePerSecond : number = null;

    Start() {    
        Debug.LogError("start");
        this.StartCoroutine(this.FireCoroutine());
    }

    Update() {
        if (Input.GetKeyDown(KeyCode.T)) {
            //this.InstantiateProjectile();
        }
    }

    private *FireCoroutine() {
        Debug.LogError("coroutine");
        while(true) {
            yield null;
                this.InstantiateProjectile();
            yield new WaitForSeconds(this.fireRatePerSecond)
        }

    }

    private InstantiateProjectile() {
        const projectile : GameObject = GameObject.Instantiate(this.projectile, this.projectileOrigin.transform.position, Quaternion.identity) as GameObject;

        if (this.gameObject.tag === "PLAYER") {
            Debug.LogError("is player");
            const projectileComponent : ProjectileComponent = projectile.GetComponent<ProjectileComponent>();//.OwnerType = EntityType.PLAYER;
            projectileComponent.OwnerType = EntityType.PLAYER;
            projectileComponent.ProjectileMaterial.material = Resources.Load("MAT_Blue") as Material;
        } else if (this.gameObject.tag === "ENEMY") {
            Debug.LogError("is enemy");
            const projectileComponent : ProjectileComponent = projectile.GetComponent<ProjectileComponent>();//.OwnerType = EntityType.PLAYER;
            projectileComponent.OwnerType = EntityType.ENEMY;
            projectileComponent.ProjectileMaterial.material = Resources.Load("MAT_Red") as Material;
        }

        projectile.transform.forward = this.projectileOrigin.transform.forward;
    }

}