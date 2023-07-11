import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export const PLAYER_STARTING_HEALTH : number = 10;
export const PROJECTILE_DAMAGE : number = 1;
export const SHARP_DAMAGE : number = 0.25;

export enum EntityType {
    NONE = 0,
    PLAYER = 1,
    ENEMY = 2
}

export enum DoorState {
    NONE = 0,
    OPEN = 1,
    CLOSE = 2,
    IDLE = 3,
}

export enum GameState {
    NONE = 0,

    LOADING = 1,

    START_FIGHTING = 2,
    CONTINUE_FIGHTING = 3,
    END_FIGHTING = 4,

    START_UPGRADE_SELECT = 5,
    CONTINUE_UPGRADE_SELECT = 6,
    END_UPGRADE_SELECT = 7,

    COMPLETE_GAME = 8
}

export enum LevelType {
    NONE = 0,
    FOUR_BLOCK_A = 1,
    TWO_BLOCK_A = 11,
    ONE_BLOCK_A = 21,
}

export enum EnemyType {
    NONE = 0,
    TOWER = 1,
    RANGE = 2,
    MELEE = 3,
    RANDOM = 4,
    MAX_VALUE = 5
}

export enum UpgradeType {
    NONE = 0,
    MOVE_SPEED = 1,
    ATTACK_SPEED = 2,
    PROJECTILE_SPEED = 3,
    ATTACK_POWER = 4,
    HEALTH_POWER = 5,
    WEAPON_COUNT = 6,
}

export class Level {
    public LevelName : string;
    public LevelType : LevelType;
    public EnemyTypes : EnemyType[];
}

export default class Configs {
    public MoveSpeedByLevel :   number[];
    public AttackSpeedByLevel : number[];
    public ProjectileSpeedByLevel : number[];
    public AttackPowerByLevel : number[];
    public HealthPowerByLevel : number[];
    public WeaponCountByLevel : number[];

    public Levels : Level[];

    constructor() {
        this.MoveSpeedByLevel =         [1,2,3,4,5];
        this.AttackPowerByLevel =       [1,2,3,4,5];
        this.ProjectileSpeedByLevel =   [1,2,3,4,5];
        this.AttackPowerByLevel =       [1,2,3,4,5];
        this.HealthPowerByLevel =       [1,2,3,4,5];
        this.WeaponCountByLevel =       [1,2,3,4,5];

        this.Levels = [
            {
                LevelName : "First Level",
                LevelType : LevelType.TWO_BLOCK_A,
                EnemyTypes : [
                    EnemyType.TOWER,
                    EnemyType.RANGE,
                    EnemyType.TOWER,
                    EnemyType.RANGE,
                    EnemyType.RANGE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                ]
            },
            {
                LevelName : "Second Level",
                LevelType : LevelType.ONE_BLOCK_A,
                EnemyTypes : [
                    EnemyType.MELEE,
                    EnemyType.NONE,
                    EnemyType.MELEE,
                    EnemyType.NONE,
                    EnemyType.MELEE,
                    EnemyType.NONE,
                    EnemyType.MELEE,
                    EnemyType.NONE,
                    EnemyType.MELEE,
                    EnemyType.NONE,
                ]
            },
            {
                LevelName : "Third Level",
                LevelType : LevelType.FOUR_BLOCK_A,
                EnemyTypes : [
                    EnemyType.TOWER,
                    EnemyType.NONE,
                    EnemyType.TOWER,
                    EnemyType.NONE,
                    EnemyType.TOWER,
                    EnemyType.NONE,
                    EnemyType.TOWER,
                    EnemyType.NONE,
                    EnemyType.TOWER,
                    EnemyType.NONE,
                ]
            },
        ];
    }
}