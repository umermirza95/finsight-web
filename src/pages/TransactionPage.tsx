import { useRef, FC, useEffect, useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, CardBody, CardHeader, filter, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Select, Stack, StackDivider, useDisclosure } from "@chakra-ui/react";
import { ITransaction, TransactionType } from "../interface/ITransaction";
import { deleteTransaction, fetchTransactions } from "../services/data-service";
import TransactionItem from "../components/TransactionItem";
import { AddIcon, SettingsIcon } from "@chakra-ui/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCategories } from "../hooks/useCategories";

export interface ITransactionsFilter{
    startDate?: Date,
    endDate?: Date,
    category?: string,
    type?: TransactionType | ''
}

const TransactionPage: FC = () => {
    const [searchParams] = useSearchParams();
    const currentDate = new Date();
    const navigate = useNavigate();
    const { categories } = useCategories();
    const { onClose } = useDisclosure()
    const cancelRef = useRef(null)
    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [transactionTobeDeleted, setDelTransaction] = useState<ITransaction | undefined>();
    const [filters, setFilters] = useState<ITransactionsFilter>({
        startDate: searchParams.get("startDate")
            ? new Date(searchParams.get("startDate")!)
            : new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),

        endDate: searchParams.get("endDate")
            ? new Date(searchParams.get("endDate")!)
            : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59),

        category: searchParams.get("category") || '',
        type: searchParams.get("type") as TransactionType || ''
    });

    const getTransactions = async () => {

        setTransactions(await fetchTransactions(filters))
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
    }, [filters])

    return (
        <Card>
            <CardHeader>
                <HStack justify='space-between'>
                    <Menu>
                        <MenuButton as={Button} size='sm' leftIcon={<SettingsIcon />} colorScheme='teal'>
                            Filters
                        </MenuButton>
                        <MenuList minW="250px" px={4} py={2}>
                            <Stack spacing={4}>
                                <Stack>
                                    <label>Start Date</label>
                                    <Box
                                        border="1px solid"
                                        borderColor="gray.200"
                                        rounded="md"
                                        px={3}
                                        py={2}
                                    >
                                        <Input
                                            type="date"
                                            border="none"
                                            padding="0"
                                            value={filters.startDate?.toISOString().split('T')[0] || ''}
                                            onChange={(e) =>
                                                setFilters((f) => ({ ...f, startDate: new Date(e.target.value) }))
                                            }
                                        />
                                    </Box>
                                </Stack>
                                <Stack>
                                    <label>End Date</label>
                                    <Box
                                        border="1px solid"
                                        borderColor="gray.200"
                                        rounded="md"
                                        px={3}
                                        py={2}
                                    >
                                        <Input
                                            type="date"
                                            border="none"
                                            padding="0"
                                            value={filters.endDate?.toISOString().split('T')[0] || ''}
                                            onChange={(e) =>
                                                setFilters((f) => ({ ...f, startDate: new Date(e.target.value) }))
                                            }
                                        />
                                    </Box>
                                </Stack>
                                <Stack>
                                    <label>Category</label>
                                    <Select
                                        placeholder="All"
                                        value={filters.category}
                                        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
                                    >
                                        {categories?.map((cat) => (
                                            <option key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Stack>
                                <Stack>
                                    <label>Type</label>
                                    <Select
                                        placeholder="All"
                                        value={filters.type}
                                        onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value } as ITransactionsFilter))}
                                    >
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </Select>
                                </Stack>
                            </Stack>
                        </MenuList>
                    </Menu>

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