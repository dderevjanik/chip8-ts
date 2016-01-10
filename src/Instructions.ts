/// <reference path="./IChip8State"/>

/**
 * Jump to memory with program pointer
 * @desc 1nnn
 * @param {number:12} mem_adr - jump to this position
 */
const JP = (state: IChip8State, mem_adr: number): IChip8State => {
    state.p_ptr = mem_adr;

    return state;
};

/**
 * Call subroutine at adress
 * @desc 2nnn
 * @param {number:12} mem_adr - call subroutine at this adress
 */
const CALL = (state: IChip8State, mem_adr: number): IChip8State => {
    state.stack[state.s_ptr] = state.p_ptr;
    state.s_ptr += 1;
    state.p_ptr = mem_adr;

    return state;
};

/**
 * Compare value from register with value
 * @desc 3xkk
 * @param {number:4} reg_adr - adress to register value
 * @param {number:8} value - value to compare
 */
const SE = (state: IChip8State, reg_adr: number, value: number): IChip8State => {
    if (state.reg_v[reg_adr] === value) {
        state.p_ptr += 2;
    }

    return state;
};

/**
 * Compare value from register with value
 * @desc 4xkk
 * @param {number:4} reg_adr - adress to register value
 * @param {number:8} value - value to compare
 */
const SNE = (state: IChip8State, reg_adr: number, value: number): IChip8State => {
    if (state.reg_v[reg_adr] !== value) {
        state.p_ptr += 2;
    }

    return state;
};

/**
 * Compare two values in register
 * @desc 5xy0
 * @param {number:4} reg_adr1 - adress to register value 
 * @param {number:4} reg_adr2 - adress to register value
 */
const SER = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    if (state.reg_v[reg_adr1] === state.reg_v[reg_adr2]) {
        state.p_ptr += 2;
    }

    return state;
};

/**
 * Puts value to register adress
 * @desc 6xkk
 * @param {number:4} reg_adr - register address, where to put value
 * @param {number:8} value - value to put into register adress
 */
const LD = (state: IChip8State, reg_adr: number, value: number): IChip8State => {
    state.reg_v[reg_adr] = value;

    return state;
};

/**
 * Adds value to register adress
 * @desc 7xkk
 * @param {number:4} reg_adr - register adress, where to add value
 * @param {number:8} value - value to add at register adress
 * @return {IChip8State} next state
 */
const ADD = (state: IChip8State, reg_adr: number, value: number): IChip8State => {
    const val: number = value + state.reg_v[reg_adr];
    state.reg_v[reg_adr] = (val > 255) ? (val - 256) : val;

    return state;
};

/**
 * Copy value from register adress to another register adress
 * @desc 8xy0
 * @param {number:4} reg_adr1 - from which register adress copy value
 * @param {number:4} reg_adr2 - to which register adress put value
 * @return {IChip8State} next state
 */
const LDR = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    state.reg_v[reg_adr1] = state.reg_v[reg_adr2];

    return state;
};

/**
 * Bitwise OR on register values from adresss reg_adr1 and reg_adr2
 * @desc 8xy1
 * @param {number:4} reg_adr1 - value from this adress compare with
 * @param {number:4} reg_adr2 - with value from this adress
 * @return {IChip8State} next state
 */
const OR = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    state.reg_v[reg_adr1] |= state.reg_v[reg_adr2];        

    return state;
};

/**
 * Bitwise AND on register values from adresss reg_adr1 and reg_adr2
 * @desc 8xy2
 * @param {number:4} reg_adr1 - value from this adress compare with
 * @param {number:4} reg_adr2 - with value from this adress
 * @return {IChip8State} next state
 */
const AND = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    state.reg_v[reg_adr1] &= state.reg_v[reg_adr2];

    return state;
};

/**
 * Bitwise XOR on register values from adresss reg_adr1 and reg_adr2
 * @desc 8xy3
 * @param {number:4} reg_adr1 - value from this adress compare with
 * @param {number:4} reg_adr2 - with value from this adress
 * @return {IChip8State} next state
 */
const XOR = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    state.reg_v[reg_adr1] ^= state.reg_v[reg_adr2];

    return state;
};

/**
 * @desc 8xy4
 * @param {number:4} reg_adr1 - value from this adress compare with
 * @param {number:4} reg_adr2 - with value from this adress
 * @return {IChip8State} next state
 */
const ADDR = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    // @TODO Clean
    state.reg_v[reg_adr1] += state.reg_v[reg_adr2];
    state.reg_v[0xF] = +(state.reg_v[reg_adr1] > 255);
    state.reg_v[reg_adr1] = (state.reg_v[reg_adr1] > 255) ? (state.reg_v[reg_adr1] - 256): state.reg_v[reg_adr1];  

    return state;
};

/**
 * @desc 8xy5
 * @param {number:4} reg_adr1 - value from this adress compare with
 * @param {number:4} reg_adr2 - with value from this adress
 * @return {IChip8State} next state
 */
const SUB = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    // @TODO Clean
    state.reg_v[0xF] = +(state.reg_v[reg_adr1] > state.reg_v[reg_adr2]);
    state.reg_v[reg_adr1] -= state.reg_v[reg_adr2];
    state.reg_v[reg_adr1] = (state.reg_v[reg_adr1] > 255) ? (state.reg_v[reg_adr1] - 256): state.reg_v[reg_adr1];  
    
    return state;
};

/**
 * @desc 8xy6
 * @param {number:4} reg_adr1 - value from this adress compare with
 * @param {number:4} reg_adr2 - with value from this adress
 * @return {IChip8State} next state
 */
const SHR = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    state.reg_v[0xF] = state.reg_v[reg_adr1] & 0x1;
    state.reg_v[reg_adr1] >>= 1;

    return state;
};

/**
 * @desc 8xy7
 * @param {number:4} reg_adr1 - value from this adress compare with
 * @param {number:4} reg_adr2 - with value from this adress
 * @return {IChip8State} next state
 */
const SUBN = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    
    return state;
};

/**
 * @desc 8xyE
 * @param {number:4} reg_adr1 - value from this adress compare with
 * @param {number:4} reg_adr2 - with value from this adress
 * @return {IChip8State} next state
 */
const SHL = (state: IChip8State, reg_adr1: number, reg_adr2: number): IChip8State => {
    
    return state;
};

export default {
    JP: JP,         // Jump to memory address with program pointer
    CALL: CALL,     // Call subroutine
    SE: SE,         // Skip next instruction if r[x] === value
    SNE: SNE,       // Skip next instruction if r[x] !== value
    SER: SER,       // Skip next instruction if r[x] === r[y]
    LD: LD,
    ADD: ADD,
    LDR: LDR,
    OR: OR,
    AND: AND,
    XOR: XOR,
    ADDR: ADDR,
    SUB: SUB,
    SUBN: SUBN,
    SHL: SHL
};
