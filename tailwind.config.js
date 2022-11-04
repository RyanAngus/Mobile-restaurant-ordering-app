// tailwind.config.js
module.exports = {
  mode: 'jit',

  purge: ['./index.html',
         './index.js',
         './tailwind.config.js',
         './styles.css',
  ],  
  theme: {
    extend: {
      backgroundImage: {
        'movieposter': "url('movieposter.jpg')",
        'theater': "url('theater.jpg')",
      },

      fontFamily: {
        
      },
    },
  },
  variants: {
  },
  plugins: [
  ]
}