import { getSATProducts } from '@/utils/supabase/queries';
import { createServerSideClient } from '@/utils/supabase/server';
import PricingContent from '@/components/pricing/PricingContent';

export default async function PricingPage() {
  const supabase = await createServerSideClient();
  const products = await getSATProducts(supabase);

  return <PricingContent products={products} />;
}