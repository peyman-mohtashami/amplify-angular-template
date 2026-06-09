import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Upload: a
    .model({
      siteId: a.string().required(),
      releaseId: a.string().required(),
      name: a.string().required(),
      type: a.string().required(),
      status: a.string().required(),
      uploadedBy: a.string().required(),
      uploadedAt: a.datetime(),
      validatedAt: a.datetime(),
      sha256Hash: a.string(),
      releaseVersion: a.string(),
      s3Uri: a.string(),
      errors: a.json(),
      warnings: a.json(),
    })
    // .identifier(['siteId', 'releaseId'])
    .authorization((allow) => [allow.authenticated()]),
  LatestRelease: a
    .model({
      key: a.string().required(),
      releaseId: a.string().required(),
    })
    .identifier(['key'])
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // defaultAuthorizationMode: 'apiKey',
    defaultAuthorizationMode: 'userPool',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});


/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
