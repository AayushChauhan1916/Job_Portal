import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Company from "./company.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "name must required"],
    },
    email: {
      type: String,
      required: [true, "email must required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "contactnumber must required"],
      unique: true,
      minlength:[10,"Valid Phone Number Required"],
      maxlength:[10,"Valid Phone Number Required"]
    },
    password: {
      type: String,
      required: [true, "password must required"],
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: [true, "role must required"],
    },
    verified:{
      type:Boolean,
      default:false,
    },
    profile: {
      bio: {
        type: String,
      },
      skills: [{ type: String }],
      resume: {
        url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        }
      },
      resumeOriginalName: { type: String },
      company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
      },
      profilePhoto: {
        url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User",userSchema);

export default User;