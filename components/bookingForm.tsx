"use client";
import { CgCalendar, CgMail, CgTag, CgUser, CgVoicemail } from "react-icons/cg";
import { Button } from "./ui/button";
import { useForm } from "@formspree/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingForm() {
  const [state, handleSubmit] = useForm("xbjndrvn");

  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    tickets: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSuccess = () => {
    // Display a success toast
    toast.success("Request sent successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Clear form fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      tickets: "",
      message: "",
    });
  };

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault(); // Prevent default form submission behavior
          handleSubmit(e).then(() => {
            if (state.succeeded) {
              handleSuccess();
            }
          });
        }}
        className="md:w-[400px] grid p-7 text-center h-fit gap-3 bg-[#C0B298] rounded-md"
      >
        <h1 className="text-3xl font-bold">Book This Tour</h1>
        <p>
          We will soon reach out to you after you submit this form. You&apos;ll
          also receive the WhatsApp group invitation after filling the form.
        </p>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-1">
          <div className="flex p-4 bg-white text-black items-center gap-2">
            <CgUser className="text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Name"
              className="outline-none flex-1  w-full"
            />
          </div>
          <div className="flex p-4 bg-white text-black items-center gap-2">
            <CgMail className="text-gray-400 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Email"
              className="outline-none flex-1 w-full"
            />
          </div>
          <div className="flex p-4 bg-white text-black items-center gap-2">
            <CgVoicemail className="text-gray-400 w-4 h-4" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Phone"
              className="outline-none flex-1 w-full"
            />
          </div>
          <div className="flex p-4 bg-white text-black items-center gap-2">
            <CgCalendar className="text-gray-400 w-4 h-4" />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="outline-none flex-1 w-full"
            />
          </div>
          <div className="flex p-4 bg-white text-black items-center gap-2">
            <CgTag className="text-gray-400 w-4 h-4" />
            <input
              type="number"
              name="tickets"
              value={formData.tickets}
              onChange={handleInputChange}
              required
              placeholder="No. of tickets"
              className="outline-none flex-1 w-full"
            />
          </div>
          <div className="flex p-4 bg-white text-black items-center gap-2 col-span-2 md:col-span-1">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              maxLength={200}
              placeholder="Type your message here..."
              className="outline-none flex-1"
            />
          </div>
        </div>
        <Button
          className="p-4 bg-[#DF6951] w-fit"
          type="submit"
          disabled={state.submitting}
        >
          Send Request
        </Button>
      </form>
      {/* Toastify Container */}
      <ToastContainer />
    </>
  );
}
