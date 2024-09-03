import { FC, useEffect, useState } from "react";
import Page from "../components/Page";
import { Box, Button, Card, CardBody, CardHeader, Heading, HStack, Stack, StackDivider, Stat, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import { ITransaction } from "../interface/ITransaction";
import { fetchTransactions } from "../services/data-service";
import TransactionItem from "../components/TransactionItem";
import { SettingsIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const TransactionPage: FC = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([])

    const getTransactions = async () => {
        const currentDate = new Date();
        const firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        setTransactions(await fetchTransactions(firstOfMonth, lastDayOfMonth))
    }

    useEffect(() => {
        getTransactions()
    }, [])

    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, transaction) => sum + transaction.amount, 0);
    return (
        <Page>
            <Card mx='2'>
                <CardHeader>
                    <HStack justify='space-between'>
                        <Heading size='lg'>Transactions</Heading>
                        <Button size='sm' leftIcon={<SettingsIcon />} colorScheme='teal' variant='solid'>
                            Filters
                        </Button>
                    </HStack>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='3'>
                        <HStack justify='space-between'>
                            <Box>
                                <HStack>
                                    <Text color='green'>Total Income</Text>
                                    <TriangleDownIcon color='green' />
                                </HStack>
                                <Heading size='lg'>{`$${totalIncome} USD`}</Heading>
                            </Box>
                            <Box>
                                <HStack>
                                    <Text color='red'>Total Expense</Text>
                                    <TriangleUpIcon color='red' />
                                </HStack>
                                <Heading size='lg'>{`$${totalExpenses} USD`}</Heading>
                            </Box>
                        </HStack>
                        {
                            transactions.map(transaction => (
                                <TransactionItem key={transaction.id} transaction={transaction} />
                            ))
                        }
                    </Stack>
                </CardBody>
            </Card>
        </Page>
    );
}

export default TransactionPage