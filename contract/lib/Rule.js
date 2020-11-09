
'use strict';
const State = require('../ledger-api/state.js');

class Rule extends State{

    constructor(obj) {
        super(Rule.getClass(), [obj.caseName]);
        Object.assign(this, obj);
    }

    getCaseName() {
        return this.caseName;
    }

    static fromBuffer(buffer) {
        return Rule.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to  EMR
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return Rule.deserializeClass(data, Rule);
    }

    /**
     * Factory method to create a order object
     */
    static createInstance(caseName) {
        return new Rule({caseName});
    }

    static getClass() {
        return 'org.HealthSystem.Rule';
    }
}

module.exports = Rule;
