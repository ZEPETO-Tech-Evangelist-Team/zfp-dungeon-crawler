import { Debug, BoxCollider, Camera, CapsuleCollider, GameObject, Quaternion, Resources, Vector3 } from 'UnityEngine';
import { LocalPlayer, SpawnInfo, ZepetoPlayers } from 'ZEPETO.Character.Controller'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { WorldService } from 'ZEPETO.World';
import { TextMeshProUGUI } from 'TMPro';
import Configs, { GameState, EntityType } from './Configs';
import EnemyComponent from './EnemyComponent';
import HealthComponent from './HealthComponent';
import LevelManager from './LevelManager';
export default class Main extends ZepetoScriptBehaviour {
    public  static instance : Main = null;
    public Configs : Configs = null;
    public LevelManager : LevelManager = null;
    public CurrentLevel : number = null;
    public LocalPlayer : LocalPlayer = null;
    public ZepetoCamera : Camera = null;

    private _gameState : GameState = null;

    public SuccessWinGO : GameObject = null;
    public LoseWinGO : GameObject = null;

    public ShowSuccessWin() {
        this.SuccessWinGO.SetActive(true);
    }

    public HideSuccessWin() {
        this.SuccessWinGO.SetActive(false);
        this.LevelManager.RestartGame();
    }

    public ShowLoseWin() {
        this.LoseWinGO.SetActive(true);
    }

    public HideLoseWin() {
        this.LoseWinGO.SetActive(false);
        this.LevelManager.RestartGame();
    }

    public static GetInstance(): Main
    {
        if (Main.instance == undefined)
        {
            Main.instance = GameObject.Find("Main").GetComponent<Main>();
        }

        return this.instance;
    }

    Awake() {
        Main.instance = this;
    }

    Start() {
        this._gameState = GameState.LOADING;

        this.Configs = new Configs();

        this.LevelManager = GameObject.Find("LevelManager").GetComponent<LevelManager>();

        this.CurrentLevel = 0;

        this.LoadLocalPlayer();   
    } 

    Update() {
        this.RunStateMachine();
    }

    RunStateMachine() {
        switch (this._gameState) {
            case GameState.NONE:
                this._gameState = GameState.LOADING;
            break;
            case GameState.LOADING:
            
            break;
            case GameState.START_FIGHTING:
                this.LevelManager.CustomStart();
                this._gameState = GameState.CONTINUE_FIGHTING;
            break;
            case GameState.CONTINUE_FIGHTING:
                this.LevelManager.CustomUpdate();
            break;
            case GameState.END_FIGHTING:
                this.CurrentLevel ++;
                if (this.CurrentLevel >= this.Configs.Levels.length) {
                    this._gameState = GameState.COMPLETE_GAME;
                } else {
                    this._gameState = GameState.START_FIGHTING;
                }
            break;

            case GameState.COMPLETE_GAME:
                this.ShowSuccessWin();
            break;

            //=====================================================================
            case GameState.START_UPGRADE_SELECT:
                this._gameState = GameState.CONTINUE_UPGRADE_SELECT;
            break;
            case GameState.CONTINUE_UPGRADE_SELECT:
            
            break;
            case GameState.END_UPGRADE_SELECT:
                this._gameState = GameState.START_FIGHTING;
            break;
            //=====================================================================
        }

        //console.log(`State: ${GameState[this._gameState]}` );
    }

    SetGameState(gameState : GameState) {
        this._gameState = gameState;
    }

    LoadLocalPlayer() {
        // Grab the user id specified from logging into zepeto through the editor. 
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);             
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {                        
            this.LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
            this.LocalPlayer.zepetoPlayer.character.gameObject.tag = "PLAYER";

            const collider : CapsuleCollider = this.LocalPlayer.zepetoPlayer.character.gameObject.AddComponent<CapsuleCollider>();
            collider.isTrigger = true;
            collider.height = 2;

            const enemyComponent : EnemyComponent = this.LocalPlayer.zepetoPlayer.character.gameObject.AddComponent<EnemyComponent>();
            enemyComponent.EntityType = EntityType.PLAYER;
            
            const healthComponent : HealthComponent = this.LocalPlayer.zepetoPlayer.character.gameObject.AddComponent<HealthComponent>();

            this.SetGameState(GameState.START_FIGHTING);

            const weaponGO : GameObject = GameObject.Instantiate(Resources.Load("PlayerWeapon"), 
            this.LocalPlayer.zepetoPlayer.character.gameObject.transform.position, 
            Quaternion.identity) as GameObject;

            weaponGO.transform.parent = this.LocalPlayer.zepetoPlayer.character.gameObject.transform;

            const healthUIGO : GameObject = GameObject.Instantiate(Resources.Load("HealthUI")) as GameObject;
            healthUIGO.transform.parent = this.LocalPlayer.zepetoPlayer.character.gameObject.transform;
            healthUIGO.transform.position = new Vector3(0,0,0);

            healthComponent.HealthUI = healthUIGO;
            healthComponent.HealthText = healthComponent.HealthUI.GetComponentInChildren<TextMeshProUGUI>();

            this.ZepetoCamera = ZepetoPlayers.instance.GetComponentInChildren<Camera>();
        });
    }
}