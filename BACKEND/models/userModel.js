import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{

        type: String,
        required:true
    },

    email:{

        type:String,
        required: true,
        unique:true
    },

    password:{

        type:String,
        requred:true
    },

    cartData:{

        type: Object,
        default: {}

    },

    deliveryAddress:{

        type: Object,
        default: {}
    }

}, {minimize:false})

const userModel = mongoose.model("user", userSchema)

export default userModel