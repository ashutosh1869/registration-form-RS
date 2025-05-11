import React from "react";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";

const RazorpayButton = React.forwardRef(({ amount, formData, currency, leaderName, leaderEmail, leaderPhone, onSuccess, onFailure }, ref) => {
  const navigate = useNavigate();
  const loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return new Promise((resolve) => {
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpay();


    if (!isLoaded) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      return;
    }

    const options = {
      key: {/*import.meta.env.VITE_RAZORPAY_KEY*/}
            
      , // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paisa
      currency: currency || "INR",
      
  
      name: "roboXplore",
      description: "Registration Payment",
      image: "/images/rs-logo.png",
      handler: async (response) => {
        console.log("Handler triggered!");
        console.log("Payment Response:", response);
        // if (response.razorpay_payment_id) {
        //   onSuccess(response);
        // } 
        //   if (response.razorpay_payment_id ) {
        //     const paymentDetails = {
        //       razorpay_payment_id: response.razorpay_payment_id,
        //       razorpay_order_id: response.razorpay_order_id || "N/A", // Order ID if available
        //     };

        //     console.log("Final Payment Details:", paymentDetails);
        //     onSuccess(paymentDetails); 
        //   }
        //   else {
        //     onFailure("Payment failed. Please try again.");
        //   }
        // },

        if (response.razorpay_payment_id) {
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || "N/A",
            razorpay_signature: response.razorpay_signature || "N/A",
          };
          formData.payment_id = paymentDetails.razorpay_payment_id;
          console.log(formData);
          try {
            const docId = await appwriteService.createdoc(formData);
            console.log(docId);
          } catch (error) {
            console.error("Payment failed or missing details:", error);

          }
          console.log("Final Payment Details:", paymentDetails);
          navigate('/success');
          onSuccess(paymentDetails);
        } else {
          console.error("Payment failed or missing details:", response);
          alert("Payment failed. Please try again.");
          onFailure("Payment failed. Please try again.");
        }
      },
      prefill: {
        name: leaderName,
        email: leaderEmail,
        contact: leaderPhone,
      },
      notes: {
        purpose: "Registration",
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        netbanking: true,
        card: true,
        wallet: true,
        upi: true,
        qr: true, 
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  

  return (
    <button
      ref={ref}
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Pay Now: +{amount} INR
    </button>
  );
});

export default RazorpayButton;
