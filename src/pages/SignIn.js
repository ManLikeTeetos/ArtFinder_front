import {useState} from "react";
import {Box, Button, FormControl, FormLabel, Heading, Input, VStack,useToast} from "@chakra-ui/react";
import btn_bg from "../images/wood.jpg";
import backgroundImage from "../images/Leonardo-Da-Vinci-Monna-Lisa.jpg";
import { useNavigate } from 'react-router-dom';


function SignIn() {
    const navigate   = useNavigate();
    const [data, setData] = useState({
        userid: "",
        password: "",
    });

    const handleChange = (key, value) => {
        setData({...data, [key]: value})
    };

    const toast = useToast();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        try {
            const response = await fetch('http://localhost:8000/api/signIn', {
                method: 'POST',
                body: formData,
                // headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const responseData = await response.json();
                //console.log(responseData);
                let title = responseData.error ? responseData.error : "Success";
                let status = responseData.error ? "error" : "success";




                toast({
                    title: title,
                    status: status,
                    position: "top",
                    duration: 3000,
                    isClosable: true,
                });
                if(!responseData.error) {
                    localStorage.setItem('userinfo', JSON.stringify(responseData));
                    navigate("/");
                }
            }
            else {
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
            height="100vh"
            backgroundImage={`url(${backgroundImage})`}
            backgroundSize="cover"
            backgroundPosition="center"
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
                        ArtFinder
                    </Heading>
                    <FormControl>
                        <FormLabel fontSize="sm">Username or Email </FormLabel>
                        <Input fontSize="sm"
                               type="text"
                               borderColor="#8B45135c"
                               bg="#80808038"
                               value={data.userid}
                               onChange={(event) => handleChange("userid", event.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize="sm">Password</FormLabel>
                        <Input fontSize="sm"
                               type="password"
                               borderColor="#8b45135c"
                               bg="#80808038"
                               value={data.password}
                               onChange={(event) => handleChange("password", event.target.value)}
                        />
                    </FormControl>
                    <Button
                        width="full"
                        type="submit"
                        // bg="#8B4513"
                        backgroundImage={`url(${btn_bg})`}
                        backgroundSize="cover"
                        backgroundPosition="center"
                        color="white"
                        _hover={{bg: 'brown.600'}}
                        _active={{bg: 'brown.700'}}
                    >
                        Sign in
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}

export default SignIn;