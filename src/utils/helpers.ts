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

export function getYearlySpan(year: number):{from: Date, to: Date}{
    const from = new Date(year, 0, 1)
    const to = new Date(year, 12, 0, 23, 59)
    return{
        from,
        to
    }
}