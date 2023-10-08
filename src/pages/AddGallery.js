import {useEffect, useState} from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    useToast, Box, Heading, Text,
    Select,
    Stack,
    Image,
} from "@chakra-ui/react";
import DateTimePicker from "react-datetime-picker";
import backgroundImage from "../images/Leonardo-Da-Vinci-Monna-Lisa.jpg";
import Header from "../components/Header";
import GoogleMaps from "../GoogleMap";


function AddGallery() {

    const userinfo = localStorage.getItem('userinfo');
    let username = "";
    const [agentgallery, setAgentgallery] = useState([]);
    if (userinfo) {
        const userInfoObj = JSON.parse(userinfo);
        username = userInfoObj.username;
    }
    const [locationCoords, setLocationCoords] = useState({ lat: 0, lng: 0 });

    const [data, setData] = useState({
        id: "",
        name: "",
        about: "",
        opening: "",
        location: "",
        requirements: "",
        userid: username,
        display: "",
        banner: "",
        images: [],
    });
    const [displayImage, setDisplayImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const toast = useToast();

    const current = new Date();

    const handleChange = (key, value) => {
        setData({...data, [key]: value})
    }
    const handleLocationChange = (event) => {
        setData({ ...data, location: event.target.value });
    };

    const handleLocationBlur = () => {
        const address = data.location;
        // Perform the necessary logic to retrieve the coordinates for the address
        // and update the locationCoords state variable
        // Example: Using the Google Geocoding API
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${apiKey}`;

        fetch(geocodeApiUrl)
            .then((response) => response.json())
            .then((mapres) => {
                if (mapres.results.length > 0) {
                    const location = mapres.results[0].geometry.location;
                    setLocationCoords({ lat: location.lat, lng: location.lng });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };




    const handleDisplayChange = (event) => {
        const dispfile = event.target.files[0];
        setData({...data, display: dispfile});
    };

    const handleBannerChange = (event) => {
        const bannerfile = event.target.files[0];
        setData({...data, banner: bannerfile});
    };

    const handleImagesChange = (event) => {
        const files = event.target.files;
        setData({...data, images: files});
    };

    const handleDeleteImage = async (image, id) => {
        // Handle image deletion
        const apiUrl = "https://api.artfinderx.com/api/deleteImage";
        const imageParam = encodeURIComponent(image);
        const idParam = encodeURIComponent(id);

        const url = `${apiUrl}?image=${imageParam}&id=${idParam}`;

        const result = await fetch(url, {
            method: 'GET',
            // body: JSON.stringify(userid),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });

        // console.log("200", res);
        if (result.ok) {
            const res = await result.json();
            //console.log(responseData);
            let title = res.error ? res.error : "Success";
            let status = res.error ? "error" : "success";

            toast({
                title: title,
                status: status,
                duration: 3000,
                isClosable: true,
            });

            // Reload the page with the current ID in the query string
            const currentURL = new URL(window.location.href);
            currentURL.searchParams.set("id", id);
            window.location.href = currentURL.href;
        } else {
            throw new Error('Form submission failed');
        }


    };

    const handleUpdateImage = (index) => {
        // Handle image update
    };

    //populate field for update after a gallery is chosen
    const handleSelectChange = (event) => {
        const selectedGalleryName = event.target.value;
        const selectedGallery = agentgallery.find(
            (gallery) => gallery.name === selectedGalleryName
        );

        if (selectedGallery) {
            setData({
                name: selectedGallery.name,
                about: selectedGallery.about,
                opening: selectedGallery.opening,
                location: selectedGallery.location,
                requirements: selectedGallery.requirements,
                userid: selectedGallery.userid,
                id: selectedGallery.id,
            });
            setBannerImage(selectedGallery.banner);
            setDisplayImage(selectedGallery.display);
            setGalleryImages(selectedGallery.images);
        } else {
            setData({
                name: "",
                about: "",
                opening: "",
                location: "",
                requirements: "",
                id: "",
                userid: username,
                display: "",
                banner: "",
                images: [],
            });
        }
    };

    useEffect(() => {
        async function fetchGalleryAgent() {
            let res = "";
            const result = await fetch(`https://api.artfinderx.com/api/getGalleryAgent?username=${username}`, {
                method: 'GET',
                // body: JSON.stringify(userid),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            res = await result.json()
            console.log("200", res);
            if (res[0]) {
                setAgentgallery(res);
            }
        }

        fetchGalleryAgent();
    }, [username]);

    //on update, it refreshes entire page
    useEffect(() => {
        // Retrieve the id from the query string
        const params = new URLSearchParams(window.location.search);
        const selectedId = parseInt(params.get("id"));
        // alert(selectedId);

        //console.log(25, agentgallery)
        if (selectedId) {
            // Find the selected gallery by id
            const selectedGallery = agentgallery.find(
                (gallery) => gallery.id === selectedId
            );
            // console.log(27, selectedGallery);
            if (selectedGallery) {
                setData({
                    name: selectedGallery.name,
                    about: selectedGallery.about,
                    opening: selectedGallery.opening,
                    location: selectedGallery.location,
                    requirements: selectedGallery.requirements,
                    userid: selectedGallery.userid,
                    id: selectedGallery.id,
                });
                setBannerImage(selectedGallery.banner);
                setDisplayImage(selectedGallery.display);
                setGalleryImages(selectedGallery.images);
            } else {
                setData({
                    name: "",
                    about: "",
                    opening: "",
                    location: "",
                    requirements: "",
                    id: "",
                    userid: username,
                    display: "",
                    banner: "",
                    images: [],
                });
            }
        }
    }, [agentgallery]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // do something with form data, e.g. submit to server
        const formData = new FormData();
        for (var key in data) {
            if (key === 'images') {
                // Iterate through each image in the array and append it to formData
                for (var i = 0; i < data[key].length; i++) {
                    formData.append(key + '[' + i + ']', data[key][i]);
                }
            } else {
                // For all other keys in data, simply append the key-value pair to formData
                formData.append(key, data[key]);
            }
        }
        console.log(33, data);
        console.log(34, formData);
        try {


            const response = await fetch('https://api.artfinderx.com/api/addGallery', {
                method: 'POST',
                body: formData,
                // headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                toast({
                    title: "Form submitted!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                const currentURL = new URL(window.location.href);
                currentURL.searchParams.set("id", data.id);
                window.location.href = currentURL.href;
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Form submission error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return (
        <>
            <Header userinfo={userinfo}/>
            <Box w="100%" maxW="1900px" mx="auto" position="relative"
                 bg={`linear-gradient(
                    rgba(0, 0, 0, 0.5),
                    rgba(0, 0, 0, 0.5)
                    ), url(${backgroundImage})`}
                 backgroundSize="cover"
                 backgroundPosition="center"
                 backgroundBlendMode="multiply"
                 height="500px">
                {/*<Image src="https://picsum.photos/id/78/1200/400/?blur=4" alt="Hero Image" objectFit="cover" w="100%" h="400px" />*/}
                <Box maxW="800px" mx="auto" px={6} py={24} position="absolute" bottom="0" left="0" right="0" zIndex="1">
                    <Heading as="h1" size="3xl" color="white" mb={4}
                             textAlign={{base: "center", md: "left"}}>Gallery Dashboard</Heading>
                    <Text fontWeight="bold" color="white" fontSize="xl" mb={8} textAlign={{base: "center", md: "left"}}>
                        Let the Earth know of your World of Creativity
                    </Text>
                </Box>
            </Box>
            <Box px={10}
                 py={20}
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
                 w={{base: "100%", sm: "100%", md: "90%", lg: "90%"}}
            >

                <Box w={{base: "100%", sm: "100%", md: "80%", lg: "60%"}}
                >
                    <form onSubmit={handleSubmit}>
                        <Select placeholder="Select a gallery"
                                defaultValue=""
                                mb={10}
                                onChange={handleSelectChange}
                        >
                            <option value="">None</option>
                            {agentgallery.map((gallery) => (
                                <option key={gallery.id} value={gallery.name} color="black">
                                    {gallery.name}
                                </option>
                            ))}
                        </Select>
                        <Input
                            type="hidden"
                            value={data.id}
                            onChange={(event) => handleChange('id', event.target.value)}
                        />
                        <FormControl isRequired>
                            <FormLabel>Name:</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your gallery name"
                                value={data.name}
                                onChange={(event) => handleChange('name', event.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>About Gallery:</FormLabel>
                            <Textarea
                                placeholder="Enter some information about the gallery"
                                value={data.about}
                                onChange={(event) => handleChange('about', event.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Opening:</FormLabel>
                            <Textarea
                                placeholder="Monday - Friday: 7am - 8pm
                                        Sat - Sun : 10am - 10pm"
                                value={data.opening}
                                onChange={(event) => handleChange('opening', event.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Location:</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter the gallery location"
                                value={data.location}
                                onChange={handleLocationChange}
                                onBlur={handleLocationBlur}
                            />
                        </FormControl>
                        <div style={{ position: 'relative', height: '400px', marginTop: '20px' }}>
                            <GoogleMaps google={window.google} locationCoords={locationCoords} />
                        </div>

                        <FormControl mt={4}>
                            <FormLabel>Requirements:</FormLabel>
                            <Textarea
                                placeholder="Enter any special requirements for the gallery"
                                value={data.requirements}
                                onChange={(event) => handleChange('requirements', event.target.value)}
                            />
                        </FormControl>

                        <Stack spacing={4} mt={4}>
                            <FormControl>
                                <FormLabel>Display Image:</FormLabel>
                                {displayImage &&
                                <Box width="150px" height="150px" mb={10}>
                                    <Image src={displayImage} alt="Display Image" objectFit="cover" width="100%"
                                           height="100%"/>
                                </Box>
                                }
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleDisplayChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Banner Image:</FormLabel>
                                {bannerImage &&
                                <Box width="150px" height="150px" mb={10}>
                                    <Image src={bannerImage} alt="Banner Image" objectFit="cover" width="100%"
                                           height="100%"/>
                                </Box>
                                }
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBannerChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Gallery Images:</FormLabel>
                                <Stack spacing={2}>
                                    {galleryImages.map((image, index) => (
                                        <Stack key={index} direction="row" alignItems="center">
                                            <Box width="150px" height="150px" mb={10}>
                                                <Image src={image} alt={`Gallery Image ${index}`} objectFit="cover"
                                                       width="100%" height="100%"/>
                                            </Box>
                                            <Button
                                                size="sm"
                                                colorScheme="red"
                                                onClick={() => handleDeleteImage(image, data.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Stack>
                                    ))}
                                </Stack>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImagesChange}
                                />
                            </FormControl>
                        </Stack>

                        <Button type="submit" mt={4} colorScheme="blue">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    )
};

export default AddGallery;
