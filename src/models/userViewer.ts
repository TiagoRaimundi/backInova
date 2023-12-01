//interface (typescript)

import { compare, hash } from "bcrypt"
import { Model, ObjectId, Schema, model } from "mongoose"

interface UserViewerDocument {
    name: string
    email: string
    password: string
    verified: boolean
    profilePicture?: {url: string; publiId: string}


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

interface Methods {
    comparePassword(password: string): Promise<boolean>
}
const userViewerSchema = new Schema<UserViewerDocument, {}, Methods>({
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
        expirationDate: Date,
   
    }],
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],

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

userViewerSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await hash(this.password, 10)

    }
    next()
})

userViewerSchema.methods.comparePassword = async function (password){
    const result = await compare(password, this.password)
    return result

}

export default model("UserViewer", userViewerSchema) as Model<UserViewerDocument, {}, Methods>