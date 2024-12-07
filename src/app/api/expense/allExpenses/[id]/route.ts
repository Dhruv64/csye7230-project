import { getAllExpenses } from "../../../../../../lib/actions/expense.actions";


export const GET = async ( req: Request,{ params }: { params: { id: string } }) => {
    try {
        // Fetch expenses using the provided ID from params
        const getExpenses = await getAllExpenses(params.id);

        if (!getExpenses || getExpenses.length === 0) {
            return new Response(JSON.stringify({ message: "Expenses not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(getExpenses), { status: 200 });
    } catch (err) {
        console.error("Error fetching expenses:", err);
        return new Response(JSON.stringify({ message: "Failed to execute" }), { status: 500 });
    }
    
}