/// <reference path="./IChip8State"/>
import Instructions from './Instructions.ts';

/**
 * Get empty state of 8Bit
 * @return {IChip8State} empty state
 */
const emptyState = (): IChip8State => ({
    p_ptr: 0,                   // Program pointer
    memory: new Array(4096),    // Memory
    
    s_ptr: 0,                   // Stack pointer              
    stack: new Array(16),       // Stack
    
    reg_v: new Array(16),       // Register v
    reg_i: 0,                   // Register i
    
    delayTimer: 0,
    soundTimer: 0
});

/**
 * Execute operation code with data on state
 * @param {IChip8State} state - current state
 * @param {number} opCode - operation code to execute 
 * @param {number} data - data passed as argument to opCode
 * @return {IChip8State} next state
 */
const executeCode = (state: IChip8State, opCode: number, data: number): IChip8State => {
    const addr: number = data,
        n: number = (opCode & 0x00F),
        x: number = (opCode & 0xF00) >> 8,
        y: number = (opCode & 0x0F0) >> 4,
        kk: number = (opCode & 0x0FF);
    
    switch(opCode){
        case 0:
            break;
        case 1: 
            return Instructions.JP(state, addr); 
        case 2: 
            return Instructions.CALL(state, addr);
        case 3:
            return Instructions.SE(state, x, kk);
        case 4:
            return Instructions.SNE(state, x, kk);
        case 5:
            return Instructions.SER(state, x, y);
        case 6:
            return Instructions.LD(state, x, kk);
        case 7:
            return Instructions.ADD(state, x, kk);
        case 8:
            switch (n) {
                
            }
        default: throw new Error(`Operation doesn't exists: ${opCode}`);
    };
};

/**
 * Process instruction over state 
 * @param {IChip8State} state - current state 
 * @param {number} instruction - instruction to process 
 * @return {IChip8State} next state 
 */
const processInst = (state: IChip8State, instruction: number): IChip8State => {
    const code: number = (instruction & 0xF000) >> 12,
        data: number = (instruction & 0x0FFF);

    return executeCode(state, code, data);
};

// CODE

const state = emptyState();
console.log(state.p_ptr);
console.log(processInst(emptyState(), 0x100F));
console.log('xoms');