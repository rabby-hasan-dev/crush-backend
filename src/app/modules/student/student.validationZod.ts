import z from 'zod';

const userNameValidationSchema = z.object({
    firstName: z.string()
        .trim()
        .max(20, "max length allowed be maximum 20")
        .refine(value => {
            const capitalize = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            return capitalize === value;
        }, {
            message: '{VALUE} is not capitalized format',
        }),
    middleName: z.string().trim(),
    lastName: z.string()
        .trim()
        .refine(value => /^[a-zA-Z]+$/.test(value), {
            message: '{VALUE} is not valid format',
        }),
});

// Define Guardian schema
const guardianValidationSchema = z.object({
    fatharName: z.string(),
    fatherContactNo: z.string(),
    fatherOcupation: z.string(),
});

// Define LocalGuardian schema
const localGuardianValidationSchema = z.object({
    name: z.string(),
    ocupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
});

// Define Student schema
const studentValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female'], {
        errorMap: () => ({ message: '{VALUE} is not supported' }),
    }),
    dateOfBirth: z.string(),
    email: z.string().email('{VALUE} is not valid email type'),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    gurdian: guardianValidationSchema,
    localGurdian: localGuardianValidationSchema,
    profileImage: z.string().optional(),
    isActive: z.enum(['active', 'inActive']),
    isDelete: z.boolean()
});


export default studentValidationSchema;