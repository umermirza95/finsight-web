import path from "path";

export const monthNamesShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export function pathNameToHeading(pathName: string): string {
    switch (pathName) {
        case '/':
            return 'Dashboard'
        case '/transactions':
            return 'Transactions'
        case '/transactions/add':
            return 'Add Transaction'
        default:
            return ''
    }
}