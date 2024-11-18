import {getAllBudgets} from '../../../../../../lib/actions/budget.actions';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        // Fetch budgets using the provided ID from params
        const getBudgets = await getAllBudgets(params.id);

        if (!getBudgets || getBudgets.length === 0) {
            return new Response(JSON.stringify({ message: "Budgets not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(getBudgets), { status: 200 });
    } catch (err) {
        console.error("Error fetching budgets:", err);
        return new Response(JSON.stringify({ message: "Failed to execute" }), { status: 500 });
    }
};