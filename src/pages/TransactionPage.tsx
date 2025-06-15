import { useRef, FC, useEffect, useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Card, CardBody, CardHeader, HStack, Stack, StackDivider, useDisclosure } from "@chakra-ui/react";
import { ITransaction } from "../interface/ITransaction";
import { deleteTransaction, fetchTransactions } from "../services/data-service";
import TransactionItem from "../components/TransactionItem";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";



const TransactionPage: FC = () => {
    const navigate = useNavigate();
    const { onClose } = useDisclosure()
    const cancelRef = useRef(null)
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [transactionTobeDeleted, setDelTransaction] = useState<ITransaction | undefined>();

    const getTransactions = async () => {
        const currentDate = new Date();
        const firstOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59);
        setTransactions(await fetchTransactions(firstOfMonth, lastDayOfMonth))
    }

    const showDeleteConfirmation = (transaction: ITransaction) => {
        setDelTransaction(transaction);
    }

    const hideDeleteConfirmation = () => {
        setDelTransaction(undefined);
    }

    const delTransaction = async () => {
        try {
            let id = transactionTobeDeleted?.id!!;
            await deleteTransaction(id)
            getTransactions();
        }
        catch (error) {
            console.log(error);
        }
        hideDeleteConfirmation()
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <Card>
            <CardHeader>
                <HStack justify='space-between'>
                    <Button size='sm' leftIcon={<SettingsIcon />} colorScheme='teal' variant='solid'>
                        Filters
                    </Button>
                    <Button onClick={() => navigate('/transactions/add')} size='sm' leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
                        Create New
                    </Button>
                </HStack>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='3'>
                    {
                        transactions.map(transaction => (
                            <TransactionItem key={transaction.id} transaction={transaction} onDelete={showDeleteConfirmation} />
                        ))
                    }
                </Stack>
            </CardBody>
            <AlertDialog
                isOpen={!!transactionTobeDeleted}
                leastDestructiveRef={cancelRef}
                onClose={hideDeleteConfirmation}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Transaction
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={hideDeleteConfirmation}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={delTransaction} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Card >
    );
}

export default TransactionPage