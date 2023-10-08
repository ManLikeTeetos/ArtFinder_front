import {useState, useEffect, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import {Stack, Box, Heading, Text, Image, Grid, Flex, Button, useMediaQuery, FormLabel, Input, Center } from '@chakra-ui/react'
import backgroundImage from "../images/Leonardo-Da-Vinci-Monna-Lisa.jpg";
import btn_bg from "../images/wood.jpg";


function Home() {
    const [data, setData] = useState([]);
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const navigate   = useNavigate();
    const userinfo   = localStorage.getItem('userinfo');
    const [currentLocation, setCurrentLocation] = useState('');
    const currentStateRef = useRef(currentLocation);
    const [currentState, setCurrentState] = useState(currentLocation);
    const handleStateChange = (event) => {
        setCurrentState(event.target.value);
    };

    const handleStateBlur = () => {
        currentStateRef.current = currentState;
        if(currentStateRef.current.length > 0) {
            fetchGalleryRef();
        }
    };
    let username = "";
    if(userinfo){
        const userInfoObj = JSON.parse(userinfo);
        username = userInfoObj.username;
    }
    const fetchGalleryRef = async () => {
        let res = '';

        // Modify the API URL to include the location parameter
        const result = await fetch(`https://api.artfinderx.com/api/getGallery?location=${currentStateRef.current}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        res = await result.json();

        if (res[0]) {
            setData(res);
        } else {
            alert(" Oops! No gallery or event found for this state. Keep exploring and check back soon! \n Don't worry, we're bringing you the best from your default location");
        }
    };




    useEffect(() => {
        const loadGoogleMapsScript = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
                script.async = true;
                script.defer = true;
                script.onload = fetchGallery;
                document.head.appendChild(script);
            } else {
                fetchGallery();
            }
        };

        const fetchGallery = async () => {
            let item = '';
            let res = '';

            // Get the user's current location using the Geolocation API
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Use the Geocoding API to retrieve the state information
                    const geocoder = new window.google.maps.Geocoder();
                    const latLng = new window.google.maps.LatLng(latitude, longitude);

                    geocoder.geocode({ location: latLng }, async (results, status) => {
                        if (status === 'OK' && results.length > 0) {
                            const addressComponents = results[0].address_components;

                            // Find the state component in the address
                            const stateComponent = addressComponents.find((component) =>
                                component.types.includes('administrative_area_level_1')
                            );

                            const currentState = stateComponent ? stateComponent.long_name : '';
                            // const currentState = "Ibadan";
                            setCurrentLocation(currentState);

                            // Modify the API URL to include the location parameter
                            const result = await fetch(`https://api.artfinderx.com/api/getGallery?location=${currentState}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Accept: 'application/json',
                                },
                            });

                            res = await result.json();

                            if (res[0]) {
                                setData(res);
                            }
                        }
                    });
                },
                (error) => {
                    console.error(error);
                }
            );
        };

        loadGoogleMapsScript();
        return () => {
            // Cleanup function
            // Clear the Google Maps script when the component unmounts
            const googleScript = document.getElementById("google-maps-script");
            if (googleScript) {
                googleScript.remove();
            }
        };
    }, []);


    //console.log(45, data);

    const handleImageClick = (id) => {
        //navigate(`/gallery/${id}`);
        navigate('/gallery', { state: { id } });
    };
    const handleReadMore = (id) => {
        // Handle read more click event, e.g. open modal
        navigate('/gallery', { state: { id } });
    };

    return (
        <>
            <Header userinfo={userinfo}/>
            <Box w="100%"
                 maxW="1900px"
                 mx="auto"
                 position="relative"
                //minHeight="100vh"
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
                    <Heading as="h1" size="3xl" color="white" mb={4} textAlign={{base: "center", md: "left"}}>Welcome to
                        ArtFinder</Heading>
                    <Text fontWeight="bold" color="white" fontSize="xl" mb={8} textAlign={{base: "center", md: "left"}}>The
                        Art Galaxy in your palms</Text>
                </Box>
            </Box>

            {isMobile &&
            <>
                <Flex justifyContent="center" flexDirection="column" alignItems="center" mt={100}>
                    <Heading as="h1" size="xl" textAlign="center">
                        Explore the Art Universe
                    </Heading>
                    <Text fontSize="lg" textAlign="center" mt={2}>
                        Check out gallery close to your location
                    </Text>
                </Flex>
                <Center mt={4}>
                    <Box width="200px">
                        <Input
                            id="stateInput"
                            type="text"
                            placeholder="Enter a different state"
                            value={currentState}
                            onChange={handleStateChange}
                            onBlur={handleStateBlur}
                            display="inline-block"
                            width="100%"
                            borderColor="brown"
                            focusBorderColor="brown"
                        />
                    </Box>
                </Center>


                <Box py={10} mx={4} mt={10}>
                    {data.map((item) => (
                        <Box
                            key={item.id}
                            bg="white"
                            borderRadius="md"
                            overflow="hidden"
                            boxShadow="md"
                            mt={10}
                            _hover={{
                                transform: 'scale(1.05)',
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            <Image
                                src={item.display}
                                alt={item.name}
                                objectFit="cover"
                                onClick={() => handleImageClick(item.id)}
                            />
                            <Box p={4}>
                                <Text fontSize="xl" fontWeight="semibold">
                                    {item.name}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                    Lagos, Nigeria
                                </Text>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </>
            }
            {!isMobile &&
            <>
                <Flex justifyContent="center" flexDirection="column" alignItems="center" mt={100}>
                    <Heading as="h1" size="xl" textAlign="center">
                        Explore the Art Universe
                    </Heading>
                    <Text fontSize="lg" textAlign="center" mt={2}>
                        Check out gallery close to your location
                    </Text>
                </Flex>
                <Center mt={4}>
                    <Box width="200px">
                        <FormLabel htmlFor="stateInput">{/* ... */}</FormLabel>
                        <Input
                            id="stateInput"
                            type="text"
                            placeholder="Enter a different state"
                            value={currentState}
                            onChange={handleStateChange}
                            onBlur={handleStateBlur}
                            borderColor="brown"
                            focusBorderColor="brown"
                        />
                    </Box>
                </Center>
                <Box py={10} mx={20} mt={10}>
                    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                        {data.map((item) => (
                            <Box
                                key={item.id}
                                bg="white"
                                borderRadius="md"
                                overflow="hidden"
                                boxShadow="md"
                                _hover={{
                                    transform: 'scale(1.05)',
                                    transition: 'transform 0.3s ease',
                                }}
                            >
                                <Image
                                    src={item.display}
                                    alt={item.name}
                                    objectFit="cover"
                                    onClick={() => handleImageClick(item.id)}
                                />
                                <Box p={4}>
                                    <Text fontSize="xl" fontWeight="semibold">
                                        {item.name}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        Lagos, Nigeria
                                    </Text>
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                </Box>
            </>
            }



        </>
    );
}

export default Home;