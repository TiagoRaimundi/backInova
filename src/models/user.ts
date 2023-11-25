//interface (typescript)

import { Model, ObjectId, Schema, model } from "mongoose"

interface UserViewer {
    name: string
    email: string
    password: string
    verified: boolean
    profilePicture?: {url: string; publiId: string}

    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zip: string;
    }
    paymentMethods: {
        cardType: string;
        lastFourDigits: number;
        expirationDate: Date;
    }[];

    cart: ObjectId[];
    tokens: string[]
    favorites: ObjectId[]
    followers: ObjectId[]
    followings: ObjectId[]
    bio?: string;
}


const userSchema = new Schema<UserViewer>({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    paymentMethods: [{
        cardType: String,
        lastFourDigits: Number,
        expirationDate: Date
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
        required: true
    },
    profilePicture: {
        type: Object,
        url: String,
        publicId: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    bio: String,
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Audio"
    }],

    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    followings: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    tokens: [String]


}, {timestamps: true})

export default model("User", userSchema) as Model<UserViewer>