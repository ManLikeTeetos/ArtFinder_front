import {useLocation} from 'react-router-dom';
import Header from "../components/Header"
import {Box, Button, Heading, Image, Stack, Text, UnorderedList, ListItem, SimpleGrid} from "@chakra-ui/react";
import backgroundImage from "../images/Leonardo-Da-Vinci-Monna-Lisa.jpg";
import {useEffect, useState} from "react";
import requireImage from "../images/requirement.jpg";
import Masonry from 'react-masonry-css';


function Gallery() {
    const location = useLocation();
    const id = location.state.id;
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchGallery() {
            //let item = {id}
            let res = "";
            const result = await fetch(`http://localhost:8000/api/getGallery?id=${id}`, {
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

    console.log(34, data);
    let gallery_name = 'Gallery';
    let images = [];
    if (data.length > 0) {
        backgroundImage = data[0]['banner'];
        gallery_name = data[0]['name'];
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
                <Header/>
                {/*<Image src="https://picsum.photos/id/78/1200/400/?blur=4" alt="Hero Image" objectFit="cover" w="100%" h="400px" />*/}
                <Box maxW="800px" mx="auto" px={6} py={24} position="absolute" bottom="0" left="0" right="0" zIndex="1">
                    <Heading as="h1" size="3xl" color="white" mb={4}
                             textAlign={{base: "center", md: "left"}}>{gallery_name}</Heading>
                    <Text fontWeight="bold" color="white" fontSize="xl" mb={8} textAlign={{base: "center", md: "left"}}>The
                        Art Galaxy in your palms</Text>
                </Box>
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
                            borderImage="linear-gradient(to bottom right, #8B4513, #D2691E, #8B4513) 1"
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
            <Box>
                {data.map((item, index) => (
                    <>
                        <Box key={item.id} h={{base: "auto", md: 400}}>
                            <Stack
                                direction={{base: "column", md: index % 2 === 0 ? "row" : "row-reverse"}}
                                spacing={{base: 4, md: 0}}
                                justifyContent="space-around"
                            >
                                <Box width={{base: "100%", md: "40%"}} pl={{base: 4, md: 20}} pr={{base: 4, md: 0}}
                                     py={{base: 0, md: 20}}>
                                    <Image
                                        src={item.display}
                                        alt={item.name}
                                        width={{base: "100%", md: "100%"}}
                                        objectFit="cover"
                                        overflow="hidden"
                                        borderWidth="10px"
                                        borderStyle="solid"
                                        borderColor="transparent"
                                        borderImage="linear-gradient(to bottom right, #8B4513, #D2691E, #8B4513) 1"
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
                                        alt="requirements"
                                        width={{base: "100%", md: "90%"}}
                                        objectFit="cover"
                                        overflow="hidden"
                                        borderWidth="10px"
                                        borderStyle="solid"
                                        borderColor="transparent"
                                        borderImage="linear-gradient(to bottom right, #8B4513, #D2691E, #8B4513) 1"
                                        boxShadow="2px 2px 8px rgba(0, 0, 0, 0.3)"
                                        _hover={{
                                            transform: 'scale(1.05)',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    />
                                </Box>
                                <Box width={{base: "100%", md: "80%"}} px={{base: 5, md: 20}} py={{base: 4, md: 20}}>
                                    <Heading mb={5} fontSize={{base: "24px", md: "30px"}}>
                                        Requirements
                                    </Heading>
                                    <UnorderedList>
                                        {item.requirements.split('.').map((requirement) => {
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
        </>
    );
}

export default Gallery;