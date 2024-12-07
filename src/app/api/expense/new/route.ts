import {createExpense} from '../../../../../lib/actions/expense.actions';
import { getBudgetById } from '../../../../../lib/actions/budget.actions';


export const POST = async (req: Request) => {
    try {
        const { name, amount, budgetId } = await req.json();



        const budget = await getBudgetById(budgetId);
        const createdBy = (budget as any).createdBy || 'defaultCreatedBy';



        const expense = {
            name,
            amount,
            budgetId,
            createdBy
        };  

        const createExpenseResponse = await createExpense(expense);
        return new Response(JSON.stringify(createExpenseResponse), { status: 200 });
    
    }
    catch (err) {
        console.error("Error in POST /api/expense/new:", err);
        return new Response(JSON.stringify({ error: "Failed to create Expense" }), { status: 500 });
    }
    
}