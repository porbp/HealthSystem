
'use strict';

const { Contract ,Context} = require('fabric-contract-api');

const EMR = require('./EMR.js');
const Rule = require('./Rule.js');
const RuleList = require('./RuleList.js');
const EMRStates = require('./EMR.js').EMRState;
const EVENT_TYPE = "bcpocevent";

class HealthSystemContractContract extends Contract {

    constructor() {
        super('org.HealthSystem.contract');
    }
        /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async init(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }
    
  
    async getEMRHistory(ctx, patientId) {
        console.info('============= getEMRHistory ===========');
        if (patientId.length < 1) {
            throw new Error('patientId is required as input')
        }
        var AsBytes = await ctx.stub.getState(patientId);

        if (!AsBytes || AsBytes.length === 0) {
            throw new Error(`Error Message from getEMRHistory: EMR with patientId = ${patientId} does not exist.`);
        }

        var emr = EMR.deserialize(AsBytes);
        let userId = await this.getCurrentUserId(ctx);
        let userType = await this.getCurrentUserType(ctx);

        if ((userType != "admin") 
            && (userType != "lab")             
            && (userId != emr.doctorId))
            throw new Error(`${userId} does not have access to EMR : ${patientId}`);

        // Get list of transactions of EMR
        const iterator = await ctx.stub.getHistoryForKey(patientId);
        const emrHistory = [];

        while (true) {
            let history = await iterator.next();

            if (history.value && history.value.value.toString()) {
                let jsonRes = {};
                jsonRes.TxId = history.value.tx_id;
                jsonRes.IsDelete = history.value.is_delete.toString();

                var d = new Date(0);
                d.setUTCSeconds(history.value.timestamp.seconds.low);
                jsonRes.Timestamp = d.toLocaleString("en-US", { timeZone: "Australia/Sydney" }) + " AEDT";

                try {
                    jsonRes.Value = JSON.parse(history.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Value = history.value.value.toString('utf8');
                }
                emrHistory.push(jsonRes);
            }

            if (history.done) {
                await iterator.close();
                console.info(emrHistory);
                return emrHistory;
            }
        }
    }

    async getCurrentUserId(ctx) {

        let id = [];
        id.push(ctx.clientIdentity.getID());
        var begin = id[0].indexOf("/CN=");
        var end = id[0].lastIndexOf("::/C=");
        let userid = id[0].substring(begin + 4, end);
        return userid;
    }

    async getCurrentUserType(ctx) {

        let userid = await this.getCurrentUserId(ctx);
        
        if (userid == "admin") {
            return userid;
        }
        return ctx.clientIdentity.getAttributeValue("usertype");
    }

 
    async createEMR(ctx, args) {

        const EMR_details = JSON.parse(args);
        var patientId = EMR_details.patientId;
        console.log("incoming asset fields: " + JSON.stringify(patientId));
        
        var AsBytes = await ctx.stub.getState(patientId);
        if (AsBytes && AsBytes.length > 0) {
            throw new Error(`Error Message from createEMR. emr with patientId = ${patientId} already exists.`);
        }
    
        let emr = EMR.createInstance(patientId);
        emr.patientId = EMR_details.patientId;
        emr.doctorId = EMR_details.doctorId;
        let details ={};
        details.symptoms = EMR_details.symptoms;
        details.Radiological_Findings = EMR_details.Radiological_Findings;
        details.Extended_Laboratory_Results = EMR_details.Extended_Laboratory_Results;
        details.Comorbidities = EMR_details.Comorbidities;
        details.Vitals = EMR_details.Vitals;
        details.age = EMR_details.age;
        details.gender = EMR_details.gender;
        details.Clinician_Assessed_Symptoms = EMR_details.Clinician_Assessed_Symptoms;
        details.er_referral = EMR_details.er_referral;
        details.high_risk_exposure_occupation = EMR_details.high_risk_exposure_occupation;
        details.high_risk_interactions = EMR_details.high_risk_interactions;
        //details.swab_type = EMR_details.swab_type;
        emr.details = details;
        emr.currentEMRState = {};
        emr.modifiedBy = await this.getCurrentUserId(ctx);
        emr.covid19_test_results = EMR_details.covid19_test_results;
        
        // Update ledger
        await ctx.stub.putState(patientId, emr.toBuffer());
    
        // Define and set event
        const event_obj = emr;
        event_obj.event_type = "createEMR";   //  add the field "event_type" for the event to be processed
    
        try {
            await ctx.stub.setEvent(EVENT_TYPE, event_obj.toBuffer());
        }
        catch (error) {
            console.log("Error in sending event");
        }
        finally {
            console.log("Attempted to send event = ", emr);
        }
        return emr.toBuffer();
    }

    async createEMRFromList(ctx, args) {
        var EMRList = args;
        EMRList = JSON.parse(EMRList);
        if(EMRList == undefined && EMRList.length < 1){
            throw new Error(`Error Message from createEMRFromList. EMRList error with length : ${EMRList.length}`);
        }
        
        for(var i=0;i<EMRList.length;i++){
            await this.createEMR(ctx,JSON.stringify(EMRList[i]));
        }
        return await this.queryAllEMR(ctx);
    }

    async queryEMRByPatientId(ctx, patientId) {
        console.info('============= queryEMRByPatientId ===========');
    
        if (patientId.length < 1) {
            throw new Error('patientId is required as input')
        }
    
        var AsBytes = await ctx.stub.getState(patientId);
    
        let queryEvent = {
            type: EVENT_TYPE,
            patientId: patientId,
            desc: "Query EMR was exccecute for  : " + patientId
        };
        await ctx.stub.setEvent(EVENT_TYPE, Buffer.from(JSON.stringify(queryEvent)));
    
        if (!AsBytes || AsBytes.length === 0) {
            throw new Error(`Error Message from queryEMRById:  with patientId = ${patientId} does not exist.`);
        }
    
        var emr = EMR.deserialize(AsBytes);
        let doctorId = emr.doctorId;
        let userId = await this.getCurrentUserId(ctx);
    
        if (userId != emr.patientId) 
            throw new Error(`${userId} does not have access -->${doctorId}-->${emr.patientId}`);
        return AsBytes;
    }
    
    async queryAllEMR(ctx) {
        console.info('============= queryAllEMR ===========');
    
        let userId = await this.getCurrentUserId(ctx);
        let userType = await this.getCurrentUserType(ctx);
    
        //  For adding filters in query, usage: {"selector":{"producerId":"farm1"}}
    let queryString;
        // Access control done using query strings
        switch (userType) {
            case "admin":
                queryString = {
                    "selector": {"class": "org.HealthSystem.EMR"}  //  return all EMR
                }
            case "lab": {
                queryString = {
                    "selector": {"class": "org.HealthSystem.EMR"}  //  return all EMR
                }
                break;
            }
            case "doctor": {
                queryString = {
                    "selector": {"doctorId": userId}  //  return all orders
                }
                break;
            }
            case "patient": {
                throw new Error(`${userId} does not have access to this transaction`);
            }
    
            default: {
                return [];
            }
        }
    
        console.log("In queryAllEMR: queryString = ");
        console.log(queryString);
        // Get all orders that meet queryString criteria
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const allEMRs = [];
    
        // Iterate through them and build an array of JSON objects
        while (true) {
            const temp = await iterator.next();
            if (temp.value && temp.value.value.toString()) {
                console.log(temp.value.value.toString('utf8'));
    
                let Record;
    
                try {
                    Record = JSON.parse(temp.value.value.toString('utf8'));
                } catch (err) {
                    console.log(" Error in loop thorugh object for query all EMRs "+err);
                    Record = temp.value.value.toString('utf8');
                }
    
                // Add to array of emr
                allEMRs.push(Record);
            }
    
            if (temp.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allEMRs);
                return allEMRs;
            }
        }
    }

    async deleteAllEMR(ctx){
        let emrList = await this.queryAllEMR(ctx);
        for(let i=0; i<emrList.length; i++){
            await ctx.stub.deleteState(emrList[i].patientId);
        }
        return [];
    }
    
    async deleteEMR(ctx,patientId) {
    
        console.info('============= deleteEMR ===========');
        if (patientId.length < 1) {
            throw new Error('patientId required as input')
        }
        console.log("patientId = " + patientId);
    
        var AsBytes = await ctx.stub.getState(patientId);
    
        if (!AsBytes || AsBytes.length === 0) {
            throw new Error(`Error Message from deleteEMR: EMR with patientId = ${patientId} does not exist.`);
        }
    
        let userId = await this.getCurrentUserId(ctx);
    
        if ((userId != "admin")) // admin only has access as a precaution.
            throw new Error(`${userId} does not have access to delete order ${patientId}`);
    
        await ctx.stub.deleteState(patientId); //remove the order from chaincode state
    }

    async updateEMR(ctx, args) {
        //
        console.info('============= updateEMR ===========');
        const EMR_Update = JSON.parse(args);
        let emr_update_detail = EMR_Update.details;
        let patientId = EMR_Update.patientId;
       
        if (patientId.length < 1) {
            throw new Error('patientId is required as input')
        }
    
        var AsBytes = await ctx.stub.getState(patientId);
        if (!AsBytes || AsBytes.length === 0) {
            throw new Error(`Error Message from updateEMR: with patientId = ${patientId} does not exist.`);
        }
    
        var emr = EMR.deserialize(AsBytes);
    
        let userId = await this.getCurrentUserId(ctx);
        let userType = await this.getCurrentUserType(ctx);
    
        if ((userId != emr.doctorId) && 
            (userId != emr.patientId) &&
            (userType != "lab"))
            throw new Error(`${userId} or ${userType} does not have access to updateEMR with patientId = ${patientId}`);
            switch (userType.toLowerCase()) {
                case "lab": {
                    emr.modifiedBy = userType;
                    if(emr_update_detail.labResult !== undefined ){
                        let labResult = emr_update_detail.labResult;
                        emr.labResult = labResult;
                        if(Object.keys(labResult).length > 1){ // check if lab result > 1
                            for(var key in labResult){
                                var lab ={}; 
                                lab[key] = labResult[key]; //extract each obj to queryLabResult
                                await this.queryLabResult(ctx,key,lab[key],emr); 
                            }
                        }else{
                            await this.queryLabResult(ctx,Object.keys(labResult)[0],Object.values(labResult)[0],emr); 
                        }
                        
                    }else{
                        await this.normalPredict(ctx,emr);
                    }
                    break;
                }
                case "doctor": {
                    if(emr_update_detail.Clinician_Assessed_Symptoms !== undefined){
                        emr.details.Clinician_Assessed_Symptoms = emr_update_detail.Clinician_Assessed_Symptoms;
                    }
                    emr.modifiedBy = userId;
                    await this.normalPredict(ctx,emr);
                    break;
                }
                case "patient": {
                    if(emr_update_detail.symptoms !== undefined){
                        emr.details.symptoms = emr_update_detail.symptoms;
                    }
                    emr.modifiedBy = userId;
                    await this.normalPredict(ctx,emr);
                    break;
                }
                default: {
                    return [];
                }
            }
        
    }
    
    async normalPredict(ctx,emr){
        var AsBytes =await this.getRuleList(ctx,emr);
        if (!AsBytes || AsBytes.length === 0) { // no rule list in system -> save as update
            await ctx.stub.putState(emr.patientId, Buffer.from(JSON.stringify(emr)));
        }else{ //found rulelist in system
            let ruleList = RuleList.deserialize(AsBytes);
            for(var r in ruleList){ // do predict again for each rule in rule list
                if(typeof ruleList[r] == 'object' && ruleList[r] != null){
                    let caseName = ruleList[r].caseName;
                    if(emr.currentEMRState
                        && emr.currentEMRState[caseName]== EMRStates.EMR_REVIEW){
                        //if it already have lab result == review -> just save update emr
                        await ctx.stub.putState(emr.patientId, Buffer.from(JSON.stringify(emr)));
                    }else{ // lab result not review yet
                        emr = await this.predict(ruleList[r],emr);
                        await this.savePredictEMR(ctx,emr,ruleList[r]);
                    }
                }
            }
        }
    }

    async getRuleListByAdmin(ctx){
        console.info('============= getRuleListByAdmin ===========');
        //get rule list
        var ruleList = "ruleList";
        var AsBytes = await ctx.stub.getState(ruleList);
        return AsBytes;
    }


    //query rule
    async getRuleList(ctx,emr){
        console.info('============= getRuleList ===========');
        //get rule list
        let ruleList = "ruleList";
        let patientId = emr.patientId;
        let queryEvent = {
            type: EVENT_TYPE,
            ruleList: "ruleList",
            patientId: patientId,
        };
           queryEvent.caseName = "queryAllRule";
           queryEvent.desc = "Query ruleList was exccecute all rule for  predicted emr where : " + patientId;

        var AsBytes = await ctx.stub.getState(ruleList);
        await ctx.stub.setEvent(EVENT_TYPE, Buffer.from(JSON.stringify(queryEvent)));
        return AsBytes;

    }

    async queryAllForPredict(ctx,emr,rule){
        let emrList = [];
        emrList = await this.queryAllEMR(ctx);
        for(let i=0; i<emrList.length; i++){
            if(emrList[i].patientId == emr.patientId){ 
                    // equal to rule, not do, put state to review || query only predict and update state
                    emr.currentEMRState[rule.caseName] = EMRStates.EMR_REVIEW;
                await ctx.stub.putState(emr.patientId, Buffer.from(JSON.stringify(emr)));
            }else{
                emrList[i] = await this.predict(rule,emrList[i]);
                await this.savePredictEMR(ctx,emrList[i],rule);
            }
        }
    }

    async savePredictEMR(ctx,emr,rule){
        emr.currentEMRState[rule.caseName] = EMRStates.EMR_PREDICTED;
        await ctx.stub.putState(emr.patientId, Buffer.from(JSON.stringify(emr)));
            const event_obj = emr;
            event_obj.event_type = "predictEMR with CaseName: "+ rule.caseName;
            
        try {
            await ctx.stub.setEvent(EVENT_TYPE, event_obj.toBuffer());
        }
        catch (error) {
            console.log("Error in sending event predictEMR");
        }
        finally {
            console.log("Attempted to send event predictEMR = ", emr);
        }
    }

    async updateRuleList(ctx,rule,ruleList){
        await ctx.stub.putState("ruleList", ruleList.toBuffer());
            
            const event_obj = ruleList;
            event_obj.event_type = "create first Rule list with case name : "+rule.caseName;   
        
            try {
                await ctx.stub.setEvent(EVENT_TYPE, event_obj.toBuffer());
            }
            catch (error) {
                console.log("Error in sending event create ruleList");
                return false;
            }
            finally {
                console.log("Attempted to send event ruleList = ", ruleList);
            }
        return true;
    }

    async initNewRule(caseName,emr){
        console.info('============= initNewRule ===========');
        let rule = Rule.createInstance(caseName);
        let emr_details = emr.details;
        let details = {};
        rule.caseName = caseName;
        details.symptoms = emr_details.symptoms;
        details.Radiological_Findings = emr_details.Radiological_Findings;
        details.Extended_Laboratory_Results = emr_details.Extended_Laboratory_Results;
        details.Comorbidities = emr_details.Comorbidities;
        details.Vitals = emr_details.Vitals;
        details.age = emr_details.age;
        details.gender = emr_details.gender;
        details.Clinician_Assessed_Symptoms = emr_details.Clinician_Assessed_Symptoms;
        details.er_referral = emr_details.er_referral;
        details.high_risk_exposure_occupation = emr_details.high_risk_exposure_occupation;
        details.high_risk_interactions = emr_details.high_risk_interactions;
        details.er_referral = emr_details.er_referral;
        rule.details = details;
        rule.currentVersion = 1;
        return rule;
    }

        
    async computeScore(rule,differObj,score){
        var object =  rule;
        var diff = differObj;
        var patientScore = score;
        function match(value) {
            var result = Object.keys(object).find(key => key === value); 
            if(result == undefined){
                return false;
            }
            return true;
        }

        for(var obj in diff){
                if (diff.hasOwnProperty(obj)) {
                    var isMatch = match(obj);
                    var item = Object.prototype.toString.call(diff[obj]);
                    if(isMatch){
                        if(item === '[object Object]'){
                            patientScore = patientScore - Object.keys(diff[obj]).length;
                        }else {
                            patientScore = patientScore - 1;
                        }
                    }
                    
                }    
        }
        return patientScore;
    }

    async predict(rule,emr){      
        //throw new Error(`compare ${item1}  ${item2} ${key} already exists`);  
        var diff = function (obj1, obj2) {

            // Make sure an object to compare is provided
            if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
                return obj1;
            }
            var diffs = {};
            var key;
    
                var compare = function (item1, item2, key) {
    
                    // Get the object type
                    var type1 = Object.prototype.toString.call(item1);
                    var type2 = Object.prototype.toString.call(item2);
    
                    // If type2 is undefined it has been removed
                    if (type2 === '[object Undefined]') {
                        diffs[key] = null;
                        return;
                    }
    
                    // If items are different types
                    if (type1 !== type2) {
                        diffs[key] = item2;
                        return;
                    }
                    if (type1 !== '[object Object]' && 
                    type2 !== '[object Object]'&&
                    item1 !== item2) {
                        diffs[key] = item2;
                        return;
                    }
    
                    // If an object, compare recursively
                    if (type1 === '[object Object]') {
                        var objDiff = diff(item1, item2);
                        if (Object.keys(objDiff).length >= 1) {
                            diffs[key] = objDiff;
                        }
                        return;
                    }
    
                }
            for (key in obj1) {
                if (obj1.hasOwnProperty(key)) {
                    compare(obj1[key], obj2[key], key);
                }
            }
            for (key in obj2) {
                if (obj2.hasOwnProperty(key)) {
                    if (!obj1[key] && obj1[key] !== obj2[key] ) {
                        diffs[key] = obj2[key];
                    }
                }
            }
    
            // Return the object of differences
            return diffs;
        };
    let emr_details = emr.details;
    let rule_detail = rule.details;
    var differObj = diff(rule_detail,emr_details);
    //count item in rule
    let ruleScore = 0;

    for(var r in rule_detail){
        if (rule_detail.hasOwnProperty(r)) {
                var item = Object.prototype.toString.call(rule_detail[r]);
                if(item === '[object Object]'){
                    ruleScore = ruleScore + Object.keys(rule_detail[r]).length;
                }else{
                    ruleScore++; 
            }
        }
    }
   
    
    var score = ruleScore;
    score = await this.computeScore(rule_detail,differObj,score);
    var predictResult = false;
    if(score >= 0.70*(ruleScore)){
        predictResult = true;  
    }
    var predict = {};
    if(emr.predict != undefined){
        predict = emr.predict;
    }
      
    predict[rule.caseName] = 
    {"score":score
    ,"predictResult":predictResult
    ,"rule":rule
    ,"differObj":differObj};

    emr.predict = predict;
    return emr;

    }
    async deleteRuleList(ctx){
        console.info('============= deleteRuleList ===========');
        await ctx.stub.deleteState("ruleList"); 

    }
    


    async queryLabResult(ctx,lab_case,lab_result, emr) {
        console.info('============= queryLabResult ===========');
        //get rule list
        var AsBytes = await this.getRuleList(ctx,emr);
        var caseName = lab_case;

        // find rulelist
        if (!AsBytes || AsBytes.length === 0) { // no rulelist at all -> init rulelist
            if(lab_result.toLowerCase() == "positive"){ //is it positive value
                var Id = 'ruleList';
                let ruleList = RuleList.createInstance(Id.toString());
                let rule = await this.initNewRule(caseName,emr);
                ruleList[caseName] = rule;
                let isNewRuleInit =  await this.updateRuleList(ctx,rule,ruleList)
                if(isNewRuleInit){
                    await this.queryAllForPredict(ctx,emr,rule);
                }else{
                    throw new Error(`can not init ruleList`);
                }
            }else{ //if not just push to review state and save
                emr.currentEMRState[caseName] = EMRStates.EMR_REVIEW;
                await ctx.stub.putState(emr.patientId, emr.toBuffer());
            }
        }else{ //Found rulelist
            let ruleList = RuleList.deserialize(AsBytes);
            var result = Object.keys(ruleList).find(key => key === caseName);
           
            if(result == undefined){ //rule not found in rulelist -> init new rule
                let rule = await this.initNewRule(caseName,emr);
                ruleList[caseName] = rule;
                let isUpdateRuleList = await this.updateRuleList(ctx,rule,ruleList);
                    if(isUpdateRuleList){
                        await this.queryAllForPredict(ctx,emr,rule);
                    }else{
                        throw new Error(`can not update existing ruleList`);
                    }
            }else{//found rule in rulelist
                if(emr.currentEMRState[caseName] == EMRStates.EMR_REVIEW){ //if emr already review on that case -> just save
                    await ctx.stub.putState(emr.patientId, emr.toBuffer());
                }else{ // push to review
                    emr.currentEMRState[caseName] = EMRStates.EMR_REVIEW;
                    await ctx.stub.putState(emr.patientId, emr.toBuffer());
                    await this.review(ctx,caseName,ruleList,emr);
                }
                
            }
            
        }
        return true;

    }
       
    async review(ctx,caseName,ruleList, emr){
        let currentRule = ruleList[caseName];

        // check if it not first time
        if(currentRule.reviews && currentRule.reviews.length > 0){
            let currentReview;
            for(let i=0; i<currentRule.reviews.length; i++){ //find currentReivew result
                if(currentRule.currentVersion == currentRule.reviews[i].version){
                    currentReview = currentRule.reviews[i];
                    
                    currentReview.CF_Matrix =  await this.createCFMatrixFromCurrentEMR(caseName,emr,currentReview.CF_Matrix);
                    currentReview = await this.calRate(currentReview);
                    currentRule.reviews[i] = currentReview;

                    if(await this.updateRuleList(ctx,currentRule,ruleList)){
                         //update review rate first then check case FN, FP
                        if(await this.isFalseNegative(caseName,emr) || await this.isFalsePositive(caseName,emr)){
                            await this.compareRule(ctx,ruleList,emr,caseName,currentReview);
                        }
                    }
                }
            }

        }else{ //init reviews
            let reviews = [];

            let CF_Matrix = {};
            CF_Matrix.FP = 0;  CF_Matrix.FN = 0; CF_Matrix.TP = 0; CF_Matrix.TN = 0; CF_Matrix.N = 0;
            
            let review = {};
            review.CF_Matrix = await this.createCFMatrixFromCurrentEMR(caseName,emr,CF_Matrix);
            
            review.version = currentRule.currentVersion;
            review = await this.calRate(review);
            reviews.push(review);
            currentRule.reviews = reviews;
            await this.updateRuleList(ctx,currentRule,ruleList);
            //save first then check case FN
            if(await this.isFalseNegative(caseName,emr) || await this.isFalsePositive(caseName,emr)){ // this emr return FN 
                await this.compareRule(ctx,ruleList,emr,caseName,review);
           }
        }
    }

    async calRate(review){
        let CF = review.CF_Matrix;
        review.ACC = (CF.TP + CF.TN) / (CF.TP + CF.TN + CF.FP + CF.FN);
        review.FPR = CF.FP / (CF.FP + CF.TN);
        review.FNR = CF.FN / (CF.FN + CF.TP);
        return review;
    }



    async createCFMatrixFromCurrentEMR(caseName,emr,CF_Matrix){
        //compute FN, FP, TP, TF, confustion matrix
        let predictResult = emr.predict[caseName].predictResult;
        let actualResult =  emr.labResult[caseName];
        if( actualResult.toLowerCase() == "positive"){
            if(predictResult == true){
                CF_Matrix.TP =  CF_Matrix.TP + 1;
            }else{
                CF_Matrix.FN =  CF_Matrix.FN + 1;
            }
        }else{
            if(predictResult == true){
                CF_Matrix.FP =  CF_Matrix.FP + 1;
            }else{
                CF_Matrix.TN =  CF_Matrix.TN + 1;
            }
        }
        CF_Matrix.N = CF_Matrix.N +1;
        return CF_Matrix;
    }

    async isFalseNegative(caseName,emr){
        let predictResult = emr.predict[caseName].predictResult;
        let actualResult =  emr.labResult[caseName];
        if( actualResult.toLowerCase() == "positive"){
            if(predictResult == false){
                return true;
            }
        }
        return false;
    }
    async isFalsePositive(caseName,emr){
        let predictResult = emr.predict[caseName].predictResult;
        let actualResult =  emr.labResult[caseName];
        if( actualResult.toLowerCase() == "negative"){
            if(predictResult == true){
                return true;
            }
        }
        return false;
    }

    async compareRule(ctx,ruleList,emr,caseName,currentReview){
        //init new rule from current emr for compare
       
        let newRule = await this.initNewRule(caseName,emr);
        let emrList = [];
        emrList = await this.queryAllEMR(ctx);
        let emrList_ReviewState = [];
        for(let i=0; i<emrList.length; i++){
           if(emrList[i].currentEMRState[caseName] 
            && emrList[i].currentEMRState[caseName] == EMRStates.EMR_REVIEW){ //filter only review state
                emrList_ReviewState.push(emrList[i]);
           }
        }
        
       // let p = [];
        for(let i=0; i<emrList_ReviewState.length; i++){ // do predict all EMR  with new rule in review state
            emrList_ReviewState[i] = await this.predict(newRule,emrList_ReviewState[i]);
            //p.push(emrList_ReviewState[i]);
        }

        let NEW_CF_Matrix = {};
        NEW_CF_Matrix.FP = 0;  NEW_CF_Matrix.FN = 0; NEW_CF_Matrix.TP = 0; NEW_CF_Matrix.TN = 0; NEW_CF_Matrix.N = 0;
        for(let i=0; i<emrList_ReviewState.length; i++){ //get CF matrix
            NEW_CF_Matrix = await this.createCFMatrixFromCurrentEMR(caseName,emrList_ReviewState[i],NEW_CF_Matrix);
        }
        //cal rate
        let review = {};
        //debug
        // review.newRule = newRule;
        // review.p = p;
        // end debug

        review.CF_Matrix = NEW_CF_Matrix;
        review = await this.calRate(review);
        //compare rate
       
        if(review.ACC > currentReview.ACC &&
            review.FNR < currentReview.FNR ){ // ACC increase and FN decrease
            //select this rule
            review.version = ruleList[caseName].currentVersion + 1;
            
            let reviewArr = [];
            ruleList[caseName].reviews.push(review);
            reviewArr = ruleList[caseName].reviews;

            ruleList[caseName] = newRule;
            ruleList[caseName].currentVersion =  review.version;
            ruleList[caseName].reviews = reviewArr;
       
            await this.queryAllForPredict(ctx,emr,newRule);
            await this.updateRuleList(ctx,newRule,ruleList);
            
        }
        // throw new Error(`updateALLEMR ${review.ACC} 
        // ${currentReview.ACC}  ${currentReview.CF_Matrix.N}  ${review.FNR} ${currentReview.FNR} ${emr.patientId}`);
        // else{// DEBUG test review
        //     ruleList[caseName].reviews.push(review);
            
        //     //save new rule to ruleList
        //     await this.updateRuleList(ctx,newRule,ruleList)
        // }
    }
}

    


module.exports = HealthSystemContractContract;
