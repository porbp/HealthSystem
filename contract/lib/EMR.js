
'use strict';

const State = require('../ledger-api/state.js');

const EMRState = {    
    EMR_PREDICTED: 1,      
    EMR_REVIEW: 2,    
};


class EMR extends State{

    constructor(obj) {
        super(EMR.getClass(), [obj.patientId]);
        Object.assign(this, obj);
    }

  
    getPatientId() {
        return this.patientId;
    }
    getDoctorId() {
        return this.doctorId;
    }

    toEMRUpdatedState() {
        this.currentEMRState = EMRState.EMR_UPDATED;
    }

    toEMRPredictedState() {
        this.currentEMRState = EMRState.EMR_PREDICTED;
    }


    toEMRReviewState() {
        this.currentEMRState = EMRState.EMR_REVIEW;
    }

    static fromBuffer(buffer) {
        return EMR.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to  EMR
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return EMR.deserializeClass(data, EMR);
    }

    /**
     * Factory method to create a order object
     */
    static createInstance(patientId) {
        return new EMR({patientId});
    }

    static getClass() {
        return 'org.HealthSystem.EMR';
    }
}

module.exports = EMR;
module.exports.EMRState = EMRState;
