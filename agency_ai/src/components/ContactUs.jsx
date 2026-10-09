import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import toast from "react-hot-toast";

const ContactUs = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "7aecb1f4-6479-440a-8958-82e7b9cbee3b");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Form Submitted Successfully");
        event.target.reset();
      } else {
        toast.error("Error");
      }
    } catch {
      toast.error(error.message);
    }
  };

  return (
    <div
      id="contact-us"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="Reach out to us"
        desc="From strategy to execution, we craft digital solutions that move your business forward."
      />
      <form
        onSubmit={onSubmit}
        className="grid w-full max-w-5xl gap-5 sm:grid-cols-2"
      >
        <div>
          <p className="mb-2 text-lg font-medium">Your name</p>
          <div className="flex border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
            <img src={assets.person_icon} alt="" className="ml-3" />
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              className="w-full p-3 text-sm outline-none"
              required
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-lg font-medium">Email ID</p>
          <div className="flex border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900">
            <img src={assets.email_icon} alt="" className="ml-3" />
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="w-full p-3 text-sm outline-none"
              required
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium">Message</p>
          <textarea
            rows={8}
            placeholder="Enter your message"
            name="message"
            className="w-full p-3 text-sm px-10 py-3 outline-none rounded-lg border border-gray-300 dark:border-gray-600"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-max flex gap-2 bg-primary text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-103 transition-all"
        >
          Submit <img src={assets.arrow_icon} alt="" className="w-4" />
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
