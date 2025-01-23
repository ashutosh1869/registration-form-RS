import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import appwriteService from '../../appwrite/config';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import RazorpayButton from "..//RazorpayButton";
import { Link } from 'react-router-dom';

const schema = z.object({
  leaderName: z.string().nonempty("Leader name is required"),
  leaderPhone: z.string().regex(/^\d{10}$/, "Leader phone must contain exactly 10 digits"),
  leaderEmail: z.string().email("Leader email is required"),
  leaderBranch: z.string().nonempty("Leader branch is required"),

  members: z
    .array(
      z.object({
        name: z.string().nonempty(),
        phone: z
          .string()
          .regex(/^\d{10}$/, "phone must contain exactly 10 digits")
          .nonempty(),
        Email: z.string().email("Email is required").nonempty(),
        Branch: z.string().nonempty(),
      })
    )
    .nonempty(),
});

function Form() {
  const [formData, setFormData] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const razorpayButtonRef = React.useRef(null);
  const [error, setError] = useState('');
  const handlePaymentSuccess = (response) => {
    console.log("Payment successful:", response);
  };

  const handlePaymentFailure = (error) => {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again.");
  };

  const create = async (data) => {
    console.log('Submit button clicked', data);
    const newData = {
      leaderName: data.leaderName,
      leaderPhone: data.leaderPhone,
      leaderEmail: data.leaderEmail,
      leaderBranch: data.leaderBranch,
      memberName: [
        data.members[0]?.name,
        data.members[1]?.name,
        data.members[2]?.name,
        data.members[3]?.name,
      ],
      memberNumber: [
        data.members[0]?.phone,
        data.members[1]?.phone,
        data.members[2]?.phone,
        data.members[3]?.phone,
      ],
      memberBranch: [
        data.members[0]?.Branch,
        data.members[1]?.Branch,
        data.members[2]?.Branch,
        data.members[3]?.Branch,
      ],
      memberEmail: [
        data.members[0]?.Email,
        data.members[1]?.Email,
        data.members[2]?.Email,
        data.members[3]?.Email,
      ],
    };

    console.log('New data:', newData);
    setFormData(newData);
    razorpayButtonRef.current.click();

    try {
      const id = await appwriteService.createdoc(newData);
      console.log('Form data submitted successfully:', id);
      const doc = await appwriteService.getdoc(id);
      console.log('Document retrieved successfully:', doc);
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred. Please submit again.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 p-5 md:p-10 text-white flex justify-center items-center relative box-border overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-fixed bg-center"
        style={{
          backgroundImage: 'url("/images/robot1.jpg")',
          zIndex: 0,
        }}
      />
      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md z-2 min-h-screen" />

      {/* Dotted Pattern */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20 z-10">
        <div className="grid grid-cols-12 gap-2">
          {[...Array(48)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-red-500 rounded-full shadow-red-500/70 shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-10 shadow-lg shadow-red-500/50 rounded-full">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-full max-w-lg bg-black-100 rounded-xl p-6 md:p-10 border z-10 border-black/10">
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              {/* Leader Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-9 mx-auto max-w-screen-lg bg-red-400/10 shadow-xl backdrop:blur-3xl p-6 md:p-8 rounded-xl">
                <div className='flex flex-col'>
                  {errors.leaderName && <p className="text-red-600">{errors.leaderName.message}</p>}
                  <Input
                    label="Leader Name"
                    placeholder="Enter leader name"
                    type="text"
                    {...register('leaderName')}
                  />
                </div>

                <div className='flex flex-col'>
                  {errors.leaderPhone && <p className="text-red-600">{errors.leaderPhone.message}</p>}
                  <Input
                    label="Leader Phone"
                    placeholder="Enter leader phone"
                    type="text"
                    {...register('leaderPhone')}
                  />
                </div>

                <div className='flex flex-col'>
                  {errors.leaderEmail && <p className="text-red-600">{errors.leaderEmail.message}</p>}
                  <Input
                    label="Leader Email"
                    placeholder="Enter leader email"
                    type="text"
                    {...register('leaderEmail', { required: true })}
                  />
                </div>

                <div className='flex flex-col'>
                  {errors.leaderBranch && <p className="text-red-600">{errors.leaderBranch.message}</p>}
                  <Input
                    label="Leader Branch"
                    placeholder="Enter leader Branch"
                    type="text"
                    {...register('leaderBranch', { required: true })}
                  />
                </div>
              </div>

              {/* Members */}
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-9 mx-auto bg-red-400/10 shadow-xl backdrop:blur-3x p-6 md:p-8 rounded-xl max-w-screen-lg'>
                  <Input
                    name={`member${index}`}
                    label={`Member ${index} Name`}
                    placeholder={`Enter name for member ${index}`}
                    type="text"
                    {...register(`members.${index - 1}.name`)}
                  />
                  <Input
                    name={`phone${index}`}
                    label={`Member ${index} Phone`}
                    placeholder={`Enter phone for member ${index}`}
                    type="text"
                    {...register(`members.${index - 1}.phone`)}
                    required={true}
                  />
                  <Input
                    label={`Member ${index} Email`}
                    placeholder={`Enter Email for member ${index}`}
                    type="text"
                    {...register(`members.${index - 1}.Email`)}
                    required={true}
                  />
                  <Input
                    name={`Branch${index}`}
                    label={`Member ${index} Branch`}
                    placeholder={`Enter Branch for member ${index}`}
                    type="text"
                    {...register(`members.${index - 1}.Branch`)}
                    required={true}
                  />
                  {errors.members?.[index - 1]?.phone && (
                    <p className="text-red-600">{errors.members[index - 1].phone.message}</p>
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <Button className="w-full bg-red-600 text-white py-2 rounded" type="submit">
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
        {formData && (
          <div style={{ display: 'none' }}>
            <RazorpayButton
              ref={razorpayButtonRef}
              amount={149}
              currency="INR"
              leaderName={formData.leaderName}
              leaderPhone={formData.leaderPhone}
              leaderEmail={formData.leaderEmail}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
