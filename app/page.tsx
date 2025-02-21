import { getUser } from '@/utils/supabase/queries';
import { redirect } from 'next/navigation';
import { createServerSideClient } from '@/utils/supabase/server';

export default async function Dashboard() {
  const supabase = await createServerSideClient();
  const [user] = await Promise.all([getUser(supabase)]);

  if (!user) {
    return redirect('/home');
  } else {
    redirect('/dashboard/main');
  }
}
