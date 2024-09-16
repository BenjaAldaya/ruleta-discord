# Casino Bot para Discord

## Descripción
Este bot de Discord simula una ruleta de casino, permitiendo a los usuarios hacer apuestas y jugar en un canal de Discord. El bot ofrece una experiencia interactiva con una animación de ruleta y manejo de apuestas múltiples.

## Características
- Simulación de ruleta de casino
- Sistema de apuestas con múltiples opciones
- Animación rápida del giro de la ruleta
- Sistema de balance de usuario
- Estadísticas de números calientes y fríos

## Modelado de Datos

### User
- `id`: String (ID de Discord del usuario)
- `username`: String
- `balance`: Number

### Bet
- `user`: User
- `type`: String (tipo de apuesta)
- `amount`: Number (cantidad apostada)

### RouletteHistory
- `results`: Array de Numbers (historial de resultados)

## Comandos de Discord

### !apostar [tipo] [cantidad]
Realiza una apuesta.
- `tipo`: rojo, negro, par, impar, alta, baja, verde, o un número del 0 al 36
- `cantidad`: Cantidad a apostar

Ejemplo: `!apostar rojo 100`

### !girar
Gira la ruleta y determina el resultado. Muestra una breve animación y luego los resultados de las apuestas.

### !balance
Muestra el balance actual del usuario.

### !calientes
Muestra los 5 números que han salido con más frecuencia.

### !frios
Muestra los 5 números que han salido con menos frecuencia.

## Tipos de Apuestas
- `rojo/negro`: Apuesta a que el número será rojo o negro
- `par/impar`: Apuesta a que el número será par o impar
- `alta/baja`: Apuesta a que el número estará en el rango alto (19-36) o bajo (1-18)
- `verde`: Apuesta al 0
- `número específico`: Apuesta a un número exacto (0-36)

## Pagos
- Rojo/Negro, Par/Impar, Alta/Baja: 1:1
- Verde o Número Específico: 35:1

## Instalación y Configuración
1. Clona el repositorio
2. Instala las dependencias con `npm install`
3. Configura tu token de bot de Discord en un archivo `.env`
4. Ejecuta el bot con `node bot.js`

## Dependencias Principales
- discord.js
- sqlite3 (para la base de datos)

## Notas Adicionales
- El bot utiliza un sistema de bloqueo para evitar giros simultáneos de la ruleta.
- Las apuestas se cierran cuando la ruleta comienza a girar.
- Asegúrate de que el bot tenga los permisos necesarios en tu servidor de Discord.