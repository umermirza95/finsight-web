import { FC, useEffect, useState } from "react";
import Page from "../components/Page";
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { ITransaction } from "../interface/ITransaction";
import { fetchTransactions } from "../services/data-service";
import TransactionItem from "../components/TransactionItem";

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

    return (
        <Page>
            <Card mx={10}>
                <CardHeader>
                    <Heading size='md'>Transactions</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='3'>
                        {
                            transactions.map(transaction => (
                                <TransactionItem transaction={transaction} />
                            ))
                        }
                    </Stack>
                </CardBody>
            </Card>
        </Page>
    );
}

export default TransactionPage