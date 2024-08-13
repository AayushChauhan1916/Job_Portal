import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
        required:true
      },
    ],
    experienceLevel:{
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    createdby: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    application: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Application',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
