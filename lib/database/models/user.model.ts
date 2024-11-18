import {Schema,model,models} from 'mongoose';


export const userSchema = new Schema({
    clerkId:{
        type: String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type: String,
        required:[true,'Email is required'],      
        unique:[true,'Email already exists']
    },
    username:{
        type:String,
        required:[true,'Username is required'],
    },
    firstName: {
        type: String,
      },
    lastName: {
        type: String,
      },
    image:{
        type:String,
    }
},{
    timestamps: true
}
);

const User= models.user || model('user',userSchema);

export default User; 