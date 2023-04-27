const {buildSchema} = require('graphql')

const schema = buildSchema(`

    type User{
        username: String
    }

    type Lab{
        subject: String
        number: Int
        status: String
        deadline: String
        attach: String
        time:String
    }

    input UserInput{
        username: String! 
    }

    input LabInput{
        subject: String!
        number: Int!
        status: String!
        deadline: String!
        attach: String!
        time: String!
    }

    input LabId{
        id:Int!
    }
    type Query{
        getLabs: [Lab]
    }

    type Mutation{
        createLab(input:LabInput): Lab
        deleteLab(time:String!):Lab
    }

`)

module.exports = schema