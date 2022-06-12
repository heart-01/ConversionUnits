import AccountModel from '../models/account.schema.js'

const AccountService = {
    register(payload) {
        return new AccountModel(payload).save()
    },
    login: (username, password) => {
        return AccountModel.findOne({ username, password })
    },
    getAccountByUsername: (username) => {
        return AccountModel.findOne({ username }) 
    }
}

export default AccountService