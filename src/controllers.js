const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { supabase } = require('./config');

const SECRET_KEY = process.env.SECRET_KEY;

//registrar usuario 
async function registerUser(req, res) {
  const { nombre, correo, password, telefono, direccion } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert([{ nombre, correo, password: hashedPassword, telefono, direccion, rol: 'usuario' }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json({ message: '✅ Usuario registrado correctamente', redirect: '/login' });
}
// // Login de usuario
// async function loginUser(req, res) {
//   const { correo, password } = req.body;

//   const { data, error } = await supabase.from('users').select('*').eq('correo', correo).single();
//   if (error || !data) return res.status(400).json({ error: 'Usuario no encontrado' });

//   const validPassword = await bcrypt.compare(password, data.password);
//   if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

//   const token = jwt.sign({ id: data.id, rol: data.rol }, SECRET_KEY, { expiresIn: '1h' });
//   res.json({ token });
// }


// Login de usuario
async function loginUser(req, res) {
  const { correo, password } = req.body;

  const { data, error } = await supabase.from('users').select('*').eq('correo', correo).single();
  if (error || !data) return res.status(401).json({ error: '❌ Usuario no encontrado' });

  const match = await bcrypt.compare(password, data.password);
  if (!match) return res.status(401).json({ error: '❌ Contraseña incorrecta' });

  const token = jwt.sign({ id: data.id, rol: data.rol }, SECRET_KEY, { expiresIn: '1h' });

  // 🔄 Redirección según el rol
  let redirectUrl = '/';
  switch (data.rol) {
    case 'admin':
      redirectUrl = '/admin/dashboard';
      break;
    case 'veterinario':
      redirectUrl = '/veterinario/dashboard';
      break;
    case 'usuario':
      redirectUrl = '/';
      break;
  }

  res.json({
  token,
  redirect: redirectUrl,
  user: {
    id: data.id,             
    nombre: data.nombre,
    imagen: data.imagen,
    rol: data.rol
  }
})

}


module.exports = { registerUser, loginUser };