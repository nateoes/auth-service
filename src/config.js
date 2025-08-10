require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Conectar a Supabase (PostgreSQL)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

module.exports = { supabase };