import React from "react";

const RazorpayButton = React.forwardRef(({ amount, currency,leaderName,leaderEmail,leaderPhone, onSuccess, onFailure },ref) => {
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
      key: "rzp_live_bxbqBbCUobbAyt", // Replace with your Razorpay Key ID
      amount: amount * 100, // Amount in paisa
      currency: currency,
      name: "RS Registration Fees",
      description: "Registration Payment",
      image: "RS_logo.png", // Replace with your logo URL
      handler: (response) => {
        console.log("Handler triggered!");
        console.log("Payment Response:", response);
        if (response.razorpay_payment_id) {
          onSuccess(response);
        } else {
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
