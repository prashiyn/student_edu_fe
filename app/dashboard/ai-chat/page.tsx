import { getUser } from '@/utils/supabase/queries';

import Chat from '@/components/dashboard/ai-chat';
import { redirect } from 'next/navigation';
import { createServerSideClient } from '@/utils/supabase/server';

export default async function AiChat() {
  const supabase = await createServerSideClient();
  const { user, userDetails } = await getUser(supabase);

  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <Chat user={user} userDetails={userDetails} />;
}
