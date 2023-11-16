"use server";
import { FilterQuery, SortOrder, PipelineStage } from "mongoose";
import { revalidatePath } from "next/cache";
import User from "@/lib/models/user.models";
import { connectToDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { startOfToday } from "date-fns";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const today = startOfToday();

export async function RegisterUserWithEmail({
    email,
    password,
    fullName,
}: {
    email: string;
    password: string;
    fullName: string;
}) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectToDB();
        await User.create({ email: email, password: hashedPassword, name: fullName });
    } catch (error: any) {
        throw new Error(`Error registering user with email: ${error.message}`);
    }
}

export async function RegisterOAuthUser({
    name,
    email,
    image,
}: {
    name: string;
    email: string;
    image?: string;
}) {
    try {
        await connectToDB();
        await User.create({ email: email, name: name, image: image });
    } catch (error: any) {
        throw new Error(`Error registering NextAuth user: ${error.message}`);
    }
}

export async function ValidateRegistrationUser({
    email,
    isClient,
}: {
    email: string;
    isClient: boolean;
}) {
    try {
        await connectToDB();
        const userIdAndImage = await User.findOne({ email }).select("_id image");
        if (!userIdAndImage) {
            return null;
        }
        // this eliminates the console warning for complex data
        const simpleData = isClient ? JSON.stringify(userIdAndImage) : userIdAndImage;

        return simpleData;
    } catch (error: any) {
        throw new Error(`Error validating registration user: ${error.message}`);
    }
}

export async function FetchUserId({ email, isClient }: { email: string; isClient: boolean }) {
    try {
        await connectToDB();
        const userId = await User.findOne({ email }).select("_id");
        if (!userId) {
            return null;
        }
        const simpleData = isClient ? JSON.stringify(userId) : userId;
        return simpleData;
    } catch (error: any) {
        throw new Error(`Error fetching user with email: ${error.message}`);
    }
}

//fetch user to be used both client side and server side
export async function FetchUser({ userId, isClient }: { userId: string; isClient: boolean }) {
    try {
        await connectToDB();
        const user = await User.findOne({ _id: userId });
        const simpleData = isClient ? JSON.stringify(user) : user;
        return simpleData;
    } catch (error: any) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}

// updates the user and revalidates the path if needed
export async function updateUser({
    userId,
    name,
    bio,
    image,
    path,
    twitter,
    github,
    website,
    instagram,
    whatsapp,
    birthday,
}: {
    userId: string;
    name?: string;
    bio?: string;
    image?: string;
    twitter?: string;
    github?: string;
    website?: string;
    instagram?: string;
    whatsapp?: string;
    path?: string;
    birthday?: Date;
}): Promise<void> {
    connectToDB();
    try {
        await User.findOneAndUpdate(
            { _id: userId },
            { name, bio, image, twitter, github, website, instagram, whatsapp, birthday },
            { upsert: true }
        );

        if (path === "/profile") {
            revalidatePath(path);
        }
    } catch (err: any) {
        throw new Error(`Error updating user: ${err.message}`);
    }
}

// fetches the users with a possible pagination and search function if needed
export async function fetchUsers({
    userId,
    pageNumber = 1,
    pageSize = 20,
    searchString = "",
    sortBy = "desc",
}: {
    userId: string;
    pageNumber?: number;
    pageSize?: number;
    searchString?: string;
    sortBy?: SortOrder;
}) {
    connectToDB();
    try {
        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");

        const query: FilterQuery<typeof User> = {
            //filter out our current user
            _id: { $ne: userId },
        };

        if (searchString.trim() !== "" || searchString !== undefined) {
            // query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }];
            query.$or = [{ name: { $regex: regex } }];
        }

        const sortOptions = { createdAt: sortBy };

        const usersQuery = User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

        const totalUsersCount = await User.countDocuments(query);
        const users = await usersQuery.exec();

        const isNext = totalUsersCount > pageNumber + users.length;

        return { users, isNext };
    } catch (err: any) {
        throw new Error(`Error fetching users: ${err.message}`);
    }
}

export async function SearchUsers({
    userId,
    searchString,
    page = 1,
    limit = 10,
}: {
    userId: string;
    searchString?: string;
    page?: number;
    limit?: number;
}) {
    try {
        connectToDB();
        const skip = (page - 1) * limit;
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    _id: { $ne: userId },
                },
            },
            {
                $project: {
                    name: 1,
                    image: 1,
                    email: 1,
                },
            },
            { $skip: skip },
            { $limit: limit },
        ];

        if (searchString) {
            pipeline.unshift({
                $search: {
                    index: "searchUser",
                    text: {
                        query: searchString,
                        fuzzy: {
                            maxEdits: 1,
                            prefixLength: 3,
                            maxExpansions: 50,
                        },
                        path: ["name", "email"],
                    },
                },
            });
        }

        const searchedUser = await User.aggregate(pipeline);
        return searchedUser;
    } catch (error: any) {
        throw new Error(`Error searching users: ${error.message}`);
    }
}

export async function SearchUsersAutocomplete({
    userId,
    searchString,
    limit = 10,
    isClient,
}: {
    userId: string;
    searchString?: string;
    limit?: number;
    isClient?: boolean;
}) {
    try {
        connectToDB();
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    _id: { $ne: userId },
                },
            },
            {
                $project: {
                    name: 1,
                    image: 1,
                    email: 1,
                },
            },
            { $limit: limit },
        ];

        if (searchString) {
            pipeline.unshift({
                $search: {
                    index: "autoCompleteUsers",
                    autocomplete: {
                        query: searchString,
                        path: "name",
                        tokenOrder: "sequential",
                    },
                },
            });
        }

        const autocompleteUser = await User.aggregate(pipeline);
        const simpleData = isClient ? JSON.stringify(autocompleteUser) : autocompleteUser;
        return simpleData;
    } catch (error: any) {
        throw new Error(`Error searching Autocomplete users: ${error.message}`);
    }
}

// used to retrive the current user logged in into the app when using a server component
export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await User.findOne({ email: session.user.email });

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        throw new Error(`Error getting current user: ${error.message}`);
    }
}
