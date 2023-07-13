import { Debug, GameObject, Quaternion, Resources, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import LevelComponent from './LevelComponent';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { DoorState, EnemyType, GameState, LevelType, PLAYER_STARTING_HEALTH } from './Configs';
import EnemyComponent from './EnemyComponent';
import HealthComponent from './HealthComponent';
import Main from './Main';

export default class LevelManager extends ZepetoScriptBehaviour {
    public LevelGameObjects : GameObject[] = null;

    private _levelComponents : LevelComponent[] = null;
    private _currentLevelComponentIndex: number = null;

    public EnemyComponents : Map<number, EnemyComponent> = null;
    public EnemyComponentsCount : number = 0;

    private _hasKilledAllEnemies : boolean = null;

    CustomStart() { 
        this._hasKilledAllEnemies = false;
        this._levelComponents = [];
           
        for (let i = 0; i < this.LevelGameObjects.length; i++) {
            this._levelComponents.push(this.LevelGameObjects[i].GetComponent<LevelComponent>());
            this._levelComponents[i].GateComponent.SetClose();
        }

        const currentLevelComponent : LevelComponent = this.FindCurrentLevelComponentByLevel(Main.instance.CurrentLevel);

        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.Teleport(currentLevelComponent.PlayerSpawnPoint.position, Quaternion.identity);

        this.EnemyComponents = new Map<number, EnemyComponent>();

        this.InstantiateEnemies();


    }

    CustomUpdate() {
        this.EnemyComponentsCount = this.EnemyComponents.size;
        if (this._hasKilledAllEnemies === false) {
            this.CheckIfAllEnemiesKilled();
        }
    }

    RestartGame() {
        //reset player health
        ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character.gameObject.GetComponent<HealthComponent>().HealthPower = PLAYER_STARTING_HEALTH;
        
        //reset level to first level
        Main.instance.CurrentLevel = 0;

        //clear enemy game objects
        this.EnemyComponents.forEach(element => {
            if (element !== null) {
                GameObject.Destroy(element.gameObject);
            }
        });

        Main.instance.SetGameState(GameState.START_FIGHTING);
    }

    CheckIfAllEnemiesKilled() {
        let aliveCount : number = 0;
        this.EnemyComponents.forEach(element => {
            if (element !== null) {
                aliveCount++;
            }
            if (aliveCount === 0) {
                this._hasKilledAllEnemies = true;
                this._levelComponents[this._currentLevelComponentIndex].GateComponent.SetClose();
                this._levelComponents[this._currentLevelComponentIndex].GateComponent.SetDoorState(DoorState.OPEN);
            }
        });
    }

    FindCurrentLevelComponentByLevel(level : number) : LevelComponent{

        for (let i = 0; i < this._levelComponents.length; i++) {

            if (this._levelComponents[i].LevelType === Main.instance.Configs.Levels[level].LevelType) {

                this._currentLevelComponentIndex = i;
                return this._levelComponents[this._currentLevelComponentIndex];

            }

        }

        Debug.LogError("[LevelManager] [FindCurrentLevelComponentByLevel] returned null, this should NOT happen!!!")
        return null;
    }

    InstantiateEnemies() {
        const currentLevel = Main.instance.CurrentLevel;
        let currentEnemyIndex : number = 0;

        for (let i : number = 0; i < Main.instance.Configs.Levels[currentLevel].EnemyTypes.length; i++) {
            const enemyType : EnemyType = Main.instance.Configs.Levels[currentLevel].EnemyTypes[i];
            let enemyGO : GameObject = null;
            const spawnPosition : Vector3 = this._levelComponents[this._currentLevelComponentIndex].EnemySpawnPoints[i].position;
            switch (enemyType) {
                case EnemyType.MELEE:
                    enemyGO = GameObject.Instantiate(Resources.Load<GameObject>("MeleeEnemy"), spawnPosition, Quaternion.identity) as GameObject;
                    break;
                case EnemyType.RANGE:
                    enemyGO = GameObject.Instantiate(Resources.Load<GameObject>("RangeEnemy"), spawnPosition, Quaternion.identity) as GameObject;
                    break;
                case EnemyType.TOWER:
                    enemyGO = GameObject.Instantiate(Resources.Load<GameObject>("TowerEnemy"), spawnPosition, Quaternion.identity) as GameObject;
                    break;
            }

            if (enemyGO !== null) {
                const enemyComponent : EnemyComponent = enemyGO.GetComponent<EnemyComponent>();
                enemyComponent.Id = i;
                this.EnemyComponents.set(i, enemyComponent);
            }
        }
    }

}