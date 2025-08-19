import {addToCookieArray, getCookie} from "@util/cookie";
import User from "@interface/User";
import {fakeApiDelay} from "@api/api";

export const NAME_COOKIE_USER = "app_users" as const;
export const NAME_COOKIE_USER_LOGGED = "user_logged" as const;

// Fetch all users
export const fetchUsers = async (): Promise<User[] | null> => {
    await fakeApiDelay(); // simulated delay
    const users: User[] | null = getCookie<User[]>(NAME_COOKIE_USER);
    console.log(users)
    return users ?? null;
};

// Create a new user
export const createUsers = async (newUser: User): Promise<boolean> => {
    await fakeApiDelay(); // simulated delay
    addToCookieArray(NAME_COOKIE_USER, newUser);
    return true;
};

// Get the currently logged user
export const getUser = async (): Promise<User | null> => {
    await fakeApiDelay(500, 1000); // simulated delay
    return getCookie(NAME_COOKIE_USER_LOGGED);
};
