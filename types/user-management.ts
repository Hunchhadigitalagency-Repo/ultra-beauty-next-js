export interface UserAnalyticsResponse {
    active_users: {
        count: number;
        change: string;
    };
    new_users: {
        count: number;
        change: string;
    };
    total_users: {
        count: number;
        change: string;
    };
    total_reward_points: {
        count: number;
        change: string;
    };
}

export interface UserProfile {
    bio: string;
    profile_picture: string;
    user_type: string;
    address: string | null;
}

export interface IUsers {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    profile: UserProfile;
    date_joined: string;
}

export interface IUser {
    user_id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    bio: string;
    profile_picture: string | null;
    google_avatar: string | null;
    phone_number: string | null;
    address: string | null;
    user_type: string;
    display_name: string | null;
}

// For dropdown usage (optional)
export interface IUserDropdown {
    id: number;           // user_id
    name: string;         // first_name + last_name
    avatar: string;       // profile_picture || google_avatar || default
}

