const User = require('../models/user');
const mongoose = require('mongoose');

const url ='mongodb://localhost:27017/Testing';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
})

afterAll(async () => {
    await mongoose.connection.close();
})

describe('User Upload Testing', () => {
    // user add testing
    var id = '';
    it('Add User', () => {
        const user = {
            'fullname':'Sushant maharjan',
            'name':'sushant',
            'email':'sushant12@gmail.com',
            'phone':'9841526374',
            'password':'sushant',
            'image': 'any.jpg',
            'gender':'Male'
        };
        return User.create(user)
        .then((user_res) => {
            id=user_res._id;

            expect(user_res.name).toEqual('sushant');
        })
    })

    // Updating User

    it('updateuser test', () => {
        const userupdate = {
            name : 'sushant'
        }
        console.log(id)
        return User.findByIdAndUpdate(id, userupdate, {
            new: true
        }).then((userupdate) => {
            expect(userupdate.name).toEqual('sushant')
        })
    })
    //User Deleting
    it('testing user delete', async () =>{
        const status = await
        User.deleteMany({
            name: 'sushant'
        })
        expect(status.ok).toBe(1);
    })
})