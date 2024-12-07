import {getExpenseByBudgetId} from '../../../../../../lib/actions/expense.actions';


export const GET = async (req: Request,{ params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const expense = await getExpenseByBudgetId(id);
        return new Response(JSON.stringify(expense), { status: 200 });
    }
    catch (err) {
        console.error("Error in GET /api/expense/byBudget/[id]:", err);
        return new Response(JSON.stringify({ error: "Failed to get Expense" }), { status: 500 });
    }
}