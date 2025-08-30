const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {
    timestamps: true
});

const CompanyModel = mongoose.model("company", companySchema);


module.exports = CompanyModel;