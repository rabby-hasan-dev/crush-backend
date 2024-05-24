import { TStudent } from './student.interface';
import { Student } from './student.model';


const createStudentIntoDB = async (studentData: TStudent) => {

  if (await Student.isUserExists(studentData.id)) {
    throw new Error("user alredy exist")

  }

  const result = await Student.create(studentData);  // built-in static method


  // const student = new Student(studentData);       // built-in instance method


  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("user alredy exist")
  // }


  // const result = await student.save()
  return result;

};


const getStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};


const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([
    {
      $match: { id: id }
    }
  ])
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDelete: true });
  return result;
};

export const StudentSevices = {
  createStudentIntoDB,
  getStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
