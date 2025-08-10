const { supabase } = require('./config');

async function createUserTable() {
  const { data, error } = await supabase.rpc('create_auth_table');
  if (error) console.error('Error al crear la tabla:', error.message);
  else console.log('✅ Tabla de usuarios creada correctamente');
}

module.exports = { createUserTable };