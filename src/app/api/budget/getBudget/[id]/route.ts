import {getBudgetById} from '../../../../../../lib/actions/budget.actions';
import { deleteBudgetById } from '../../../../../../lib/actions/budget.actions';


export const GET = async (req : Request,{ params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const budget = await getBudgetById(id);
        return new Response(JSON.stringify(budget), { status: 200 });
    } catch (err) {
        console.error("Error in GET /api/budget/getBudget:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch budget" }), { status: 500 });
    }
}




export const DELETE = async (req : Request,{ params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        const budget = await deleteBudgetById(id);
        return new Response(JSON.stringify(budget), { status: 200 });
    } catch (err) {
        console.error("Error in DELETE /api/budget/getBudget:", err);
        return new Response(JSON.stringify({ error: "Failed to delete budget" }), { status: 500 });
    }
}