import { FC, useEffect, useState } from "react";
import Page from "../components/Page";
import { Box, Card, CardBody } from "@chakra-ui/react";
import { getIncomeAndExpenseGroupedByMonth } from "../services/data-service";
import Chart from "react-google-charts";

const Dashboard: FC = () => {

    const [data, setData] = useState<any[][]>([])

    const loadData = async () => {
        setData(await getIncomeAndExpenseGroupedByMonth((new Date()).getFullYear()))
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Page>
            <Card mx='2'>
                <CardBody>
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
                </CardBody>
            </Card>
        </Page>
    )
}

export default Dashboard