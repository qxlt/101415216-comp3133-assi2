const mongoose = require('mongoose')

const empSchema = mongoose.Schema({
    first_name : {type: String, required: true},
    last_name : {type: String, required: true},
    email: {type: String, unique: true, },
    gender: {type: String },
    designation: {type: String, required: true},
    salary: {type: Number, required: true, length: 1000},
    date_of_joining: {type: Date, required: true},
    department: {type: String, required: true},
    other: {type: String}, 
    employee_photo: {type: String, default: ""}
    },
    { timestamps: true }
)

const nameFormatter = (name)=>{
    const names = name.split(" ")
    let temp = ""
    for (let n of names){
        temp += n.charAt(0).toUpperCase() + n.slice(1).toLowerCase() + " "
    }
    return temp.trim()
}

empSchema.pre('save', function(next) {
    if (this.first_name) {
        this.first_name = nameFormatter(this.first_name)
    }

    if (this.last_name) {
        this.last_name = nameFormatter(this.last_name)
    }

    if (this.email) {
        this.email = this.email.toLowerCase();
    }

    if (this.gender) {
        this.gender = nameFormatter(this.gender)
    }

    if (this.designation) {
        this.designation = nameFormatter(this.designation)
    }

    if (this.department) {
        this.department = nameFormatter(this.department)
    }

    next();
});


const Emp = mongoose.model('Emp', empSchema);

module.exports = Emp