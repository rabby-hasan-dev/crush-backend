import { Request, Response } from 'express';

import { StudentSevices } from './student.service';
import studentValidationSchema from './student.validationZod';


const createStudent = async (req: Request, res: Response) => {

  try {

    const student = req.body;

    const zodParseData = studentValidationSchema.parse(student)
    console.log(zodParseData)





    //  data validation with joi

    // const { error, value } = studentSchema.validate(student);
    // console.log({ error }, { value });

    // //  error checker 

    // if (error) {
    //   res.status(500).json({
    //     succes: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }

    // const result = await StudentSevices.createStudentIntoDB(value);

    //  will cal service fun to send this data
    const result = await StudentSevices.createStudentIntoDB(zodParseData);

    res.status(200).json({
      succes: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

//  GET ALL STUDENT DATA
const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentSevices.getStudentFromDB();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

//  GET SINGLE STUDENT DATA

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentSevices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      succes: true,
      message: 'Student retrived successfully',
      data: result,
    });;
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

//  DELETE  SPECIFIC STUDENT DATA
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentSevices.deleteStudentFromDB(studentId);
    res.status(200).json({
      succes: true,
      message: 'student is deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
