import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(55),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'SubTitle',
      type: 'string',
      validation: (Rule) => Rule.required().max(255),
    }),
    defineField({
      name: 'speakers',
      title: 'speakers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(255),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(255),
            }),
            defineField({name: 'photo', type: 'image', title: 'Photo', options: {hotspot: true}}),
          ],
        },
      ],
    }),
    defineField({
      name: 'memories',
      title: 'Memories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'photo',
              type: 'image',
              title: 'Photo',
              options: {hotspot: true},
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.min(Rule.valueOfField('startDate')),
    }),
    defineField({
      name: 'startDateSecondV',
      title: 'Start Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'endDateSecondV',
      title: 'End Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.min(Rule.valueOfField('startDateSecondV')),
    }),
    defineField({
      name: 'isCancelled',
      title: 'Cancelled',
      type: 'boolean',
      initialValue: false,
      description: 'Check this if the event has been cancelled',
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Talk', value: 'talk'},
          {title: 'Competition', value: 'competition'},
          {title: 'Social', value: 'social'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          {title: 'Online', value: 'online'},
          {title: 'Offline', value: 'offline'},
          {title: 'Hybrid', value: 'hybrid'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
