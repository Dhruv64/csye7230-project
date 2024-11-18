import {getUserById} from '../../../../../lib/actions/user.actions';


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