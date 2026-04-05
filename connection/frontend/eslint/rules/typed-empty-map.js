// eslint-disable-next-line import/no-anonymous-default-export
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require type for empty Map unless variable is typed',
    },
    schema: [],
  },

  create(context) {
    return {
      NewExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === 'Map' &&
          node.arguments.length === 0 &&
          !node.typeArguments
        ) {
          const parent = node.parent;

          if (
            parent?.type === 'VariableDeclarator' &&
            parent.id.type === 'Identifier' &&
            parent.id.typeAnnotation
          ) {
            return;
          }

          context.report({
            node,
            message:
              'При объявлении пустой Map указывайте тип или используйте типизированную переменную.',
          });
        }
      },
    };
  },
};
