import { FC, useContext, useState } from "react";
import Page from "../components/Page";
import { Button, Checkbox, FormControl, FormLabel, HStack, Input, NumberInput, NumberInputField, Select, useToast, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { createTransaction, getCategories } from "../services/data-service";
import { ICategory, ISubCategory } from "../interface/ICategory";
import { CategoriesContext } from "../contexts/categories-contexts";

const NewTransactionPage: FC = () => {
    const toast = useToast()
    const { categories } = useContext(CategoriesContext);
    const [type, setType] = useState('expense')
    const [amount, setAmount] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>()
    const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategory | undefined>()
    const [comment, setComment] = useState<string>('')
    const [mode, setMode] = useState<string>('online')
    const [date, setDate] = useState(new Date())
    const [processingFee, setProcessingFee] = useState<number>()
    const [submitting, setSubmitting] = useState(false)

    const onCategoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(categories?.find(c => c.id === event.target.value))
    }

    const onSubCategoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubCategory(selectedCategory?.subCategories?.find(c => c.id === event.target.value))
    }

    const onAmountChange = (strVal: string, numVal: number) => {
        setAmount(strVal)
    }

    const onModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMode(event.target.value)
    }

    const submit = async () => {
        setSubmitting(true);
        const payload = {
            type,
            mode,
            amount,
            comment,
            processingFeePercent: processingFee,
            categoryId: selectedCategory?.id,
            subCategoryId: selectedSubCategory?.id,
            date: date.toISOString()
        }
        try {
            await createTransaction(payload)
        }
        catch (error: any) {
            toast({
                title: 'Error!',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        setSubmitting(false)
    }

    return (
        <Page>
            <VStack mx='2' spacing={5}>
                <FormControl isRequired>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select onChange={(e) => setType(e.target.value)} value={type}>
                        <option value='expense'>Expense</option>
                        <option value='income'>Income</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <HStack justify='space-between'>
                        <FormLabel>Amount</FormLabel>
                        <Checkbox onChange={(e) => e.target.checked ? setProcessingFee(1.45) : setProcessingFee(undefined)} >Add processing fee 1.45%</Checkbox>
                    </HStack>
                    <NumberInput precision={2} value={amount} onChange={onAmountChange} min={0}>
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
                    !!selectedCategory?.subCategories?.length &&
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
                <Button isLoading={submitting} onClick={submit} w='100%' colorScheme='teal' variant='solid'>
                    Submit
                </Button>
            </VStack>
        </Page>
    )
}

export default NewTransactionPage;