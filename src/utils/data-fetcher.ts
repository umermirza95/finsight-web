import { getAuth } from "firebase/auth";

let token: string;

export async function GET(path: string) {
    token = await getToken();
    const url = `${process.env.REACT_APP_API_URL}${path.replaceAll(':', '%3A')}`
    console.log(`GET ${url}`)
    const request = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
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
    token = await getToken();
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

export async function PUT(path: string, payload: any) {
    token = await getToken();
    const url = `${process.env.REACT_APP_API_URL}${path}`
    console.log(`PUT ${url}`)
    const request = await fetch(url, {
        method: 'PUT',
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

async function getToken(): Promise<string> {
    if (token) {
        return token;
    }
    const IdToken = await getAuth().currentUser?.getIdToken();
    if (!IdToken) {
        throw Error("user not logged in");
    }
    return IdToken as string;
}
