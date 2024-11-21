// Your existing imports and hooks
"use client"; // Mark as a client-side component

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLoadScript } from "@react-google-maps/api"; // Import the hook here
import "@/styles/Form.css";

function Form() {
  const [step, setStep] = useState(1);
  const [distance, setDistance] = useState("");
  const date = new Date();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    ship_form: "",
    ship_to: "",
    transport_method: "",
    year: "",
    make: "",
    model: "",
    sourceUrl: window.location.href,
    vehicle_type: "", // Updated to store vehicle type
    distance: distance,
    added_on: date.toLocaleString(),
    status: "Done",
    note: "",
    note_time: "",
    price: "",
    pickup_id: "",
    pickup_date: toString(""),
  });

  const [errors, setErrors] = useState({});
  const shipFromRef = useRef(null);
  const shipToRef = useRef(null);

  // Loading script from Google Maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDJKp5HjtKF7eL-zbWvIFLtBa51tua1fzw", // Replace with your actual API Key
    libraries: ["places"],
  });

  useEffect(() => {
    if (!isLoaded) return; // Wait until the Google Maps API is loaded

    const shipFromAutocomplete = new window.google.maps.places.Autocomplete(
      shipFromRef.current,
      { types: ["geocode"] }
    );
    shipFromAutocomplete.addListener("place_changed", () => {
      const place = shipFromAutocomplete.getPlace();
      setFormData((prevData) => ({
        ...prevData,
        ship_form: place.formatted_address,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, ship_form: "" }));
    });

    const shipToAutocomplete = new window.google.maps.places.Autocomplete(
      shipToRef.current,
      { types: ["geocode"] }
    );
    shipToAutocomplete.addListener("place_changed", () => {
      const place = shipToAutocomplete.getPlace();
      setFormData((prevData) => ({
        ...prevData,
        ship_to: place.formatted_address,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, ship_to: "" }));
    });
  }, [isLoaded]);

  useEffect(() => {
    if (formData.ship_form && formData.ship_to) {
      calculateDistance();
    }
  }, [formData.ship_form, formData.ship_to]);

  const calculateDistance = () => {
    if (formData.ship_form && formData.ship_to) {
      const distanceMatrixService =
        new window.google.maps.DistanceMatrixService();

      distanceMatrixService.getDistanceMatrix(
        {
          origins: [formData.ship_form],
          destinations: [formData.ship_to],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === window.google.maps.DistanceMatrixStatus.OK) {
            const distanceInMeters =
              response.rows[0].elements[0].distance.value;
            const distanceInMiles = (distanceInMeters / 1609.34).toFixed(2);
            setDistance(`${distanceInMiles} miles`);
            setFormData((prevData) => ({
              ...prevData,
              distance: `${distanceInMiles} miles`,
            }));
          } else if (
            status === window.google.maps.DistanceMatrixStatus.ZERO_RESULTS
          ) {
            alert("No route found between the origin and destination.");
            setDistance("");
            setFormData((prevData) => ({ ...prevData, distance: "" }));
          } else {
            console.error(`Error fetching distance: ${status}`, response);
            alert(`Could not fetch distance: ${status}`);
            setDistance("");
            setFormData((prevData) => ({ ...prevData, distance: "" }));
          }
        }
      );
    } else {
      alert("Please enter both origin and destination.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = formatPhoneNumber(numericValue);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const formatPhoneNumber = (number) => {
    if (number.length <= 3) {
      return `(${number}`;
    } else if (number.length <= 6) {
      return `(${number.slice(0, 3)}) ${number.slice(3)}`;
    } else {
      return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(
        6,
        10
      )}`;
    }
  };

  const validateStep = () => {
    const newErrors = {};
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

    if (step === 1) {
      if (!formData.ship_form) newErrors.ship_form = "Ship From is required";
      if (!formData.ship_to) newErrors.ship_to = "Ship To is required";
      if (!formData.transport_method)
        newErrors.transport_method = "Transport method is required";
    }
    if (step === 2) {
      if (!formData.year) newErrors.year = "Year is required";
      else if (!/^\d{4}$/.test(formData.year))
        newErrors.year = "Year must be a 4-digit number";
      if (!formData.make) newErrors.make = "Make is required";
      if (!formData.model) newErrors.model = "Model is required";
      if (!formData.vehicle_type)
        newErrors.vehicle_type = "Vehicle type is required";
    }
    if (step === 3) {
      if (!formData.username) newErrors.username = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      else if (!phoneRegex.test(formData.phone))
        newErrors.phone = "Invalid phone format (use: (123) 456-7890)";
      if (!formData.pickup_date)
        newErrors.pickup_date = "Pickup date is required";
    }
    return newErrors;
  };

  const nextStep = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check if the distance is not calculated
    if (!formData.distance || formData.distance === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        distance: "Distance calculation is required",
      }));
      return; // Prevent submission if distance is not calculated
    }

    // Ensure the form data has the latest distance value
    const finalFormData = { ...formData, distance };

    const sourceUrl = document.referrer || window.location.href;
    const dataToSubmit = { ...finalFormData, sourceUrl };

    console.log("Form data before submit:", dataToSubmit); // Log form data before submission

    try {
      const response = await axios.post(
        "http://localhost:5000/api/form",
        dataToSubmit
      );
      console.log("Form submitted successfully:", response);

      const emailResponse = await axios.post(
        "http://localhost:5000/api/send-email",
        {
          to: formData.email, // Recipient's email
          subject: "Thank you for submitting your form",
          message: `
           <table border="0" cellpadding="0" cellspacing="0" width="70%" style="background-color: #fff;">
   <tr>
      <td style="padding: 30px 0 30px 0; background-color: #fff">
         <table class="wrap-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
               <td align="center" style="padding: 0 15px 10px 15px">
                  <img src="https://rapidautoshipping.com/assets/images/coloured-logo.jpg"
                     alt="Rapid Auto Shipping" width="auto" height="50" style="display: block" />
               </td>
            </tr>
            <tr>
               <td align="center" style="padding: 15px 15px 10px 15px">
                  <img src="https://rapidautoshipping.com/assets/images/review-stars.png" alt="5 star"
                     width="auto" height="17" style="display: block" />
               </td>
            </tr>
            <tr>
               <td align="center" style="padding: 0 15px">
                  <span style="font-size: 14px; display: block; line-height: normal">5-star rated company
                  with
                  <br />over 28,000 vehicles
                  shipped!</span>
               </td>
            </tr>
            <tr>
               <td style="padding: 30px 30px 15px 30px" class="quote-cell">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="text-align: left">
                     <tr>
                        <td style="padding: 0px 0 15px 0">Hi, <b>' ${formData.username}'</b><br>Thank you for your interest in shipping your vehicle
                           with
                           <b style="color: #ff5527">Rapid Auto Shipping</b>.
                        </td>
                     </tr>
                     <tr>
                        <td colspan="2" style="
                           background: #f2f2f2;
                           font-size: 22px;
                           text-align: center;
                           padding: 30px 15px;
                           ">
                           <span style="font-weight: bold; color: #000000 !important">A Dedicated Agent
                           has been appointed with the Expertise of Several Years in this Specific
                           Route. <br> Please Click below Call or Chat Now for the Exact
                           Quote.</span> <br><br>
                           <div
                              style="display:flex; flex-wrap:wrap; justify-content:center; column-gap:20px; row-gap:20px;">
                              <div style="
                                 width: fit-content;
                                 text-align: center;
                                 ">
                                 <a href="tel:+1-833-233-4447" style="
                                    background: #fff;
                                    width: fit-content;
                                    border: 2px solid #ff5227;
                                    font-size: 18px;
                                    border-radius: 4px;
                                    padding: 10px 16px;
                                    display: inline-block;
                                    color: #ff5227 !important;
                                    cursor: pointer;
                                    text-decoration: none;
                                    box-sizing: border-box;
                                    white-space: nowrap;
                                    ">
                                 <span style="color: #ff5227 !important"><b>Call</b> +1 (833)
                                 233-4447</span>
                                 </a>
                              </div>
                              <div style="
                                 width: fit-content;
                                 text-align: center;
                                 ">
                                 <a href="https://tawk.to/chat/61cd6c5dc82c976b71c415f2/1fo56ukbg"
                                    target="_blank" style="
                                    background: #fff;
                                    width: fit-content;
                                    border: 2px solid #ff5227;
                                    font-size: 18px;
                                    border-radius: 4px;
                                    padding: 10px 16px;
                                    display: inline-block;
                                    color: #ff5227 !important;
                                    cursor: pointer;
                                    text-decoration: none;
                                    box-sizing: border-box;
                                    ">
                                 <span style="color: #ff5227 !important"><b>Chat</b> with
                                 us</span>
                                 </a>
                              </div>
                           </div>
                        </td>
                     </tr>
                     <tr>
                        <td style=""> <br>
                           Please, find your personalized quote below which includes:
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td colspan="2" style="padding: 0 30px 0 30px" class="quote-cell">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="text-align: left">
                     <tr>
                        <td style="padding-right: 15px; padding-bottom: 5px">
                           <span style="display: inline-block; width: 15px; height: 14px">
                           <img src="https://rapidautoshipping.com/assets/images/icons/icons8-done-00.png"
                              width="20" height="20" style="
                              height: 15px;
                              width: 15px;
                              display: inline-block;
                              " />
                           </span>
                           <span style="color: #ff5227; font-weight: bold">$0 upfront payment</span>
                        </td>
                        <td style="padding-bottom: 5px">
                           <span style="display: inline-block; width: 15px; height: 14px">
                           <img src="https://rapidautoshipping.com/assets/images/icons/icons8-done-00.png"
                              width="20" height="20" style="
                              height: 15px;
                              width: 15px;
                              display: inline-block;
                              " />
                           </span>
                           <span style="color: #ff5227; font-weight: bold">Full-insurance
                           coverage</span>
                        </td>
                     </tr>
                     <tr>
                        <td style="padding-right: 15px; padding-bottom: 30px">
                           <span style="display: inline-block; width: 15px; height: 14px">
                           <img src="https://rapidautoshipping.com/assets/images/icons/icons8-done-00.png"
                              width="20" height="20" style="
                              height: 15px;
                              width: 15px;
                              display: inline-block;
                              " />
                           </span>
                           <span style="color: #ff5227; font-weight: bold">Free cancellation</span>
                        </td>
                        <td style="padding-bottom: 30px">
                           <span style="display: inline-block; width: 15px; height: 14px">
                           <img src="https://rapidautoshipping.com/assets/images/icons/icons8-done-00.png"
                              width="20" height="20" style="
                              height: 15px;
                              width: 15px;
                              display: inline-block;
                              " />
                           </span>
                           <span style="color: #ff5227; font-weight: bold">Door-to-door
                           transport</span>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color: #ffffff; padding: 0 30px 0 30px" class="quote-cell">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0"
                     style="border-radius: 6px; background: #fff" bgcolor="#fff">
                     <tr>
                        <td colspan="2" style="
                           font-size: 24px;
                           text-align: center;
                           text-transform: uppercase;
                           padding: 15px 0 15px 0;
                           background-color: #ff5227;
                           color: #fff;
                           ">
                           Quote ID: <b> 
                           '${formData.quote_id}'
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Name :
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                           ' ${formData.username}'
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="50%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 50%;
                           padding: 15px 0 15px 15px;
                           ">
                           First Available Pick-up Date:
                        </td>
                        <td width="50%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 50%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                            ${formData.pickup_date}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Distance:
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                            ${formData.distance}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Time to deliver:
                        </td>
                        <td width="60%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b> 3-5 calendar days </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Vehicle:
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                           ' ${formData.year}' ' ${formData.make}' ' ${formData.model}'
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Vehicle Size / Vehicle Type :
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                            ${formData.vehicle_type}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           From:
                        </td>
                        <td width="60%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                            ${formData.ship_form}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           To:
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                           ${formData.ship_to}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Transport Method:
                        </td>
                        <td width="60%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b>
                           ${formData.transport_method}
                           </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Service Type:
                        </td>
                        <td width="60%" align="right" style="
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b> Door-to-door </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           background: #f2f2f2;
                           text-align: left;
                           text-transform: uppercase;
                           width: 40%;
                           padding: 15px 0 15px 15px;
                           ">
                           Insurance:
                        </td>
                        <td width="60%" align="right" style="
                           background: #f2f2f2;
                           text-align: right;
                           font-size: 18px;
                           width: 60%;
                           padding: 15px 15px 15px 0;
                           ">
                           <b> Already Included </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="40%" align="left" style="
                           text-align: left;
                           text-transform: uppercase;
                           color: #ff5227;
                           font-weight: bold;
                           width: 40%;
                           padding: 15px 0 0 15px;
                           ">
                           Pay now:
                        </td>
                        <td width="60%" rowspan="2" align="right" style="
                           text-align: right;
                           color: #ff5227;
                           font-size: 18px;
                           width: 60%;
                           padding: 0 15px 0 0;
                           font-size: 28px;
                           ">
                           <b> $0 </b>
                        </td>
                     </tr>
                     <tr>
                        <td width="100%" colspan="2" align="left" style="
                           color: #ff5227;
                           font-size: 14px;
                           font-style: italic;
                           text-align: left;
                           width: 100%;
                           padding: 5px 60px 15px 15px;
                           ">
                           We don’t require any upfront payments! We will collect the
                           payment (partial or in full) once the carrier has been
                           dispatched for your order. You will be notified via phone
                           and email.
                        </td>
                     </tr>
                     <tr>
                        <td colspan="2" style="
                           background-image: url(https://rapidautoshipping.com/assets/images//car-key-new1.jpeg);
                           background-position:center;
                           background-repeat:no-repeat;
                           background-size:cover;
                           font-size: 22px;
                           text-align: center;
                           padding: 30px 15px;
                           ">
                           <span
                              style="font-size:28px; color: #ffffff !important">Ready
                           to book? Don’t
                           wait!
                           <span class="mobile-block">Reserve your shipment now…</span></span> <br><br>
                           <div
                              style="display:flex; flex-wrap:wrap; justify-content:center; column-gap:20px; row-gap:20px;">
                              <div style="
                                 width: fit-content;
                                 text-align: center;
                                 ">
                                 <a href="tel:+1-833-233-4447" style="
                                    background: #ff5227;
                                    width: fit-content;
                                    border: 2px solid #ff5227;
                                    font-size: 18px;
                                    border-radius: 4px;
                                    padding: 10px 16px;
                                    display: inline-block;
                                    color: white !important;
                                    cursor: pointer;
                                    text-decoration: none;
                                    box-sizing: border-box;
                                    white-space: nowrap;
                                    ">
                                 <span style=""><b>Call</b> +1 (833)
                                 233-4447</span>
                                 </a>
                              </div>
                              <div style="
                                 width: fit-content;
                                 text-align: center;
                                 ">
                                 <a href="https://tawk.to/chat/61cd6c5dc82c976b71c415f2/1fo56ukbg"
                                    target="_blank" style="
                                    background: #ff5227;
                                    width: fit-content;
                                    border: 2px solid #ff5227;
                                    font-size: 18px;
                                    border-radius: 4px;
                                    padding: 10px 16px;
                                    display: inline-block;
                                    color: white !important;
                                    cursor: pointer;
                                    text-decoration: none;
                                    box-sizing: border-box;
                                    ">
                                 <span style=""><b>Chat</b> with
                                 us</span>
                                 </a>
                              </div>
                           </div>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="padding: 15px 30px 15px 30px; text-align: center" class="quote-cell">
                  Our company is licensed as required by the Federal Motor Carrier
                  Safety Administration (FMCSA) under MC 873392 and US Department
                  of Transportation (USDOT) 2521690.
               </td>
            </tr>
            <tr>
               <td style="background-color: #ffffff; padding: 0 30px 0 30px" class="quote-cell">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0">
                     <tr>
                        <td style="padding: 15px 7px 15px 8px; width: 50%">
                           <div style="
                              border: 1px solid #5d5c5c;
                              border-radius: 6px;
                              background: #fff;
                              width: 100%;
                              ">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                 <tr>
                                    <td style="
                                       text-align: left;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       padding-top: 5px;
                                       ">
                                       Google
                                    </td>
                                    <td rowspan="2" class="rating-cell" style="
                                       text-align: right;
                                       font-size: 30px;
                                       padding-bottom: 5px;
                                       font-weight: bold;
                                       padding-top: 5px;
                                       padding-right: 10px;
                                       ">
                                       4.9
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="
                                       text-align: left;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       ">
                                       <img class="reviews-stars"
                                          src="https://rapidautoshipping.com/assets/images/review-stars.png"
                                          alt="5 star" width="auto" height="20"
                                          style="display: block" />
                                    </td>
                                 </tr>
                                 <tr>
                                    <td class="reviews-count-cell" style="
                                       text-align: left;
                                       font-size: 14px;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       padding-bottom: 5px;
                                       ">
                                       (1,458 reviews)
                                    </td>
                                    <td style="
                                       text-align: right;
                                       padding-right: 10px;
                                       padding-bottom: 5px;
                                       ">
                                       <img src="https://rapidautoshipping.com/assets/images/google-mini-logo.png"
                                          class="desktop-logo" height="24" width="auto"
                                          alt="Google Logo" />
                                    </td>
                                 </tr>
                              </table>
                           </div>
                        </td>
                        <td style="padding: 15px 0 15px 0; width: 50%">
                           <div style="
                              border: 1px solid #5d5c5c;
                              border-radius: 6px;
                              background: #fff;
                              width: 100%;
                              ">
                              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                 <tr>
                                    <td style="
                                       text-align: left;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       padding-top: 5px;
                                       ">
                                       Transport Reviews
                                    </td>
                                    <td rowspan="2" class="rating-cell" style="
                                       text-align: right;
                                       font-size: 30px;
                                       padding-bottom: 5px;
                                       font-weight: bold;
                                       padding-top: 5px;
                                       padding-right: 10px;
                                       ">
                                       4.8
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="
                                       text-align: left;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       ">
                                       <img class="reviews-stars"
                                          src="https://rapidautoshipping.com/assets/images/review-stars.png"
                                          alt="5 star" width="auto" height="20"
                                          style="display: block" />
                                    </td>
                                 </tr>
                                 <tr>
                                    <td class="reviews-count-cell" style="
                                       text-align: left;
                                       font-size: 14px;
                                       padding-right: 10px;
                                       padding-left: 10px;
                                       padding-bottom: 5px;
                                       ">
                                       (185 reviews)
                                    </td>
                                    <td style="
                                       text-align: right;
                                       padding-right: 10px;
                                       padding-bottom: 5px;
                                       ">
                                       <img src="https://rapidautoshipping.com/assets/images/TransportReviewsLogo.png"
                                          class="desktop-logo" height="24" width="auto"
                                          alt="transport Review" />
                                    </td>
                                 </tr>
                              </table>
                           </div>
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color: #f2f2f2; padding: 30px 15px 30px 15px">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%"
                     style="text-align: center">
                     <tr>
                        <td style="font-size: 24px; padding: 0px 0 30px 0">
                           If you have any questions,<br />do not hesitate to contact
                           us:
                        </td>
                     </tr>
                     <tr>
                        <td style="padding: 0px 0 15px 0">
                           <b>Phone:</b>
                           <a target="_blank" href="tel:+1-833-233-4447"
                              style="color: #000000 !important; text-decoration: none">+1 (833)
                           233-4447</a>
                        </td>
                     </tr>
                     <tr>
                        <td style="padding: 0px 0 15px 0">
                           <b>Email:</b>
                           <a target="_blank" href="mailto:info@rapidautoshipping.com"
                              style="color: #000000 !important; text-decoration: none">info@rapidautoshipping.com</a>
                        </td>
                     </tr>
                     <tr>
                        <td style="padding: 0px 0 15px 0">
                           <a target="_blank" href="https://www.rapidautoshipping.com"
                              style="color: #000000 !important; text-decoration: none">www.rapidautoshipping.com</a>
                        </td>
                     </tr>
                     <tr>
                        <td>906 S Main Street Silverton Texas USA-79257</td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr>
               <td style="background-color: #ffffff; padding: 30px 15px 30px 15px">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%"
                     style="color: #333333; font-size: 14px; text-align: center">
                     <tr>
                        <td style="padding: 0px 0 5px 0; font-size: 12px">
                           This email was sent to you from Rapid Auto Shipping.
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
         </table>
      </td>
   </tr>
</table>
        `,
        }
      );
      console.log("Email sent successfully:", emailResponse);

      // Increment quote_id after successful submission

      window.location.href = "/Thanku"; // Redirect on success
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
{step === 1 && (
  <div className="sm:max-w-lg mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
      Get a Free <br />
      <span style={{ color: "orange" }}>Instant Quote</span>
    </h2>
    {/* Shipping Information */}
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="ship_form">
          Ship From:
        </label>
        <input
          ref={shipFromRef}
          type="text"
          name="ship_form"
          id="ship_form"
          value={formData.ship_form}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        />
        {errors.ship_form && (
          <span className="text-red-500">{errors.ship_form}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="ship_to">
          Ship To:
        </label>
        <input
          ref={shipToRef}
          type="text"
          name="ship_to"
          id="ship_to"
          value={formData.ship_to}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        />
        {errors.ship_to && (
          <span className="text-red-500">{errors.ship_to}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="transport_method">
          Transport Method:
        </label>
        <select
          name="transport_method"
          id="transport_method"
          value={formData.transport_method}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Select Method</option>
          <option value="Open Transport">Open Transport</option>
          <option value="Enclosed Transport">Enclosed Transport</option>
        </select>
        {errors.transport_method && (
          <span className="text-red-500">{errors.transport_method}</span>
        )}
      </div>

      <button
        onClick={nextStep}
        className="w-full p-3 bg-blue-500 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  </div>
)}

{step === 2 && (
  <div className="max-w-full sm:max-w-lg mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
      Get a Free <br />
      <span style={{ color: "orange" }}>Instant Quote</span>
    </h2>
    {/* Vehicle Information */}
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="year">
          Year:
        </label>
        <input
          type="text"
          name="year"
          id="year"
          value={formData.year}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        />
        {errors.year && <span className="text-red-500">{errors.year}</span>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="make">
          Make:
        </label>
        <select
          name="make"
          id="make"
          value={formData.make}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Select Make</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
          <option value="Chevrolet">Chevrolet</option>
          <option value="BMW">BMW</option>
        </select>
        {errors.make && <span className="text-red-500">{errors.make}</span>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="model">
          Model:
        </label>
        <select
          name="model"
          id="model"
          value={formData.model}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Select Model</option>
          <option value="Camry">Camry</option>
          <option value="Civic">Civic</option>
          <option value="F-150">F-150</option>
          <option value="Malibu">Malibu</option>
          <option value="X5">X5</option>
        </select>
        {errors.model && (
          <span className="text-red-500">{errors.model}</span>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="vehicle_type"
        >
          Vehicle Type:
        </label>
        <select
          name="vehicle_type"
          id="vehicle_type"
          value={formData.vehicle_type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        >
          <option value="">Select Type</option>
          <option value="Running">Running</option>
          <option value="Not Running">Not Running</option>
        </select>
        {errors.vehicle_type && (
          <span className="text-red-500">{errors.vehicle_type}</span>
        )}
      </div>

      <button
        onClick={nextStep}
        className="w-full p-3 bg-blue-500 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  </div>
)}

{step === 3 && (
  <div className="max-w-full sm:max-w-lg mx-auto p-4 sm:p-6 bg-black text-white rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">
      Get a Free <br />
      <span style={{ color: "orange" }}>Instant Quote</span>
    </h2>
    {/* Contact Information */}
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="username">
          Name:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2" htmlFor="phone">
          Phone Number:
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone}</span>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="pickup_date"
        >
          Pickup Date:
        </label>
        <input
          type="date"
          name="pickup_date"
          id="pickup_date"
          value={formData.pickup_date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-800 text-white"
        />
        {errors.pickup_date && (
          <span className="text-red-500">{errors.pickup_date}</span>
        )}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full p-3 bg-blue-500 text-white rounded-lg"
      >
        Submit
      </button>
    </div>
  </div>
)}



    </>
  );
}

export default Form;
