
'use strict';

// Key for Fabric SDK network 
const fs = require('fs');
const path = require('path');
const { FileSystemWallet, Gateway, User, X509WalletMixin } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');

//  global variables for HLFabric
var gateway;
var network;
var contract = null;
var configdata;
var wallet;
var bLocalHost;
var ccp;
var orgMSPID;
const EVENT_TYPE = "bcpocevent";  //

const SUCCESS = 0;
const utils = {};

// Main program function

utils.prepareErrorResponse = (error, code, message) => {

    let errorMessage;
    try {
        // get error from fabric transaction
        let entries = Object.entries(error);
        errorMessage = entries[0][1][0]["message"];
    } catch (exception) {
        errorMessage = null;
    }

    let result = { "code": code, "message": errorMessage?errorMessage:message, "error": error };
    console.log("utils.js:prepareErrorResponse(): " + message);
    console.log(result);
    return result;
}


utils.connectGatewayFromConfig = async () => {
    console.log(">>>connectGatewayFromConfig:  ");
    gateway = new Gateway();

    try {
        const platform = process.env.PLATFORM || 'LOCAL';
        if (platform == 'IBP') {
            configdata = JSON.parse(fs.readFileSync('../../gateway/ibp/config.json', 'utf8'));
            console.log("Platform = " + platform);
            bLocalHost = false;
        } else { // PLATFORM = LOCAL
            configdata = JSON.parse(fs.readFileSync('../../gateway/local/config.json', 'utf8'));
            console.log("Platform = " + platform);
            bLocalHost = true;
        }

        const walletpath = configdata["wallet"];
        console.log("walletpath = " + walletpath);

        const ccpPath = path.resolve(__dirname, configdata["connection_profile_filename"]);
        var userid = process.env.FABRIC_USER_ID || "admin";
        var pwd = process.env.FABRIC_USER_SECRET || "adminpw";
        var usertype = process.env.FABRIC_USER_TYPE || "admin";
        console.log('user: ' + userid + ", pwd: ", pwd + ", usertype: ", usertype);
        console.log('ccpPath: ' + ccpPath);

        ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Set up the MSP Id
        orgMSPID = ccp.client.organization;
        console.log('MSP ID: ' + orgMSPID);

        // get wallet
        wallet = new FileSystemWallet(walletpath);

        const idExists = await wallet.exists(userid);
        if (!idExists) {
            console.log(`Enrolling and importing ${userid} into wallet`);
            await utils.enrollUser(userid, pwd, usertype);
        }

        // Connect to Fabric gateway
        console.log('Connect to Fabric gateway.');
        await gateway.connect(ccp, {
            identity: userid, wallet: wallet, discovery: { enabled: true, asLocalhost: bLocalHost }
        });

        // Access channel
        console.log('Use network channel: ' + configdata["channel_name"]);

        // Get addressability to the smart contract as specified in config
        network = await gateway.getNetwork(configdata["channel_name"]);
        console.log('Use ' + configdata["smart_contract_name"] + ' smart contract.');

        // then use this variable of smartcontract to submit transaction
        contract = await network.getContract(configdata["smart_contract_name"]);

    } catch (error) {
        console.log('Error connecting to Fabric network. ' + error.toString());
    } finally {
    }
    return contract;
}

utils.events = async () => {
    // get an eventhub once the fabric client has a user assigned. The user
    // is required because the event registration must be signed

    //  Eventhub is attached to a peer.  Get the peer, to register an event hub.
    //  client -> channel -> peer -> eventHub

    const client = gateway.getClient();
    var channel = client.getChannel(configdata["channel_name"]);
    var peers = channel.getChannelPeers();
    if (peers.length == 0) {
        throw new Error("Error after call to channel.getChannelPeers(): Channel has no peers !");
    }

    console.log("Connecting to event hub..." + peers[0].getName());
    //  Assuming that we want to connect to the first peer in the peers list
    var channel_event_hub = channel.getChannelEventHub(peers[0].getName());

    // to see the event payload, use 'true' in the call to channel_event_hub.connect(boolean)
    channel_event_hub.connect(true);

    let event_monitor = new Promise((resolve, reject) => {
        /*  Sample usage of registerChaincodeEvent
        registerChaincodeEvent ('chaincodename', 'regularExpressionForEventName',
               callbackfunction(...) => {...},
               callbackFunctionForErrorHandling (...) => {...},
               // options:
               {startBlock:23, endBlock:30, unregister: true, disconnect: true}
        */
        var regid = channel_event_hub.registerChaincodeEvent(configdata["smart_contract_name"], EVENT_TYPE,
            (event, block_num, txnid, status) => {
                // This callback will be called when there is a chaincode event name
                // within a block that will match on the second parameter in the registration
                // from the chaincode with the ID of the first parameter.

                //let event_payload = JSON.parse(event.payload.toString());

                console.log("Event payload: " + event.payload.toString());
                console.log("\n------------------------------------");
            }, (err) => {
                // this is the callback if something goes wrong with the event registration or processing
                reject(new Error('There was a problem with the eventhub in registerTxEvent ::' + err));
            },
            { disconnect: false } //continue to listen and not disconnect when complete
        );
    }, (err) => {
        console.log("At creation of event_monitor: Error:" + err.toString());
        throw (err);
    });

    Promise.all([event_monitor]);
}  //  end of events()

utils.submitTx = async(contract, txName, ...args) => {
    console.log(">>>utils.submitTx..."+txName+" ("+args+")");
    console.log(">>>utils.submitTx... args -->",args);
    let result = contract.submitTransaction(txName, ...args);
    console.log ('contract ',contract);
    return result.then (response => {
        console.log ('Transaction submitted successfully;  Response: ', response.toString());
        console.log ('utils.js: Transaction submitted successfully');
        return Promise.resolve(response.toString());
    },(error) =>
        {
          console.log ('utils.js: Error:' + error.toString());
          return Promise.reject(error);
        });
}

//  function registerUser
//  Purpose: Utility function for registering users with HL Fabric CA.
utils.registerUser = async (userid, userpwd, usertype, adminIdentity) => {
    console.log("\n------------  utils.registerUser ---------------");
    console.log("\n userid: " + userid + ", pwd: " + userpwd + ", usertype: " + usertype)

    const gateway = new Gateway();

    // Connect to gateway as admin
    await gateway.connect(ccp, { wallet, identity: adminIdentity, discovery: { enabled: false, asLocalhost: bLocalHost } });

    const orgs = ccp.organizations;
    const CAs = ccp.certificateAuthorities;
    const fabricCAKey = orgs[orgMSPID].certificateAuthorities[0];
    const caURL = CAs[fabricCAKey].url;
    const ca = new FabricCAServices(caURL, { trustedRoots: [], verify: false });

    var newUserDetails = {
        enrollmentID: userid,
        enrollmentSecret: userpwd,
        role: "client",
        //affiliation: orgMSPID,
        //profile: 'tls',
        attrs: [
            {
                "name": "usertype",
                "value": usertype,
                "ecert": true
            }],
        maxEnrollments: 5
    };

    //  Register is done using admin signing authority
    return ca.register(newUserDetails, gateway.getCurrentIdentity())
        .then(newPwd => {
            //  if a password was set in 'enrollmentSecret' field of newUserDetails,
            //  the same password is returned by "register".
            //  if a password was not set in 'enrollmentSecret' field of newUserDetails,
            //  then a generated password is returned by "register".
            console.log('\n Secret returned: ' + newPwd);
            return newPwd;
        }, error => {
            console.log('Error in register();  ERROR returned: ' + error.toString());
            return Promise.reject(error);
        });
}  //  end of function registerUser

utils.enrollUser = async (userid, userpwd, usertype) => {
    console.log("\n------------  utils.enrollUser -----------------");
    console.log("userid: " + userid + ", pwd: " + userpwd + ", usertype:" + usertype);

    // get certificate authority
    const orgs = ccp.organizations;
    const CAs = ccp.certificateAuthorities;
    const fabricCAKey = orgs[orgMSPID].certificateAuthorities[0];
    const caURL = CAs[fabricCAKey].url;
    const ca = new FabricCAServices(caURL, { trustedRoots: [], verify: false });

    var newUserDetails = {
        enrollmentID: userid,
        enrollmentSecret: userpwd,
        attrs: [
            {
                "name": "usertype", // application role
                "value": usertype,
                "ecert": true
            }]
    };

    return ca.enroll(newUserDetails).then(enrollment => {
        //console.log("\n Successful enrollment; Data returned by enroll", enrollment.certificate);
        var identity = X509WalletMixin.createIdentity(orgMSPID, enrollment.certificate, enrollment.key.toBytes());
        return wallet.import(userid, identity).then(notused => {
            return console.log('msg: Successfully enrolled user, ' + userid + ' and imported into the wallet');
        }, error => {
            console.log("error in wallet.import\n" + error.toString());
            throw error;
        });
    }, error => {
        console.log("Error in enrollment " + error.toString());
        throw error;
    });
}
// set usercontext for submitting any transacations through blockchain
utils.setUserContext = async (userid, pwd) => {
    console.log('\n>>>setUserContext...');

    const userExists = await wallet.exists(userid);
    if (!userExists) {
        console.log("An identity for the user: " + userid + " does not exist in the wallet");
        console.log('Enroll user before retrying');
        throw ("Identity does not exist for userid: " + userid);
    }

    try {
        // Connect to gateway using application specified parameters
        console.log('Connect to Fabric gateway with userid:' + userid);
        let userGateway = new Gateway();
        await userGateway.connect(ccp, { identity: userid, wallet: wallet, discovery: { enabled: true, asLocalhost: bLocalHost } });

        network = await userGateway.getNetwork(configdata["channel_name"]);
        contract = await network.getContract(configdata["smart_contract_name"]);

        return contract;
    }
    catch (error) { throw (error); }
}  //  end of setUserContext(userid)

utils.isUserEnrolled = async (userid) => {
    return wallet.exists(userid).then(result => {
        return result;
    }, error => {
        console.log("error in wallet.exists\n" + error.toString());
        throw error;
    });
}

//get specific registered user
utils.getUser = async (userid, adminIdentity) => {
    console.log(">>>getUser...");
    const gateway = new Gateway();
    // Connect to gateway as admin
    await gateway.connect(ccp, { wallet, identity: adminIdentity, discovery: { enabled: false, asLocalhost: bLocalHost } });
    let client = gateway.getClient();
    let fabric_ca_client = client.getCertificateAuthority();
    let idService = fabric_ca_client.newIdentityService();
    let user = await idService.getOne(userid, gateway.getCurrentIdentity());
    let result = {"id": userid};

    console.log(">>>get User..."+JSON.stringify(user));
    // for admin, usertype is "admin";
    if (userid == "admin") {
        result.usertype = userid;
    } else { // look through user attributes for "usertype"
        let j = 0;
        while (user.result.attrs[j].name !== "usertype") j++;
            result.usertype = user.result.attrs[j].value;
    }
    console.log (result);
    return Promise.resolve(result);
}  //  end of function getUser

//get all users
utils.getAllUsers = async (adminIdentity) => {
    const gateway = new Gateway();

    // Connect to gateway as admin
    await gateway.connect(ccp, { wallet, identity: adminIdentity, discovery: { enabled: false, asLocalhost: bLocalHost } });
    let client = gateway.getClient();
    let fabric_ca_client = client.getCertificateAuthority();
    let idService = fabric_ca_client.newIdentityService();
    let user = gateway.getCurrentIdentity();
    let userList = await idService.getAll(user);
    let identities = userList.result.identities;
    let result = [];
    let tmp;
    let attributes;

    // for all identities
    for (var i = 0; i < identities.length; i++) {
        tmp = {};
        tmp.id = identities[i].id;
        tmp.usertype = "";

        if (tmp.id == "admin")
            tmp.usertype = tmp.id;
        else {
            attributes = identities[i].attrs;
            // look through all attributes for one called "usertype"
            for (var j = 0; j < attributes.length; j++)
                if (attributes[j].name == "usertype") {
                    tmp.usertype = attributes[j].value;
                    break;
                }
        }
        result.push(tmp);
    }
    return result;
}  //  end of function getAllUsers


module.exports = utils;
