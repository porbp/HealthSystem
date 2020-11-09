
'use strict';
const express = require('express');
const utils = require('./utils.js');
const HealthSysRouter = express.Router();
console.log('HealthSysRouter : '+ HealthSysRouter);
// Bring key classes into scope, most importantly Fabric SDK network class
const EMR = require('../../contract/lib/EMR.js');
const RuleList = require('../../contract/lib/RuleList.js');

const STATUS_SUCCESS = 200;
const STATUS_CLIENT_ERROR = 400;
const STATUS_SERVER_ERROR = 500;

//  USER Management Errors
const USER_NOT_ENROLLED = 1000;
const INVALID_HEADER = 1001;

//  application specific errors
const SUCCESS = 0;
const ORDER_NOT_FOUND = 2000;

HealthSysRouter.route('/EMRs').post(function (request, response) {
    console.log(JSON.stringify(request.body))
    submitTx(request, 'createEMR', JSON.stringify(request.body))
        .then((result) => {
            // process response
            console.log('\nProcess createEMR transaction.');
            let EMR = EMR.fromBuffer(result);
            console.log(EMR);
            response.status(STATUS_SUCCESS);
            response.send(EMR);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem creating the EMR."));
        });
});

HealthSysRouter.route('/createEMRFromList').post(function (request, response) {
    console.log("createEMRFromList == parse",JSON.stringify(request.body));
    submitTx(request, 'createEMRFromList', JSON.stringify(request.body))
        .then((queryResponse) => {
            response.status(STATUS_SUCCESS);
            response.send(queryResponse);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem createEMRFromList."));
        });
});


HealthSysRouter.route('/updateEMR').post(function (request, response) {
    console.log("updateEMR ==",JSON.stringify(request.body))
    submitTx(request, 'updateEMR', JSON.stringify(request.body))
        .then((result) => {
            // process response
            console.log('\nProcess updateEMR transaction.');
            response.status(STATUS_SUCCESS);
            response.send(result);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem updateEMR"));
        });
});

HealthSysRouter.route('/deleteAllEMR').get(function (request, response) {
    console.log("deleteAllEMR == ",request)
    submitTx(request, 'deleteAllEMR','')
        .then((result) => {
            // process response
            console.log('\nProcess deleteAllEMR transaction.');
            response.status(STATUS_SUCCESS);
            response.send(result);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem deleteAllEMR"));
        });
});


HealthSysRouter.route('/getEMRByPatientId/:id').get(function (request, response) {
    console.log("========= in getEMRByPatientId =========")
    submitTx(request, 'queryEMRByPatientId', request.params.id)
        .then((result) => {
            // process response
            let emr = EMR.fromBuffer(result);
            response.status(STATUS_SUCCESS);
            console.log("========= data =========")
            console.log(emr)
            response.send(emr);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, ORDER_NOT_FOUND,
                'emr from patient id, ' + request.params.id +
                ' does not exist '));
        });
});

HealthSysRouter.route('/getRuleList/').get(function (request, response) {
    submitTx(request, 'getRuleListByAdmin','')
        .then((result) => {
            // process response
            let ruleList = RuleList.fromBuffer(result);
            response.status(STATUS_SUCCESS);
            console.log("========= data =========")
            console.log(ruleList)
            response.send(ruleList);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getRuleList"));
        });
});

HealthSysRouter.route('/queryAllEMR').get(function (request, response) {
    submitTx(request, 'queryAllEMR', '')
        .then((queryResponse) => {
            //  response is already a string;  not a buffer
            let emrs = queryResponse;
            response.status(STATUS_SUCCESS);
            response.send(emrs);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getting the list of emrs."));
        });
});



HealthSysRouter.route('/getEMRHistory/:id').get(function (request, response) {
    console.log("getEMRHistory",request.params.id);
    submitTx(request, 'getEMRHistory', request.params.id)
        .then((queryResponse) => {
            response.status(STATUS_SUCCESS);
            response.send(queryResponse);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem getEMRHistory."));
        });
});


HealthSysRouter.route('/deleteEMR/:id').delete(function (request, response) {
    submitTx(request, 'deleteEMR', request.params.id)
        .then((deleteEMRResponse) => {
            // process response
            console.log('Process DeleteEMR transaction.');
            console.log('Transaction complete.');
            response.status(STATUS_SUCCESS);
            response.send(deleteEMRResponse);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem in deleting emr, " + request.params.id));
        });
});

HealthSysRouter.route('/deleteRuleList').delete(function (request, response) {
    submitTx(request, 'deleteRuleList')
        .then((deleteRuleListResp) => {
            // process response
            console.log('Process deleteRuleList transaction.');
            console.log('Transaction complete.');
            response.status(STATUS_SUCCESS);
            response.send(deleteRuleListResp);
        }, (error) => {
            response.status(STATUS_SERVER_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                "There was a problem in deleteRuleList, " + request.params.id));
        });
});

async function getUsernamePassword(request) {
    // check for basic auth header
    if (!request.headers.authorization || request.headers.authorization.indexOf('Basic ') === -1) {
        return new Promise().reject('Missing Authorization Header');  //  status 401
    }

    // get auth credentials
    const base64Credentials = request.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    //  At this point, username + password could be verified for auth -
    //  but NOT BEING VERIFIED here.  Username and password are
    //  verified with Fabric-Certificate-Authority at enroll-user time.
    //  Once enrolled,
    //  certificate is retrieved from CA and stored in local wallet.
    //  After that, password will not be used.  username will be used
    //  to pick up certificate from the local wallet.

    if (!username || !password) {
        return new Promise().reject('Invalid Authentication Credentials');  //  status 401
    }

    // attach username and password to request object
    request.username = username;
    request.password = password;

    return request;
}

async function submitTx(request, txName, ...args) {
    try {
        console.log("=========== in submitTx ===========",request);
        await getUsernamePassword(request);
        return utils.setUserContext(request.username, request.password).then((contract) => {
            // Insert txName as args[0]
            args.unshift(txName);
            // Insert contract as args[0]
            args.unshift(contract);
            // .apply applies the list entries as parameters to the called function
            return utils.submitTx.apply("unused", args)
                .then(buffer => {
                    return buffer;
                }, error => {
                    return Promise.reject(error);
                });
        }, error => {
            return Promise.reject(error);
        });
    }
    catch (error) {
        return Promise.reject(error);
    }
}


////////////////////////////////// User Management APIs ///////////////////////////////////////

//  Purpose:    POST api to register new users with Hyperledger Fabric CA;
//  Note:       After registration, users have to enroll to get certificates
//              to be able to submit transactions to Hyperledger Fabric Peer.
//  Input:      request.body = {username (string), password (string), usertype (string)}
//              usertype = {"admin", "producer", "shipper", "retailer", "customer", "regulator"}
//              An admin identity is required to make this call to CA and
//              should be passed in authorization header.
//  Output:     pwd; If password was "", a generated password is returned in response
//  Usage 1:    "smith", "smithpw", "producer"
//  Usage 2:    "smith", "",        "producer"
HealthSysRouter.route('/register-user').post(function (request, response) {
    try {
        let userId = request.body.userid;
        let userPwd = request.body.password;
        let userType = request.body.usertype;

        //  only admin can call this api;  get admin username and pwd from request header
        getUsernamePassword(request)
            .then(request => {
                //  1.  No need to call setUserContext
                //  Fabric CA client is used for register-user;
                //  2.  In this demo application UI, only admin sees the page "Manage Users"
                //  So, it is assumed that only the admin has access to this api
                //  register-user can only be called by a user with admin privileges.

                utils.registerUser(userId, userPwd, userType, request.username).
                    then((result) => {
                        response.status(STATUS_SUCCESS);
                        response.send(result);
                    }, (error) => {
                        response.status(STATUS_CLIENT_ERROR);
                        response.send(utils.prepareErrorResponse(error, STATUS_CLIENT_ERROR,
                            "User, " + userId + " could not be registered. "
                            + "Verify if calling identity has admin privileges."));
                    });
            }, error => {
                response.status(STATUS_CLIENT_ERROR);
                response.send(utils.prepareErrorResponse(error, INVALID_HEADER,
                    "Invalid header;  User, " + userId + " could not be registered."));
            });
    } catch (error) {
        response.status(STATUS_SERVER_ERROR);
        response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
            "Internal server error; User, " + userId + " could not be registered."));
    }
});  //  process route register-user

//  Purpose:    To enroll registered users with Fabric CA;
//  A call to enrollUser to Fabric CA generates (and returns) certificates for the given (registered) user;
//  These certificates are need for subsequent calls to Fabric Peers.
//  Input: { userid, password } in header and request.body.usertype
//  Output:  Certificate on successful enrollment
//  Usage:  "smith", "smithpw", "producer"
HealthSysRouter.route('/enroll-user/').post(function (request, response) {
    let userType = request.body.usertype;
    //  retrieve username, password of the called from authorization header
    getUsernamePassword(request).then(request => {
        utils.enrollUser(request.username, request.password, userType).then(result => {
            response.status(STATUS_SUCCESS);
            response.send(result);
        }, error => {
            response.status(STATUS_CLIENT_ERROR);
            response.send(utils.prepareErrorResponse(error, STATUS_CLIENT_ERROR,
                "User, " + request.username + " could not be enrolled. Check that user is registered."));
        });
    }), (error => {
        response.status(STATUS_CLIENT_ERROR);
        response.send(utils.prepareErrorResponse(error, INVALID_HEADER,
            "Invalid header;  User, " + request.username + " could not be enrolled."));
    });
});  //  post('/api/enroll-user/', (request, response) )

//  Purpose:    To check if user is enrolled with Fabric CA;
//  Input:  request.params.id = { userid }
//  Iutput:  Certificate on successful enrollment
//  Usage:  ""
/*
app.get('/api/is-user-enrolled/:id', (request, response) => {
*/
HealthSysRouter.route('/is-user-enrolled/:id').get(function (request, response) {
    //  only admin can call this api;  But this is not verified here
    //  get admin username and pwd from request header
    //
    getUsernamePassword(request)
        .then(request => {
            let userId = request.params.id;
            utils.isUserEnrolled(userId).then(result => {
                response.status(STATUS_SUCCESS);
                response.send(result);
            }, error => {
                response.status(STATUS_CLIENT_ERROR);
                response.send(utils.prepareErrorResponse(error, STATUS_CLIENT_ERROR,
                  "Error checking enrollment for user, " + request.params.id));
            });
        }, ((error) => {
            response.status(STATUS_CLIENT_ERROR);
            response.send(utils.prepareErrorResponse(error, INVALID_HEADER,
                "Invalid header; Error checking enrollment for user, " + request.params.id));
        }));
})  //  end of is-user-enrolled

//  Purpose: Get list of all users
//  Output:  array of all registered users
//  Usage:  ""
HealthSysRouter.route('/users').get(function (request, response) {
    getUsernamePassword(request)
        .then(request => {
            utils.getAllUsers(request.username).then((result) => {
                response.status(STATUS_SUCCESS);
                response.send(result);
            }, (error) => {
                response.status(STATUS_SERVER_ERROR);
                response.send(utils.prepareErrorResponse (error, STATUS_SERVER_ERROR,
                    "Problem getting list of users."));
            });
        }, ((error) => {
            response.status(STATUS_CLIENT_ERROR);
            response.send(utils.prepareErrorResponse(error, INVALID_HEADER,
                "Invalid header;  User, " + request.username + " could not be enrolled."));
        }));
});

HealthSysRouter.route('/users/:id').get(function (request, response) {
    //  Get admin username and pwd from request header
    //  Only admin can call this api; this is not verified here;
    //  Possible future enhancement
    console.log("get User id")
    getUsernamePassword(request)
        .then(request => {
            utils.isUserEnrolled(request.params.id).then(result1 => {
                if (result1 == true) {
                    utils.getUser(request.params.id, request.username).then((result2) => {
                        console.log("get User id response--",JSON.stringify(result2));
                        response.status(STATUS_SUCCESS);
                        response.send(result2);
                    }, (error) => {
                        response.status(STATUS_SERVER_ERROR);
                        response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                            "Could not get user details for user, " + request.params.id));
                    });
                } else {
                    let error = {};
                    response.status(STATUS_CLIENT_ERROR);
                    response.send(utils.prepareErrorResponse(error, USER_NOT_ENROLLED,
                        "Verify if the user is registered and enrolled."));
                }
            }, error => {
                response.status(STATUS_SERVER_ERROR);
                response.send(utils.prepareErrorResponse(error, STATUS_SERVER_ERROR,
                    "Problem checking for user enrollment."));
            });
        }, ((error) => {
            response.status(STATUS_CLIENT_ERROR);
            response.send(utils.prepareErrorResponse(error, INVALID_HEADER,
                "Invalid header;  User, " + request.params.id + " could not be enrolled."));
        }));
});

module.exports = HealthSysRouter;
