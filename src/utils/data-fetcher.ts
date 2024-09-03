
let token: string | null = null;

export async function GET(path: string) {
    if (!token) {
        token = await getIdToken();
    }
    const url = `${process.env.REACT_APP_API_URL}${path}`
    console.log(`GET ${url}`)
    const request = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }
    })
    const response = await request.text()
    console.log(response)
    if (request.status >= 400) {
        throw Error(response);
    }
    return JSON.parse(response).data
}

export async function POST(path: string, payload: any) {
    if (!token) {
        token = await getIdToken();
    }
    const url = `${process.env.REACT_APP_API_URL}${path}`
    console.log(`POST ${url}`)
    const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }
    })
    const response = await request.text()
    console.log(response)
    if (request.status >= 400) {
        const errorData = JSON.parse(response);
        throw Error(errorData.errors[0]);
    }
    return JSON.parse(response).data
}

async function getIdToken(): Promise<string> {
    const request = await fetch(`${process.env.REACT_APP_API_URL}/signIn`, {
        method: 'POST',
        body: JSON.stringify({
            email: process.env.REACT_APP_EMAIL,
            password: process.env.REACT_APP_PASSWORD
        }),
        headers: {
            'content-type': 'application/json'
        }
    });
    const response = await request.text()
    console.log(response)
    if (request.status >= 400) {
        throw Error(response);
    }
    return JSON.parse(response).data.token;
}
