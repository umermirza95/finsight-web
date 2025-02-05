import { FC, useContext, useEffect, useState } from "react";
import { Box, Card, CardBody, Center, Grid, GridItem, Heading, HStack, Select, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { fetchTransactions, fetchYearlyTransactions, getCategories } from "../services/data-service";
import Chart from "react-google-charts";
import { ITransaction } from "../interface/ITransaction";
import { getIncomeAndExpenseGroupedByMonth, getMonthlyAverageIncomeAndExpense, getTotal, getTransactionsGroupedByCategory } from "../services/transaction-services";
import { ThemeContext } from "../contexts/theme-context";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "@chakra-ui/icons";
import { amountFormatter } from "../utils/helpers";
import PieChart from "../components/PieChart";

const Dashboard: FC = () => {
    const { theme } = useContext(ThemeContext);
    const [year, setYear] = useState(new Date().getFullYear());
    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories()
    })
    const { data: transactions } = useQuery({
        queryKey: [year],
        queryFn: () => fetchYearlyTransactions(year),
        enabled: !!categories
    })


    return (
        <Box>
            <HStack w='100%' justifyContent='flex-end'>
                <Select variant='filled' w='100px' fontWeight={700} icon={<CalendarIcon />} mb={4} value={year} onChange={(event) => setYear(parseInt(event.target.value))}>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                </Select>
            </HStack>
            <Grid gap={4} templateColumns='repeat(12, 1fr)'>
                <GridItem colSpan={[12]}>
                    <Card>
                        <CardBody>
                            <Chart
                                chartType="Bar"
                                height="400px"
                                data={getIncomeAndExpenseGroupedByMonth(transactions ?? [])}
                                options={{
                                    legend: {
                                        position: 'none'
                                    },
                                    colors: [theme.graphColorIncome, theme.graphColorExpense]
                                }}
                            />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={[12, 12, 6]}>
                    <Card>
                        <CardBody>
                            <PieChart transactions={transactions ?? []} categories={categories ?? []} type="income" />
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem colSpan={[12, 12, 6]}>
                    <Card>
                        <CardBody>
                            <PieChart transactions={transactions ?? []} categories={categories ?? []} type="expense" />
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Dashboard