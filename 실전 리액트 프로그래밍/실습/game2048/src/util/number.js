export function getRandomInteger(from, to) {
    return Math.floor(Math.random() * to + from);
}
// random()은 0과 1사이의 값을 반환한다. 0은 inclusive이고 1은 그렇지 않다. 그러니까 1보다 작은 값이 나온다. 
// 따라서 Math.random()에 to를 곲하고 from을 더해주면 from부터 to까지의 숫자가 나온다.