import { FC, useState } from "react";
import Page from "../components/Page";
import { Box, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getCategories } from "../services/data-service";
import { ICategory, ISubCategory } from "../interface/ICategory";

const NewTransactionPage: FC = () => {
    const { data: categories } = useQuery('categories', getCategories)
    const [type, setType] = useState('expense')
    const [amount, setAmount] = useState<number>()
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>()
    const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategory | undefined>()
    const [comment, setComment] = useState<string>()
    const [mode, setMode] = useState<string>('online')
    const [date, setDate] = useState(new Date())

    const onCategoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(categories?.find(c => c.id === event.target.value))
    }

    const onSubCategoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubCategory(selectedCategory?.subCategories.find(c => c.id === event.target.value))
    }

    const onAmountChange = (strVal: string, numVal: number) => {
        setAmount(numVal);
    }

    const onModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMode(event.target.value)
    }

    return (
        <Page>
            <VStack px={10} spacing={5}>
                <FormControl isRequired>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select onChange={(e) => setType(e.target.value)} value={type}>
                        <option value='expense'>Expense</option>
                        <option value='income'>Income</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Amount</FormLabel>
                    <NumberInput value={amount} onChange={onAmountChange} min={0}>
                        <NumberInputField />
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select placeholder='Select Category' onChange={onCategoryChanged} value={selectedCategory ? selectedCategory.id : undefined}>
                        {
                            categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                {
                    !!selectedCategory?.subCategories.length &&
                    <FormControl>
                        <FormLabel>Sub Category</FormLabel>
                        <Select placeholder='Select Sub Category' onChange={onSubCategoryChanged} value={selectedSubCategory ? selectedSubCategory.id : undefined}>
                            {
                                selectedCategory.subCategories.map(subCategory => (
                                    <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                }
                <FormControl >
                    <FormLabel>Comments</FormLabel>
                    <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Comments' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Transaction Mode</FormLabel>
                    <Select onChange={onModeChange} value={mode}>
                        <option value='online'>Online</option>
                        <option value='card'>Card</option>
                        <option value='transfer'>Transfer</option>
                        <option value='cash'>Cash</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input onChange={(e) => setDate(new Date(e.target.value))} value={date.toISOString().split('T')[0]} type='date' />
                </FormControl>
            </VStack>
        </Page>
    )
}

export default NewTransactionPage;