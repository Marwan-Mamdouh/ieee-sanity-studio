import {defineField, defineType} from 'sanity'

export const committee = defineType({
  name: 'committee',
  title: 'Committee',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Committee Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(55),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Committee Type',
      type: 'string',
      options: {
        list: [
          {title: 'Technical', value: 'technical'},
          {title: 'Operation', value: 'operation'},
          {title: 'Branding', value: 'branding'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(255),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
