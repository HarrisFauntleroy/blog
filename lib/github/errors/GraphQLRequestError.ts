class GraphQLRequestError extends Error {
  constructor(message: string, public innerError: Error) {
    super(message);
    this.name = "GraphQLRequestError";
  }
}

export default GraphQLRequestError;
