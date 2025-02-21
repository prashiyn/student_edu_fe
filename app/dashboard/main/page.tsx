import Main from '@/components/dashboard/main';
import { redirect } from 'next/navigation';
import { getSubscription, getUser } from '@/utils/supabase/queries';
import { createServerSideClient } from '@/utils/supabase/server';

export default async function Account() {
  const supabase = await createServerSideClient();
  const { user, userDetails } = await getUser(supabase);
  const subscription = await getSubscription(supabase);
  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <Main user={user} userDetails={userDetails} subscription={subscription} />;
}
