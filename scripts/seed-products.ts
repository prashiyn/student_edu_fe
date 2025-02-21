import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/types_db';
import productsData from '../supabase/seed-data/products-prices.json';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

type Product = Database['public']['Tables']['products']['Insert'];
type Price = Database['public']['Tables']['prices']['Insert'];

async function seedProductsAndPrices() {
  try {
    // Insert products
    const { error: productsError } = await supabase
      .from('products')
      .upsert(productsData.products as Product[]);

    if (productsError) {
      throw new Error(`Error inserting products: ${productsError.message}`);
    }
    console.log('✅ Products seeded successfully');

    // Insert prices
    const { error: pricesError } = await supabase
      .from('prices')
      .upsert(productsData.prices as Price[]);

    if (pricesError) {
      throw new Error(`Error inserting prices: ${pricesError.message}`);
    }
    console.log('✅ Prices seeded successfully');

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

// Run the seeding
seedProductsAndPrices()
  .then(() => {
    console.log('🌱 Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to seed:', error);
    process.exit(1);
  }); 