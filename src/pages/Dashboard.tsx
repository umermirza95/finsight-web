import { FC, useContext, useEffect, useState } from "react";
import { Card, CardBody, Grid, GridItem } from "@chakra-ui/react";
import { fetchTransactions, fetchYearlyTransactions } from "../services/data-service";
import Chart from "react-google-charts";
import { ITransaction } from "../interface/ITransaction";
import { getIncomeAndExpenseGroupedByMonth, getMonthlyAverageIncomeAndExpense } from "../services/transaction-services";
import { ThemeContext } from "../contexts/theme-context";
import { useQuery } from "@tanstack/react-query";

const Dashboard: FC = () => {
    const { theme } = useContext(ThemeContext);
    const [year, setYear] = useState(new Date().getFullYear());
    const { data: transactions } = useQuery({
        queryKey: [year],
        queryFn: () => fetchYearlyTransactions(year)
    })
    
    return (
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
    )
}

export default Dashboard