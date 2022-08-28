/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class HeathGOV extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');

        const users = [
            {
                identity: "antonin",
                password: "990331",
                org: "bmdc",
                key: "BMDC0",
                status: "1"
            },
            {
                identity: "fahim",
                password: "990331",
                org: "bmdc",
                key: "BMDC1",
                status: "1"
            },
            {
                identity: "mehman",
                password: "44177",
                org: "bmdc",
                key: "BMDC2",
                status: "1"
            },
            {
                identity: "magu",
                password: "44177",
                org: "doctor",
                key: "DOCTOR0",
                status: "1"
            },
            {
                identity: "jacky",
                password: "44177",
                org: "nagorik",
                key: "NAGORIK0",
                status: "1"
            }
        ]

        const bmdcs = [
            {
                fullName: "Md.Antonin Islam",
                dob: "11-04-1998",
                gender: "male",
                contact: "01687759686",
                location: "Rangpur, Bangladesh",
                createdAt: "22/11/20",
                updatedAt: " ",
                status: "1"
            },
            {
                fullName: "Md.Ariful Islam",
                dob: "11-04-1997",
                gender: "male",
                contact: "01712844177",
                location: "Chittagong, Bangladesh",
                createdAt: "22/11/20",
                updatedAt: " ",
                status: "1"
            },
            {
                fullName: "Mr. Guest",
                dob: "16-12-1971",
                gender: "male",
                contact: "XXXXXXXXXXX",
                location: "Chittagong, Bangladesh",
                createdAt: "22/11/20",
                updatedAt: " ",
                status: "1"
            }

        ];

        const doctors = [
            {
                registrationId: "200324000001",
                nid: "592324000024",
                fullName: "Magu Ghosh",
                email: "magu@gmail.com",
                phone: "01687759123",
                zone: "Dhaka",
                speciality: "Child & Women",
                basicDegree: "MBBS",
                advanceDegree: "Mphil",
                imgPath: "/uploads/dp-placeholder.png",
                createdAt: "22/11/20",
                updatedAt: " ",
                status: "1"
            }
        ];

        const nagoriks = [
            {
                nid: "592324000023",
                fullName: "Amzad Hossain Jacky",
                dob: "11-04-1996",
                gender: "male",
                contact: "01684069494",
                fatherNID: "592324000021",
                motherNID: "592324000022",
                currentAddress: "Topkhana Road,Dhaka",
                permanentAddress: "Topkhana Road,Dhaka",
                createdAt: "22/11/20",
                updatedAt: " ",
                status: "1"
            }
        ];

        const prescriptions = [
            {
                doctorKey: "DOCTOR0",
                nagorikKey: "NAGORIK0",
                hospitalName: "Dhaka Medical College",
                mainbody: "Flamyd 250 ? 250 mg [Tablet] ....1-0-0....2 days...Before Eating...",
                medList: "['MEDICINE0','MEDICINE1']",
                disease: "fever",
                cc: "Not Given",
                oe: "Not Given",
                lx: "Not Given",
                revisit: "0",
                createdAt: "20/12/20",
                updatedAt: " ",
                status: "1"
            }
        ];

        const medicines = [
            {
                brandName: "Napa",
                dosageForm: "tablet",
                generic: "Paracetamol",
                strength: "500 mg",
                company: "Beximco Pharmaceuticals Ltd.",
                price: "0.6",
                imgPath: "http://health-bmdc.research.glitch-innovations.com/uploads/93721379_822837111876947_137322873390891008_n.png",
                createdAt: "19/12/20",
                updatedAt: " ",
                status: "1"
            },
            {
                brandName: "Gestrenol",
                dosageForm: "tablet",
                generic: "Allystrenol",
                strength: "5mg",
                company: "Renata Limited",
                price: "8.0",
                imgPath: "http://health-bmdc.research.glitch-innovations.com/uploads/1587266478955295881.jpg",
                createdAt: "19/12/20",
                updatedAt: " ",
                status: "1"
            }
        ];

        for (let i = 0; i < users.length; i++) {
            await ctx.stub.putState('USER' + i, Buffer.from(JSON.stringify(users[i])));
            console.info('Added <--> ', users[i]);
        }

        for (let i = 0; i < bmdcs.length; i++) {
            await ctx.stub.putState('BMDC' + i, Buffer.from(JSON.stringify(bmdcs[i])));
            console.info('Added <--> ', bmdcs[i]);
        }

        for (let i = 0; i < doctors.length; i++) {
            await ctx.stub.putState('DOCTOR' + i, Buffer.from(JSON.stringify(doctors[i])));
            console.info('Added <--> ', doctors[i]);
        }

        for (let i = 0; i < nagoriks.length; i++) {
            await ctx.stub.putState('NAGORIK' + i, Buffer.from(JSON.stringify(nagoriks[i])));
            console.info('Added <--> ', nagoriks[i]);
        }

        for (let i = 0; i < prescriptions.length; i++) {
            await ctx.stub.putState('PRESC' + i, Buffer.from(JSON.stringify(prescriptions[i])));
            console.info('Added <--> ', prescriptions[i]);
        }

        for (let i = 0; i < medicines.length; i++) {
            await ctx.stub.putState('MEDICINE' + i, Buffer.from(JSON.stringify(medicines[i])));
            console.info('Added <--> ', medicines[i]);
        }

        console.info('============= END : Initialize Ledger ===========');
    }

    async queryState(ctx, key) {
        const stateAsBytes = await ctx.stub.getState(key); // get the user from chaincode state
        if (!stateAsBytes || stateAsBytes.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        console.log(stateAsBytes.toString());
        return stateAsBytes.toString();
    }

    async queryStateToken(ctx, key) {
        const stateAsBytes = await ctx.stub.getState(key); // get the user from chaincode state
        if (!stateAsBytes || stateAsBytes.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        return JSON.parse(stateAsBytes.toString()).token.toString();
    }

    async setStateToken(ctx, key, token) {
        console.info('============= END : setStateToken ===========');
        const stateAsBytes = await ctx.stub.getState(key); // get the user from chaincode state
        if (!stateAsBytes || stateAsBytes.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const state = JSON.parse(stateAsBytes.toString());
        state.token = token;

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(state)));
        console.info('============= END : setStateToken ===========');
    }

    async validateToken(ctx, token) {
        let users = await this.queryTable(ctx, 'USER');
        users = JSON.parse(users);
        let flag = false;

        users.some((element) => {
            if (element.Record.token && element.Record.token == token) {
                flag = element.Key;
                return true;
            } else {
                return false;
            }
        });

        if (flag === false) {
            return "false";
        } else {
            return flag.toString();
        }
    }

    async queryAllPrescExtended(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        const tableName = "PRESC";

        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let match = key.includes(tableName);

            if (match) {
                let record;
                try {
                    record = JSON.parse(strValue);
                } catch (err) {
                    console.log(err);
                    record = strValue;
                }

                let docInfo = await this.queryState(ctx, record.doctorKey);
                let nagInfo = await this.queryState(ctx, record.nagorikKey);

                docInfo = JSON.parse(docInfo);
                nagInfo = JSON.parse(nagInfo);

                record.docFullName = docInfo.fullName;
                record.docRegistrationId = docInfo.registrationId;
                record.nagFullName = nagInfo.fullName;
                record.nagNID = nagInfo.nid;

                allResults.push({ Key: key, Record: record });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async createState(ctx, stateNumber, stateInfo) {
        console.info('============= START : Create State ===========');

        await ctx.stub.putState(stateNumber, Buffer.from(stateInfo));
        console.info('============= END : Create State ===========');
    }

    async createStateAuto(ctx, prefix, stateInfo) {
        console.info('============= START : Create State ===========');

        const startKey = '';
        const endKey = '';
        let allResults = [];

        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
            let match = key.includes(prefix);

            if (match) {
                let result = key.replace(prefix, '');
                allResults.push(parseInt(result));
            }
        }

        let stateNumber = Math.max(...allResults) + 1;
        stateNumber = prefix + stateNumber;

        await ctx.stub.putState(stateNumber, Buffer.from(stateInfo));
        console.info('============= END : Create State ===========');

        return stateNumber;
    }

    async queryWorldState(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];

        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async queryTable(ctx, tableName) {
        const startKey = '';
        const endKey = '';
        const allResults = [];

        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let match = key.includes(tableName);

            if (match) {
                let record;
                try {
                    record = JSON.parse(strValue);
                } catch (err) {
                    console.log(err);
                    record = strValue;
                }
                allResults.push({ Key: key, Record: record });
            }
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async queryTableLastKey(ctx, tableName) {
        const startKey = '';
        const endKey = '';
        const allResults = [];

        for await (const { key, value } of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let match = key.includes(tableName);

            if (match) {
                let result = key.replace(tableName, '');
                allResults.push(parseInt(result));
            }
        }
        console.info(allResults);
        return JSON.stringify(Math.max(allResults));
    }

    async updateDoctor(ctx, doctorNumber, doctorJson) {
        console.info('============= START : updateDoctor ===========');

        const doctorAsBytes = await ctx.stub.getState(doctorNumber); // get the user from chaincode state
        if (!doctorAsBytes || doctorAsBytes.length === 0) {
            throw new Error(`${doctorNumber} does not exist`);
        }

        const doctor = JSON.parse(doctorAsBytes.toString());
        const doctorInfo = JSON.parse(doctorJson);
        doctor.nid = doctorInfo.nid;
        doctor.fullName = doctorInfo.fullName;
        doctor.email = doctorInfo.email;
        doctor.phone = doctorInfo.phone;
        doctor.speciality = doctorInfo.speciality;
        doctor.basicDegree = doctorInfo.basicDegree;
        doctor.advanceDegree = doctorInfo.advanceDegree;
        doctor.zone = doctorInfo.zone;
        doctor.updatedAt = doctorInfo.updatedAt;
        doctor.status = doctorInfo.status;
        await ctx.stub.putState(doctorNumber, Buffer.from(JSON.stringify(doctor)));
        console.info('============= END : updateDoctor ===========');
    }

}

module.exports = HeathGOV;
