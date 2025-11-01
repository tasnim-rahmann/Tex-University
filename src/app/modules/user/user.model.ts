import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

// pre save middleware/hook
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
});

// post save middleware
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});

userSchema.statics.isUserExistsByCustomID = async function (id: string) {
    return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (passwordChangedTimeStamp, jwtIssuedTimeStamp) {
    const passwordChangeTime = new Date(passwordChangedTimeStamp).getTime() / 1000;
    return passwordChangeTime > jwtIssuedTimeStamp;
};

export const User = model<TUser, UserModel>('User', userSchema);