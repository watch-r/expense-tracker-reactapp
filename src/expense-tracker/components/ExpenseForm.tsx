import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import categories from "../categories";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

interface ExpenseFormProps {
    onSubmit: (data: ExpenseFormData) => void;
}

const schemaExpense = z.object({
    description: z
        .string()
        .min(3, { message: "Description should be atleast 3 characters" })
        .max(50),
    qty: z
        .number({ invalid_type_error: "Quantity must be atleast 0.5 kg" })
        .min(0.5)
        .max(100),
    amount: z
        .number({ invalid_type_error: "Amount is required" })
        .min(0)
        .max(100_000),
    category: z.enum(categories, {
        errorMap: () => ({ message: "Category is required" }),
    }),
});

type ExpenseFormData = z.infer<typeof schemaExpense>;

const ExpenseForm = ({ onSubmit }: ExpenseFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ExpenseFormData>({
        resolver: zodResolver(schemaExpense),
    });

    return (
        <form
            onSubmit={handleSubmit((data) => {
                onSubmit(data);
                reset();
            })}
            action=''
        >
            <div className='mb-3'>
                <label htmlFor='description' className='form-label'>
                    Description
                </label>
                <input
                    {...register("description")}
                    id='description'
                    type='text'
                    className='form-control'
                />
                {errors.description && (
                    <p className='text-danger'>{errors.description.message}</p>
                )}
            </div>
            <div className='mb-3'>
                <label htmlFor='qty' className='form-label'>
                    Qunatity
                </label>
                <input
                    {...register("qty", { valueAsNumber: true })}
                    id='qty'
                    type='number'
                    className='form-control'
                />
                {errors.qty && (
                    <p className='text-danger'>{errors.qty.message}</p>
                )}
            </div>
            <div className='mb-3'>
                <label htmlFor='amount' className='form-label'>
                    Price Per KG
                </label>
                <input
                    {...register("amount", { valueAsNumber: true })}
                    id='amount'
                    type='number'
                    className='form-control'
                />
                {errors.amount && (
                    <p className='text-danger'>{errors.amount.message}</p>
                )}
            </div>
            <div className='mb-3'>
                <label htmlFor='category' className='form-label'>
                    Category
                </label>
                <select
                    {...register("category")}
                    id='category'
                    className='form-select'
                >
                    <option value=''></option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className='text-danger'>{errors.category.message}</p>
                )}
            </div>
            <button className='btn btn-primary font-size-table'>
                <RiArrowRightSLine /> Submit <RiArrowLeftSLine />
            </button>
        </form>
    );
};

export default ExpenseForm;
