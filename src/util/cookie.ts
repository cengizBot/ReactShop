export function getCookie<T>(name: string): T | null {
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    if (match) {
        try {
            return JSON.parse(decodeURIComponent(match[2])) as T;
        } catch (e) {
            console.error("Erreur parsing cookie:", e);
            return null;
        }
    }
    return null;
}

export const addToCookieArray = (name: string, newData: any) => {
    let existingData = getCookie<any[]>(name) || [];

    if (!Array.isArray(existingData)) {
        existingData = [];
    }

    existingData.push(newData);
    setCookie(name, existingData);
};


export const setCookie = (name: string, value: any, days = 7): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/`;
};

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=;expires=${new Date(0).toUTCString()};path=/`;
};
