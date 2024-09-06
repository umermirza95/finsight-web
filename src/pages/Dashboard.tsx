import { FC, useEffect, useState } from "react";
import Page from "../components/Page";
import { Box, Card, CardBody, Grid, GridItem, Heading, HStack, Show, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { fetchTransactions } from "../services/data-service";
import Chart from "react-google-charts";
import { ITransaction } from "../interface/ITransaction";
import { getIncomeAndExpenseGroupedByMonth, getMonthlyAverageIncomeAndExpense } from "../services/transaction-services";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const Dashboard: FC = () => {

    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [data, setData] = useState<any[][]>([])
    const [averages, setAvergaes] = useState<{ avergaeIncome: number, avergaeExpense: number }>({ avergaeIncome: 0, avergaeExpense: 0 })

    const loadTransactions = async () => {
        const date = new Date()
        const from = new Date(date.getFullYear(), 0, 1)
        const to = new Date(date.getFullYear(), 12, 0)
        setTransactions(await fetchTransactions(from, to))
    }

    useEffect(() => {
        setData(getIncomeAndExpenseGroupedByMonth(transactions))
        setAvergaes(getMonthlyAverageIncomeAndExpense(transactions))
    }, [transactions])

    useEffect(() => {
        loadTransactions();
    }, [])

    return (
        <Card>
            <CardBody>
                <Grid gap={4} templateColumns='repeat(12, 1fr)'>
                    <GridItem colSpan={[12, 12, 8]}>
                        <Chart
                            chartType="Bar"
                            height="400px"
                            data={data}
                            options={{
                                legend: {
                                    position: 'none'
                                },
                                colors: ['#17B169', '#E32636']
                            }}
                        />
                    </GridItem>
                    <GridItem colSpan={[12, 12, 4]}>
                        <SimpleGrid spacingY={4} columns={[2, 2, 1]}>
                            <Box>
                                <HStack>
                                    <Text color='green'>Avergae Income</Text>
                                    <TriangleDownIcon color='green' />
                                </HStack>
                                <Heading size='lg'>{`$${averages.avergaeIncome} USD`}</Heading>
                            </Box>
                            <Box>
                                <HStack>
                                    <Text color='red'>Average Expense</Text>
                                    <TriangleUpIcon color='red' />
                                </HStack>
                                <Heading size='lg'>{`$${averages.avergaeExpense} USD`}</Heading>
                            </Box>
                        </SimpleGrid>
                    </GridItem>
                </Grid>
            </CardBody>
        </Card>
    )
}

export default Dashboard