/// <reference path="./IChip8State"/>

import Instructions from './Instructions';
import {getNible} from './ArgParser';

const subRoutineTable = ({
   0x0: Instructions.LD,    // !
   0x1: Instructions.OR,
   0x2: Instructions.AND,
   0x3: Instructions.XOR,
   0x4: Instructions.ADD,   // !
   0x5: Instructions.SUB,
   0x6: Instructions.SHR,
   0x7: Instructions.SUBN,
   0xE: Instructions.SHL, 
});

const codeTable = ({
   0x1: Instructions.JP,
   0x2: Instructions.CALL,
   0x3: Instructions.SE,
   0x4: Instructions.SNE,
   0x5: Instructions.SER,
   0x6: Instructions.LD,
   0x7: Instructions.ADD,
   0x8: (state: IChip8State, data: number) => subRoutineTable[getNible(data)](state, data)
});

/**
 * Get empty state of 8Bit
 * @return {IChip8State} empty state
 */
const emptyState = (): IChip8State => ({
    p_ptr: 0x0,                   // Program pointer
    memory: new Array(0x1000),    // Memory, 4096b
    
    s_ptr: 0x0,                   // Stack pointer              
    stack: new Array(0x10),       // Stack, 16b
    
    reg_v: new Array(0x10),       // Register v, 16b
    reg_i: 0x0,                   // Register i
    
    delayTimer: 0x0,
    soundTimer: 0x0
});

/**
 * Process instruction with state 
 * @param {IChip8State} state - current state 
 * @param {number} instruction - instruction to process 
 * @return {IChip8State} next state 
 */
const processInst = (state: IChip8State, instruction: number): IChip8State => {
    const opCode: number = (instruction & 0xF000) >> 12,
        data: number = (instruction & 0x0FFF);

    return codeTable[opCode](state, data);
};
