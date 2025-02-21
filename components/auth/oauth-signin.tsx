'use client';

import { handleOAuthSignIn } from '@/utils/auth-helpers/client';

export default function OAuthSignIn() {
  return (
    <form onSubmit={handleOAuthSignIn}>
      {/* ... rest of the component ... */}
    </form>
  );
} 