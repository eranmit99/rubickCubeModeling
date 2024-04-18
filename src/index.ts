import {RubiksCube, MovableParts} from './RubiksCube'


const cube = new RubiksCube();

cube.moveLeft(MovableParts.BOTTOM_ROW);
cube.moveRight(MovableParts.TOP_ROW);

cube.moveDown(MovableParts.RIGHT_COL);
cube.moveUp(MovableParts.LEFT_COL);

console.log(cube.state);