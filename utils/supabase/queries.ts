import { Database } from '@/types/types_db';
import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';
import config from '@/config/config';
export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return { user: null, userDetails: null };
  }
  const { data: userDetails } = await supabase
    .from('user_details')
    .select('*')
    .single();
  return { user, userDetails };
});

export const getSATProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('product_category', 'sat')
    .eq('active', true)
    .order('unit_amount', { foreignTable: 'prices' });

  return products;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .eq('user_id', user.id)
    .eq('product_category', config.productCategory)
    .single();

  return subscription;
});


