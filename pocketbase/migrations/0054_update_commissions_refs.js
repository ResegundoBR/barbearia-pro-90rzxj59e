migrate(
  (app) => {
    const commCol = app.findCollectionByNameOrId('commissions')

    if (!commCol.fields.getByName('appointment_id')) {
      commCol.fields.add(
        new RelationField({
          name: 'appointment_id',
          collectionId: app.findCollectionByNameOrId('appointments').id,
          maxSelect: 1,
        }),
      )
    }
    if (!commCol.fields.getByName('product_purchase_id')) {
      commCol.fields.add(
        new RelationField({
          name: 'product_purchase_id',
          collectionId: app.findCollectionByNameOrId('product_purchases').id,
          maxSelect: 1,
        }),
      )
    }
    if (!commCol.fields.getByName('client_package_id')) {
      commCol.fields.add(
        new RelationField({
          name: 'client_package_id',
          collectionId: app.findCollectionByNameOrId('client_packages').id,
          maxSelect: 1,
        }),
      )
    }
    if (!commCol.fields.getByName('gross_amount')) {
      commCol.fields.add(new NumberField({ name: 'gross_amount' }))
    }
    if (!commCol.fields.getByName('fee_amount')) {
      commCol.fields.add(new NumberField({ name: 'fee_amount' }))
    }

    app.save(commCol)
  },
  (app) => {
    const commCol = app.findCollectionByNameOrId('commissions')
    if (commCol.fields.getByName('appointment_id')) commCol.fields.removeByName('appointment_id')
    if (commCol.fields.getByName('product_purchase_id'))
      commCol.fields.removeByName('product_purchase_id')
    if (commCol.fields.getByName('client_package_id'))
      commCol.fields.removeByName('client_package_id')
    if (commCol.fields.getByName('gross_amount')) commCol.fields.removeByName('gross_amount')
    if (commCol.fields.getByName('fee_amount')) commCol.fields.removeByName('fee_amount')
    app.save(commCol)
  },
)
