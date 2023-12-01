//interface (typescript)

import { compare, hash } from "bcrypt"
import { Model, ObjectId, Schema, model } from "mongoose"

interface UserStreamer {
    name: string
    email: string
    password: string
    verified: boolean
    profilePicture?: { url: string; publiId: string }

    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        cep: string;
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
    cpf: string;
    phoneNumber: string;
    liveToken: string;
    myProducts: ObjectId[];
}

interface Methods {
    comparePassword(password: string): Promise<boolean>

}

const userStreamerSchema = new Schema<UserStreamer,{}, Methods>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
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
        street: { type: String, required: true},
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        cep: { type: String, required: true }
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
        ref: "UserStreamer"
    }],

    followings: [{
        type: Schema.Types.ObjectId,
        ref: "UserStreamer"
    }],
    tokens: [String],
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    liveToken: {
        type: String,
        required: false
    },
    myProducts: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]


}, { timestamps: true })


userStreamerSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await hash(this.password, 10)

    }
    next()
})

userStreamerSchema.methods.comparePassword = async function (password){
    const result = await compare(password, this.password)
    return result

}

export default model("UserStreamer", userStreamerSchema) as Model<UserStreamer,{}, Methods>