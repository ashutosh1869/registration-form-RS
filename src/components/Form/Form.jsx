import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import appwriteService from '../../appwrite/config';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import RazorpayButton from "..//RazorpayButton";

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
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const razorpayButtonRef = React.useRef(null);
  const [error, setError] = useState('');
  const handlePaymentSuccess = (response) => {
    console.log("Payment successful:", response);
    // Save data to Appwrite or handle success
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
    // razorpayButtonRef.current.click();
    

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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-black-100 rounded-xl p-10 border border-black/10">
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            {/* Leader Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mx-auto max-w-screen-lg bg-zinc-900 p-8 rounded-xl">
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
              <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-9 mx-auto bg-zinc-900 p-8 rounded-xl max-w-screen-lg'>
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
            ))}{/* Submit Button */}

            <Button className="w-full bg-blue-600 text-white py-2 rounded" type="submit">
              SUBMIT
            </Button>
          </div>
        </form>

      </div>
      <div style={{ display: 'none' }}>
        <RazorpayButton
          ref={razorpayButtonRef}
          amount={249} // Registration fee (e.g., 249 INR)
          currency="INR"
          leaderName
          leaderPhone
          leaderEmail
          onSuccess={handlePaymentSuccess}
          onFailure={handlePaymentFailure}
        />
      </div>
    </div>

  );
}

export default Form;
