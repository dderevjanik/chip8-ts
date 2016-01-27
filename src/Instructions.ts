/// <reference path="./IChip8State"/>

import {getRegAdrVal, getRegAdrAdr, getRegAdrAdrNib} from './ArgParser';
import {FLAG_VF} from './Consts';

/**
 * Jump to memory with program pointer
 * @desc 1nnn
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const JP = (state: IChip8State, data: number): IChip8State => {
    state.p_ptr = data;
    return state;
};

/**
 * Call subroutine at adress
 * @desc 2nnn
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const CALL = (state: IChip8State, data: number): IChip8State => {
    state.stack[state.s_ptr] = state.p_ptr;
    state.s_ptr += 1;
    state.p_ptr = data;

    return state;
};

/**
 * Compare value from register with value
 * @desc 3xkk
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const SE = (state: IChip8State, data: number): IChip8State => {
    const {x, kk} = getRegAdrVal(data);
    if (state.reg_v[x] === kk) {
        state.p_ptr += 2;
    }

    return state;
};

/**
 * Compare value from register with value
 * @desc 4xkk
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const SNE = (state: IChip8State, data: number): IChip8State => {
    const {x, kk} = getRegAdrVal(data);
    if (state.reg_v[x] !== kk) {
        state.p_ptr += 2;
    }

    return state;
};

/**
 * Compare two values in register
 * @desc 5xy0
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const SER = (state: IChip8State, data: number): IChip8State => {
    const {x, y} = getRegAdrAdr(data);
    if (state.reg_v[x] === state.reg_v[y]) {
        state.p_ptr += 2;
    }

    return state;
};

/**
 * Puts value to register adress
 * @desc 6xkk
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const LD = (state: IChip8State, data: number): IChip8State => {
    const {x, kk} = getRegAdrVal(data);
    state.reg_v[x] = kk;

    return state;
};

/**
 * Adds value to register adress
 * @desc 7xkk
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const ADD = (state: IChip8State, data: number): IChip8State => {
    const {x, kk} = getRegAdrVal(data);
    const val: number = kk + state.reg_v[x];
    state.reg_v[x] = (val > 255) ? (val - 256) : val;

    return state;
};

// SUB-ROUTINES

/**
 * Copy value from register adress to another register adress
 * @desc 8xy0
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const LDR = (state: IChip8State, data: number): IChip8State => {
    const {x, y} = getRegAdrAdr(data);
    state.reg_v[x] = state.reg_v[y];

    return state;
};

/**
 * Bitwise OR on register values from adresss x and y
 * @desc 8xy1
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const OR = (state: IChip8State, data: number): IChip8State => {
    const {x, y} = getRegAdrAdr(data);
    state.reg_v[x] |= state.reg_v[y];        

    return state;
};

/**
 * Bitwise AND on register values from adresss x and y
 * @desc 8xy2
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const AND = (state: IChip8State, data: number): IChip8State => {
    const {x, y} = getRegAdrAdr(data);
    state.reg_v[x] &= state.reg_v[y];

    return state;
};

/**
 * Bitwise XOR on register values from adresss x and y
 * @desc 8xy3
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const XOR = (state: IChip8State, data: number): IChip8State => {
    const {x, y} = getRegAdrAdr(data);
    state.reg_v[x] ^= state.reg_v[y];

    return state;
};

/**
 * @desc 8xy4
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const ADDR = (state: IChip8State, data: number): IChip8State => {
    // @TODO Clean
    const {x, y} = getRegAdrAdr(data);
    state.reg_v[x] += state.reg_v[y];
    state.reg_v[FLAG_VF] = +(state.reg_v[x] > 255);
    state.reg_v[x] = (state.reg_v[x] > 255) ? (state.reg_v[x] - 256): state.reg_v[x];  

    return state;
};

/**
 * @desc 8xy5
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const SUB = (state: IChip8State, data: number): IChip8State => {
    // @TODO Clean
    const {x, y} = getRegAdrAdr(data);
    state.reg_v[FLAG_VF] = +(state.reg_v[x] > state.reg_v[y]);
    state.reg_v[x] -= state.reg_v[y];
    state.reg_v[x] = (state.reg_v[x] > 255) ? (state.reg_v[x] - 256): state.reg_v[x];  
    
    return state;
};

/**
 * @desc 8xy6
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const SHR = (state: IChip8State, data: number): IChip8State => {
    const {x, y} = getRegAdrAdr(data);
    state.reg_v[FLAG_VF] = state.reg_v[x] & 0x1;
    state.reg_v[x] >>= 1;

    return state;
};

/**
 * @desc 8xy7
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const SUBN = (state: IChip8State, data: number): IChip8State => {
    // @TODO finish
    return state;
};

/**
 * @desc 8xyE
 * @param {IChip8State} state - current state
 * @param {number} data - data to process
 * @return {IChip8State} next state
 */
const SHL = (state: IChip8State, x: number, y: number): IChip8State => {
    // @TODO finish
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
    SHR: SHR,
    SUBN: SUBN,
    SHL: SHL
};
