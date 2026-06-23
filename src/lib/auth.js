import { betterAuth } from "better-auth";

import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {client, db } from "./mongodb";


export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  },

   socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },



  database: mongodbAdapter(db, {
    client
  }),
  user: {
    additionalFields: {
      role: {
        default: "reader"
      },
    }
  }
});