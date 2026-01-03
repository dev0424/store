import { loadEnv, Modules, defineConfig } from '@medusajs/utils';
import {
    ADMIN_CORS,
    AUTH_CORS,
    BACKEND_URL,
    COOKIE_SECRET,
    DATABASE_URL,
    JWT_SECRET,
    REDIS_URL,
    RESEND_API_KEY,
    RESEND_FROM_EMAIL,
    SENDGRID_API_KEY,
    SENDGRID_FROM_EMAIL,
    SHOULD_DISABLE_ADMIN,
    STORE_CORS,
    STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET,
    WORKER_MODE,
    MINIO_ENDPOINT,
    MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY,
    MINIO_BUCKET,
    MEILISEARCH_HOST,
    MEILISEARCH_ADMIN_KEY,
    STOREFRONT_URL,
} from 'lib/constants';
import { getProductMinPrice } from 'utils/variant-price';

loadEnv(process.env.NODE_ENV, process.cwd());

const medusaConfig = {
    projectConfig: {
        databaseUrl: DATABASE_URL,
        databaseLogging: false,
        redisUrl: REDIS_URL,
        workerMode: WORKER_MODE,
        http: {
            adminCors: ADMIN_CORS,
            authCors: AUTH_CORS,
            storeCors: STORE_CORS,
            jwtSecret: JWT_SECRET,
            cookieSecret: COOKIE_SECRET,
        },
    },
    admin: {
        storefrontUrl: STOREFRONT_URL,
        backendUrl: BACKEND_URL,
        disable: SHOULD_DISABLE_ADMIN,
    },
    modules: [
        {
            resolve: './src/modules/document',
        },
        {
            resolve: './src/modules/bank-account',
        },
        {
            resolve: './src/modules/customer-profile',
        },
        {
            resolve: './src/modules/account-status',
        },
        {
            resolve: './src/modules/location',
        },
        {
            resolve: './src/modules/system-flag',
        },
        {
            resolve: './src/modules/activity',
        },
        {
            resolve: './src/modules/custom-payment-method',
        },
        {
            resolve: './src/modules/billing-cycle',
        },
        {
            resolve: './src/modules/account-group',
        },
        {
            resolve: './src/modules/contact',
        },
        {
            key: Modules.FILE,
            resolve: '@medusajs/file',
            options: {
                providers: [
                    ...(MINIO_ENDPOINT && MINIO_ACCESS_KEY && MINIO_SECRET_KEY
                        ? [
                              {
                                  resolve: './src/modules/minio-file',
                                  id: 'minio',
                                  options: {
                                      endPoint: MINIO_ENDPOINT,
                                      accessKey: MINIO_ACCESS_KEY,
                                      secretKey: MINIO_SECRET_KEY,
                                      bucket: MINIO_BUCKET, // Optional, default: medusa-media
                                  },
                              },
                          ]
                        : [
                              {
                                  resolve: '@medusajs/file-local',
                                  id: 'local',
                                  options: {
                                      upload_dir: 'static',
                                      backend_url: `${BACKEND_URL}/static`,
                                  },
                              },
                          ]),
                ],
            },
        },
        ...(REDIS_URL
            ? [
                  {
                      key: Modules.EVENT_BUS,
                      resolve: '@medusajs/event-bus-redis',
                      options: {
                          redisUrl: REDIS_URL,
                      },
                  },
                  {
                      key: Modules.WORKFLOW_ENGINE,
                      resolve: '@medusajs/workflow-engine-redis',
                      options: {
                          redis: {
                              url: REDIS_URL,
                          },
                      },
                  },
              ]
            : []),
        ...((SENDGRID_API_KEY && SENDGRID_FROM_EMAIL) || (RESEND_API_KEY && RESEND_FROM_EMAIL)
            ? [
                  {
                      key: Modules.NOTIFICATION,
                      resolve: '@medusajs/notification',
                      options: {
                          providers: [
                              ...(SENDGRID_API_KEY && SENDGRID_FROM_EMAIL
                                  ? [
                                        {
                                            resolve: '@medusajs/notification-sendgrid',
                                            id: 'sendgrid',
                                            options: {
                                                channels: ['email'],
                                                api_key: SENDGRID_API_KEY,
                                                from: SENDGRID_FROM_EMAIL,
                                            },
                                        },
                                    ]
                                  : []),
                              ...(RESEND_API_KEY && RESEND_FROM_EMAIL
                                  ? [
                                        {
                                            resolve: './src/modules/email-notifications',
                                            id: 'resend',
                                            options: {
                                                channels: ['email'],
                                                api_key: RESEND_API_KEY,
                                                from: RESEND_FROM_EMAIL,
                                            },
                                        },
                                    ]
                                  : []),
                          ],
                      },
                  },
              ]
            : []),
        ...(STRIPE_API_KEY && STRIPE_WEBHOOK_SECRET
            ? [
                  {
                      key: Modules.PAYMENT,
                      resolve: '@medusajs/payment',
                      options: {
                          providers: [
                              {
                                  resolve: '@medusajs/payment-stripe',
                                  id: 'stripe',
                                  options: {
                                      apiKey: STRIPE_API_KEY,
                                      webhookSecret: STRIPE_WEBHOOK_SECRET,
                                  },
                              },
                          ],
                      },
                  },
              ]
            : []),
    ],
    plugins: [
        {
            resolve: `@tsc_tech/medusa-plugin-product-filter`,
            options: {},
        },
        ...(MEILISEARCH_HOST && MEILISEARCH_ADMIN_KEY
            ? [
                  {
                      resolve: '@rokmohar/medusa-plugin-meilisearch',
                      options: {
                          config: {
                              host: MEILISEARCH_HOST,
                              apiKey: MEILISEARCH_ADMIN_KEY,
                          },
                          settings: {
                              products: {
                                  type: 'products',
                                  enabled: true,
                                  fields: [
                                      'id',
                                      'title',
                                      'description',
                                      'handle',
                                      'thumbnail',
                                      'variants.prices.*',
                                  ],
                                  indexSettings: {
                                      searchableAttributes: ['title', 'description'],
                                      displayedAttributes: [
                                          'id',
                                          'handle',
                                          'title',
                                          'description',
                                          'thumbnail',
                                          'min_price',
                                          'max_price',
                                          'currency_code',
                                          'has_variants',
                                      ],
                                      filterableAttributes: [
                                          'id',
                                          'handle',
                                          'min_price',
                                          'max_price',
                                          'currency_code',
                                      ],
                                      // Enable sorting by price
                                      sortableAttributes: ['min_price', 'max_price'],
                                  },
                                  primaryKey: 'id',
                                  // Custom transformer to extract pricing
                                  transformer: async product => getProductMinPrice(product),
                              },
                              categories: {
                                  type: 'categories',
                                  enabled: true,
                                  indexSettings: {
                                      searchableAttributes: ['name', 'description'],
                                      displayedAttributes: ['id', 'name', 'handle'],
                                      filterableAttributes: [
                                          'id',
                                          'handle',
                                          'is_active',
                                          'parent_id',
                                      ],
                                  },
                                  primaryKey: 'id',
                              },
                          },
                      },
                  },
              ]
            : []),
    ],
};

console.log(JSON.stringify(medusaConfig, null, 2));
export default defineConfig(medusaConfig);
