export declare class Profile {
    id: string;
    username: string;
    avatar_url?: string | null;
    bio?: string | null;
    is_online?: boolean;
    last_seen?: Date | null;
    created_at?: Date;
    updated_at?: Date;
}
export declare const ProfileModel: import("@typegoose/typegoose").ReturnModelType<typeof Profile, import("@typegoose/typegoose/lib/types").BeAnObject>;
//# sourceMappingURL=Profile.d.ts.map