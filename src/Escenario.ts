import * as PIXI from 'pixi.js';

import { MySprite } from "./sprites"

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
    }

    public update(delta: number):void{
    }
}
