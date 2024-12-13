import {getAllIncomes} from "../../../../../../lib/actions/income.actions";


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        // Fetch incomes using the provided ID from params
        const getIncomes = await getAllIncomes(params.id);

        if (!getIncomes || getIncomes.length === 0) {
            return new Response(JSON.stringify({ message: "Incomes not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(getIncomes), { status: 200 });
    } catch (err) {
        console.error("Error fetching incomes:", err);
        return new Response(JSON.stringify({ message: "Failed to execute" }), { status: 500 });
    }
}