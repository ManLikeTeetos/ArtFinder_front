import React from "react";
import { Flex, Text, Link, Box, useMediaQuery, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import btn_bg from "../images/wood.jpg";

function Footer() {
    const [isMobile] = useMediaQuery("(max-width: 600px)");
    const externalUrl = "https://manliketeetos.github.io/ArtFinderLanding";

    return (
        <Flex
            as="footer"
            direction={isMobile ? "column" : "row"}
            justify="space-around"
            align="center"
            py="40px" // Reduce padding for smaller screens
            backgroundImage={`url(${btn_bg})`}
            backgroundSize="cover"
            opacity={0.9}
            zIndex="2"
        >
            {/* First Column */}
            <Flex direction="column" align={isMobile ? "center" : "flex-start"}>
                <Text
                    fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                    fontWeight="600"
                    color="white"
                    fontSize={{ base: "12px", md: "14px", lg: "24px" }}
                    mb="5px"
                >
                    ArtFinderX
                </Text>
                <Text
                    fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                    fontWeight="300"
                    color="white"
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                >
                    The ArtGalaxy in your palms.
                </Text>
            </Flex>

            {/* Second Column */}
            <Flex
                direction="column"
                align={isMobile ? "center" : "flex-start"}
                mt={isMobile ? "10px" : "0"} // Add margin for smaller screens
            >
                <Link
                    as={RouterLink}
                    to="/"
                    color="white"
                    fontSize="16px"
                    mb="12px"
                    fontWeight="600"
                >
                    Home
                </Link>
                <Link
                    as={RouterLink}
                    to="/gallerylist"
                    color="white"
                    fontSize="16px"
                    mb="12px"
                    fontWeight="600"
                >
                    Gallery
                </Link>
            </Flex>

            {/* Third Column */}
            <Flex
                direction="column"
                align={isMobile ? "center" : "flex-start"}
                mt={isMobile ? "10px" : "0"} // Add margin for smaller screens
            >
                <Link
                    as={RouterLink}
                    to="/event"
                    color="white"
                    fontSize="16px"
                    mb="12px"
                    fontWeight="600"
                >
                    Event
                </Link>
                <Link
                    as={RouterLink}
                    to="/artist"
                    color="white"
                    fontSize="16px"
                    mb="12px"
                    fontWeight="600"
                >
                    Artist
                </Link>
            </Flex>

            {/* Fourth Column */}
            <Flex
                direction="column"
                align={isMobile ? "center" : "flex-start"}
                mt={isMobile ? "10px" : "0"} // Add margin for smaller screens
            >
                <Link
                    as={RouterLink}
                    to="/sales"
                    color="white"
                    fontSize="16px"
                    mb="12px"
                    fontWeight="600"
                >
                    Sales
                </Link>
                <Link
                    as={RouterLink}
                    to="/faq"
                    color="white"
                    fontSize={isMobile ? "16px" : "14px"} // Adjust font size for smaller screens
                    mb="12px"
                    fontWeight="600"
                >
                    FAQ
                </Link>
            </Flex>

            {/* Copyright */}
            <Flex direction="column" align="center">
                <Text
                    fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                    fontWeight="600"
                    color="white"
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                    mb="5px"
                >
                    Copyright © 2023 Designed By Toluwanimi Ade-ojo
                </Text>
                <Link
                    as="a"
                    fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                    fontWeight="600"
                    bg="transparent"
                    color="white"
                    fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                    mb="5px"
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                   About
                </Link>
            </Flex>
        </Flex>
    );
}

export default Footer;
