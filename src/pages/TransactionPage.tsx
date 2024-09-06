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
        <Card>
            <CardHeader>
                <HStack justify='flex-end'>
                   
                    <Button size='sm' leftIcon={<SettingsIcon />} colorScheme='teal' variant='solid'>
                        Filters
                    </Button>
                </HStack>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='3'>
                    {
                        transactions.map(transaction => (
                            <TransactionItem key={transaction.id} transaction={transaction} />
                        ))
                    }
                </Stack>
            </CardBody>
        </Card>
    );
}

export default TransactionPage