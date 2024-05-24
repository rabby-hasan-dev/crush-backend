import Joi from 'joi';

const userNameSchema = Joi.object({
    firstName: Joi.string().max(20).required(),
    middleName: Joi.string().max(20),
    lastName: Joi.string().max(20)
})


const gurdianSchema = Joi.object({
    fatharName: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    fatherOcupation: Joi.string(),
});

const localGurdianSchema = Joi.object({
    name: Joi.string().required(),
    ocupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
});

const studentSchema = Joi.object({
    id: Joi.string().required(), // Assuming unique ID format
    name: userNameSchema.required(),
    gender: Joi.string()
        .required()
        .valid('male', 'female'), // Using valid() for enum validation
    dateOfBirth: Joi.string(),
    email: Joi.string()
        .required()
        .email(), // Using email() for email validation
    contactNo: Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup: Joi.string()
        .required()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'), // Using valid() for enum validation
    presentAddress: Joi.string().required(),
    permanentAddress: Joi.string().required(),
    gurdian: gurdianSchema.required(),
    localGurdian: localGurdianSchema.required(),
    profileImage: Joi.string(),
    isActive: Joi.string().valid('active', 'inactive'), // Using valid() for enum validation
});

export default studentSchema;