import {createBudget} from '../../../../lib/actions/budget.actions';

export const POST = async (req: Request) => {
    try {
        const { name, amount,icon, createdBy } = await req.json();

        const budget = {
            name,
            amount,
            icon,
            createdBy
        };  

        console.log("Budget payload:", budget);
        const createBudgetResponse = await createBudget(budget);
        return new Response(JSON.stringify(createBudgetResponse), { status: 200 });
    
    }
    catch (err) {
        return new Response(JSON.stringify("Failed to create Budget"), { status: 500 });
    }

}
