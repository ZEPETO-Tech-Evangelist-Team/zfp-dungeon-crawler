import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export const PLAYER_STARTING_HEALTH : number = 10;
export const ENEMY_STARTING_HEALTH : number = 5;
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

    COMPLETE_GAME = 5
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
    MAX_VALUE = 5
}

export class Level {
    public LevelName : string;
    public LevelType : LevelType;
    public EnemyTypes : EnemyType[];
}

export default class Configs {

    public Levels : Level[];

    constructor() {
        this.Levels = [
            {
                LevelName : "First Level",
                LevelType : LevelType.TWO_BLOCK_A,
                EnemyTypes : [
                    EnemyType.RANGE,
                    EnemyType.NONE,
                    EnemyType.RANGE,
                    EnemyType.NONE,
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
                    EnemyType.TOWER,
                    EnemyType.NONE,
                    EnemyType.TOWER,
                    EnemyType.NONE,
                    EnemyType.TOWER,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                ]
            },
            {
                LevelName : "Third Level",
                LevelType : LevelType.FOUR_BLOCK_A,
                EnemyTypes : [
                    EnemyType.MELEE,
                    EnemyType.NONE,
                    EnemyType.MELEE,
                    EnemyType.NONE,
                    EnemyType.MELEE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                    EnemyType.NONE,
                ]
            },
        ];
    }
}