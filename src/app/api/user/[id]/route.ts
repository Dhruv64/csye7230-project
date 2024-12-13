import {getUserById,updateUserPlan} from '../../../../../lib/actions/user.actions';


export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        // Fetch user using the provided ID from params
        const getUser = await getUserById(params.id);

        if (!getUser) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(getUser), { status: 200 });
    } catch (err) {
        console.error("Error fetching user:", err);
        return new Response(JSON.stringify({ message: "Failed to execute" }), { status: 500 });
    }
}


export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const { plan } = await req.json();

        if (!plan) {
            return new Response(JSON.stringify({ message: "Plan is required" }), { status: 400 });
        }

        // Fetch user using the provided ID from params
        const getUser = await getUserById(params.id);

        if (!getUser) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Update the user's plan
        const updatedUser = await updateUserPlan(params.id, plan);

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (err) {
        console.error("Error updating user:", err);
        return new Response(JSON.stringify({ message: "Failed to execute" }), { status: 500 });
    }
};
