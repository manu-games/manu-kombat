import characterLiuKangWait from './assets/images/liu-kang/wait/*.png';
import characterLiuKangKick from './assets/images/liu-kang/kick/*.png';
import stageTemple from './assets/images/stage-temple/*.png';

import * as PIXI from 'pixi.js';

const spriteNames = {
    temple: Object.values(stageTemple),
    liuKangKick: Object.values(characterLiuKangKick),
    liuKangWait: Object.values(characterLiuKangWait)
}

export class MySprite{
    public static GetSprite(name){
        return new PIXI.AnimatedSprite(spriteNames[name].map(path => PIXI.Texture.from(path)))
    }
}
