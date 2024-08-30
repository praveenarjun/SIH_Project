import { teacher } from '../model/teacher.model.js';
import { student } from '../model/student.model.js';

export const teacherform = async (req, res) => {
    const { photo, name, gender, email, experience, contactNo, field, Qualification, linkedinProfile } = req.body;
    try {
        if (!email || !gender || !name || !experience || !contactNo || !field || !Qualification || !photo || !linkedinProfile) {
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await teacher.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "Teacher already exists" });
        }
        const newTeacher = new teacher({
            name,
            email,
            contactNo,
            field,
            experience,
            Qualification,
            photo,
            gender,
            linkedinProfile
        });
        await newTeacher.save();

        res.status(201).json({ success: true, message: "Teacher details saved successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const sendRequestToTeacher = async (req, res) => {
    const { studentId, teacherId } = req.body;
    try {
        const teacherData = await teacher.findById(teacherId);
        if (!teacherData) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        const studentData = await student.findById(studentId);
        if (!studentData) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (studentData.acceptedBy) {
            return res.status(400).json({ success: false, message: "Student has already been accepted by another teacher" });
        }

        teacherData.requests.push(studentId);
        studentData.requests.push(teacherId); // Update student's data

        await teacherData.save();
        await studentData.save();

        res.status(200).json({ success: true, message: "Request sent successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const acceptRequest = async (req, res) => {
    const { studentId, teacherId } = req.body;
    try {
        const teacherData = await teacher.findById(teacherId);
        if (!teacherData) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }

        const studentData = await student.findById(studentId);
        if (!studentData) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // if (studentData.acceptedBy) {
        //     return res.status(400).json({ success: false, message: "Student has already been accepted by another teacher" });
        // }

        studentData.acceptedBy = teacherId;
        studentData.acceptedBy.push(teacherId);
        await studentData.save();

        // Remove student from other teachers' requests
        await teacher.updateMany(
            { requests: studentId },
            { $pull: { requests: studentId } }
        );

        res.status(200).json({ success: true, message: "Request accepted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};