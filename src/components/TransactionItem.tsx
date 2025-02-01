import { FC, useContext, useEffect, useState } from "react";
import { ITransaction, SupportedCurrencies } from "../interface/ITransaction";
import { Box, Circle, Heading, HStack, Text } from "@chakra-ui/react";
import { CategoriesContext } from "../contexts/categories-contexts";
import { ICategory } from "../interface/ICategory";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

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
            {
                transaction.type === 'expense' ?
                    <Circle bg='red.100' p='2'>
                        <TriangleUpIcon boxSize='5' color='red' />
                    </Circle> :
                    <Circle bg='green.100' p='2'>
                        <TriangleDownIcon boxSize='5' color='green' />
                    </Circle>
            }
            <HStack w='100%' justify='space-between' alignItems='flex-start'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        {category?.name}
                    </Heading>
                    <Text color='gray' fontSize='sm'>
                        {transaction.comment}
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase' color={transaction.type === 'income' ? 'green' : undefined}>
                        {`$${transaction.amount} USD`}
                    </Heading>
                    {
                        !!transaction.currency && transaction.currency !== SupportedCurrencies.USD &&
                        (
                            <Text color='gray' fontSize='sm'>
                                {`${transaction.baseAmount} ${transaction.currency}`}
                            </Text>
                        )
                    }
                </Box>
            </HStack>
        </HStack>
    )
}

export default TransactionItem