import { setup } from 'twind'
import presetExt from '@twind/preset-ext'
import presetTailwindForms from '@twind/preset-tailwind-forms'

// You must call setup at least once, but can call it multiple times
setup({
  presets: [presetTailwindForms(), presetExt()],
})