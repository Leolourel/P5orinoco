/**
 *@desc class pour parametrer la panier
 *@class
 */
export default class Panier {

    /**
     * @desc Construction du panier
     * @constructor
     * @param {object} cameraData
     * @param {string} cameraData._id
     * @param {object} cameraData.imageUrl
     * @param {number} cameraData.price
     * @param {string} cameraData.name
     * @param {number} quantity
     */
    constructor(cameraData, quantity){
        this._id = undefined;
        this.imageUrl = undefined;
        this.name = undefined;
        this.price = undefined;
        Object.assign(this, cameraData);
        this.quandity = undefined;
    }



}