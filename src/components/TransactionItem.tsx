import { FC, useContext, useEffect, useState } from "react";
import { ITransaction } from "../interface/ITransaction";
import { Box, Circle, Heading, HStack, Text } from "@chakra-ui/react";
import { CategoriesContext } from "../contexts/categories-contexts";
import { ICategory } from "../interface/ICategory";
import { TriangleUpIcon } from "@chakra-ui/icons";

interface Props {
    transaction: ITransaction
}
const TransactionItem: FC<Props> = ({ transaction }) => {
    const { categories } = useContext(CategoriesContext)
    const [category, setCategory] = useState<ICategory>()

    useEffect(() => {
        setCategory(categories?.find(c => c.id === transaction.categoryId))
    }, [categories, transaction])

    return (
        <HStack>
            <Circle bg='red.100' p='2'>
                <TriangleUpIcon boxSize='5' color='red' />
            </Circle>
            <HStack w='100%' justify='space-between' alignItems='flex-start'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        {category?.name}
                    </Heading>
                    <Text color='gray' fontSize='sm'>
                        {transaction.comment}
                    </Text>
                </Box>
                <Heading size='xs' textTransform='uppercase'>
                    {`$${transaction.amount} USD`}
                </Heading>
            </HStack>
        </HStack>
    )
}

export default TransactionItem