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
    }),
    defineField({
      name: 'formSlug',
      title: 'Form Slug',
      type: 'string',
      description:
        "Optional identifier for the event's registration form, e.g. \"ai-workshop-2026\"",
      validation: (Rule) => Rule.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {name: 'kebab-case slug'}),
    }),
    defineField({
      name: 'orderNum',
      title: 'Order Number',
      type: 'number',
      description: 'Unique sort key for website event ordering, e.g. 1, 2, 3...',
      validation: (Rule) =>
        Rule.integer()
          .min(0)
          .warning('Should be a whole number >= 0')
          .custom(async (value, context) => {
            if (value == null) return true
            const {document, getClient} = context
            const client = getClient({apiVersion: '2024-01-01'})
            const id = document?._id?.replace(/^drafts\./, '')
            const params = {v: value, draft: `drafts.${id}`, pub: id}
            const count = await client.fetch(
              'count(*[_type == "event" && orderNum == $v && !(_id in [$draft, $pub])])',
              params,
            )
            return count > 0 ? 'orderNum must be unique — this value is already used' : true
          }),
    }),
  ],
  orderings: [
    {
      title: 'Order Number, Asc',
      name: 'orderNumAsc',
      by: [{field: 'orderNum', direction: 'asc'}],
    },
    {
      title: 'Order Number, Desc',
      name: 'orderNumDesc',
      by: [{field: 'orderNum', direction: 'desc'}],
    },
  ],
})
