export enum MovableParts {
    TOP_ROW = 0,
    MIDDLE_ROW = 1,
    BOTTOM_ROW = 2,
    LEFT_COL = 0,
    MIDDLE_COL = 1,
    RIGHT_COL = 2,

}

export class RubiksCube {

    public state: {
        A: CubeSide,
        B: CubeSide,
        C: CubeSide,
        D: CubeSide,
        F: CubeSide,
        E: CubeSide
    };

    private constraint: { vertical: CubeSide[], horizontal: CubeSide[], } = {
        vertical: [],
        horizontal: [],
    }

    constructor(private size = 3) {
        this.state = this._getSolvedState();

        // A: new CubeSide(Colors.WHITE),
        // B: new CubeSide(Colors.BLUE),
        // C: new CubeSide(Colors.YELLOW),
        // D: new CubeSide(Colors.GREEN),
        // E: new CubeSide(Colors.ORANGE),
        // F: new CubeSide(Colors.RED),


        // A: new CubeSide(Colors.BLUE),
        // B: new CubeSide(Colors.RED),
        // C: new CubeSide(Colors.GREEN),
        // D: new CubeSide(Colors.ORANGE),
        // E: new CubeSide(Colors.WHITE),
        // F: new CubeSide(Colors.YELLOW),

        //TODO: move constraints to colors instead of states
        this.constraint.vertical = [this.state.A, this.state.B, this.state.C, this.state.D];
        this.constraint.horizontal = [this.state.A, this.state.F, this.state.C, this.state.E];
    }

    resetCube() {
        this.state = this._getSolvedState();
    }

    moveRight(rowIndex: MovableParts.BOTTOM_ROW | MovableParts.MIDDLE_ROW | MovableParts.TOP_ROW) {
        const length = this.constraint.horizontal.length;
        const lastRow = this.constraint.horizontal[length - 1].getRow(rowIndex);

        for (let i = length - 1; i > 0; i--) {
            const nextRow = this.constraint.horizontal[i - 1].getRow(rowIndex);
            this.constraint.horizontal[i].updateRow(rowIndex, nextRow)
        }
        this.constraint.horizontal[0].updateRow(rowIndex, lastRow);
    }

    moveLeft(rowIndex: MovableParts.BOTTOM_ROW | MovableParts.MIDDLE_ROW | MovableParts.TOP_ROW) {
        const length = this.constraint.horizontal.length;
        const firstRow = this.constraint.horizontal[0].getRow(rowIndex);

        for (let i = 0; i < length - 1; i++) {
            const nextRow = this.constraint.horizontal[i + 1].getRow(rowIndex);
            this.constraint.horizontal[i].updateRow(rowIndex, nextRow)
        }
        this.constraint.horizontal[length - 1].updateRow(rowIndex, firstRow);
    }

    moveDown(colIndex: MovableParts.RIGHT_COL | MovableParts.MIDDLE_COL | MovableParts.LEFT_COL) {
        const length = this.constraint.vertical.length;
        const firstCol = this.constraint.vertical[0].getCol(colIndex);

        for (let i = 0; i < length - 1; i++) {
            const nextCol = this.constraint.vertical[i + 1].getCol(colIndex);
            this.constraint.vertical[i].updateCol(colIndex, nextCol)
        }
        this.constraint.vertical[length - 1].updateCol(colIndex, firstCol);
    }

    moveUp(colIndex: MovableParts.RIGHT_COL | MovableParts.MIDDLE_COL | MovableParts.LEFT_COL) {
        const length = this.constraint.vertical.length;
        const lastCol = this.constraint.vertical[length - 1].getCol(colIndex);

        for (let i = this.constraint.vertical.length - 1; i > 0; i--) {
            const nextCol = this.constraint.vertical[i - 1].getCol(colIndex);
            this.constraint.vertical[i].updateCol(colIndex, nextCol)
        }
        this.constraint.vertical[0].updateCol(colIndex, lastCol);
    }

    private _findSideByCenter(color: Colors) {
        return Object.values(this.state)
            .find((side) => {
                return side.centerColor === color;
            })
    }

    private _rotateCube(front = Colors.BLUE, top = Colors.RED) {
        // TODO: implement moving the cube according to front & top and color constraints
        // facing blue, red on top
        return {
            A: this._findSideByCenter(Colors.BLUE),
            B: this._findSideByCenter(Colors.RED),
            C: this._findSideByCenter(Colors.GREEN),
            D: this._findSideByCenter(Colors.ORANGE),
            E: this._findSideByCenter(Colors.WHITE),
            F: this._findSideByCenter(Colors.YELLOW),
        }
    }

    private _getSolvedState() {
        // facing white, blue on top
        return {
            A: new CubeSide(Colors.WHITE),
            B: new CubeSide(Colors.BLUE),
            C: new CubeSide(Colors.YELLOW),
            D: new CubeSide(Colors.GREEN),
            E: new CubeSide(Colors.ORANGE),
            F: new CubeSide(Colors.RED),
        }
    }
}

enum Colors {
    WHITE = "white",
    YELLOW = "yellow",
    BLUE = "blue",
    GREEN = "green",
    RED = "red",
    ORANGE = "orange"
}

class CubeSide {
    public state: Colors[][];

    constructor(public centerColor: Colors, private size = 3) {
        this.state = this._generate(centerColor, size, size);
    }

    getRow(index: number) {
        return this.state[index];
    }

    getCol(index: number) {
        const col = [];
        for (let i = 0; i < this.size; i++) {
            col.push(this.state[i][index])
        }
        return col;
    }

    updateRow(index: 0 | 1 | 2, row: Colors[]) {
        this.state[index] = row;
    }

    updateCol(index: 0 | 1 | 2, col: Colors[]) {
        for (let i = 0; i < this.size; i++) {
            this.state[i][index] = col[i];
        }
    }

    private _generate(color: Colors, height: number = 3, width: number = 3) {
        const matrix = [];

        for (let i = 0; i < height; i++) {
            const row = [];
            for (let j = 0; j < width; j++) {
                row.push(color)
            }
            matrix.push(row)
        }
        return matrix;
    }
}