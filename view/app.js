
app.get('/teachers', async (req, res) => {
    const { ratingFilter, fieldFilter } = req.query; // Filters from query parameters

    try {
        let query = {};

        // Apply field filter
        if (fieldFilter) {
            query.fieldOfWork = fieldFilter;
        }

        let teachers = await Teacher.find(query);

        // Apply rating filter
        if (ratingFilter === 'highToLow') {
            teachers.sort((a, b) => b.rating - a.rating);
        } else if (ratingFilter === 'lowToHigh') {
            teachers.sort((a, b) => a.rating - b.rating);
        } else if (ratingFilter && !isNaN(ratingFilter)) {
            teachers = teachers.filter(teacher => teacher.rating >= parseFloat(ratingFilter));
        }

        res.render('teachers', { teachers });
    } catch (err) {
        res.status(500).send('Error fetching teachers');
    }
});


//students table
const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
    name: String,
    cgpa: { type: Number, min: 0, max: 10 },  // Updated to use scale out of 10
    enrollmentNo: String,
    fieldOfWork: String
});

const Student = mongoose.model('Student', studentSchema);

// Define the Teacher schema with requests
const teacherSchema = new mongoose.Schema({
    name: String,
    education: String,
    experience: Number,
    rating: Number,
    fieldOfWork: String,
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] // Array of student IDs
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = { Student, Teacher };




app.get('/teacher/:teacherId/requests', async (req, res) => {
    const teacherId = req.params.teacherId;
    const { cgpaFilter, fieldFilter } = req.query; // Filters from query parameters

    try {
        const teacher = await Teacher.findById(teacherId).populate('requests');
        if (!teacher) {
            return res.status(404).send('Teacher not found');
        }

        let students = teacher.requests;

        // Apply CGPA filter
        if (cgpaFilter === 'highToLow') {
            students.sort((a, b) => b.cgpa - a.cgpa);
        } else if (cgpaFilter === 'lowToHigh') {
            students.sort((a, b) => a.cgpa - b.cgpa);
        } else if (cgpaFilter && !isNaN(cgpaFilter)) {
            students = students.filter(student => student.cgpa >= parseFloat(cgpaFilter));
        }

        // Apply field filter
        if (fieldFilter) {
            students = students.filter(student => student.fieldOfWork === fieldFilter);
        }

        res.render('requests', { students, teacherId });
    } catch (err) {
        res.status(500).send('Error fetching requests');
    }
});
