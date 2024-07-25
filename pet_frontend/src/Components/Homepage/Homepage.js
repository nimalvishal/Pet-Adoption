import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';
import loc from '../Assets/target.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import 'react-multi-carousel/lib/styles.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';


export const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [open, setOpen] = React.useState(false);
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [vaccinated, setVaccinated] = useState('');
  const [medicalCondition, setMedCon] = useState('');
  const [medicalIssues, setMedIss] = useState('');
  const [petAddress, setPetAdd] = useState('');
  const [petphone, setpetPho] = useState('')
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [categorydata, setcategorydata] = useState("");
  const [petData, setPetData] = useState([]);
  const [selectedpets, setSelectedpets] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);


  useEffect(() => {
    const fetchAllPetImages = async () => {
      try {
        const response = await axios.get('http://localhost:8001/getallpetimages');
        const fetchedPetData = response.data.pets;  // Assuming the response has a 'pets' field
        setPetData(fetchedPetData);
      } catch (error) {
        console.error('Error fetching all pet images:', error);
        alert("No pet data from the server");
      }
    };
    fetchAllPetImages();
  }, []);


  const handleReadMore = (pet) => {
    setSelectedpets(pet);
    setShowImageModal(false); // Reset image modal state
  };


  const handleNameChange = (e) => setPetName(e.target.value);
  const handleAgeChange = (e) => setPetAge(e.target.value);
  const handleBreedChange = (e) => setBreed(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleVaccinated = (e) => setVaccinated(e.target.value);
  const handleMedCon = (e) => setMedCon(e.target.value);
  const handleMedIss = (e) => setMedIss(e.target.value);
  const handleAddress = (e) => setPetAdd(e.target.value);
  const handlePhone = (e) => setpetPho(e.target.value)


  const handleCloses = async () => {
    if (selectedpets) {
      try {
        // Assuming 'status' is a property of the 'selectedPet' object
        await axios.put(`http://localhost:8001/updatePetStatus/${selectedpets._id}`, { status: false });
        // Show alert
        alert('Adopted successfully! Please contact the owner using the phone number.');
      } catch (error) {
        console.error('Error updating pet status:', error);
      }
    }
  };


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    try {


      // Prepare the form data
      const imageResponse = await axios.post('http://localhost:8001/upload', formData);
      const imageUrl = imageResponse.data.imageUrl;
      console.log(imageUrl);
      const newPet = {
        image: imageUrl,
        petName,
        petAge,
        breed,
        gender,
        category,
        vaccinated,
        medicalCondition,
        medicalIssues,
        petAddress,
        petphone,
      };

      // Make a POST request to your backend API
      const response = await axios.post('http://localhost:8001/donate-pet', newPet);
      // Handle the response as needed
      alert("Your Pet Donated Successfully");
      const result = response.data;
      console.log('Response from backend:', result);

      setImage(null);
      setPetName('');
      setPetAge('');
      setBreed('');
      setGender('');
      setCategory('');
      setVaccinated('');
      setMedCon('');
      setMedIss('');
      setPetAdd('');
      setpetPho('');
    } catch (error) {
      console.error('Error donating pet:', error);
    }
  };


  const handleChange = (e) => {
    setcategorydata(e.target.value);
  }

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8001/searchPets?location=${searchQuery}&category=${selectedCategory}`);
      const searchedPetData = response.data.pets;

      // Check if no pets are available
      if (searchedPetData.length === 0) {
        alert('No pets available in the specified location.');
      }

      setPetData(searchedPetData);
    } catch (error) {
      console.error('Error searching pets:', error);
      alert('Error searching pets. Please try again.');
    }
  };

  const handleYourPetsClick = () => {
    navigate('/Yourpets');
  };
  const handleLogout = () => {
    localStorage.removeItem('flag');
    getLog();
    ans = 'Login';  // Update the 'ans' variable to 'Login'
  };
  const handleLoginClick = () => {
    if (ans === 'Login') {
      navigate('/Login');
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };


  let ans = "Logout";
  const getLog = () => {
    const isLoggedIn = localStorage.getItem('flag') === 'true';
    ans = isLoggedIn ? 'Logout' : 'Login';
  };
  getLog();
  const handleClosed = () => {
    setSelectedpets(null);
    setShowImageModal(false);
    setOpen(false);
    // Show alert and update status
  };

  return (
    <div className='containers'>
      <div className='welcome'>
        <i style={{
          flexWrap: 'nowrap',
          flexDirection: 'row',
          marginLeft: '20px',
          width: 'max-content',
          height: 'fit-content',
          fontFamily: 'system-ui',
        }}>
          Pet Adoption Platform
        </i>
      </div>
      <div className='Addheader'>
        {ans === 'Logout' && (
          <Button onClick={handleClickOpen} className='Addpets' style={{
            background: 'rgb(194 180 183)',
            color: 'rgb(91, 10, 26)',
            fontSize: '17px',
            fontFamily: 'system-ui',
            borderRadius: '6px',
            marginRight: '15px',
          }}>
            Donate pet
          </Button>
        )}
        <Button onClick={ans === 'Logout' ? handleLogout : handleLoginClick} className='Login' style={{ background: 'rgb(204, 144, 156)', color: 'rgb(91, 10, 26)', fontSize: '17px', fontFamily: 'system-ui', borderRadius: '8px', marginRight: '15px' }}>{ans}</Button>
      </div>
      <div className='inputss'>
        <form onSubmit={handleSearch} className='inputes'>
          <div className='search-container'>
            <img src={loc} alt='' className='search-icon' />
            <input
              type='search'
              placeholder='Search by Location'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='search-input'
            />
          </div>
          <button type='submit' onClick={handleSearch}>Search</button>
          <div className='cate'>
            <FormControl sx={{ m: 1, minWidth: 130 }} size="small" className='categories' style={{}}>
              <InputLabel className="demo-select-small-label">Category</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                defaultValue={10}
                value={categorydata}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem className='items' value={10} onClick={() => handleCategorySelect('All')}>All</MenuItem>
                <MenuItem className='items' value={20} onClick={() => handleCategorySelect('dog')}>Dogs</MenuItem>
                <MenuItem className='items' value={30} onClick={() => handleCategorySelect('cat')}>Cats</MenuItem>
                <MenuItem className='items' value={40} onClick={() => handleCategorySelect('Parrot')}>Parrot</MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
      </div>
      <div className="photos" style={{ marginTop: '13%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '-61%' }}>
        <h3 className="title-pets">Available Pets</h3><br></br>
        <ImageList sx={{ width: 500, height: 600, gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
          {petData
            .filter((pet) => {
              return !selectedCategory ||
                (selectedCategory === 'All' || (selectedCategory === 'dog' && pet.category === 'dog') || (selectedCategory === 'cat' && pet.category === 'cat')) &&
                pet.status;
            })
            .map((pet) => (
              <ImageListItem key={pet.image} className='image' style={{ borderRadius: '10px' }}>
                <img
                  srcSet={`${pet.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${pet.image}?w=248&fit=crop&auto=format`}
                  alt={pet.petName}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={pet.petName}
                  subtitle={
                    <div className='general-info'>
                      <span>Breed: {pet.breed}</span>
                      <span>Category: {pet.category}</span>
                      <span style={{ color: pet.status ? 'yellow' : 'red', fontWeight: '600' }}>
                        Status: {pet.status ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  }
                  position="bottom"
                  actionIcon={
                    <Button className="read-more-btn" onClick={() => handleReadMore(pet)} disabled={!pet.status}>
                      More Details
                    </Button>
                  }
                />
              </ImageListItem>
            ))}
        </ImageList>
        <Dialog
          open={selectedpets}
          onClose={handleClosed}
          fullScreen
          sx={{
            padding: '60px',
            borderRadius: '55px',
          }}
        >
          <div className='details-page'>
            {selectedpets && <img src={selectedpets.image} style={{ margin: '2%', borderRadius: '6px', height: '500px', width: '500px' }} />}
            <div className='label-view'>
              {selectedpets ? (
                <>
                  <label className='petname' style={{ paddingBottom: '10px' }}> Pet Name : {selectedpets.petName}</label>
                  <label className='petage' style={{ paddingBottom: '10px' }}> Pet Age : {selectedpets.petAge}</label>
                  <label className='breed' style={{ paddingBottom: '10px' }}> Breed : {selectedpets.breed}</label>
                  <label className='petgen' style={{ paddingBottom: '10px' }}> Category : {selectedpets.category} </label>
                  <label className='petgen' style={{ paddingBottom: '10px' }}> Gender : {selectedpets.gender}</label>
                  <label className='vaccine' style={{ paddingBottom: '10px' }}> Precautions : {selectedpets.vaccinated} </label>
                  <label className='condition' style={{ paddingBottom: '10px' }}> Medical Condition : {selectedpets.medicalCondition}</label>
                  <label className='issue' style={{ paddingBottom: '10px' }}> Medical Issues : {selectedpets.medicalIssues}</label>
                  <label className='petadd' style={{ paddingBottom: '10px' }}> Address : {selectedpets.petAddress}</label>
                  <label className='petpho' style={{ paddingBottom: '10px' }}> Contact No : {selectedpets.petphone}</label>
                </>
              ) : (
                <p>No selected pet details available.</p>
              )}
            </div>
          </div>
          <div className='button-adapt' >
            <Button onClick={handleClosed}>Close</Button>
            <Button onClick={handleCloses}>Adopt</Button>
          </div>
        </Dialog>

      </div>
      <Dialog open={open} onClose={handleClose} className='dialog-container'>
        <DialogContent>
          <div className='petcontainer'>
            <h1>Donate Your Pet</h1>
            <div className='underline'></div>
            <form onSubmit={handleSubmit}>
              <label className='petphoto'>
                Pet Photo:
                <input
                  className='file-input'
                  type="file"
                  accept="image/*" // Restrict to image files only
                  onChange={handleFileChange} // Handle the file change event
                  required
                />
              </label>
              <label className='petname'>
                Pet Name :
                <input type="text" value={petName} onChange={handleNameChange} className='pname' />
              </label>
              <label className='petage'>
                Pet Age :
                <input type='text' value={petAge} onChange={handleAgeChange} className='nnum' />
              </label>
              <label className='breed'>
                Breed :
                <input type='text' value={breed} onChange={handleBreedChange} className='bname' />
              </label>
              <label className='petgen'>
                Category :
                <label>
                  <input type='radio' value='dog' checked={category === 'dog'} onChange={handleCategory} />
                  Dog
                </label>
                <label>
                  <input type='radio' value='cat' checked={category === 'cat'} onChange={handleCategory} />
                  Cat
                </label>
              </label>
              <label className='petgen'>
                Gender :
                <label>
                  <input type='radio' value='male' checked={gender === 'male'} onChange={handleGenderChange} />
                  Male
                </label>
                <label>
                  <input type='radio' value='female' checked={gender === 'female'} onChange={handleGenderChange} />
                  Female
                </label>
              </label>
              <label className='vaccine'> Precautions :
                <label>
                  <input type='checkbox' value='vaccinated' checked={vaccinated === 'vaccinated'} onChange={handleVaccinated} />
                  Vaccinated </label>
                <label>
                  <input type='checkbox' value='not vaccinated' checked={vaccinated === 'not vaccinated'} onChange={handleVaccinated} />
                  Not Vaccinated </label>
              </label>
              <label className='condition'>Medical Condition :
                <textarea value={medicalCondition} onChange={handleMedCon} />
              </label>
              <label className='issue'>Medical Issues :
                <textarea value={medicalIssues} onChange={handleMedIss} />
              </label>
              <label className='petadd'>Address :
                <textarea value={petAddress} onChange={handleAddress} />
              </label>
              <label className='petphone'>Contact No :
                <input type="tel" value={petphone} onChange={handlePhone} className='petcon' />
              </label>
              <div className='buttonAdd'>
                <Link to='/Homepage'>
                  <button className='petback' type='back' onClick={handleClosed}>
                    Back
                  </button>
                </Link>
                <button className='petsub' type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};