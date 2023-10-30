import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://wunlfbypwzzbjoymlxpi.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bmxmYnlwd3p6YmpveW1seHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5OTQyMzAsImV4cCI6MjAxMzU3MDIzMH0.vv5sUym3LTwNwotclNR34W9hk73QUnnTU185B9ndvGY';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

// I use typescript here for better query support in supabase SDK
