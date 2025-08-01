import { FC, useContext, useEffect, useState } from "react";
import { Box, Card, CardBody, Center, Checkbox, Grid, GridItem, Heading, HStack, Radio, RadioGroup, Select, Stack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, VStack } from "@chakra-ui/react";
import { fetchTransactions, fetchYearlyTransactions, getCategories } from "../services/data-service";
import Chart, { GoogleChartWrapper } from "react-google-charts";
import { ITransaction, TransactionType } from "../interface/ITransaction";
import { getIncomeAndExpenseGroupedByMonth, getMonthlyAverageIncomeAndExpense, getTotal, getTransactionsGroupedByCategory } from "../services/transaction-services";
import { ThemeContext } from "../contexts/theme-context";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "@chakra-ui/icons";
import { amountFormatter } from "../utils/helpers";
import PieChart, { AggregationType } from "../components/PieChart";
import { useCategories } from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";

const Dashboard: FC = () => {
    const { theme } = useContext(ThemeContext);
    const [transactionType, setTransactionType] = useState<TransactionType>("expense")
    const [aggregationType, setAggregationType] = useState<AggregationType>("sum")
    const [expandSubCategories, setExpandSubCategories] = useState<boolean>(false);
    const [year, setYear] = useState(new Date().getFullYear());
    const navigate = useNavigate();
    const { categories } = useCategories();
    const { data: transactions } = useQuery({
        queryKey: [year],
        queryFn: () => fetchYearlyTransactions(year),
        enabled: !!categories
    })
    const transactionGroup = getIncomeAndExpenseGroupedByMonth(transactions ?? []);

    const handleBarClick = ({ chartWrapper }: { chartWrapper: GoogleChartWrapper }) => {
        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection[0]?.row === undefined) return;
        const month = selection[0].row as number;
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month +1, 0);

        const start = firstDay.toISOString().slice(0, 10); // "YYYY-MM-DD"
        const end = lastDay.toISOString().slice(0, 10);
        navigate(`/transactions?startDate=${start}&endDate=${end}`);
    };


    return (
        <Box>
            <HStack w='100%' justifyContent='flex-end'>
                <Select variant='filled' w='100px' fontWeight={700} icon={<CalendarIcon />} mb={4} value={year} onChange={(event) => setYear(parseInt(event.target.value))}>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                </Select>
            </HStack>
            <Grid gap={4} templateColumns='repeat(12, 1fr)'>
                <GridItem colSpan={[12]}>
                    <Card>
                        <CardBody>
                            <Chart
                                chartEvents={[
                                    {
                                        eventName: "select",
                                        callback: handleBarClick,
                                    },
                                ]}
                                chartType="Bar"
                                height="400px"
                                data={transactionGroup}
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
                <GridItem colSpan={12}>
                    <Card>
                        <CardBody>
                            <Grid gap={4} templateColumns='repeat(12, 1fr)'>
                                <GridItem colSpan={[12, 12, 6]}>
                                    <PieChart transactions={transactions ?? []} categories={categories ?? []} aggregationType={aggregationType} transactionType={transactionType} />
                                </GridItem>
                                <GridItem colSpan={[12, 12, 6]} >
                                    <Center h='100%'>
                                        <VStack alignItems="flex-start" spacing={8}>
                                            <RadioGroup onChange={(value: string) => setTransactionType(value as TransactionType)} value={transactionType}>
                                                <Stack direction='row'>
                                                    <Radio value="expense">Expense</Radio>
                                                    <Radio value='income'>Income</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            <RadioGroup onChange={(value: string) => setAggregationType(value as AggregationType)} value={aggregationType}>
                                                <Stack direction='row'>
                                                    <Radio value="sum">Sum</Radio>
                                                    <Radio value='average'>Average</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            <Checkbox checked={expandSubCategories} onChange={(value) => setExpandSubCategories(value.target.value === "true" ? true : false)}>Expand Sub Categories</Checkbox>
                                        </VStack>
                                    </Center>
                                </GridItem>
                            </Grid>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default Dashboard