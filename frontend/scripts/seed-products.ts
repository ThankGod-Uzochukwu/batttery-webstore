import { Collection, Document, MongoClient } from 'mongodb';
import { importProducts } from '@/features/products/import/importer';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? 'battery-webstore';
const collectionName = process.env.MONGODB_PRODUCTS_COLLECTION ?? 'products';

async function createProductIndexes(collection: Collection<Document>) {
  await collection.createIndexes([
    {
      key: { sku: 1 },
      unique: true,
    },
    {
      key: { slug: 1 },
    },
    {
      key: { category: 1, subcategory: 1 },
    },
    {
      key: { brand: 1 },
    },
    {
      key: { stockStatus: 1 },
    },
    {
      key: { price: 1 },
    },
    {
      key: { name: 'text', brand: 'text', category: 'text', shortDescription: 'text' },
    },
  ]);
}

async function main() {
  if (!uri) {
    throw new Error('MONGODB_URI is required to seed products.');
  }

  const importResult = await importProducts();

  if (importResult.invalidProducts.length > 0) {
    console.warn('Some rows were invalid and will not be seeded:');
    console.warn(
      importResult.invalidProducts.map(({ row, errors }) => ({
        row,
        errors,
      })),
    );
  }

  if (importResult.validProducts.length === 0) {
    console.log('No valid products found to seed.');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db(dbName).collection(collectionName);

    await createProductIndexes(collection);

    const now = new Date();
    const result = await collection.bulkWrite(
      importResult.validProducts.map((product) => ({
        updateOne: {
          filter: { sku: product.sku },
          update: {
            $set: {
              ...product,
              updatedAt: now,
            },
            $setOnInsert: {
              createdAt: now,
            },
          },
          upsert: true,
        },
      })),
    );

    console.log({
      database: dbName,
      collection: collectionName,
      summary: importResult.summary,
      indexedFields: ['sku', 'slug', 'category', 'subcategory', 'brand', 'stockStatus', 'price', 'textSearch'],
      inserted: result.upsertedCount,
      matched: result.matchedCount,
      modified: result.modifiedCount,
    });
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
