import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import validator from 'validator';
import config from '../../config';
import { StudentModel, TGurdian, TLocalGurdian, TStudent, TUserName } from './student.interface';

const userSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
    maxlength: [20, "max length allowed be maximum 20"],
    validate: {
      validator: function (value: any) {
        const capitalize = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return capitalize === value;
      },
      message: '{VALUE} is not capitalized format'
    }
  },
  middleName: {
    type: String,
    required: [true, "middle name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last name is requred"],
    trim: true,
    validate: {
      validator: (value) => validator.isAlpha(value),
      message: '{VALUE} is not valid  format '



    }
  },
});

const gurdianSchema = new Schema<TGurdian>({
  fatharName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOcupation: String,
});

const localGurdianSchema = new Schema<TLocalGurdian>({
  name: { type: String, required: true },
  ocupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: [true, "Password is required"], maxlength: [20, "password can not be more then 20 character"] },
  name: {
    type: userSchema,
    required: [true, "name is required "]
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
    enum: {
      values: ['male', 'female'],
      // message: "gender field can only following value 'male', 'female' "
      message: '{VALUE} is not supported'
    }
  },
  dateOfBirth: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: '{VALUE} is not valid email type '
    }
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  gurdian: {
    type: gurdianSchema,
    required: true
  },
  localGurdian: { type: localGurdianSchema, required: true },
  profileImage: String,
  isActive: {
    type: String,
    enum: ['active', 'inActive']
  },
  isDelete: {
    type: Boolean,
    default: false,
  }
}, {
  toJSON: {
    virtuals: true
  }
});


// virual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`;
})

//  pre save  middleware/ pre save hooks: will work and create() save()

studentSchema.pre('save', async function (next) {
  // hashing password and save into DB
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRound))

  next();
})

// post save middleware

studentSchema.post('save', function (doc, next) {

  doc.password = "";

  next()
})

//  query middleware

studentSchema.pre("find", function (next) {

  this.find({ isDelete: { $ne: true } })


  next()

})
// aggregate qurey

// [ { '$match': { isDelete:{$ne:true} } } ]   [ { '$match': { id: 'S12357' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ '$match': { isDelete: { $ne: true } } })
  next()
})

//  creating a custom static methods
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser;
}


// instance method
// studentSchema.methods.isUserExists = async function (id: String) {

//   const existingUser = await Student.findOne({ id });
//   return existingUser;

// }


//  model

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
