import NextAuth from "next-auth";

// signIn
// signOut

export const { handlers, auth } = NextAuth({ 
    providers: [{
        id: "my-provider",
        name: "My Provider",
        type: "oauth",
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
    }],
});

