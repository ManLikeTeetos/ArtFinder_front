import {useState} from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Textarea,
    Button,
    useToast, Box, Heading, Text, VStack,
} from "@chakra-ui/react";
import DateTimePicker from "react-datetime-picker";
import backgroundImage from "../images/Leonardo-Da-Vinci-Monna-Lisa.jpg";
import Header from "../components/Header";
import btn_bg from "../images/agent.jpg";
import btn_sub from "../images/wood.jpg";
import {useNavigate} from "react-router-dom";

function Finder() {
    const navigate   = useNavigate();
    const [data, setData] = useState({
        lname: "",
        fname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        display:"",
        agent: "Y"
    });
    const current = new Date();

    const handleChange = (key, value) => {
        setData({...data, [key]: value})
    }

    const handleDisplayChange = (event) => {
        const dispfile = event.target.files[0];
        setData({ ...data, display: dispfile });
    };
    const handleBannerChange = (event) => {
        const bannerfile = event.target.files[0];
        setData({ ...data, banner: bannerfile });
    };
    const handleImagesChange = (event) => {
        const files = event.target.files;
        setData({ ...data, images: files });
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        // do something with form data, e.g. submit to server
        const formData = new FormData();
        for ( var key in data ) {
            if ( key === 'images' ) {
                // Iterate through each image in the array and append it to formData
                for (var i = 0; i < data[key].length; i++) {
                    formData.append(key + '[' + i + ']', data[key][i]);
                }
            } else {
                // For all other keys in data, simply append the key-value pair to formData
                formData.append(key, data[key]);
            }
        }
        try {


            const response = await fetch('http://localhost:8000/api/addUser', {
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
                        ArtFinder Agent
                    </Heading>
                    <FormControl isRequired>
                        <FormLabel>First Name:</FormLabel>
                        <Input
                            type="text"
                            placeholder="Art"
                            value={data.fname}
                            onChange={(event) => handleChange('fname', event.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Last Name:</FormLabel>
                        <Input
                            type="text"
                            placeholder="Finder"
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
                    </FormControl>
                    <FormControl isRequired mt={4} isInvalid={!validateEmail(data.email)}>
                        <FormLabel>Email:</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your Email : artfinderx@you.com"
                            value={data.email}
                            onChange={(event) => handleChange('email', event.target.value)}
                            errorBorderColor="red.300"
                        />
                        <FormErrorMessage>
                            {data.email && !validateEmail(data.email) && "Invalid email address"}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired mt={4}>
                        <FormLabel>Phone:</FormLabel>
                        <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={data.phone}
                            onChange={(event) => handleChange("phone", event.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired mt={4} isInvalid={!validatePassword(data.password)}>
                        <FormLabel>Password:</FormLabel>
                        <Input
                            type="password"
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
                        <FormLabel>Confirm Password:</FormLabel>
                        <Input
                            type="password"
                            placeholder="Confirm your password"
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
                    >
                        Sign Up
                    </Button>
                </VStack>
            </form>
        </Box>
    )
};

export default Finder;
