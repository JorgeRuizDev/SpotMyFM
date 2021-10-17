# Guía de Estilo

Esta guía de estilo ha sido creada gracias a la herramienta de código abierto [Catalog](catalog.style).

## Temas:

MySpotFM está diseñada alrededor de dos temas, un tema claro (Light) y un tema oscuro (Dark).

## Colores:

### Paleta de Colores:

Se han escogido diez colores para la paleta de colores principal:

```color-palette
colors:
   - {value: "#ECFDF5", name: "Emerald 50"}
   - {value: "#D1FAE5", name: "Emerald 100"}
   - {value: "#A7F3D0", name: "Emerald 200"}
   - {value: "#6EE7B7", name: "Emerald 300"}
   - {value: "#34D399", name: "Emerald 400"}
   - {value: "#10B981", name: "Emerald 500"}
   - {value: "#059669", name: "Emerald 600"}
   - {value: "#047857", name: "Emerald 700"}
   - {value: "#065F46", name: "Emerald 800"}
   - {value: "#064E3B", name: "Emerald 900"}
```

### Colores Principales:

Se han escogido dos colores principales que van a ser utilizados a lo largo de toda la web para crear elementos como Botones o Tarjetas.

Ambos colores tienen una variante "Hover" que será utilizada cuando el usuario intente interactuar con un elemento.

```color
span: 2
name: "Light Green (Emerald 500)"
value: "#10B981"
```

```color
span: 2
name: "Dark Green (Emerald 700)"
value: "#047857"
```

```color
span: 2
name: "Green Hover (Emerald 600)"
value: "#059669"
```

### Colores de Fondo:

Para el fondo de la Web se han utilizado dos colores muy diferentes, cada uno asociado con uno de los temas principales.

Ambos colores han sido inspirados en la guía de estilos [Material Design](https://material.io/).

```color
span: 2
name: "Light Background"
value: "#e5e7eb"
```

```color
span: 2
name: "Dark Background"
value: "#212121"
```

### Colores de Tarjetas

Para representar la información se utilizan tarjetas.

Estas tarjetas permiten resaltar una sección respecto al fondo.

```color
span: 2
name: "Light Card"
value: "#F3F4F6"
```

```color
span: 2
name: "Dark Card"
value: "#4d4d4d"
```

Para resaltar las tarjetas y dar una sensación de profundidad se utiliza una sombra alrededor de ellas.

```html
<div>
  <style>
    .card {
      height: 100px;
      width: 100px;
      background-color: #f3f4f6;
      margin: 20px;
      --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(
          --tw-ring-shadow,
          0 0 #0000
        ), var(--tw-shadow);
    }

    .bg {
      background-color: #e5e7eb;

      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
  <div class="bg">
    <div class="card"></div>
  </div>
</div>
```

## Tipografía

Para la tipografía hemos usado la fuente ROBOTO.

El color en el modo oscuro es el blanco puro `(#ffffff)`, mientras que en el modo claro usamos un tono algo más grisáceo `(#4B5563)`.

Nota, el `<h7/>` es lo mismo que `<p/>`

```type
{
  "headings": [60,48,36,30,24,20, 16],

  "font": "roboto",
  "color": "#4B5563"
}
```

## Ejemplo de Botones:

```html
<div>
  <style>
    .boton {
      text-size-adjust: 100%;
      tab-size: 4;
      box-sizing: border-box;
      border-width: 0px;
      border-style: solid;
      --tw-border-opacity: 1;
      border-color: rgba(229, 231, 235, var(--tw-border-opacity));
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-rotate: 0;
      --tw-skew-x: 0;
      --tw-skew-y: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-transform: translateX(var(--tw-translate-x)) translateY(
          var(--tw-translate-y)
        )
        rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
        scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      --tw-backdrop-filter: var(--tw-backdrop-blur) var(
          --tw-backdrop-brightness
        )
        var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(
          --tw-backdrop-hue-rotate
        ) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(
          --tw-backdrop-saturate
        )
        var(--tw-backdrop-sepia);
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-family: sans-serif;
      font-size: 100%;
      line-height: inherit;
      text-transform: none;
      appearance: button;
      background-image: none;
      --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(
          --tw-ring-shadow,
          0 0 #0000
        ), var(--tw-shadow);
      outline: transparent solid 2px;
      outline-offset: 2px;
      font-weight: 700;
      transition-property: background-color, border-color, color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
      border-radius: 9999px;
      --tw-text-opacity: 1;
      color: rgba(255, 255, 255, var(--tw-text-opacity));
      cursor: pointer;
      margin: 0.25rem;
      padding: 0.5rem 1rem;
      width: fit-content;
      min-height: 2.625rem;
      display: flex;
      flex-direction: row;
      -webkit-box-pack: center;
      place-content: center;
      -webkit-box-align: center;
      align-items: center;
      --tw-bg-opacity: 1;
      background-color: rgba(16, 185, 129, var(--tw-bg-opacity));
    }

    .boton-light {
      text-size-adjust: 100%;
      tab-size: 4;

      box-sizing: border-box;
      border-width: 0px;
      border-style: solid;
      --tw-border-opacity: 1;
      border-color: rgba(229, 231, 235, var(--tw-border-opacity));
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-rotate: 0;
      --tw-skew-x: 0;
      --tw-skew-y: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-transform: translateX(var(--tw-translate-x)) translateY(
          var(--tw-translate-y)
        )
        rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
        scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      --tw-ring-inset: var(--tw-empty);
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-color: rgba(59, 130, 246, 0.5);
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-ring-shadow: 0 0 #0000;
      --tw-blur: var(--tw-empty);
      --tw-brightness: var(--tw-empty);
      --tw-contrast: var(--tw-empty);
      --tw-grayscale: var(--tw-empty);
      --tw-hue-rotate: var(--tw-empty);
      --tw-invert: var(--tw-empty);
      --tw-saturate: var(--tw-empty);
      --tw-sepia: var(--tw-empty);
      --tw-drop-shadow: var(--tw-empty);
      --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(
          --tw-grayscale
        )
        var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia)
        var(--tw-drop-shadow);
      --tw-backdrop-blur: var(--tw-empty);

      --tw-backdrop-filter: var(--tw-backdrop-blur) var(
          --tw-backdrop-brightness
        )
        var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(
          --tw-backdrop-hue-rotate
        ) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(
          --tw-backdrop-saturate
        )
        var(--tw-backdrop-sepia);
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-family: sans-serif;
      font-size: 100%;
      line-height: inherit;
      text-transform: none;
      appearance: button;
      background-image: none;
      --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(
          --tw-ring-shadow,
          0 0 #0000
        ), var(--tw-shadow);
      outline: transparent solid 2px;
      outline-offset: 2px;
      font-weight: 700;
      transition-property: background-color, border-color, color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
      border-radius: 9999px;
      --tw-text-opacity: 1;
      color: rgba(255, 255, 255, var(--tw-text-opacity));
      cursor: pointer;
      margin: 0.25rem;
      padding: 0.5rem 1rem;
      width: fit-content;
      min-height: 2.625rem;
      display: flex;
      flex-direction: row;
      -webkit-box-pack: center;
      place-content: center;
      -webkit-box-align: center;
      align-items: center;
      --tw-bg-opacity: 1;
      background-color: rgba(5, 150, 105, var(--tw-bg-opacity));
    }

    .boton-sec {
      text-size-adjust: 100%;
      tab-size: 4;
      box-sizing: border-box;
      border-style: solid;
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-rotate: 0;
      --tw-skew-x: 0;
      --tw-skew-y: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-transform: translateX(var(--tw-translate-x)) translateY(
          var(--tw-translate-y)
        )
        rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
        scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
      --tw-ring-inset: var(--tw-empty);
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-color: rgba(59, 130, 246, 0.5);
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-ring-shadow: 0 0 #0000;
      --tw-blur: var(--tw-empty);
      --tw-brightness: var(--tw-empty);
      --tw-contrast: var(--tw-empty);
      --tw-grayscale: var(--tw-empty);
      --tw-hue-rotate: var(--tw-empty);
      --tw-invert: var(--tw-empty);
      --tw-saturate: var(--tw-empty);
      --tw-sepia: var(--tw-empty);
      --tw-drop-shadow: var(--tw-empty);
      --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(
          --tw-grayscale
        )
        var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia)
        var(--tw-drop-shadow);
      --tw-backdrop-blur: var(--tw-empty);
      --tw-backdrop-brightness: var(--tw-empty);
      --tw-backdrop-contrast: var(--tw-empty);
      --tw-backdrop-grayscale: var(--tw-empty);
      --tw-backdrop-hue-rotate: var(--tw-empty);
      --tw-backdrop-invert: var(--tw-empty);
      --tw-backdrop-opacity: var(--tw-empty);
      --tw-backdrop-saturate: var(--tw-empty);
      --tw-backdrop-sepia: var(--tw-empty);
      --tw-backdrop-filter: var(--tw-backdrop-blur) var(
          --tw-backdrop-brightness
        )
        var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(
          --tw-backdrop-hue-rotate
        ) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(
          --tw-backdrop-saturate
        )
        var(--tw-backdrop-sepia);
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font-family: sans-serif;
      font-size: 100%;
      line-height: inherit;
      text-transform: none;
      appearance: button;
      background-image: none;
      --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(
          --tw-ring-shadow,
          0 0 #0000
        ), var(--tw-shadow);
      outline: transparent solid 2px;
      outline-offset: 2px;
      font-weight: 700;
      transition-property: background-color, border-color, color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
      border-radius: 9999px;
      cursor: pointer;
      margin: 0.25rem;
      padding: 0.5rem 1rem;
      width: fit-content;
      min-height: 2.625rem;
      display: flex;
      flex-direction: row;
      -webkit-box-pack: center;
      place-content: center;
      -webkit-box-align: center;
      align-items: center;
      --tw-bg-opacity: 1;
      background-color: rgba(209, 250, 229, var(--tw-bg-opacity));
      --tw-text-opacity: 1;
      color: rgba(4, 120, 87, var(--tw-text-opacity));
      --tw-border-opacity: 1;
      border-color: rgba(4, 120, 87, var(--tw-border-opacity));
      border-width: 1px;
    }

    .bg {
      background-color: #e5e7eb;

      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bg-dark {
      background-color: #212121;

      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>
  <div class="bg-dark">
    <button class="boton">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M8,16V4h12 l0.002,12H8z"
        ></path>
        <path
          d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zM15 6L13 6 13 9 10 9 10 11 13 11 13 14 15 14 15 11 18 11 18 9 15 9z"
        ></path></svg
      ><span>Primario</span>
    </button>
    <button class="boton-sec">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M8,16V4h12 l0.002,12H8z"
        ></path>
        <path
          d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zM15 6L13 6 13 9 10 9 10 11 13 11 13 14 15 14 15 11 18 11 18 9 15 9z"
        ></path></svg
      ><span>Secundario</span>
    </button>
  </div>
  <div class="bg">
    <button class="boton-light">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M8,16V4h12 l0.002,12H8z"
        ></path>
        <path
          d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zM15 6L13 6 13 9 10 9 10 11 13 11 13 14 15 14 15 11 18 11 18 9 15 9z"
        ></path></svg
      ><span>Primario</span>
    </button>
    <button class="boton-sec">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20,2H8C6.897,2,6,2.897,6,4v12c0,1.103,0.897,2,2,2h12c1.103,0,2-0.897,2-2V4C22,2.897,21.103,2,20,2z M8,16V4h12 l0.002,12H8z"
        ></path>
        <path
          d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zM15 6L13 6 13 9 10 9 10 11 13 11 13 14 15 14 15 11 18 11 18 9 15 9z"
        ></path></svg
      ><span>Secundario</span>
    </button>
  </div>
</div>
```
