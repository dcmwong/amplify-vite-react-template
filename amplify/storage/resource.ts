import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'vouchers',
  access: (allow) => ({
    'profile-pictures/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    'vouchers/*': [allow.authenticated.to(["read", "write", "delete"])],
    'picture-submissions/*': [
      allow.authenticated.to(['read', 'write']),
      allow.guest.to(['read', 'write'])
    ],
  })
});
