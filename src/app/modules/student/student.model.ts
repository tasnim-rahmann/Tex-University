import validator from "validator";
import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { TGuardian, TLocalGuardian, TStudent, StudentModel, TUserName } from "./student.interface";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: [true, 'Father name is required'],
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father contact number is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother name is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother occupation is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother contact number is required'],
    },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Local guardian name is required'],
    },
    occupation: {
        type: String,
        required: [true, 'Local guardian occupation is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Local guardian contact number is required'],
    },
    address: {
        type: String,
        required: [true, 'Local guardian address is required'],
    },
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: [true, 'ID must be unique'],
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxLength: [20, 'Password can not be more than 20 caharcters'],
    },
    name: {
        type: userNameSchema,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: '{VALUE} is not a valid email type',
        }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required'],
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
        required: [true, 'Blood group is required'],
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required'],
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required'],
    },
    profileImage: {
        type: String,
        required: [true, 'Profile image is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    toJSON: {
        virtuals: true,
    }
});

// virtual
studentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// pre save middleware/hook
studentSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
});

// post save middleware
studentSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

// query middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id: id });
    return existingUser;
};

// create a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({ id: id });
//     return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);