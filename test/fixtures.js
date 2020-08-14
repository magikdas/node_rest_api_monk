const students_firstNameMandatory =
{
    "last_name": "Ghosh",
    "mobile": 500,
    "email": "abc@xyz.com",
    "dob": "2008-07-31T00:00:00.000Z",
    "gender": "male",
    "address": {
        "building": "#53 Building A",
        "street": "great street",
        "pin": 700234
    }
}

const students_mobileMandatory =
{
    "first_name": "Arijit",
    "last_name": "Ghosh",
    "email": "abc@xyz.com",
    "dob": "2008-07-31T00:00:00.000Z",
    "gender": "male",
    "address": {
        "building": "#53 Building A",
        "street": "great street",
        "pin": 700234
    }
}

const students_mobileNumber =
{
    "first_name": "Arijit",
    "last_name": "Ghosh",
    "mobile": "500",
    "email": "abc@xyz.com",
    "dob": "2008-07-31T00:00:00.000Z",
    "gender": "male",
    "address": {
        "building": "#53 Building A",
        "street": "great street",
        "pin": 700234
    }
}

const students_mobileNumberLow =
{
    "first_name": "Arijit",
    "last_name": "Ghosh",
    "mobile": 500,
    "email": "abc@xyz.com",
    "dob": "2008-07-31T00:00:00.000Z",
    "gender": "male",
    "address": {
        "building": "#53 Building A",
        "street": "great street",
        "pin": 700234
    }
}

const students_genderOutOfList =
{
    "first_name": "Arijit",
    "last_name": "Ghosh",
    "mobile": 500,
    "email": "abc@xyz.com",
    "dob": "2008-07-31T00:00:00.000Z",
    "gender": "malet",
    "address": {
        "building": "#53 Building A",
        "street": "great street",
        "pin": 700234
    }
}

const students_emailFormat =
{
    "first_name": "Arijit",
    "last_name": "Ghosh",
    "mobile": 5000000000,
    "email": "abcxyz.com",
    "dob": "2008-07-31T00:00:00.000Z",
    "gender": "male",
    "address": {
        "building": "#53 Building A",
        "street": "great street",
        "pin": 700234
    }
}

const students_dateFormat =
{
    "first_name": "Arijit",
    "last_name": "Ghosh",
    "mobile": 5000000000,
    "email": "abc@xyz.com",
    "dob": "2012-07-31T00:00:00.000Z",
    "gender": "male",
    "address": {
        "building": "#53 Building A",
        "street": "great street",
        "pin": 700234
    }
}



const students = [
    {
        "_id": "5f2f74b83741ed09c707f86a",
        "first_name": "Amrita",
        "last_name": "Das",
        "mobile": 500,
        "email": "abc@xyz.com",
        "dob": "2008-07-31T00:00:00.000Z",
        "address": {
            "building": "#53 Building A",
            "street": "great street",
            "pin": 700234
        },
        "gender": "female"
    },
    {
        "_id": "5f2fc2778b2cc217d4fbca46",
        "first_name": "Amit",
        "last_name": "Das",
        "gender": "male",
        "mobile": 94324422232323,
        "email": "abc@xyz.com",
        "dob": "2008-07-31",
        "address": {
            "building": "#53 Building A",
            "street": "great street",
            "pin": "700234"
        }
    },
    {
        "_id": "5f2ff4cfb552b53f70c7ad86",
        "first_name": "Rohit",
        "last_name": "Sharma",
        "gender": "male",
        "mobile": 94324422232323,
        "email": "abc@xyz.com",
        "dob": "2008-07-31",
        "address": {
            "building": "#53 Building A",
            "street": "great street",
            "pin": "700234"
        }
    }
];


module.exports = {
    students,
    students_firstNameMandatory,
    students_mobileMandatory,
    students_mobileNumber,
    students_genderOutOfList,
    students_emailFormat,
    students_dateFormat
}