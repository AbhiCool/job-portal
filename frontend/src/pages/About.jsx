import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* left section */}
        <div>
          <img src={assets.hero_img} alt="" />
        </div>
        {/* right section */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            About Our Job Portal
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            JobPilot is your trusted partner in career growth. We connect job
            seekers with top employers through smart matching, real-time alerts,
            and expert career resources. Whether you're starting out or aiming
            higher, JobPilot helps you take the next step with confidence.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our platform is designed to simplify your job search with powerful
            tools like resume builders, personalized job recommendations, and
            interview tips. With JobPilot, you're not just applying — you're
            progressing toward your career goals, faster and smarter.
          </p>
        </div>
      </div>

      <div className="mt-12 bg-gray-100 rounded-xl p-6 shadow-inner">
        <h3 className="textt-2xl text-gray-700 mb-3 font-semibold">
          Why Choose us?
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Thousands of verified job listings.
          <br />
          Easy application process
          <br />
          Personalised job recommendations
          <br />
          Secure and trustworthy platform
          <br />
        </p>
      </div>
    </div>
  );
};

export default About;
