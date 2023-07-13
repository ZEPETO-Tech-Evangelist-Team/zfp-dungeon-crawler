import { Debug, GameObject, Quaternion, Resources, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import LevelComponent from './LevelComponent';
import { ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { DoorState, EnemyType, GameState, LevelType, PLAYER_STARTING_HEALTH } from './Configs';
import EntityComponent from './EntityComponent';
import HealthComponent from './HealthComponent';
import Main from './Main';

export default class LevelManager extends ZepetoScriptBehaviour {
    public LevelGameObjects : GameObject[] = null;
    public EnemyEntityComponents : Map<number, EntityComponent> = null;

    private _levelComponents : LevelComponent[] = null;
    private _currentLevelComponentIndex: number = null;
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

        this.EnemyEntityComponents = new Map<number, EntityComponent>();

        this.InstantiateEnemies();


    }

    CustomUpdate() {
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
        this.EnemyEntityComponents.forEach(element => {
            if (element !== null) {
                GameObject.Destroy(element.gameObject);
            }
        });

        Main.instance.SetGameState(GameState.START_FIGHTING);
    }

    CheckIfAllEnemiesKilled() {
        let aliveCount : number = 0;
        this.EnemyEntityComponents.forEach(element => {
            if (element !== null) {
                aliveCount++;
            }
            Debug.Log(aliveCount);
            if (aliveCount === 0) {
                this._hasKilledAllEnemies = true;
                this._levelComponents[this._currentLevelComponentIndex].GateComponent.SetClose();
                this._levelComponents[this._currentLevelComponentIndex].GateComponent.SetDoorState(DoorState.OPEN);
            }
        });
    }

    private FindCurrentLevelComponentByLevel(level : number) : LevelComponent{

        for (let i = 0; i < this._levelComponents.length; i++) {

            if (this._levelComponents[i].LevelType === Main.instance.Configs.Levels[level].LevelType) {

                this._currentLevelComponentIndex = i;
                return this._levelComponents[this._currentLevelComponentIndex];

            }

        }

        Debug.LogError("[LevelManager] [FindCurrentLevelComponentByLevel] returned null, this should NOT happen!!!")
        return null;
    }

    private InstantiateEnemies() {
        const currentLevel = Main.instance.CurrentLevel;

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
                case EnemyType.NONE:
                    //nothing happens here, do not create an enemy
                    break;
            }

            if (enemyGO !== null) {
                const enemyComponent : EntityComponent = enemyGO.GetComponent<EntityComponent>();
                enemyComponent.Id = i;
                this.EnemyEntityComponents.set(i, enemyComponent);
            }
        }
    }

}