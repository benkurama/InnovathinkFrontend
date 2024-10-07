import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getDictionary } from '@/locales/dictionary'
import { getCurrentUser } from '@/queries/users'

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ user, token }) {
      // console.log('---jwt---');
      // console.log(user);
      //console.log(token);
      
      if (user) {
        return { ...token, user: { ...user as User } }
      }

      return token
    },
    async session({ session, token }) {
      // console.log('---session---');
      // console.log(session);
      //console.log(token);
      
      return { ...session, user: token.user }

      // session.user.access_token = token.user.access_token
      // session.user.refresh_token = token.user.refresh_token;

      // return session;

    },
  },
  
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: 'string' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const { username, password } = credentials

        const payload = {
          email: username,
          password: password,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'en-US',
          },
        });

        const dict = await getDictionary()

        const user = await res.json();

        // console.log('---authorize---');
        // console.log(user);

        if (!res.ok) {
          throw new Error(dict.login.message.auth_failed)
        }

        if (res.ok && user) {

          const acc = await getUser(getCurrentUser, user.data.access_token,{});

          

          console.log(acc);

          //return user;
          return {
            id: acc.id,
            fname: acc.first_name,
            lname: acc.last_name,
            email: acc.email,
            avatar: (acc.avatar == null ? '': acc.avatar.id),
            location: acc.location,
            title: acc.title,
            description: acc.description,
            tags: acc.tags,
            language: acc.language,
            status: acc.status,
            access_token: user.data.access_token,
            refresh_token: user.data.refresh_token,
          }
        }

        return null;

      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

async function getUser(query: string, token: string, { variables = {} }) {
  //throw new Error('Function not implemented.')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
};

  const res = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_SYSTEM}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
          query, variables,
      }),
  });

  const json = await res.json();
    //console.log(json.data.users_me);

    if(json.errors){
        console.log(json.errors);
    }

    return json.data.users_me;

}

