migrate(
  (app) => {
    const collection = new Collection({
      name: 'suppliers',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'document', type: 'text', required: true },
        { name: 'address', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text' },
        { name: 'contact_person', type: 'text' },
        {
          name: 'category_id',
          type: 'relation',
          collectionId: app.findCollectionByNameOrId('categories').id,
          maxSelect: 100,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)

    app
      .db()
      .newQuery(`
    DELETE FROM suppliers WHERE id NOT IN (
      SELECT MIN(id) FROM suppliers GROUP BY document
    ) AND document IS NOT NULL AND document != ''
  `)
      .execute()

    collection.addIndex('idx_suppliers_document', true, 'document', '')
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('suppliers')
    app.delete(collection)
  },
)
