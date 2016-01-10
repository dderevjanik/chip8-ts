interface IChip8State {
    p_ptr: number,
    memory: Array<number>,
    
    s_ptr: number,
    stack: Array<number>,
    
    reg_v: Array<number>,
    reg_i: number,
    
    delayTimer: number,
    soundTimer: number
};
