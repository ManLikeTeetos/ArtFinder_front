import {useState} from "react";
import {
    Flex,
    Button,
    Box
} from '@chakra-ui/react';
import btn_bg from "../images/wood.jpg";
import become_bg from "../images/become2.jpeg";
import btn_user from "../images/gallerydark2.jpg";
import btn_agent from "../images/agent.jpg";
import {Link} from "react-router-dom";

function Become() {
    return (
        <Flex
            minHeight="100vh"
            alignItems="center"
            justifyContent="center"
            backgroundImage={`url(${become_bg})`}
            backgroundSize={{ base: "cover", md: "contain" }}
            backgroundPosition="center"
            flexDirection={{ base: "column", md: "row" }}
            overflow="hidden"
        >
            <Link to="/signup" >
                <Button backgroundImage={`url(${btn_user})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                    //filter="brightness(0.6)"
                        m={20}
                        width="300px"
                        height="300px"
                        color="white"
                        fontSize="22px"
                        transition="font-size 0.3s"
                        _hover={{
                            fontSize: "26px",
                        }}
                >
                    <Box
                        className="button-text"
                        bg="black"
                        p="10px"
                        borderRadius="4px"
                    >
                       <span filter="brightness(1.0)"
                       >
                           Sign up <br/> As an ArtFinder
                       </span>
                    </Box>
                </Button>
            </Link>
            <Link to="/finder" >
                <Button backgroundImage={`url(${btn_agent})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                    //filter="brightness(0.6)"
                        m={20}
                        width="300px"
                        height="300px"
                        color="black"
                        fontSize="22px"
                        fontWeight="bold"
                        transition="font-size 0.3s"
                        _hover={{
                            fontSize: "26px",
                        }}
                >
                    <Box
                        className="button-text"
                        bg="white"
                        p="10px"
                        borderRadius="4px"
                    >
                        <span filter="brightness(1.0)"
                        >
                            Sign up  <br/> As an Agent
                        </span>
                    </Box>
                </Button>
            </Link>
        </Flex>
    );
}

export default Become;