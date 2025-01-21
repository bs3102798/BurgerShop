import { User } from "@/app/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({

  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    CredentialsProvider({
    
    credentials: {
    name: 'Credentials',
    id: 'credentials',

      username: { label: "Email", type: "text", placeholder: "tesst@example.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      console.log({ credentials })
      const email = credentials?.email;
      const password = credentials?.password

      mongoose.connect(process.env.MONGO_URL)
      const user = await User.findOne({email})
      const passwordOK = user && bcrypt.compareSync(password, user.password)
      // console.log({password})

      if(passwordOK) {
        return user
      }
    

      return null

    }
  })


  ]

})

export { handler as GET, handler as POST }