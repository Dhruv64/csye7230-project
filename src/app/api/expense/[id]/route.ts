import {deleteExpense} from '../../../../../lib/actions/expense.actions';
import { getLastFiveExpenses } from '../../../../../lib/actions/expense.actions';


export const DELETE = async (req: Request,{ params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const expense = await deleteExpense(id);
        return new Response(JSON.stringify(expense), { status: 200 });
    }
    catch (err) {
        console.error("Error in DELETE /api/expense/[id]:", err);
        return new Response(JSON.stringify({ error: "Failed to delete Expense" }), { status: 500 });
    }
}



export const GET = async (req: Request,{ params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const expenses = await getLastFiveExpenses(id);
        return new Response(JSON.stringify(expenses), { status: 200 });
    }
    catch (err) {
        console.error("Error in GET /api/expense/[id]:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch Expenses" }), { status: 500 });
    }
}