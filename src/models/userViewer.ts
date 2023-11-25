//interface (typescript)

import { Model, ObjectId, Schema, model } from "mongoose"

interface UserViewerDocument {
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


const userViewerSchema = new Schema<UserViewerDocument>({
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
        street: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        country: { type: String, required: false },
       
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
        ref: "UserViewer"
    }],

    followings: [{
        type: Schema.Types.ObjectId,
        ref: "UserViewer"
    }],
    tokens: [String]


}, {timestamps: true})

export default model("UserViewer", userViewerSchema) as Model<UserViewerDocument>