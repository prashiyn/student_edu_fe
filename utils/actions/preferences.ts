'use server';

import { createServerSideClient } from '@/utils/supabase/server';
import config from '@/config/config';

export async function updateTestPreferences(preferences: {
  testDate: string;
  focusArea: string;
}) {
  const supabase = await createServerSideClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_details')
    .upsert({
      id: user.id,
      test_preferences: {
        [config.productCategory]: preferences
      }
    }, {
      onConflict: 'id'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
} 