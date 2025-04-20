import { FC } from "react";
import { ITransaction, TransactionType } from "../interface/ITransaction";
import { Box, Center, Heading, HStack } from "@chakra-ui/react";
import { amountFormatter } from "../utils/helpers";
import { getTotal, getTransactionsGroupedByCategory } from "../services/transaction-services";
import Chart from "react-google-charts";
import { ICategory } from "../interface/ICategory";

export type AggregationType = "sum" | "average"
interface Props {
    transactionType: TransactionType,
    aggregationType: AggregationType
    transactions: ITransaction[],
    categories: ICategory[]
}
const PieChart: FC<Props> = ({ transactionType, transactions, categories, aggregationType }) => {
    return (
        <Box>
            <Heading size='md' textAlign="center">
                {aggregationType === "sum" ? "Total" : "Average"}{" "}
                {transactionType === "expense" ? "Expenses" : "Income"}{" "}
                {amountFormatter(getTotal(transactions ?? [], transactionType))}
            </Heading>
            <Chart
                chartType="PieChart"
                height="400px"
                data={getTransactionsGroupedByCategory(transactions ?? [], categories ?? [], transactionType)}
                options={{
                    is3D: false,
                    legend: {
                        position: 'none'
                    }
                }}

            />
        </Box>
    )
};

export default PieChart;