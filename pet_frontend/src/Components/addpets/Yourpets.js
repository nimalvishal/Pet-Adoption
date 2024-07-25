import React, { useState } from 'react';
import './Yourpets.css';
import { Link } from 'react-router-dom';

export const Yourpets = () => {
  const [petName, setPetName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [petAge, setPetAge] = useState('');
  const [breed,setBreed ] = useState('');
  const [gender,setGender ] = useState('');
  const [category,setcategory ] = useState('');
  const [vaccinated,setVaccinated] =useState('');
  const [medicalCondition,setMedCon] = useState('');
  const [medicalIssues,setMedIss] = useState('');
  const [petAddress,setpetAdd] = useState('');
  const handleNameChange = (e) => {
    setPetName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Read the selected file as a data URL
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the photo state with the data URL
        setPhoto(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAgeChange = (e) => {
    setPetAge(e.target.value);
  };

  const handleBreedChange = (e) => {
    setBreed(e.target.value);
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handlecategory = (e) => {
    setcategory(e.target.value);
  };
  const handleVaccinated = (e) => {
    setVaccinated(e.target.value);
  };
  const handleMedCon = (e) => {
    setMedCon(e.target.value);
 };
 const handleMedIss =(e) =>{
    setMedIss(e.target.value);
 };
 const handleAddress =(e) =>{
    setpetAdd(e.target.value);
 };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add logic to submit the form data, including the pet name and photo
    console.log('Pet Name:', petName);
    console.log('Photo:', photo);
    console.log('Pet Age:', petAge);
    console.log('Breed:',breed);
    console.log('Gender:',gender);
    console.log('Vaccinated :',vaccinated);
    console.log('Medical Condition: ',medicalCondition);
    console.log('Medical Issues: ',medicalIssues);
  };

  return (
    <div className='petcontainer'>
      <h1>Add Pets</h1>
      <div className='underline'></div>
      <form onSubmit={handleSubmit}>
        <label className='petphoto'>
          Add Photo :

      </label>
        <label className='petname'>
          Pet Name :
          <input type="text" value={petName} onChange={handleNameChange} className='pname'/>
        </label>
        <label className='petage'>
          Pet Age :
          <input type='number' value={petAge} onChange={handleAgeChange} className='nnum'/>
        </label>
        <label className='breed'>
          Breed :
          <input type='text' value={breed} onChange={handleBreedChange} className='bname' />
        </label>
        <label className='petgen'>
          Category :
          <label>
            <input type='radio' value='dog' checked={category==='dog'} onChange={handlecategory} />
            Dog
          </label>
          <label>
            <input type='radio' value='cat' checked={gender==='cat'} onChange={handlecategory} />
            Cat
          </label>
        </label>
        <label className='petgen'>
          Gender :
          <label>
            <input type='radio' value='male' checked={gender==='male'} onChange={handleGenderChange} />
            Male
          </label>
          <label>
            <input type='radio' value='female' checked={gender==='female'} onChange={handleGenderChange} />
            Female
          </label>
        </label>
        <label className='vaccine'> Precautions :
        <label>
            <input type='checkbox' value='Yes' checked={vaccinated==='Yes'} onChange={handleVaccinated}/>
            Vaccinated </label>
            <label>
            <input type='checkbox' value='No' checked={vaccinated==='No'} onChange={handleVaccinated}/>
            Not Vaccinated </label>
        </label>
        <label className='condition'>Medical Condition :
            <textarea value={medicalCondition} onChange={handleMedCon}/>
        </label>
        <label className='issue'>Medical Issues :
            <textarea value={medicalIssues} onChange={handleMedIss}/>
        </label>
        <label className='petadd'>Address :
            <textarea value={petAddress} onChange={handleAddress}/>
        </label>
        <div className='buttonAdd'>
        <Link to='/Homepage'><button className='petback'type='back'>Back</button></Link>
        <button className='petsub'type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
