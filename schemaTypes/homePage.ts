import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'home images',
      title: 'Home Images',
      type: 'array',
      of: [
        defineField({
          name: 'image1',
          title: 'Image1',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'image2',
          title: 'Image2',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'image3',
          title: 'Image3',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
})
