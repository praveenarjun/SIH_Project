import { student } from '../model/student.model.js';

export const studentform = async (req, res) => {
    const { photo, name, gender, email, semester, intrest, contactNo, branch } = req.body;
    try {
        if (!email || !gender || !name || !semester || !intrest || !contactNo || !branch || !photo) {
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await student.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const newStudent = new student({
            name,
            email,
            contactNo,
            branch,
            semester,
            intrest,
            photo,
            gender
        });
        await newStudent.save();

        res.status(201).json({ success: true,
            message: "Student details saved successfully",
            student: {
                ...newStudent._doc,
                password: undefined
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
