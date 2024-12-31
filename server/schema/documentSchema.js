import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    data:{
        type:Object,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "user", // Model name of the referenced schema
        required: true,
      },
})

const Document = mongoose.model('document', documentSchema)

export default Document