import {useEffect, useState} from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    Heading,
    useToast, Alert, AlertIcon
} from '@chakra-ui/react';
import btn_bg from "../images/gallerydark.jpg";
import btn_sub from "../images/wood.jpg";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate   = useNavigate();
    const [data, setData] = useState({
        fname: "",
        lname: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        display: "",
    });

    const handleDisplayChange = (event) => {
        const dispfile = event.target.files[0];
        setData({ ...data, display: dispfile });
    };
    const handleChange = (key, value) => {
        setData({...data, [key]: value})
    }
    const validateEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        // Regular expression to validate password format
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        return passwordRegex.test(password);
    };

    const toast = useToast();
    // Function to check if a user with the provided username exists
    const [userExists, setUserExists] = useState(false);
    const checkUserExists = async (username) => {
        try {
            const response = await fetch(`https://api.artpathfinder.com/api/checkUserExists?username=${username}`);

            if (response.ok) {
                //alert("i am here");
                const result = await response.json();
                console.log(15, result);
                if(result.message){
                    setUserExists(true);
                } else {
                    setUserExists(false);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (data.username) {
            // Check for user existence when the username field changes
            // alert(data.username)
            if(data.username.length > 1){
                checkUserExists(data.username);
            } else{
                setUserExists(true);
            }
        }
    }, [data.username]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        try {
            const response = await fetch('https://api.artpathfinder.com/api/addUser', {
                method: 'POST',
                body: formData,

                // headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const responseData = await response.json();

                // Save response data to local storage
                localStorage.setItem('userinfo', JSON.stringify(responseData));

                toast({
                    title: "Form submitted!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                //Redirect home
                navigate('/');
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
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={78}
            backgroundImage={`url(${btn_bg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            //height="100vh"
        >
            <form onSubmit={handleSubmit}>
                <VStack
                    border="1px solid #8b45135c"
                    borderRadius="md"
                    padding={8}
                    spacing={4}
                    width="400px"
                    bg="white"
                    opacity="0.8"
                    boxShadow="10px 4px 20px rgba(0, 0, 0, 0.2)"
                >
                    <Heading size="md" textAlign="center">
                        ArtPathFinder
                    </Heading>

                    <FormControl isRequired>
                        <FormLabel fontSize="sm">First Name</FormLabel>
                        <Input type="text"
                               borderColor="#8b45135c"
                               bg="#80808038"
                               value={data.fname}
                               onChange={(event) => handleChange('fname', event.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontSize="sm" >Last Name</FormLabel>
                        <Input type="text"
                               borderColor="#8b45135c"
                               bg="#80808038"
                               value={data.lname}
                               onChange={(event) => handleChange('lname', event.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontSize="sm">Username</FormLabel>
                        <Input type="text"
                               borderColor="#8B45135c"
                               bg="#80808038"
                               value={data.username}
                               onChange={(event) => handleChange('username', event.target.value)}
                        />

                        <Alert status="error" variant="subtle">
                            <AlertIcon color={userExists? 'red' : 'green'} />
                            {userExists ? 'Username already exists' : 'Username is valid'}
                        </Alert>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel fontSize="sm">Email</FormLabel>
                        <Input type="email"
                               borderColor="#8B45135c"
                               bg="#80808038"
                               placeholder="Enter your Email : artpathfinder@you.com"
                               value={data.email}
                               onChange={(event) => handleChange('email', event.target.value)}
                               errorBorderColor="red.300"
                        />
                        <FormErrorMessage>
                            {data.email && !validateEmail(data.email) && "Invalid email address"}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired >
                        <FormLabel fontSize="sm" >Phone:</FormLabel>
                        <Input
                            type="tel"
                            borderColor="#8b45135c"
                            bg="#80808038"
                            placeholder="Enter your phone number"
                            value={data.phone}
                            onChange={(event) => handleChange("phone", event.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired >
                        <FormLabel fontSize="sm" >Password</FormLabel>
                        <Input type="password"
                               borderColor="#8b45135c"
                               bg="#80808038"
                               placeholder="Enter your password"
                               value={data.password}
                               onChange={(event) => handleChange("password", event.target.value)}
                               errorBorderColor="red.300"
                        />
                        <FormErrorMessage>
                            {data.password && !validatePassword(data.password) && "Invalid password format"}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired mt={4} isInvalid={data.password !== data.confirmPassword}>
                        <FormLabel fontSize="sm">Confirm Password:</FormLabel>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
                            borderColor="#8b45135c"
                            bg="#80808038"
                            value={data.confirmPassword}
                            onChange={(event) => handleChange("confirmPassword", event.target.value)}
                            errorBorderColor="red.300"
                        />
                        <FormErrorMessage>
                            {data.password !== data.confirmPassword && "Passwords do not match"}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Display Image:</FormLabel>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleDisplayChange}
                        />
                    </FormControl>
                    <Button
                        width="full"
                        type="submit"
                        // bg="#8B4513"
                        backgroundImage={`url(${btn_sub})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        color="white"
                        _hover={{bg: 'brown.600'}}
                        _active={{bg: 'brown.700'}}
                        isDisabled={userExists || !data.username} // Disable the button if the user exists or username is empty
                    >
                        Sign Up
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}

export default SignUp;