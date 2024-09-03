import { FC, useContext, useEffect, useState } from "react";
import { ITransaction } from "../interface/ITransaction";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { CategoriesContext } from "../contexts/categories-contexts";
import { ICategory } from "../interface/ICategory";

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
        <Box>
            <HStack justify='space-between'>
                <Heading size='xs' textTransform='uppercase'>
                    {category?.name}
                </Heading>
                <Heading size='xs' textTransform='uppercase'>
                    {`$${transaction.amount} USD`}
                </Heading>
            </HStack>
            <Text fontSize='sm'>
                {transaction.comment}
            </Text>
        </Box>
    )
}

export default TransactionItem