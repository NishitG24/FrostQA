// framework/frostguard/frostqa-fixtures.ts
// This file contains fixtures for FrostQA, including user credentials and product details.
// The fixtures are used for testing purposes and can be extended as needed.    
// SPDX-License-Identifier: MIT
export const FrostFixtures = {
    users: {
      standardUser: {
        username: 'testuser@example.com',
        password: 'Test@1234',
      },
      adminUser: {
        username: 'admin@example.com',
        password: 'Admin@123',
      }
    },
    products: {
      demoProduct: {
        id: 101,
        name: 'Embroidered Fabric Earrings',
        price: '₹299',
      }
    }
  };
  