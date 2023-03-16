import {useState} from "react";
import {
    Box,
    Button,
    Flex,
    IconButton,
    Stack,
    Text,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import {HamburgerIcon, CloseIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";

function Header() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isLargerThanMobile] = useMediaQuery("(min-width: 480px)");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Flex
            as="header"
            pos="sticky"
            justify="space-between"
            mx="auto"
            bg="transparent"
            w={["95%", "", "95%", "90%"]}
            py="30px"
            maxW="7xl"
            align="center"
        >

            {/* Mobile menu */}
            <Flex w="30px" justify="flex-end" mr="20px">
                <IconButton
                    aria-label="Open Menu"
                    size="md"
                    icon={<HamburgerIcon/>}
                    onClick={toggleMenu}
                    display={isLargerThanMobile ? "none" : "inline-flex"}
                />
                <IconButton
                    aria-label="Close Menu"
                    size="md"
                    icon={<CloseIcon/>}
                    onClick={toggleMenu}
                    display={isLargerThanMobile ? "none" : "inline-flex"}
                    ml="2"
                    display={isMenuOpen ? "inline-flex" : "none"}
                />
            </Flex>

            {/* Desktop menu */}
            <Box fontSize="16px" w="70%" mx="20px" justify="center">
                <Stack
                    direction={isLargerThanMobile ? "row" : "column"}
                    spacing={[isLargerThanMobile ? "4" : "0", "", "7", "7"]}
                    align="center"
                    w="auto"
                    display={isLargerThanMobile ? "flex" : isMenuOpen ? "flex" : "none"}
                >
                    <Text
                        fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                        fontWeight="600"
                        color="white"
                        fontSize={{base: "12px", md: "14px", lg: "16px"}}
                        h={["auto", "", "", "24px"]}
                    >
                        ArtFinder
                    </Text>
                    <Button
                        colorScheme="#4a5568"
                        variant="link"
                        fontSize={{base: "12px", md: "14px", lg: "16px"}}
                        minWidth="auto"
                    >
                        <Link to="/">
                            <Text
                                fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                                lineHeight="24px"
                                color="white"
                            >
                                Home
                            </Text>
                        </Link>
                    </Button>
                    <Button
                        colorScheme="#4a5568"
                        variant="link"
                        fontSize={{base: "12px", md: "14px", lg: "16px"}}
                        minWidth="auto"
                    >
                        <Link to="/gallery">
                            <Text
                                fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                                lineHeight="24px"
                                color="white"
                            >
                                Galleries
                            </Text>
                        </Link>
                    </Button>
                    <Button
                        colorScheme="#4a5568"
                        variant="link"
                        fontSize={{base: "12px", md: "14px", lg: "16px"}}
                        minWidth="auto"
                    >
                        <Link to="/event">
                            <Text
                                fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                                lineHeight="24px"
                                color="white"
                            >
                                Events
                            </Text>
                        </Link>
                    </Button>
                    <Button
                        colorScheme="#4a5568"
                        variant="link"
                        fontSize={{base: "12px", md: "14px", lg: "16px"}}
                        minWidth="auto"
                    >
                        <Link to="/NFT">
                            <Text
                                fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                                lineHeight="24px"
                                color="white"
                            >
                                NFT
                            </Text>
                        </Link>
                    </Button>
                    <Button
                        colorScheme="#4a5568"
                        variant="link"
                        fontSize={{base: "12px", md: "14px", lg: "16px"}}
                        minWidth="auto"
                    >
                        <Link to="/sales">
                            <Text
                                fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                                lineHeight="24px"
                                color="white"
                            >
                                Sales
                            </Text>
                        </Link>
                    </Button>
                    <Button
                        colorScheme="#4a5568"
                        variant="link"
                        fontSize={{base: "12px", md: "14px", lg: "16px"}}
                        minWidth="auto"
                    >
                        <Link to="/faq">
                            <Text
                                fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                                lineHeight="24px"
                                color="white"
                            >
                                Faq
                            </Text>
                        </Link>
                    </Button>
                </Stack>
            </Box>

        </Flex>

    );
}

export default Header;

