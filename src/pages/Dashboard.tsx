import { FC, useContext, useEffect, useState } from "react";
import { Box, Card, CardBody, Grid, GridItem, HStack, Select } from "@chakra-ui/react";
import { fetchTransactions, fetchYearlyTransactions } from "../services/data-service";
import Chart from "react-google-charts";
import { ITransaction } from "../interface/ITransaction";
import { getIncomeAndExpenseGroupedByMonth, getMonthlyAverageIncomeAndExpense } from "../services/transaction-services";
import { ThemeContext } from "../contexts/theme-context";
import { useQuery } from "@tanstack/react-query";
import { CalendarIcon } from "@chakra-ui/icons";

const Dashboard: FC = () => {
    const { theme } = useContext(ThemeContext);
    const [year, setYear] = useState(new Date().getFullYear());
    const { data: transactions } = useQuery({
        queryKey: [year],
        queryFn: () => fetchYearlyTransactions(year)
    })

    return (
        <Box>
            <HStack w='100%' justifyContent='flex-end'>
                <Select variant='filled' w='100px' fontWeight={700} icon={<CalendarIcon/>} mb={4}   value={year} onChange={(event) => setYear(parseInt(event.target.value))}>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                </Select>
            </HStack>
            <Card>
                <CardBody>
                    <Grid gap={4} templateColumns='repeat(12, 1fr)'>
                        <GridItem colSpan={[12]}>
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
                        </GridItem>
                    </Grid>
                </CardBody>
            </Card>
        </Box>
    )
}

export default Dashboard