// src/pages/SignUp.tsx
import { FunctionComponent, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Collapse,
  Grid,
  Alert
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Role, RegisterDTO } from '../types'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PersonIcon from '@mui/icons-material/Person'
import BusinessIcon from '@mui/icons-material/Business'

const SignUp: FunctionComponent = () => {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  // --- CORREGIDO ---
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estado para el formulario de registro
  const [role, setRole] = useState<Role>(Role.User)
  const [formData, setFormData] = useState<RegisterDTO>({
    // --- FIN CORREGIDO ---
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role: Role.User,
    organization_name: '',
    organization_website: ''
  })

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    newRole: Role | null
  ) => {
    if (newRole !== null) {
      setRole(newRole)
      setFormData((prev) => ({ ...prev, role: newRole }))
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      if (isLogin) {
        await login(formData.email, formData.password)
        // La redirección se maneja en AuthContext
      } else {
        await register(formData)
        // La redirección se maneja en AuthContext
      }
    } catch (err: any) {
      setError(err.message || 'Ha ocurrido un error.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 160px)', // Ajustar altura
        p: 3
      }}
    >
      <Grid
        container
        justifyContent='center'
        sx={{
          maxWidth: '900px',
          width: '100%',
          boxShadow: 'var(--shadow-drop)',
          borderRadius: '25px',
          overflow: 'hidden'
        }}
      >
        <Grid
          item // Añadido 'item' por consistencia con MUI v5, aunque en v7 'size' es suficiente
          size={{ xs: 12, md: 5 }}
          sx={{
            background: 'linear-gradient(180deg, #00c2ff, #019cfa)',
            color: 'white',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h4' fontWeight='bold'>
            {isLogin ? '¡Bienvenido de vuelta!' : 'Únete a la Comunidad'}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {isLogin
              ? 'Inicia sesión para acceder a tu panel y gestionar tus eventos.'
              : 'Regístrate para descubrir, participar y organizar los mejores eventos de ciberseguridad.'}
          </Typography>
        </Grid>

        <Grid item size={{ xs: 12, md: 7 }} sx={{ p: 4, background: 'white' }}>
          <Typography variant='h5' fontWeight='bold' mb={2}>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </Typography>
          <Box component='form' onSubmit={handleSubmit}>
            {!isLogin && (
              <Box mb={2}>
                <ToggleButtonGroup
                  value={role}
                  exclusive
                  onChange={handleRoleChange}
                  fullWidth
                >
                  <ToggleButton value={Role.User}>Asistente</ToggleButton>
                  <ToggleButton value={Role.Organizer}>
                    Organizador
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}

            <TextField
              fullWidth
              required
              margin='normal'
              label='Email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleFormChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MailOutlineIcon />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              required
              margin='normal'
              label='Contraseña'
              name='password'
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleFormChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge='end'
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Collapse in={!isLogin}>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required={!isLogin}
                    margin='normal'
                    label='Nombre'
                    name='first_name'
                    value={formData.first_name}
                    onChange={handleFormChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PersonIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required={!isLogin}
                    margin='normal'
                    label='Apellidos'
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleFormChange}
                  />
                </Grid>
              </Grid>
            </Collapse>

            <Collapse in={!isLogin && role === Role.Organizer}>
              <Divider sx={{ my: 2 }}>Información de la Organización</Divider>
              <TextField
                fullWidth
                required={!isLogin && role === Role.Organizer}
                margin='normal'
                label='Nombre de la Organización'
                name='organization_name'
                value={formData.organization_name}
                onChange={handleFormChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BusinessIcon />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                margin='normal'
                label='Sitio Web (Opcional)'
                name='organization_website'
                type='url'
                value={formData.organization_website}
                onChange={handleFormChange}
              />
            </Collapse>

            {error && (
              <Alert severity='error' sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type='submit'
              fullWidth
              variant='contained'
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: '25px',
                background: 'var(--gradient-button-primary)',
                '&:hover': {
                  background: 'var(--gradient-button-primary-hover)'
                }
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color='inherit' />
              ) : isLogin ? (
                'Entrar'
              ) : (
                'Registrarse'
              )}
            </Button>

            <Divider>O</Divider>

            <Button
              fullWidth
              onClick={() => setIsLogin(!isLogin)}
              sx={{ mt: 2 }}
            >
              {isLogin
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Inicia Sesión'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignUp
