/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { HealthSystemContractContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('HealthSystemContractContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new HealthSystemContractContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"health system contract 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"health system contract 1002 value"}'));
    });

    describe('#healthSystemContractExists', () => {

        it('should return true for a health system contract', async () => {
            await contract.healthSystemContractExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a health system contract that does not exist', async () => {
            await contract.healthSystemContractExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createHealthSystemContract', () => {

        it('should create a health system contract', async () => {
            await contract.createHealthSystemContract(ctx, '1003', 'health system contract 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"health system contract 1003 value"}'));
        });

        it('should throw an error for a health system contract that already exists', async () => {
            await contract.createHealthSystemContract(ctx, '1001', 'myvalue').should.be.rejectedWith(/The health system contract 1001 already exists/);
        });

    });

    describe('#readHealthSystemContract', () => {

        it('should return a health system contract', async () => {
            await contract.readHealthSystemContract(ctx, '1001').should.eventually.deep.equal({ value: 'health system contract 1001 value' });
        });

        it('should throw an error for a health system contract that does not exist', async () => {
            await contract.readHealthSystemContract(ctx, '1003').should.be.rejectedWith(/The health system contract 1003 does not exist/);
        });

    });

    describe('#updateHealthSystemContract', () => {

        it('should update a health system contract', async () => {
            await contract.updateHealthSystemContract(ctx, '1001', 'health system contract 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"health system contract 1001 new value"}'));
        });

        it('should throw an error for a health system contract that does not exist', async () => {
            await contract.updateHealthSystemContract(ctx, '1003', 'health system contract 1003 new value').should.be.rejectedWith(/The health system contract 1003 does not exist/);
        });

    });

    describe('#deleteHealthSystemContract', () => {

        it('should delete a health system contract', async () => {
            await contract.deleteHealthSystemContract(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a health system contract that does not exist', async () => {
            await contract.deleteHealthSystemContract(ctx, '1003').should.be.rejectedWith(/The health system contract 1003 does not exist/);
        });

    });

});