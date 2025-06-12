import { FC, useEffect, useState } from "react";
import { useForm, Form, FieldValues, Controller } from "react-hook-form"
import { Button, Checkbox, FormControl, FormLabel, HStack, Input, NumberInput, NumberInputField, Select, useToast, VStack } from "@chakra-ui/react";
import { createTransaction, fetchTransactionById } from "../services/data-service";
import { DefaultTransactionForm, NewTransactionForm } from "../types/form-types";
import { getCategoryById } from "../services/category-services";
import { SupportedCurrencies } from "../interface/ITransaction";
import { useCategories } from "../hooks/useCategories";
import { useParams } from "react-router-dom";

const NewTransactionPage: FC = () => {
    const { id } = useParams();
    const isEditMode = !!id && id !== "add";
    const { formState: { errors, isSubmitting }, control, register, watch, setValue } = useForm<NewTransactionForm>()
    const toast = useToast()
    const { categories } = useCategories();
    const selectedCategory = watch("categoryId");




    const onsubmit = async (form: FieldValues) => {
        try {
            await createTransaction(form.data)
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
    }

    const getTransaction = async (tid: string) => {
        try {
            const transaction = await fetchTransactionById(id!);
            Object.entries(transaction).forEach(([key, value]) => {
                if (key === "baseAmount") {
                    setValue("amount", parseInt(value));
                }
                else if (key === "date") {
                    const formattedDate = new Date(value).toISOString().split("T")[0]; // "YYYY-MM-DD"
                    setValue("date", formattedDate);
                }
                else {
                    setValue(key as keyof NewTransactionForm, value);
                }
            });
        } catch (error: any) {
            toast({
                title: 'Failed to load transaction',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        if (!!id && id !== 'add') {
            getTransaction(id);
        }
    }, [id]);


    return (
        <Form control={control} onSubmit={onsubmit}>
            <VStack spacing={5}>
                <FormControl isRequired>
                    <FormLabel>Transaction Type</FormLabel>
                    <Select {...register("type")}>
                        <option value='expense'>Expense</option>
                        <option value='income'>Income</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <HStack justify='space-between'>
                        <FormLabel>Amount</FormLabel>
                        <Checkbox {...register("processingFeePercent")}>Add processing fee 1.45%</Checkbox>
                    </HStack>
                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                precision={2}
                                min={0}
                                value={field.value}
                                onChange={(valueString, valueNumber) => {
                                    if (valueString === "") {
                                        field.onChange("");
                                    } else if (!isNaN(valueNumber)) {
                                        field.onChange(valueNumber);
                                    }
                                }}
                            >
                                <NumberInputField />
                            </NumberInput>
                        )}
                    />
                </FormControl>
                <FormControl isRequired>
                    <HStack justify='space-between'>
                        <FormLabel>Currency</FormLabel>
                        <Checkbox {...register("useLiveFx")} >Use Live FX</Checkbox>
                    </HStack>
                    <Select {...register("currency")}>
                        {Object.values(SupportedCurrencies).map((currency) => {
                            return (
                                <option key={currency} value={currency}>{currency}</option>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select {...register("categoryId")} placeholder='Select Category'>
                        {
                            categories?.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                {
                    !!getCategoryById(categories ?? [], selectedCategory)?.subCategories?.length &&
                    <FormControl>
                        <FormLabel>Sub Category</FormLabel>
                        <Select {...register("subCategoryId")} placeholder='Select Sub Category'>
                            {
                                getCategoryById(categories ?? [], selectedCategory)?.subCategories?.map(subCategory => (
                                    <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                                ))
                            }
                        </Select>
                    </FormControl>
                }
                <FormControl >
                    <FormLabel>Comments</FormLabel>
                    <Input {...register("comment")} placeholder='Comments' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Transaction Mode</FormLabel>
                    <Select {...register("mode")}>
                        <option value='online'>Online</option>
                        <option value='card'>Card</option>
                        <option value='transfer'>Transfer</option>
                        <option value='cash'>Cash</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input {...register("date")} type='date' />
                </FormControl>
                <Button type="submit" isLoading={isSubmitting} w='100%' colorScheme='teal' variant='solid'>
                    Submit
                </Button>
            </VStack>
        </Form>
    )
}

export default NewTransactionPage;