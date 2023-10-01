import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {
    Box,
    Button,
    Flex,
    IconButton,
    Stack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import {HamburgerIcon, CloseIcon} from "@chakra-ui/icons";
import {Link} from "react-router-dom";
import btn_bg from "../images/wood.jpg";

function Header({userinfo}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isLargerThanMobile] = useMediaQuery("(min-width: 650px)");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    //const userinfo   = localStorage.getItem('userinfo');
    let username = "";
    let avatarSrc= "";
    let agent = false;
    let agent_type = "";
    if (userinfo) {
        const userInfoObj = JSON.parse(userinfo);
        username = userInfoObj.username;
        avatarSrc = userInfoObj.display;
        agent_type = userInfoObj.agent;
        if(agent_type == "Y") agent = true;

    }
    const navigate = useNavigate();
    const Signout = () => {
        // Remove item from local storage
        localStorage.removeItem('userinfo');

        // Navigate to the sign-in page
        navigate('/signin');
    }

    return (
        <Flex
            as="header"
            position="sticky"
            top="0"
            justify="space-between"
            //mx="auto"
            bg="gray"
            opacity={0.9}
            transition="background-color 0.3s ease"
            py="10px"
            maxW="100%"
            align="center"
            zIndex="2"
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
                    <Menu>
                        <MenuButton
                            as={Button}
                            colorScheme="#4a5568"
                            variant="link"
                            fontSize={{base: "12px", md: "14px", lg: "16px"}}
                            minWidth="auto"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setIsSubMenuOpen(true)}
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
                        </MenuButton>
                        <MenuList
                            display={isHovering || isSubMenuOpen ? "block" : "none"}
                            onClick={() => setIsSubMenuOpen(true)}
                        >
                            <MenuItem as={Link} to="/gallerylist" target="_blank" rel="noopener noreferrer">
                                Gallery List
                            </MenuItem>
                            {agent &&
                            <MenuItem as={Link} to="/addgallery" target="_blank" rel="noopener noreferrer">
                                Add Gallery
                            </MenuItem>
                            }
                        </MenuList>
                    </Menu>
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
                    {!userinfo &&
                    <>
                        <Link to="/signin" >
                            <Button
                                backgroundImage={`url(${btn_bg})`}
                                backgroundSize="cover"
                                backgroundPosition="center"
                                color="white"
                                _hover={{bg: 'brown.600'}}
                                _active={{bg: 'brown.700'}}
                                ml={{base:"0px", lg: "50px"}}
                                mb={{base: "10px", lg: "0px"}}
                                fontSize={{base: "12px", md: "14px", lg: "16px"}}
                                my="auto"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link to="/become" >
                            <Button
                                backgroundImage={`url(${btn_bg})`}
                                backgroundSize="cover"
                                backgroundPosition="center"
                                color="white"
                                _hover={{bg: 'brown.600'}}
                                _active={{bg: 'brown.700'}}
                                fontSize={{base: "12px", md: "14px", lg: "16px"}}
                            >
                                Become an ArtFinder
                            </Button>
                        </Link>
                    </>
                    }
                    {userinfo &&
                    <>
                        <Menu>
                            <MenuButton
                                as={Button}
                                backgroundImage={`url(${btn_bg})`}
                                backgroundSize="cover"
                                backgroundPosition="center"
                                color="white"
                                fontSize={{base: "12px", md: "14px", lg: "16px"}}
                                _hover={{bg: 'brown.600'}}
                                _active={{bg: 'brown.700'}}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setIsSubMenuOpen(true)}

                            >
                                <Link to="/">
                                    <Text
                                        fontFamily="InterVariable,-apple-system,system-ui,sans-serif;"
                                        lineHeight="24px"
                                        color="white"
                                    >
                                        Hi @{username}!
                                    </Text>
                                </Link>
                            </MenuButton>
                            <MenuList
                                display={isHovering || isSubMenuOpen ? "block" : "none"}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => setIsSubMenuOpen(true)}
                            >
                                <MenuItem as={Link} to="/" target="_blank" rel="noopener noreferrer">
                                    Edit Profile
                                </MenuItem>
                                <MenuItem onClick={Signout}>
                                    Sign Out
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        <Avatar
                        size="md"
                        name="User Name"
                        src={avatarSrc}
                        borderRadius="full"
                        boxShadow="md"
                        />
                    </>
                    }

                </Stack>
            </Box>

        </Flex>

    );
}

export default Header;

