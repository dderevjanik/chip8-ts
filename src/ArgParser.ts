export const getRegAdrX = (data: number): number => ((data & 0xF00) >> 8);
export const getRegAdrY = (data: number): number => ((data & 0x0F0) >> 4);
export const getNible = (data: number): number => (data & 0x00F);
export const getVal = (data: number): number => (data & 0x0FF);

/**
 * @desc x = reg addres, kk = value
 * @param {number} data - data to parse
 * @return {object}
 */
export const getRegAdrVal = (data: number) => ({
    x: <number> getRegAdrX(data),
    kk: <number> getVal(data)
});

/**
 * @desc x = reg addres, y = reg adress
 * @param {number} data - data to parse
 * @return {object}
 */
export const getRegAdrAdr = (data: number) => ({
    x: <number> getRegAdrX(data),
    y: <number> getRegAdrY(data),
});

/**
 * @desc x = reg addres, y = reg adress, n = nible
 * @param {number} data - data to parse
 * @return {object}
 */
export const getRegAdrAdrNib = (data: number) => ({
    x: <number> getRegAdrX(data),
    y: <number> getRegAdrY(data),
    n: <number> getNible(data)
});    

export default {
    getRegAdrVal: getRegAdrVal,
    getRegAdrAdr: getRegAdrAdr,
    getRegAdrAdrNib: getRegAdrAdrNib    
};
