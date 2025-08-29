import React, { useState } from "react";
import { useContext } from "react";
import { AppDataContext } from "../../context/AppContext";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { serverUrl, url } from "../../utils/constants";

const Profile = () => {
  const { user, setUser, axios } = useContext(AppDataContext);
  console.log("user", user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    education: "",
    experience: "",
    skills: "",
    about: "",
    password: "",
    profileImage: null,
    resume: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });

      if (name === "profileImage") {
        setPreview(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();

      for (let key in formData) {
        formPayload.append(key, formData[key]);
      }

      const res = await axios.put(url.updateProfile + user._id, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;

      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        education: user.education || "",
        experience: user.experience || "",
        skills: user.skills || "",
        about: user.bio || "",
        password: user.password || "",
        profileImage: user.image,
        resume: user.resume,
      });
    }
  }, [user]);
  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded-lg">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {typeof formData.profileImage === "string" ? (
            <img
              src={serverUrl + formData.profileImage}
              alt="Preview"
              className="w-24 h-24 object-cover object-center rounded-full mb-4"
            />
          ) : (
            preview && (
              <img
                src={preview}
                alt=""
                className="w-24 h-24 object-cover object-center rounded-full mb-4"
              />
            )
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            className="w-full border  rounded p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="w-full border  rounded p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            className="w-full border  rounded p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            className="w-full border  rounded p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Education</label>
          <input
            type="text"
            name="education"
            value={formData.education}
            className="w-full border  rounded p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            className="w-full border  rounded p-2"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            className="w-full border  rounded p-2"
            onChange={handleChange}
            placeholder="Enter your skills"
            rows="2"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-semibold">About Me</label>
          <textarea
            name="about"
            value={formData.about}
            className="w-full border  rounded p-2"
            onChange={handleChange}
            placeholder="Tell us somethong about yourself"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Resume (PDF/DOC)</label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
          />
          {formData.resume && (
            <div className="mt-2">
              <a
                href={`${serverUrl}${formData.resume}`}
                target="_blank"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
        <button className="bg-primary  text-white py-2 px-4 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
