import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface props {
    children: React.ReactNode;
}
const Page: FC<props> = ({ children }) => {
    return (
        <Box  w='100vw'  minH='100vh'>
            {children}
        </Box>
    )
}

export default Page;