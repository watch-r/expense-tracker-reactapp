import { RiFileList2Line } from "react-icons/ri";

interface Expense {
    id: number;
    description: string;
    qty: number;
    amount: number;
    category: string;
}

interface Props {
    expenses: Expense[];
    onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
    if (expenses.length === 0) return null;
    return (
        <>
            <div className="text-light bg-danger">
                <h2 className='text-center p-2 mt-3'>
                    <RiFileList2Line /> Expense List
                </h2>
            </div>
            <table className='table table-bordered font-size-table'>
                <thead>
                    <tr className='text-center'>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td className='text-center'>
                                {expense.description}
                            </td>
                            <td className='text-end'>{expense.qty} kg</td>
                            <td className='text-end'>
                                ৳{expense.qty * expense.amount}
                            </td>
                            <td className='text-center'>{expense.category}</td>
                            <td className='text-center'>
                                <button
                                    className='btn btn-outline-warning'
                                    onClick={() => onDelete(expense.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td className='text-center'>Total</td>
                        <td className='text-center'>----</td>
                        <td className='text-end'>
                            ৳
                            {expenses.reduce(
                                (acc, expense) => expense.amount + acc,
                                0
                            )}
                        </td>
                        <td className='text-center'>----</td>
                        <td className='text-center'>----</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ExpenseList;
