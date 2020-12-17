import { getRandomInteger } from "./number";
import { MAX_POS } from '../constant';

export function getInitialTileList() { // 초기 타일 값(new game)
    const tileList = []
    const tile1 = makeTile(tileList);
    tileList.push(tile1);
    const tile2 = makeTile(tileList);
    tileList.push(tile2);
    return tileList;
}

function checkCollision(tileList, tile) {
    return tileList.some(item => item.x === tile.x && item.y === item.y); // some() : 조건 중 하나라도 같으면 true를 반환.
}
export function makeTile(tileList) {
    let tile;
    while(!tile || checkCollision(tileList, tile)) { // 현재 타일과 충돌하지 않도록 검사.
        tile = {
            x: getRandomInteger(1, MAX_POS),
            y: getRandomInteger(1, MAX_POS),
            value: 2
        }
    }
    return tile;
}