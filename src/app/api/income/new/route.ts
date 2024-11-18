import {createIncome} from '../../../../../lib/actions/income.actions';

export const POST = async (req: Request) => {
    try{
        const {name , amount , createdBy , icon } = await req.json();
        const income = {
            name,
            amount,
            createdBy,
            icon
        };
        const createIncomeResponse = await createIncome(income);

        if (!createIncomeResponse) {
            return new Response(JSON.stringify({ message: "Income not created" }), { status: 404 });
        }

        return new Response(JSON.stringify(createIncomeResponse), { status: 200 });
    }
    catch(err){
        console.error("Error creating Income:", err);
        return new Response(JSON.stringify("Failed to create Income"), { status: 500 });
    }
}
