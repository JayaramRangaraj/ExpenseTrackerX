export function parseError(err) {
  const res = err.response?.data; // Need to learn

  //Back-end error
  if (res?.errors) {
    const firstField = Object.keys(res.errors)[0];
    return res.errors[firstField][0];
  }

  //Backend Simple Message
  if (res?.msg) {
    return res.msg;
  }

  //Network Error
  if (err.message === "Network Error") {
    return "Unable to reach server. Please check your connection.";
  }
  // Timeout or unknown errors
  if (err.code === "ECONNABORTED") {
    return "Request timed out. Try again.";
  }

  return "An unexpected error occurred.";
}
