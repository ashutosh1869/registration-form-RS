import React, { useEffect, useState } from 'react';
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
        name: z.string().optional(),
        phone: z
          .string()
          .regex(/^\d{10}$/, "phone must contain exactly 10 digits")
          .optional(),
        Email: z.string().email("Email is required").optional(),
        Branch: z.string().optional(),
      })
    )
    .transform(members => {
      // Ensure the first 3 members have all required fields
      const firstThreeMembers = members.slice(0, 3).filter(member => 
        member.name && member.phone && member.Email && member.Branch
      );
      // The 4th member is optional and can have incomplete fields
      const fourthMember = members[3] || null;
      return [...firstThreeMembers, fourthMember].filter(Boolean); // Remove null/undefined
    })
    .refine(members => members.length >= 3 && members.length <= 4, { 
      message: "At least 3 members and maximum 4 members are required" 
    }),
  
  // Added terms and conditions validation
  termsConditions: z.boolean().refine(val => val === true, { 
    message: "You must agree to the Terms and Conditions" 
  }),
});


// Terms and Conditions Popup Component
const TermsPopup = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-4">{content}</p>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};


function Form() {
  const [formData, setFormData] = useState(null);
  const [memberCount, setMemberCount] = useState(3);
  const [id,setId]=useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const razorpayButtonRef = React.useRef(null);
  const [error, setError] = useState('');

  // State for terms and conditions popups
  const [openPopup, setOpenPopup] = useState(null);

  const handlePaymentSuccess = (response) => {
    console.log("Payment successful:", response);
  };

  const handlePaymentFailure = (error) => {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again.");
  };
  useEffect(() => {
    if (formData) {
      console.log("Triggering RazorpayButton with updated formData");
      razorpayButtonRef.current.click();
    }
  }, [formData]);


  const create = async (data) => {
    // Filter out incomplete member entries
    const validMembers = data.members.filter(member => 
      member.name && member.phone && member.Email && member.Branch
    );

    // Validate member count
    if (validMembers.length < 3 || validMembers.length > 4) {
      setError("At least 3 members and maximum 4 members are required");
      return;
    }

    const newData = {
      leaderName: data.leaderName,
      leaderPhone: data.leaderPhone,
      leaderEmail: data.leaderEmail,
      leaderBranch: data.leaderBranch,
      memberName: validMembers.map(member => member.name),
      memberNumber: validMembers.map(member => member.phone),
      memberBranch: validMembers.map(member => member.Branch),
      memberEmail: validMembers.map(member => member.Email),
      payment_id:null,
    };

    console.log('New data:', newData);
    setFormData(newData);
    razorpayButtonRef.current.click();

    try {
      const id = await appwriteService.createdoc(newData);
      console.log('Form data submitted successfully:', id);
      setId(id);
      const doc = await appwriteService.getdoc(id);
      console.log('Document retrieved successfully:', doc);
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred. Please submit again.');
    }
  };

  // Terms and conditions details
  const termsDetails = [
    {
      title: "Privacy Policy",
      content: `PRIVACY STATEMENT
SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?
When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address. When you browse our store, we also automatically receive your computer's internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system. Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.

SECTION 2 - CONSENT
How do you get my consent?
When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only. If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.

How do I withdraw my consent?
If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at secretary.roboticssociety@gmail.com or mailing us at: Robotics society, IIC building, VSSUT, Burla, Odisha , Pin-768018

SECTION 3 - DISCLOSURE
We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.

SECTION 4 - PAYMENT
We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.

Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.

For more insight, you may also want to read terms and conditions of razorpay on https://razorpay.com

SECTION 5 - THIRD-PARTY SERVICES
In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.

However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.

For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.

In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.

Once you leave our store's website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.

Links
When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.

SECTION 6 - SECURITY
To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.

SECTION 7 - COOKIES
We use cookies to maintain session of your user. It is not used to personally identify you on other websites.

SECTION 8 - AGE OF CONSENT
By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.

SECTION 9 - CHANGES TO THIS PRIVACY POLICY
We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.

If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.

QUESTIONS AND CONTACT INFORMATION
If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at secretary.roboticssociety@gmail.com or by mail at Robotics society, IIC building, VSSUT, Burla, Odisha , Pin-768018
[Re: Privacy Compliance Officer]
[622 Manglam Electronic Market Jaipur Rajasthan India 302001]`


    },
    {
      title: "Refund Policy",
      content: `Refund Policy

Returns
Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.

To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.

Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.

Additional non-returnable items:
* Gift cards
* Downloadable software products
* Some health and personal care items

To complete your return, we require a receipt or proof of purchase.

Please do not send your purchase back to the manufacturer.

There are certain situations where only partial refunds are granted: (if applicable)
Book with obvious signs of use
CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened.
Any item not in its original condition, is damaged or missing parts for reasons not due to our error.
Any item that is returned more than 30 days after delivery

Refunds (if applicable)
Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.

If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.

Late or missing refunds (if applicable)
If you haven't received a refund yet, first check your bank account again.
Then contact your credit card company, it may take some time before your refund is officially posted.
Next contact your bank. There is often some processing time before a refund is posted.

If you've done all of this and you still have not received your refund yet, please contact us at secretary.roboticssociety@gmail.com .

Sale items (if applicable)
Only regular priced items may be refunded, unfortunately sale items cannot be refunded.

Exchanges (if applicable)
We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at secretary.roboticssociety@gmail.com and send your item to: 622 Manglam Electronic Market Jaipur Rajasthan India 302001.

Gifts
If the item was marked as a gift when purchased and shipped directly to you, you'll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.

If the item wasn't marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.

Shipping
To return your product, you should mail your product to: 622 Manglam Electronic Market Jaipur Rajasthan India 302001.

You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.

Depending on where you live, the time it may take for your exchanged product to reach you, may vary.

If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance. We don't guarantee that we will receive your returned item.`
    },

    {
      title: "Terms and Conditions",
      content: `Here's a comprehensive extraction of the Terms of Service document:

**Overview**:
- Operated by Robotics Society
- Terms apply to all website users
- Users must agree to all terms to access the site
- Website reserves right to update terms at any time

**Key Sections**:

1. **Online Store Terms**:
- Users must be of legal age or have parental consent
- Prohibited from using products for illegal purposes
- No transmission of viruses or destructive code
- Violation results in immediate service termination

2. **General Conditions**:
- Right to refuse service to anyone
- Content may be transferred unencrypted
- Prohibits reproducing or reselling service without permission

3. **Information Accuracy**:
- Not responsible for inaccurate or incomplete site information
- Historical information not guaranteed to be current
- Users responsible for monitoring site changes

4. **Service and Price Modifications**:
- Prices subject to change without notice
- Can modify or discontinue service at any time
- No liability for service changes

5. **Products and Services**:
- Some products exclusively online
- Limited quantities possible
- Color/image accuracy not guaranteed
- Can limit sales to specific regions/quantities
- No warranty that products meet expectations

6. **Billing and Account Information**:
- Can refuse or limit orders
- Users must provide accurate purchase information
- Right to cancel orders

7. **Third-Party Tools**:
- Provides access to third-party tools "as is"
- No liability for tool usage
- Users use tools at own risk

8. **Third-Party Links**:
- Not responsible for third-party content
- Users should review third-party policies before transactions

9. **User Comments and Submissions**:
- Can use, edit, publish user submissions without compensation
- May monitor and remove inappropriate content
- Users responsible for comment accuracy

10. **Personal Information**:
- Governed by Privacy Policy

11. **Errors and Inaccuracies**:
- Can correct errors without prior notice
- No obligation to update information

12. **Prohibited Uses**:
- Extensive list of prohibited activities including:
  * Unlawful purposes
  * Harassment
  * Intellectual property infringement
  * Personal information tracking
  * Spamming
  * Security interference

13. **Warranty Disclaimer and Liability Limitation**:
- No guarantee of uninterrupted or error-free service
- Service provided "as is"
- Limits liability for damages

14. **Indemnification**:
- Users must protect Robotics Society from third-party claims

15. **Severability**:
- Unenforceable provisions can be modified

16. **Termination**:
- Can be terminated by user or company
- Prior obligations survive termination

17. **Entire Agreement**:
- These terms supersede prior agreements

18. **Governing Law**:
- Governed by laws of India
- Jurisdiction in Jaipur, Rajasthan

19. **Changes to Terms**:
- Users responsible for checking updates
- Continued use implies acceptance of changes

20. **Contact Information**:
- Questions: secretary.roboticssociety@gmail.com

This extraction covers all key points from the original document, presenting a comprehensive overview of the Robotics Society's Terms of Service.`
    }
  ];

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
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 shadow-lg shadow-red-500/50 rounded-full mb-20 sm:mb-24">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full"
          />
        </Link>
      </div>
      <div className="flex mt-10 items-center justify-center w-full">
        <div className="w-full max-w-3/4 bg-black-100 rounded-xl mt-15 p-6 md:p-10 border z-10 border-black/10">
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

              {/* Members - dynamically render based on memberCount */}
              {[1, 2, 3, 4].slice(0, memberCount).map((index) => (
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

              {/* Add/Remove Member Buttons */}
              <div className="flex justify-center space-x-4">
                {memberCount > 3 && (
                  <Button 
                    type="button" 
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={() => setMemberCount(3)}
                  >
                    Remove Member
                  </Button>
                )}
                {memberCount < 4 && (
                  <Button 
                    type="button" 
                    className="bg-green-500 text-white py-2 px-4 rounded"
                    onClick={() => setMemberCount(4)}
                  >
                    Add Member
                  </Button>
                )}
              </div>

              {/* Terms and Conditions Section */}
              <div className="space-y-3 mx-auto flex flex-col items-center justify-center">
                {termsDetails.map((term, index) => (
                  <div key={index} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setOpenPopup(index)}
                      className="text-red-500 hover:underline mr-2"
                    >
                      View {term.title}
                    </button>
                    <TermsPopup
                      isOpen={openPopup === index}
                      onClose={() => setOpenPopup(null)}
                      title={term.title}
                      content={term.content}
                    />
                  </div>
                ))}

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="termsConditions"
                    {...register('termsConditions')}
                    className="mr-2"
                  />
                  <label htmlFor="termsConditions" className="text-white">
                    I agree to all Terms and Conditions
                  </label>
                </div>
                {errors.termsConditions && (
                  <p className="text-red-600 text-sm">
                    {errors.termsConditions.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
             <div className='flex justify-center'>
             <Button className="w-full max-w-md bg-red-600 text-white py-2 rounded" type="submit">
                SUBMIT
              </Button>
             </div>
            </div>
          </form>
        </div>
        {formData && (
          <div style={{ display: 'none' }}>
            <RazorpayButton
              ref={razorpayButtonRef}

              amount={1}
              formData = {formData}
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

      {/* Terms and Conditions Popups */}
      {termsDetails.map((term, index) => (
        <TermsPopup
          key={index}
          isOpen={openPopup === index}
          onClose={() => setOpenPopup(null)}
          title={term.title}
          content={term.content}
        />
      ))}
    </div>
  );
}

export default Form;