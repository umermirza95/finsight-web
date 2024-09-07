import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props{
    onClick:()=> void
}

const FSDrawer: FC<Props> = ({onClick}) => {
    const navigate = useNavigate();

    const gotoTransactions = () => {
		onClick();
		navigate('/transactions')
	}

	const gotoDashboard = () => {
		onClick();
		navigate('/')
	}


    return (
        <VStack h='100%'>
            <Center h='10%' >
                <Heading color='white' size='lg'>FINSIGHT</Heading>
            </Center>
            <VStack spacing='4' mt='10%' w='100%' >
                <Box onClick={gotoDashboard} cursor='pointer' px='4' py='3' bg='teal' w='100%' >
                    <Heading color='white' size='sm'>Dashboard</Heading>
                </Box>
                <Box onClick={gotoTransactions} cursor='pointer' px='4' py='3' bg='teal' w='100%' >
                    <Heading color='white' size='sm'>Transactions</Heading>
                </Box>
            </VStack>
        </VStack>
    )
}

export default FSDrawer