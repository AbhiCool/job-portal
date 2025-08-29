import React from "react";
import { useContext } from "react";
import { AppDataContext } from "../../context/AppContext";
import { useState, useEffect } from "react";

import { serverUrl, url } from "../../utils/constants";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [studentsError, setStudentsError] = useState("");
  const { axios, user } = useContext(AppDataContext);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoadingStudents(true);
        const res = await axios.get(url.getAllStudents);
        const { success, message, students } = res.data;

        if (success) {
          setStudentsData(students);
        }
        setIsLoadingStudents(false);
      } catch (error) {
        console.log(error);
        setStudentsError(error);
        setIsLoadingStudents(false);
        toast.error(error.response.data.message);
      }
    };

    console.log("user", user);
    if (user.role === "admin") loadStudents();
  }, [user]);

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-medium text-gray-800">Students List</h2>
      <div className="overflow-auto mt-12">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Education</th>
              <th className="px-4 py-2">Experience</th>
              <th className="px-4 py-2">Skills</th>
              <th className="px-4 py-2">bio</th>

              <th className="px-4 py-2">Resume</th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student) => (
              <tr key={student._id} className="border-t">
                <td className="px-4 py-2">
                  {student.image && (
                    <img
                      className="w-12 h-12 rounded-full object-cover object-center border"
                      src={serverUrl + student.image}
                      alt="profile"
                    />
                  )}
                </td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.phone}</td>
                <td className="px-4 py-2">{student.location}</td>
                <td className="px-4 py-2">{student.education}</td>

                <td className="px-4 py-2">{student.experience}</td>
                <td className="px-4 py-2">{student.skills}</td>
                <td className="px-4 py-2">{student.bio}</td>

                <td className="px-4 py-2">
                  {student.resume && (
                    <a
                      className="text-blue-500 hover:underline"
                      href={serverUrl + student.resume}
                      target="_blank"
                    >
                      Resume
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
