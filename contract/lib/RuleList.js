
'use strict';
const State = require('../ledger-api/state.js');
class RuleList extends State{

    constructor(obj) {
        super(RuleList.getClass(), [obj.ruleListId]);
        Object.assign(this, obj);
    }

    getRuleListId() {
        return this.ruleListId;
    }

    static fromBuffer(buffer) {
        return RuleList.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return RuleList.deserializeClass(data, RuleList);
    }
    
    /**
     * Factory method to create a order object
     */
    static createInstance(ruleListId) {
        return new RuleList({ruleListId});
    }

    static getClass() {
        return 'org.HealthSystem.RuleList';
    }
}

module.exports = RuleList;

