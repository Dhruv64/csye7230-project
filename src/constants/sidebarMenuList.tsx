import { LayoutGrid,PiggyBank,ReceiptText,ShieldCheck,CircleDollarSign } from "lucide-react";
import path from "path";

export const menuList=[
    {
        id:1,
        name:'Dashboard',
        icon: LayoutGrid,
        path:'/dashboard',
    },
    {
        id:2,
        name:'Income',
        icon: CircleDollarSign,
        path:'/dashboard/income',
    },
    {
        id:3,
        name:'Budgets',
        icon: PiggyBank,
        path:'/dashboard/budgets',
    },
    {
        id:4,
        name:'Expenses',
        icon: ReceiptText,
        path:'/dashboard/expenses',
    },  
    {
        id:5,
        name:'Upgrade Plan',
        icon: ShieldCheck,
        path:'/dashboard/upgrade',
    }

]