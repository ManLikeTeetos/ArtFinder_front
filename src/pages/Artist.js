import {useLocation} from 'react-router-dom';
import Header from "../components/Header"
import {
    Box,
    Button,
    Heading,
    Image,
    Stack,
    Text,
    UnorderedList,
    ListItem,
    SimpleGrid,
    useMediaQuery
} from "@chakra-ui/react";
import backgroundImage from "../images/Leonardo-Da-Vinci-Monna-Lisa.jpg";
import {useEffect, useState, useRef} from "react";
import requireImage from "../images/requirement.jpg";
import Masonry from 'react-masonry-css';


function Artist() {
    const location = useLocation();
    const mapRef = useRef(null);
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const id = location.state.id;
    const [data, setData] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const userinfo   = localStorage.getItem('userinfo');
    let username = "";
    if(userinfo){
        const userInfoObj = JSON.parse(userinfo);
        username = userInfoObj.username;
    }

    useEffect(() => {
        async function fetchArtist() {
            //let item = {id}
            let res = "";
            const result = await fetch(`https://api.artpathfinder.com/api/getArtist?id=${id}`, {
                method: 'GET',
                //body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            res = await result.json()
            if (res[0]) {
                setData(res);
            }
        }

        fetchArtist();
    }, [id]);


    useEffect(() => {
        let mapScriptLoaded = false; // Flag to track if the script has been loaded

        const loadGoogleMapsScript = () => {
            if (!mapScriptLoaded) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
                script.async = true;
                script.defer = true;
                script.onload = initializeMap;
                document.head.appendChild(script);
                mapScriptLoaded = true; // Set the flag to true once the script is loaded
            }
        };

        const initializeMap = () => {
            setMapLoaded(true); // Set mapLoaded to true once the map script is loaded
        };

        loadGoogleMapsScript();
    }, []);

    useEffect(() => {
        if (mapLoaded && data.length > 0 && mapRef.current) {
            const location = data[0].location;
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK' && results.length > 0) {
                    const mapOptions = {
                        center: results[0].geometry.location,
                        zoom: 15,
                    };
                    const map = new window.google.maps.Map(mapRef.current, mapOptions);
                    const marker = new window.google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                    });

                    // Open new tab with Google Maps directions when clicking on the map
                    // map.addListener('click', () => {
                    //     if (navigator.geolocation) {
                    //         navigator.geolocation.getCurrentPosition(
                    //             (position) => {
                    //                 const userLocation = new window.google.maps.LatLng({
                    //                     lat: position.coords.latitude,
                    //                     lng: position.coords.longitude,
                    //                 });
                    //                 const destination = encodeURIComponent(location);
                    //                 const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation}&destination=${destination}`;
                    //                 window.open(directionsUrl, '_blank');
                    //             },
                    //             (error) => {
                    //                 console.error('Error getting user location:', error);
                    //             }
                    //         );
                    //     }
                    // });
                }
            });
        }
    }, [mapLoaded, data]);






    //alert(mapLoaded)
    console.log(34, data);
    let artist_name = 'Artist';
    let images = [];
    if (data.length > 0) {
        backgroundImage = data[0]['banner'];
        artist_name = data[0]['name'];
        images = data[0].images;
    }
    const breakpointColumnsObj = {
        base: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
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
                 height="500px"
                 mb={{base: 20, md: 0}}
            >
                {/*<Image src="https://picsum.photos/id/78/1200/400/?blur=4" alt="Hero Image" objectFit="cover" w="100%" h="400px" />*/}
                <Box maxW="800px" mx="auto" px={6} py={24} position="absolute" bottom="0" left="0" right="0" zIndex="1">
                    <Heading as="h1" size="3xl" color="white" mb={4}
                             textAlign={{base: "center", md: "left"}}>{artist_name}</Heading>
                    <Text fontWeight="bold" color="white" fontSize="xl" mb={8} textAlign={{base: "center", md: "left"}}>The
                        Art Galaxy in your palms</Text>
                </Box>
            </Box>
            <Box>
                {data.map((item, index) => (
                    <>
                        <Box key={item.id} h={{base: "auto", md: 400}}>
                            <Stack
                                direction={{base: "column", md: index % 2 === 0 ? "row" : "row-reverse"}}
                                spacing={{base: 4, md: 0}}
                                justifyContent="space-around"
                            >
                                <Box width={{base: "100%", md: "40%"}}
                                     pl={{base: 4, md: 20}}
                                     pr={{base: 4, md: 0}}
                                     py={{base: 0, md: 20}}
                                     height="500px"
                                >
                                    <Image
                                        src={item.display}
                                        alt={item.name}
                                        width={{base: "100%", md: "100%"}}
                                        height="100%"
                                        objectFit="cover"
                                        overflow="hidden"
                                        borderWidth="10px"
                                        borderStyle="solid"
                                        borderColor="transparent"
                                        borderimage="linear-gradient(to bottom right, #8B4513, #D2691E, #8B4513) 1"
                                        boxShadow="2px 2px 8px rgba(0, 0, 0, 0.3)"
                                        _hover={{
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    />
                                </Box>
                                <Box width={{base: "100%", md: "80%"}} px={{base: 5, md: 20}} py={{base: 4, md: 20}}>
                                    <Heading mb={5} fontSize={{base: "24px", md: "30px"}}>
                                        Who are we?
                                    </Heading>
                                    <Text fontSize={{base: "14px", md: "16px"}}>{item.about}</Text>
                                </Box>
                            </Stack>
                        </Box>
                        <Box h={{base: "auto", md: 400}}>
                            <Stack
                                direction={{base: "column", md: "row-reverse"}}
                                spacing={{base: 4, md: 0}}
                                justifyContent="space-around"
                            >
                                <Box width={{base: "100%", md: "40%"}} pl={{base: 4, md: 20}} pr={{base: 4, md: 0}}
                                     py={{base: 0, md: 20}}>
                                    <Image
                                        src={requireImage}
                                        alt="contact"
                                        width={{base: "100%", md: "90%"}}
                                        objectFit="cover"
                                        overflow="hidden"
                                        borderWidth="10px"
                                        borderStyle="solid"
                                        borderColor="transparent"
                                        borderimage="linear-gradient(to bottom right, #8B4513, #D2691E, #8B4513) 1"
                                        boxShadow="2px 2px 8px rgba(0, 0, 0, 0.3)"
                                        _hover={{
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    />
                                </Box>
                                <Box width={{base: "100%", md: "80%"}} px={{base: 5, md: 20}} py={{base: 4, md: 20}} my={{base:0, md:20}}>
                                    <Heading mb={5} fontSize={{base: "24px", md: "30px"}}>
                                        Contact
                                    </Heading>
                                    <UnorderedList>
                                        {item.contact.split('-').map((requirement) => {
                                            if (requirement.trim() === '') {
                                                return null; // ignore empty strings
                                            }
                                            return (
                                                <ListItem key={requirement}>
                                                    {requirement.trim() + '.'} {/* add back the period */}
                                                </ListItem>
                                            );
                                        })}
                                    </UnorderedList>
                                </Box>
                            </Stack>
                        </Box>
                    </>
                ))}

            </Box>
            <Box
                py={{base:0, md: 20}}
                px={{base:5, md: 20}}
            >
                <SimpleGrid columns={[2, 3, 4]} spacing="10px"  mb={{base:10, md: 0}}>
                    {images.map((image) => (
                        <Box
                            position="relative"
                            width="100%"
                            paddingBottom="100%"
                            overflow="hidden"
                            borderWidth="10px"
                            borderStyle="solid"
                            borderColor="transparent"
                            borderimage="linear-gradient(to bottom right, #8B4513, #D2691E, #8B4513) 1"
                            boxShadow="2px 2px 8px rgba(0, 0, 0, 0.3)"
                            _hover={{
                                transform: 'scale(1.20)',
                                transition: 'transform 0.3s ease',
                            }}
                        >
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                bottom="0"
                                right="0"
                                backgroundImage={`url(${image})`}
                                backgroundSize="cover"
                                backgroundPosition="center center"

                            />
                        </Box>
                    ))}
                </SimpleGrid>

            </Box>

        </>
    );
}

export default Artist;