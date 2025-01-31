import { FC } from "react";
import { ITransaction, TransactionType } from "../interface/ITransaction";
import { Box, Center, Heading, HStack } from "@chakra-ui/react";
import { amountFormatter } from "../utils/helpers";
import { getTotal, getTransactionsGroupedByCategory } from "../services/transaction-services";
import Chart from "react-google-charts";
import { ICategory } from "../interface/ICategory";

interface Props {
    type: TransactionType,
    transactions: ITransaction[],
    categories: ICategory[]
}
const PieChart: FC<Props> = ({type, transactions, categories}) => {
    return (
        <Box>
            <Center transform='translate(-50%, -50%)' top='50%' left='50%' position='absolute' zIndex={100}>
                <Heading size='lg' >
                    {amountFormatter(getTotal(transactions ?? [], type))}
                </Heading>
            </Center>
            <HStack justify='center'>
                <Heading size='sm'>
                    {type === "expense" ? "Total Expenses" : "Total Income"}
                </Heading>
            </HStack>
            <Chart
                chartType="PieChart"
                height="400px"
                data={getTransactionsGroupedByCategory(transactions ?? [], categories ?? [], type)}
                options={{
                    pieHole: 0.5,
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