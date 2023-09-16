import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import { RiMoneyDollarCircleFill, RiFilterFill } from "react-icons/ri";

// import categories from "./expense-tracker/categories";

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [expenses, setExpenses] = useState([
        { id: 1, description: "Flour", qty: 1, amount: 75, category: "Bakery" },
        { id: 2, description: "Sugar", qty: 2, amount: 110, category: "Food" },
        {
            id: 3,
            description: "Ginger",
            qty: 5,
            amount: 200,
            category: "Spice",
        },
        {
            id: 4,
            description: "Tumeric",
            qty: 3,
            amount: 390,
            category: "Spice",
        },
        { id: 5, description: "Rice", qty: 1, amount: 987, category: "Food" },
    ]);

    const visibleExpenses = selectedCategory
        ? expenses.filter((event) => event.category === selectedCategory)
        : expenses;

    return (
        <div className='contain'>
            <h1 className='text-center m-2 p-2 text-bg-danger'>
                <RiMoneyDollarCircleFill /> Expense Tracker
            </h1>
            <div className='m-2 p-2 mb-5 text-bg-light'>
                <ExpenseForm
                    onSubmit={(newExpense) =>
                        setExpenses([
                            ...expenses,
                            { ...newExpense, id: expenses.length + 1 },
                        ])
                    }
                />
            </div>

            <div className='m-3'>
                <h5>
                    <RiFilterFill />
                    Filter By
                </h5>
                <ExpenseFilter
                    onSelectCategory={(category) =>
                        setSelectedCategory(category)
                    }
                ></ExpenseFilter>
            </div>

            <div className="container">
                <ExpenseList
                    expenses={visibleExpenses}
                    onDelete={(id) =>
                        setExpenses(expenses.filter((e) => e.id !== id))
                    }
                />
            </div>
        </div>
    );
};

export default App;
