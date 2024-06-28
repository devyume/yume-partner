import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserAttributes } from 'aws-amplify/auth';
import './Profile.css';

// function Profile() {
//   const [profileData, setProfileData] = useState({ firstName: '', lastName: '', /* other fields */ });
//   const navigate = useNavigate();

//   async function handleSubmit(event: React.FormEvent) {
//     event.preventDefault();

//     try {
//       // Update user attributes
//       const user = await getCurrentUser();
//       await updateUserAttributes(user, {
//         'custom:firstName': profileData.firstName,
//         'custom:lastName': profileData.lastName,
//         'custom:isNewUser': 'false', // Update the isNewUser attribute
//         // other attributes
//       });

//       alert('Profile updated successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Error updating profile. Please try again.');
//     }
//   }

//   function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     setProfileData(prevState => ({ ...prevState, [name]: value }));
//   }

//   return (
//     <div className='profile-container'>
//       <form onSubmit={handleSubmit} className='profile-form'>
//         <h2>Complete Your Profile</h2>
//         <label htmlFor='firstName'>First Name:</label>
//         <input type='text' id='firstName' name='firstName' value={profileData.firstName} onChange={handleChange} required />
//         <label htmlFor='lastName'>Last Name:</label>
//         <input type='text' id='lastName' name='lastName' value={profileData.lastName} onChange={handleChange} required />
//         {/* Other fields */}
//         <input type='submit' value='Save Profile' />
//       </form>
//     </div>
//   );
// }

function Profile(){
    <div>profile</div>
}

export default Profile;
