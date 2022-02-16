# @twind/tailwind [![MIT License](https://flat.badgen.net/github/license/tw-in-js/twind)](https://github.com/tw-in-js/twind/blob/next/LICENSE) [![Latest Release](https://flat.badgen.net/npm/v/@twind/tailwind/next?icon=npm&label&cache=10800&color=blue)](https://www.npmjs.com/package/@twind/tailwind/v/next) [![Github](https://flat.badgen.net/badge/icon/tw-in-js%2Ftwind%23tailwind?icon=github&label)](https://github.com/tw-in-js/twind/tree/next/packages/tailwind)

---

## READ THIS FIRST!

**Twind v1 is still in beta. Expect bugs!**

---

**THIS PACKAGE IS DEPRECATED**: Please use [@twind/preset-autoprefix](https://github.com/tw-in-js/twind/tree/next/packages/preset-autoprefix) and [@twind/preset-tailwind](https://github.com/tw-in-js/twind/tree/next/packages/preset-tailwind) directly.

Adjust your `package.json`:

```diff
{
  "dependencies": {
+    "@twind/preset-autoprefix": "1.0.0-next.34",
+    "@twind/preset-tailwind": "1.0.0-next.34",
-    "@twind/tailwind": "1.0.0-next.34",
  }
}
```

If you are using `defineConfig` from `@twind/tailwind`:

```diff
-import { defineConfig } from '@twind/tailwind'
+import { defineConfig } from 'twind'
+import presetAutoprefix from '@twind/preset-autoprefix'
+import presetTailwind from '@twind/preset-tailwind'

export default defineConfig({
+  presets: [presetAutoprefix(), presetTailwind()],
  /* config */
})
```

If you are using `setup` from `@twind/tailwind`:

```diff
-import { setup } from '@twind/tailwind'
+import { setup } from 'twind'
+import presetAutoprefix from '@twind/preset-autoprefix'
+import presetTailwind from '@twind/preset-tailwind'

export default setup({
+  presets: [presetAutoprefix(), presetTailwind()],
  /* config */
})
```

---

The full [Tailwind CSS](https://tailwindcss.com) experience without any build step right in the browser or any other environment like Node.js, deno, workers, ...

The following presets are included out-of-the-box:

- [@twind/preset-autoprefix](https://github.com/tw-in-js/twind/tree/next/packages/preset-autoprefix)
- [@twind/preset-tailwind](https://github.com/tw-in-js/twind/tree/next/packages/preset-tailwind)

Used within the following [examples](https://github.com/tw-in-js/twind/tree/next/examples):

- [Basic](https://github.com/tw-in-js/twind/tree/next/examples/basic)
- [Tailwind Forms](https://github.com/tw-in-js/twind/tree/next/examples/using-tailwind-forms)
- [SvelteKit](https://github.com/tw-in-js/twind/tree/next/examples/with-sveltekit)

## Usage

```sh
npm install twind@next @twind/tailwind@next
```

```js
import { setup } from '@twind/tailwind'

// You must call setup at least once, but can call it multiple times
setup({
  /* options */
  /* config */
})
```

To add other presets add them to the `presets` array:

```js
import { setup } from '@twind/tailwind'
import presetTailwindForms from '@twind/preset-tailwind-forms'

setup({
  presets: [presetTailwindForms(/* options */)],
  // ...
})
```

Incase you are not using SSR to inject the pre-computed styles apply the following pattern to prevent [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content):

```html
<body class="!block" style="display: none">
  <!-- ... -->
</body>
```

If any element has the `autofocus` attribute, Twind will focus it after all styles are injected.

<details><summary>Usage with a script tag</summary>

> If you are not using any Twind API (like `cx`, `css`, ...) you can use the optimized [@twind/cdn](https://github.com/tw-in-js/twind/tree/next/packages/cdn) package.

Add this to your `index.html`:

```html
<head>
  <script
    src="https://cdn.jsdelivr.net/combine/npm/twind@next,npm/@twind/tailwind@next"
    crossorigin
  ></script>
  <script>
    // Must be called at least once — options may be empty or even omitted
    twind.setup({
      /* options */
      /* config */
    })
</head>
```

To add other presets add their ids to the script `src` attribute:

```html
<head>
  <script
    src="https://cdn.jsdelivr.net/combine/npm/twind@next,npm/@twind/tailwind@next,npm/@twind/preset-tailwind-forms@next"
    crossorigin
  ></script>
  <script>
    twind.setup({
      /* options */
      presets: [twind.presetTailwindForms(/* options */)],
      /* config */
    })
  </script>
</head>
```

</details>

## API

> If you are using the `script` tag these methods are available via the `twind` global object (eg `twind.setup`).

The following options from [@twind/preset-tailwind](https://github.com/tw-in-js/twind/tree/next/packages/preset-tailwind) are available:

- `disblePreflight: boolean` — allows to disable the [preflight](https://tailwindcss.com/docs/preflight)

### `setup([config [, sheet [, target]]])`

Initializes Twind and can be called as many times as you want.

```js
import { setup } from '@twind/tailwind'

const tw = setup({
  // this are the defaults
  disablePreflight: false,
  /* config */
})
// -> tw === import { tw } from 'twind'
```

### `defineConfig([config])`

Used to define the configuration within `twind.config.{js,ts,mjs,cjs}`.

```js
import { defineConfig } from '@twind/tailwind'

export default defineConfig({
  // this are the defaults
  disablePreflight: false,
  /* config */
})
```

Then use the following script to initialize Twind:

```js
// not setup using '@twind/tailwind' as that would add the built-in presets twice
import { setup } from 'twind'
import config from './twind.config'

setup({
  /* config */
})
```