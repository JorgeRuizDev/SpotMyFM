# Manual de Usuario de SpotMyFM
- [Manual de Usuario de SpotMyFM](#manual-de-usuario-de-spotmyfm)
  - [Vistas](#vistas)
    - [Listado de Vistas](#listado-de-vistas)
  - [Navegación](#navegación)
    - [Escritorio](#escritorio)
      - [Menú Auxiliar Desplegable](#menú-auxiliar-desplegable)
    - [Tablet / Vista Vertical](#tablet--vista-vertical)
    - [Móvil](#móvil)
  - [FAQ](#faq)
    - [¿Cómo Inicio Sesión?](#cómo-inicio-sesión)
    - [¿Cómo cambio el tema de usuario?](#cómo-cambio-el-tema-de-usuario)
    - [¿Cómo elimino mi cuenta?](#cómo-elimino-mi-cuenta)
    - [¿Cómo puedo cambiar el idioma?](#cómo-puedo-cambiar-el-idioma)
## Vistas

Las vistas son la base de SpotMyFM, ya que permiten renderizar e interactuar con los distintos elementos de Spotify.

Algunas vistas pueden contener vistas anidadas. Por ejemplo, la vista de playlists contiene la vista de canciones al listar las canciones de una playlist.
Y la vista canciones contiene en su interior una vista de artistas (y estos una vista con los álbumes de los artistas) y una vista de álbumes, con las canciones que forman cada álbum.

Existen 4 tipos de vistas, y cada vista tiene dos modos, el modo tarjetas y el modo lista.

Todas la vistas pueden ser ordenadas e incluyen un pequeño filtro basado en una cadena de texto.

### Listado de Vistas

- [Vista de Canciones](./views/trackView.md)
- [Vista de Álbumes](./views/albumView.md)
- [Vista de Artistas](./views/artistView.md)
- [Vista de Playlists](./views/playlistView.md)

Ejemplo de Vista de Canciones
![Track View](https://i.imgur.com/p5qSGiM.png)

## Navegación

- [Manual de Usuario de SpotMyFM](#manual-de-usuario-de-spotmyfm)
  - [Vistas](#vistas)
    - [Listado de Vistas](#listado-de-vistas)
  - [Navegación](#navegación)
    - [Escritorio](#escritorio)
      - [Menú Auxiliar Desplegable](#menú-auxiliar-desplegable)
    - [Tablet / Vista Vertical](#tablet--vista-vertical)
    - [Móvil](#móvil)
  - [FAQ](#faq)
    - [¿Cómo Inicio Sesión?](#cómo-inicio-sesión)
    - [¿Cómo cambio el tema de usuario?](#cómo-cambio-el-tema-de-usuario)
    - [¿Cómo elimino mi cuenta?](#cómo-elimino-mi-cuenta)
    - [¿Cómo puedo cambiar el idioma?](#cómo-puedo-cambiar-el-idioma)

La navegación únicamente está disponible si el usuario ha iniciado sesión.

![chrome_OdkYeqODbD](https://user-images.githubusercontent.com/10118909/176039215-e6be6dc0-9aa2-4fdd-8a00-ae7ead0ed4ab.gif)

### Escritorio

![image](https://user-images.githubusercontent.com/10118909/176038364-beb79505-1c8e-4178-8672-6016d99eb64d.png)

En escritorio, la barra de navegación se encuentra ne la parte superior de la página.

- (1)(2) Van a la raíz de la plataforma, en este caso el [Top de canciones y artistas](./home.md). (2) está marcado porque es la sección activa
- (3) [Gestor de Biblioteca](./libraryManager.md)
- (4) [Gestor de Álbumes](./albumManager.md)
- (5) [Gestor de Playlists](./playlistManager.md)
- (6) [Analizador de Canciones a partir de ficheros de audios](trackAnalyzer.md)
- (7) [Búsqueda](./search.md)
- (8) Indicador de carga. Si es visible significa que la fachada que gestiona las canciones está a la espera de datos
- (9) [Canción en Reproducción](./player.md)
- (10) Detalles

#### Menú Auxiliar Desplegable

![image](https://user-images.githubusercontent.com/10118909/176039422-9fa4a81c-e251-4b1f-9280-b8788c846549.png)

Se puede desplegar un menú contextual a partir de (1), que contiene los siguientes elementos.

- (2) Hipervínculo al manual de usuario
- (3) Hipervínculo al repositorio del proyecto
- (4) Selector de Idioma
- (5) Reproductor (Copia)
- (6) Acceso al menú de opciones
- (7) Botón para alternar entre modo claro y modo oscuro
- (8) Hipervínculo a la documentación de la API en formato OpenAPI
- (9)(10) Botón para cerrar sesión. Al cerrar la sesión se eliminan todos los datos del usuario, incluyendo la caché de datos.

### Tablet / Vista Vertical

![chrome_Qr8u9L1KKt](https://user-images.githubusercontent.com/10118909/176039842-7339f9a8-6231-429b-8b21-2d338bb89f31.png)

Si tenemos una pantalla más pequeña es posible que la barra de navegación no quepa, por ello se ha diseñado una versión más reducida en la que se elimina el título de la página y el navegador.

### Móvil

![image](https://user-images.githubusercontent.com/10118909/176040429-0256b5de-c094-4260-b251-113306e0eeb7.png)

Si nuestra pantalla tiene un ancho menor a 784px, se utiliza la vista de móvil.

Esta vista únicamente contiene los botones a cada una de las páginas, así como un menú auxiliar con los mismos contenidos que el [menú auxiliar](#menú-auxiliar-desplegable).

- (1) Home o Top Personal
- (2) Gestor de Biblioteca
- (3) Gestor de Álbumes
- (4) Gestor de Playlists
- (5) Búsqueda (el sombreado indica que es la página activa)
- (6) Menú Auxiliar con el resto de contenidos (Alternar tema, cerrar sesión, reproductor, etc)

![chrome_P3w353DXCy](https://user-images.githubusercontent.com/10118909/176041075-2c91a098-3792-4dda-8bd0-7b777a38c9f8.png)

## FAQ

### ¿Cómo Inicio Sesión?

Debes tener una cuenta de Spotify y haber iniciado sesión en [Spotify](https://spotify.com). Podrás iniciar sesión aceptando los permisos de SpotMyFM al dar click en el botón de "Iniciar Sesión" en la página principal.

### ¿Cómo cambio el tema de usuario?

Puedes consultar esa información [aquí.](./other.md#cambiar-de-tema-clarooscuro)

### ¿Cómo elimino mi cuenta?

Puedes consultar esa información [aquí.](./other.md#opciones-de-usuario)

### ¿Cómo puedo cambiar el idioma?

Puedes consultar esa información [aquí.](./other.md#cambiar-de-idioma)
