import { defineStorage } from '@aws-amplify/backend';

// export const storage = defineStorage({
//   name: 'amplifyTestBucket'
// });
//

export const storage = defineStorage({
  name: 'amplifyTestBucket',
  access: (allow) => ({
    'uploads/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
});
