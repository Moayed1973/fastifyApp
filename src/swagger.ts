import authMiddleware from "./middleware/authMiddleware";
export const registerSwagger = {
  schema: {
    tags: ["Authentication"],
    body: {
      type: "object",
      required: ["username", "password", "email"],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
        email: { type: "string", format: "email" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              username: { type: "string" },
              email: { type: "string" },
            },
          },
          token: { type: "string" },
        },
      },
    },
  },
};

export const loginSwagger = {
  schema: {
    tags: ["Authentication"],
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              username: { type: "string" },
              email: { type: "string" },
            },
          },
          token: { type: "string" },
        },
      },
    },
  },
};

export const updateUserSwagger = {
  preHandler: authMiddleware,
  schema: {
    tags: ["User Management"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    headers: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
      required: ["Token"],
    },
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        password: { type: "string" },
        email: { type: "string", format: "email" },
      },
      minProperties: 1,
    },
    response: {
      200: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              updatedUsername: { type: "string" },
              updatedEmail: { type: "string" },
              token: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export const deleteUserSwagger = {
  preHandler: authMiddleware,
  schema: {
    tags: ["User Management"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    headers: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
      required: ["Token"],
    },
    response: {
      200: {
        description: "User deleted Succefuly",
        type: "object",
        properties: {
          message: { type: "string", example: "User deleted Successfuly" },
          user: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              username: { type: "string", example: "user1" },
              email: { type: "string", example: "user1@example.com" },
              tokens: {
                type: "string",
                example: "Number of tokens",
              },
            },
          },
        },
      },
    },
  },
};
export const getUserSwagger = {
  preHandler: authMiddleware,
  schema: {
    tags: ["User Management"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    headers: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
      required: ["Token"],
    },
    response: {
      200: {
        user: {
          type: "object",
          properties: {
            id: { type: "string" },
            username: { type: "string", example: "user1" },
            email: { type: "string", example: "user1@example.com" },
            tokens: {
              type: "string",
              example: "Number of tokens",
            },
          },
        },
      },
    },
  },
};

export const getAllUsersSwagger = {
  preHandler: authMiddleware,
  schema: {
    tags: ["User Management"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
      required: ["id"],
    },
    headers: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
      required: ["Token"],
    },
    response: {
      200: {
        description: "List of users",
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            username: { type: "string", example: "user1" },
            email: { type: "string", example: "user1@example.com" },
            tokens: {
              type: "string",
              example: "Number of tokens",
            },
          },
        },
      },
    },
  },
};
