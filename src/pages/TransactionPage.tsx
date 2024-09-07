import { FC, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Heading, HStack, Stack, StackDivider} from "@chakra-ui/react";
import { ITransaction } from "../interface/ITransaction";
import { fetchTransactions } from "../services/data-service";
import TransactionItem from "../components/TransactionItem";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


const TransactionPage: FC = () => {
    const navigate = useNavigate();
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
                <HStack justify='space-between'>
                    <Button size='sm' leftIcon={<SettingsIcon />} colorScheme='teal' variant='solid'>
                        Filters
                    </Button>
                    <Button onClick={()=> navigate('/transactions/add')} size='sm' leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
                        Create New
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