import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import {Stack, Box, Heading, Text, Image, Grid, Flex, Button, useMediaQuery} from '@chakra-ui/react'
import backgroundImage from "../images/Leonardo-Da-Vinci-Monna-Lisa.jpg";
import btn_bg from "../images/wood.jpg";


function Home() {
    const [data, setData] = useState([]);
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const navigate   = useNavigate();
    const userinfo   = localStorage.getItem('userinfo');
    let username = "";
    if(userinfo){
        const userInfoObj = JSON.parse(userinfo);
        username = userInfoObj.username;
    }



    useEffect(() => {
        async function fetchGallery() {
            let item = "";
            let res = "";
            const result = await fetch("http://localhost:8000/api/getGallery", {
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

        fetchGallery();
    }, []);

    //console.log(45, data);

    const handleImageClick = (id) => {
        //navigate(`/gallery/${id}`);
        navigate('/gallery', { state: { id } });
    };
    const handleReadMore = (id) => {
        // Handle read more click event, e.g. open modal
        // ...
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
            <Flex justifyContent="center" flexDirection="column" alignItems="center" mt={100}>
                <Heading as="h1" size="xl" textAlign="center">
                    Event and Exhibitions happening around you
                </Heading>
                <Text fontSize="lg" textAlign="center" mt={2} mb={{ base: 9 }}>
                    You might want to Art-tend them.
                </Text>
            </Flex>
            <Box>
                {data.map((item, index) => (
                    <Box key={item.id} h={{ base: "auto", md: 400 }}>
                        <Stack
                            direction={{ base: "column", md: index % 2 === 0 ? "row" : "row-reverse" }}
                            spacing={{ base: 4, md: 0 }}
                            justifyContent="space-around"
                        >
                            <Box
                                width={{ base: "100%", md: "40%" }}
                                pl={{ base: 4, md: 20 }}
                                pr={{ base: 4, md: 0 }}
                                py={{ base: 0, md: 20 }}
                            >
                                <Image
                                    src={item.banner}
                                    alt={item.name}
                                    width={{base: "100%", md: "90%"}}
                                    objectFit="cover"
                                    onClick={() => handleImageClick(item.id)}
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
                            <Box width={{ base: "100%", md: "80%" }} px={{ base: 5, md: 20 }} py={{ base: 4, md: 20 }}>
                                <Heading mb={5} fontSize={{ base: "24px", md: "30px" }}>
                                    {item.name}
                                </Heading>
                                <Text fontSize={{ base: "14px", md: "12px" }}>{item.about}</Text>
                                <Button
                                    my={{ base: 5, md: 5 }}
                                    size="sm"
                                    backgroundImage={`url(${btn_bg})`}
                                    backgroundSize="cover"
                                    backgroundPosition="center"
                                    color="white"
                                    _hover={{ bg: 'brown.600' }}
                                    _active={{ bg: 'brown.700' }}
                                    onClick={() => handleReadMore(item.id)}>
                                    Read More
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                ))}
            </Box>




        </>
    );
}

export default Home;