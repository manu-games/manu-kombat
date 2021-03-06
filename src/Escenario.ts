import * as PIXI from 'pixi.js';

import { GameApp } from "./GameApp"
import { MySprite } from "./sprites"

export class EscenarioFactory{
    public static getEscenario(tipo: string, nombre: string): Escenario{
        if(tipo.toLocaleLowerCase() == 'entrenamiento'){
            return new EscenarioEntrenamiento(nombre)
        }
    }
}

export abstract class Escenario{
    protected _nombre: string
    protected _sprite: PIXI.AnimatedSprite

    public abstract update(delta: number):void

    public get nombre():string{
        return this._nombre
    }
}

export class EscenarioEntrenamiento extends Escenario{
    public constructor(nameSprite: string){
        super()

        this._sprite = MySprite.GetSprite(nameSprite)
        this._sprite.x = 0
        this._sprite.y = 0

        this._sprite.animationSpeed = 0.1
        this._sprite.play()

        GameApp.stage.addChild(this._sprite)
    }

    public update(delta: number):void{
    }
}
